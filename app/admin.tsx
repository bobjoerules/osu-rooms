import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Platform,
    Pressable,
    Image as RNImage,
    StyleSheet,
    Text,
    useWindowDimensions,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseImage } from '../data/rooms';
import { db } from '../firebaseConfig';
import { useHapticFeedback } from '../lib/SettingsContext';
import { useTheme } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Submission {
    id: string;
    building: string;
    roomNumber: string;
    roomType: string;
    capacity: string;
    imageUrl?: string | null;
    imageUrls?: string[];
    userEmail: string;
    userName?: string;
    userPhotoUrl?: string | null;
    status: string;
    pushToken?: string;
}

import { sendPushNotification } from '../lib/notifications';

export default function AdminScreen() {
    const theme = useTheme();
    const router = useRouter();
    const triggerHaptic = useHapticFeedback();
    const { width: windowWidth } = useWindowDimensions();
    const horizontalListRef = useRef<FlatList>(null);
    const [pending, setPending] = useState<Submission[]>([]);
    const [approved, setApproved] = useState<Submission[]>([]);
    const [rejected, setRejected] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');

    const statuses = ['pending', 'approved', 'rejected'] as const;

    useEffect(() => {
        setLoading(true);
        const qPending = query(
            collection(db, 'submissions'),
            where('status', '==', 'pending'),
            orderBy('createdAt', 'desc')
        );

        const unsubPending = onSnapshot(qPending, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Submission[];
            setPending(docs);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching pending:", error);
            setLoading(false);
        });

        const qApproved = query(
            collection(db, 'submissions'),
            where('status', '==', 'approved'),
            orderBy('createdAt', 'desc'),
            limit(50)
        );
        const unsubApproved = onSnapshot(qApproved, (snapshot) => {
            setApproved(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Submission[]);
        });

        const qRejected = query(
            collection(db, 'submissions'),
            where('status', '==', 'rejected'),
            orderBy('createdAt', 'desc'),
            limit(50)
        );
        const unsubRejected = onSnapshot(qRejected, (snapshot) => {
            setRejected(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Submission[]);
        });

        return () => {
            unsubPending();
            unsubApproved();
            unsubRejected();
        };
    }, []);

    const groupedSubmissions = useMemo(() => ({
        pending,
        approved,
        rejected
    }), [pending, approved, rejected]);

    const handleAction = async (id: string, status: 'approved' | 'rejected') => {
        triggerHaptic();
        try {
            let createdRoomId: string | null = null;
            if (status === 'approved') {
                const subRef = doc(db, 'submissions', id);
                const subSnap = await getDoc(subRef);
                if (!subSnap.exists()) throw new Error("Submission not found");
                const submission = subSnap.data() as Submission;

                const buildingsRef = collection(db, 'buildings');
                const q = query(buildingsRef, where('name', '==', submission.building));
                const buildingSnap = await getDocs(q);

                let buildingDoc;
                let buildingId;

                if (buildingSnap.empty) {
                    buildingId = submission.building.toLowerCase().replace(/\s+/g, '-');
                    buildingDoc = {
                        id: buildingId,
                        name: submission.building,
                        rooms: []
                    };
                } else {
                    buildingId = buildingSnap.docs[0].id;
                    buildingDoc = buildingSnap.docs[0].data();
                }

                const submissionImages = (submission.imageUrls && submission.imageUrls.length > 0)
                    ? submission.imageUrls
                    : (submission.imageUrl ? [submission.imageUrl] : [firebaseImage('placeholder.png')]);

                const newRoom = {
                    id: `${buildingId}-${submission.roomNumber}`,
                    capacity: submission.capacity,
                    roomType: submission.roomType,
                    floor: submission.roomNumber.charAt(0) === '0' ? '0' : submission.roomNumber.charAt(0),
                    images: submissionImages,
                    searchAliases: [`${submission.building} ${submission.roomNumber}`]
                };

                createdRoomId = newRoom.id;

                const existingRoomIndex = buildingDoc.rooms.findIndex((r: any) => r.id === newRoom.id);
                const updatedRooms = [...buildingDoc.rooms];

                if (existingRoomIndex > -1) {
                    const existingRoom = updatedRooms[existingRoomIndex];
                    const existingImages = existingRoom.images || [];
                    const isPlaceholder = (url: string) => url.includes('placeholder.png');
                    const isImportant = existingRoom.imageUpdateImportant === true;

                    let mergedImages;
                    if (isImportant && newRoom.images.length > 0) {
                        mergedImages = newRoom.images;
                    } else if (newRoom.images.length > 0) {
                        const realExistingImages = existingImages.filter((img: string) => !isPlaceholder(img));
                        mergedImages = [...realExistingImages, ...newRoom.images];
                    } else {
                        mergedImages = existingImages;
                    }

                    updatedRooms[existingRoomIndex] = {
                        ...existingRoom,
                        capacity: newRoom.capacity || existingRoom.capacity,
                        roomType: newRoom.roomType || existingRoom.roomType,
                        images: mergedImages,
                        imageUpdateImportant: false
                    };
                } else {
                    updatedRooms.push({
                        ...newRoom,
                        imageUpdateImportant: false
                    });
                }

                await setDoc(doc(db, 'buildings', buildingId), {
                    ...buildingDoc,
                    rooms: updatedRooms
                });
            }

            const updateData: any = {
                status,
                reviewedAt: new Date(),
            };

            if (createdRoomId) {
                updateData.createdRoomId = createdRoomId;

                const submission = (await getDoc(doc(db, 'submissions', id))).data() as Submission;
                if (submission?.pushToken) {
                    await sendPushNotification(
                        submission.pushToken,
                        "Room Approved! 🥳",
                        `Your submission for ${submission.building} ${submission.roomNumber} has been approved. Tap to view.`,
                        { roomId: createdRoomId }
                    );
                }
            }

            await updateDoc(doc(db, 'submissions', id), updateData);
        } catch (error) {
            console.error(`Error ${status} submission:`, error);
            if (Platform.OS === 'web') {
                window.alert(`Failed to ${status} submission.`);
            } else {
                Alert.alert('Error', `Failed to ${status} submission.`);
            }
        }
    };

    const handleDelete = async (id: string) => {
        triggerHaptic();
        if (Platform.OS === 'web') {
            const confirmed = window.confirm('Delete Permanently? This will remove this submission from the database forever.');
            if (confirmed) {
                try {
                    await deleteDoc(doc(db, 'submissions', id));
                } catch (error) {
                    console.error("Error deleting submission:", error);
                    window.alert('Failed to delete submission.');
                }
            }
            return;
        }

        Alert.alert(
            'Delete Permanently?',
            'This will remove this submission from the database forever.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        triggerHaptic();
                        try {
                            await deleteDoc(doc(db, 'submissions', id));
                        } catch (error) {
                            console.error("Error deleting submission:", error);
                            Alert.alert('Error', 'Failed to delete submission.');
                        }
                    }
                },
            ]
        );
    };

    const handleTabPress = (status: 'pending' | 'approved' | 'rejected') => {
        triggerHaptic();
        setStatusFilter(status);
        if (Platform.OS !== 'web') {
            const index = statuses.indexOf(status);
            horizontalListRef.current?.scrollToIndex({ index, animated: true });
        }
    };

    const onMomentumScrollEnd = (event: any) => {
        if (Platform.OS === 'web') return;
        const index = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
        if (statuses[index] !== statusFilter) {
            triggerHaptic();
            setStatusFilter(statuses[index]);
        }
    };

    const SubmissionItem = React.memo(({ item }: { item: Submission }) => {
        const { width: windowWidth } = useWindowDimensions();
        const isWeb = Platform.OS === 'web';
        const imageWidth = isWeb ? (windowWidth > 832 ? 768 : windowWidth - 32) : windowWidth - 32;

        return (
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
                {item.imageUrls && item.imageUrls.length > 0 ? (
                    <View style={styles.imageContainer}>
                        <FlatList
                            data={item.imageUrls}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item: imgUri }) => (
                                Platform.OS === 'web' ? (
                                    <RNImage
                                        source={{ uri: imgUri }}
                                        style={[styles.image, { width: imageWidth }]}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <Image
                                        source={imgUri}
                                        style={[styles.image, { width: imageWidth }]}
                                        contentFit="cover"
                                    />
                                )
                            )}
                            keyExtractor={(u) => u}
                            pagingEnabled={!isWeb}
                            snapToAlignment="center"
                            decelerationRate="fast"
                            initialNumToRender={2}
                            maxToRenderPerBatch={2}
                            windowSize={3}
                        />
                    </View>
                ) : item.imageUrl ? (
                    <View style={styles.imageContainer}>
                        {Platform.OS === 'web' ? (
                            <RNImage
                                source={{ uri: item.imageUrl }}
                                style={[styles.image, { width: '100%' }]}
                                resizeMode="cover"
                            />
                        ) : (
                            <Image
                                source={item.imageUrl}
                                style={[styles.image, { width: '100%' }]}
                                contentFit="cover"
                            />
                        )}
                    </View>
                ) : null}
                <View style={styles.cardInfo}>
                    <Text style={[styles.buildingName, { color: theme.text }]}>{item.building}</Text>
                    <Text style={[styles.roomInfo, { color: theme.subtext }]}>
                        {/^[A-Za-z\s]+$/.test(item.roomNumber) ? item.roomNumber : `Room ${item.roomNumber}`} • {item.roomType}
                    </Text>
                    {item.capacity && (
                        <Text style={[styles.roomInfo, { color: theme.subtext }]}>
                            Capacity: {item.capacity}
                        </Text>
                    )}
                    <View style={styles.userInfoRow}>
                        <View style={styles.userAvatar}>
                            {item.userPhotoUrl ? (
                                Platform.OS === 'web' ? (
                                    <RNImage
                                        source={{ uri: item.userPhotoUrl }}
                                        style={styles.userAvatarImage}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <Image
                                        source={{ uri: item.userPhotoUrl }}
                                        style={styles.userAvatarImage}
                                        contentFit="cover"
                                    />
                                )
                            ) : (
                                <Text style={styles.userAvatarText}>
                                    {(item.userName || item.userEmail || "?").charAt(0).toUpperCase()}
                                </Text>
                            )}
                        </View>
                        <View>
                            <Text style={[styles.userName, { color: theme.text }]}>
                                {item.userName || 'Anonymous'}
                            </Text>
                            <Text style={[styles.userEmail, { color: theme.subtext }]}>
                                {item.userEmail}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.actions}>
                        {item.status === 'pending' && (
                            <>
                                <Pressable
                                    style={[styles.actionButton, styles.rejectButton]}
                                    onPress={() => handleAction(item.id, 'rejected')}
                                >
                                    <Ionicons name="close-circle" size={20} color="#ff453a" />
                                    <Text style={[styles.actionText, { color: '#ff453a' }]}>Reject</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.actionButton, styles.approveButton]}
                                    onPress={() => handleAction(item.id, 'approved')}
                                >
                                    <Ionicons name="checkmark-circle" size={20} color="#34c759" />
                                    <Text style={[styles.actionText, { color: '#34c759' }]}>Approve</Text>
                                </Pressable>
                            </>
                        )}
                        <Pressable
                            style={[styles.actionButton, styles.deleteButton]}
                            onPress={() => handleDelete(item.id)}
                        >
                            <Ionicons name="trash-outline" size={20} color="#ff453a" />
                            <Text style={[styles.actionText, { color: '#ff453a' }]}>Delete</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    });


    const renderSubmissionItem = ({ item }: { item: Submission }) => (
        <SubmissionItem item={item} />
    );

    const renderPage = ({ item: status }: { item: 'pending' | 'approved' | 'rejected' }) => {
        const pageSubmissions = groupedSubmissions[status];

        return (
            <View style={{ width: Platform.OS === 'web' ? '100%' : windowWidth }}>
                {loading ? (
                    <View style={styles.centered}>
                        <ActivityIndicator size="large" color={theme.primary} />
                    </View>
                ) : pageSubmissions.length === 0 ? (
                    <View style={styles.centered}>
                        <Ionicons name="documents-outline" size={64} color={theme.subtext} style={{ marginBottom: 16 }} />
                        <Text style={[styles.emptyText, { color: theme.subtext }]}>
                            No {status} submissions
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={pageSubmissions}
                        renderItem={renderSubmissionItem}
                        keyExtractor={item => item.id}
                        initialNumToRender={5}
                        windowSize={5}
                        removeClippedSubviews={Platform.OS === 'android'}
                        maxToRenderPerBatch={5}
                        contentContainerStyle={[
                            styles.listContent,
                            Platform.OS === 'web' && { maxWidth: 800, alignSelf: 'center', width: '100%' }
                        ]}
                    />
                )}
            </View>
        );
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return '#FFCC00';
            case 'approved': return '#34C759';
            case 'rejected': return '#FF3B30';
            default: return theme.primary;
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
            <View style={styles.header}>
                <Pressable onPress={() => {
                    triggerHaptic();
                    if (router.canGoBack()) {
                        router.back();
                    } else {
                        router.replace('/');
                    }
                }} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color={theme.text} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Review Submissions</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.tabBar}>
                {statuses.map((status) => {
                    const statusColor = getStatusColor(status);
                    const isActive = statusFilter === status;

                    return (
                        <Pressable
                            key={status}
                            onPress={() => handleTabPress(status)}
                            style={[
                                styles.tabItem,
                                isActive && { borderBottomColor: statusColor }
                            ]}
                        >
                            <Text style={[
                                styles.tabText,
                                { color: isActive ? statusColor : theme.subtext }
                            ]}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            {Platform.OS === 'web' ? (
                <View style={{ flex: 1 }}>
                    {renderPage({ item: statusFilter })}
                </View>
            ) : (
                <FlatList
                    ref={horizontalListRef}
                    data={statuses}
                    renderItem={renderPage}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    keyExtractor={item => item}
                    getItemLayout={(_, index) => ({
                        length: windowWidth,
                        offset: windowWidth * index,
                        index,
                    })}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    card: {
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 16,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: 300,
    },
    image: {
        height: 300,
        maxWidth: 800,
    },
    cardInfo: {
        padding: 16,
    },
    buildingName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    roomInfo: {
        fontSize: 14,
        marginBottom: 2,
    },
    userEmail: {
        fontSize: 12,
        marginTop: 8,
        fontStyle: 'italic',
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
    },
    actions: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 12,
        gap: 6,
        borderWidth: 1,
    },
    rejectButton: {
        borderColor: '#ff453a22',
        backgroundColor: '#ff453a11',
    },
    approveButton: {
        borderColor: '#34c75922',
        backgroundColor: '#34c75911',
    },
    deleteButton: {
        borderColor: '#ff453a22',
        backgroundColor: '#ff453a11',
    },
    actionText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    tabBar: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#8882',
        justifyContent: 'center',
    },
    tabItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
    },
    userInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        gap: 10,
    },
    userAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#8882',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    userAvatarImage: {
        width: '100%',
        height: '100%',
    },
    userAvatarText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#888',
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});