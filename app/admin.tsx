import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { collection, collectionGroup, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    PanResponder,
    Platform,
    Pressable,
    Image as RNImage,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    useWindowDimensions,
    View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { firebaseImage } from '../data/rooms';
import { db } from '../firebaseConfig';
import { useApp } from '../lib/AppContext';
import { useBuildings } from '../lib/DatabaseContext';
import { useHapticFeedback } from '../lib/SettingsContext';
import { useUser } from '../lib/UserContext';
import { Theme, useTheme } from '../theme';

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

function hexToHue(hex: string): number {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0;
    const d = max - min;

    if (d === 0) h = 0;
    else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return Math.round(h * 360);
}

function hueToHex(h: number): string {
    const s = 0.9, l = 0.5;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

export default function AdminScreen() {
    const theme = useTheme();
    const router = useRouter();
    const triggerHaptic = useHapticFeedback();
    const { width: windowWidth } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const isDesktopWeb = Platform.OS === 'web' && windowWidth >= 768;
    const { isAdmin, loading: authLoading } = useUser();
    const { bannerHeight } = useApp();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const horizontalListRef = useRef<FlatList>(null);
    const sliderRef = useRef<View>(null);
    const sliderX = useRef<number>(0);
    const sliderWidth = useRef<number>(0);
    const [pending, setPending] = useState<Submission[]>([]);
    const [approved, setApproved] = useState<Submission[]>([]);
    const [rejected, setRejected] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<'pending' | 'approved' | 'rejected' | 'system'>('pending');
    const { getRoomById, buildings } = useBuildings();
    const [scanning, setScanning] = useState(false);
    const [isFixingAll, setIsFixingAll] = useState(false);
    const [systemResults, setSystemResults] = useState<{ type: 'corrupt' | 'orphan' | 'mismatch', id: string, roomId: string, details: string, actionDescription: string, actionType: 'delete' | 'repair' | 'sync', ref: any, data?: any }[]>([]);

    const { bannerConfig, updateBannerConfig } = useApp();
    const [bannerTitle, setBannerTitle] = useState(bannerConfig?.title || '');
    const [bannerDescription, setBannerDescription] = useState(bannerConfig?.description || '');
    const [bannerIcon, setBannerIcon] = useState(bannerConfig?.icon || 'information-circle');
    const [bannerColor, setBannerColor] = useState(bannerConfig?.borderColor || '#D73F09');
    const [bannerHue, setBannerHue] = useState(() => hexToHue(bannerConfig?.borderColor || '#D73F09'));
    const [bannerActive, setBannerActive] = useState(bannerConfig?.active || false);
    const [isSavingBanner, setIsSavingBanner] = useState(false);
    const [isSliding, setIsSliding] = useState(false);

    useEffect(() => {
        if (bannerConfig) {
            setBannerTitle(bannerConfig.title);
            setBannerDescription(bannerConfig.description);
            setBannerIcon(bannerConfig.icon);
            setBannerColor(bannerConfig.borderColor);
            setBannerHue(hexToHue(bannerConfig.borderColor));
            setBannerActive(bannerConfig.active);
        }
    }, [bannerConfig]);

    const handleHueChange = (h: number) => {
        setBannerHue(h);
        setBannerColor(hueToHex(h));
    };

    const saveBanner = async () => {
        setIsSavingBanner(true);
        triggerHaptic();
        try {
            await updateBannerConfig({
                title: bannerTitle,
                description: bannerDescription,
                icon: bannerIcon,
                borderColor: bannerColor,
                active: bannerActive,
            });
            if (Platform.OS === 'web') {
                window.alert('Banner configuration saved!');
            } else {
                Alert.alert('Success', 'Banner configuration saved!');
            }
        } catch (err) {
            console.error('Failed to save banner:', err);
            Alert.alert('Error', 'Failed to save banner settings.');
        } finally {
            setIsSavingBanner(false);
        }
    };

    const Header = ({ title = "Review Submissions" }: { title?: string }) => (
        <View
            style={[styles.headerFloatingContainer, {
                top: 0,
                left: 0,
                right: isDesktopWeb ? 12 : 0,
                height: isDesktopWeb ? (bannerHeight || 0) + insets.top + 90 : (bannerHeight > 0 ? (bannerHeight + 75) : insets.top + 75),
                backgroundColor: (bannerHeight > 0 && Platform.OS !== 'web') ? 'transparent' : theme.background,
            }]}
            {...(isDesktopWeb ? { dataSet: { 'glass-header': 'true' } } : {})}
        >
            <SafeAreaView edges={bannerHeight > 0 ? [] : ['top']}>
                <View style={[
                    styles.header,
                    isDesktopWeb && { maxWidth: 1200, alignSelf: 'center', width: '100%' },
                    { marginTop: isDesktopWeb ? (bannerHeight || 0) + 16 : (bannerHeight > 0 ? bannerHeight : 0), marginBottom: 10 }
                ]}>
                    <Pressable
                        onPress={() => {
                            triggerHaptic();
                            if (router.canGoBack()) {
                                router.back();
                            } else {
                                router.replace('/');
                            }
                        }}
                        style={styles.backButton}
                    >
                        <Ionicons name="chevron-back" size={28} color={theme.text} />
                    </Pressable>
                    <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>
                        {title}
                    </Text>
                    <View style={{ width: 40 }} />
                </View>
            </SafeAreaView>
        </View>
    );

    useEffect(() => {
        if (!authLoading && !isAdmin) {
            router.replace('/account');
        }
    }, [isAdmin, authLoading, router]);

    const statuses = ['pending', 'approved', 'rejected', 'system'] as const;

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

    const handleTabPress = (status: 'pending' | 'approved' | 'rejected' | 'system') => {
        triggerHaptic();
        setStatusFilter(status);
        if (Platform.OS !== 'web') {
            const index = statuses.indexOf(status);
            horizontalListRef.current?.scrollToIndex({ index, animated: false });
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

    const runHealthCheck = async () => {
        setScanning(true);
        triggerHaptic();
        const issues: any[] = [];
        try {
            const ratingsQuery = query(collectionGroup(db, 'userRatings'));
            const snapshot = await getDocs(ratingsQuery);

            snapshot.forEach(docRef => {
                const data = docRef.data() as any;
                const roomId = docRef.ref.parent.parent?.id || 'unknown';
                const roomInfo = getRoomById(roomId);

                if (!data.rating || data.rating <= 0) {
                    issues.push({
                        type: 'corrupt',
                        id: docRef.id,
                        roomId,
                        details: 'Rating entry exists but value is empty or 0',
                        actionDescription: 'Delete invalid rating entry',
                        actionType: 'delete',
                        ref: docRef.ref,
                        data
                    });
                } else if (!data.updatedAt) {
                    issues.push({
                        type: 'corrupt',
                        id: docRef.id,
                        roomId,
                        details: 'Rating exists but has no timestamp (hides it from lists)',
                        actionDescription: 'Add missing timestamp to restore visibility',
                        actionType: 'repair',
                        ref: docRef.ref,
                        data
                    });
                } else if (!roomInfo) {
                    issues.push({
                        type: 'orphan',
                        id: docRef.id,
                        roomId,
                        details: `Rating for room ${roomId} which no longer exists`,
                        actionDescription: 'Delete orphaned rating data',
                        actionType: 'delete',
                        ref: docRef.ref,
                        data
                    });
                }
            });

            const ratingsAggQuery = query(collection(db, 'ratings'));
            const aggSnapshot = await getDocs(ratingsAggQuery);
            for (const aggDoc of aggSnapshot.docs) {
                const aggData = aggDoc.data();
                if (aggData.count > 0) {
                    const userRatingsSnap = await getDocs(collection(db, 'ratings', aggDoc.id, 'userRatings'));
                    if (userRatingsSnap.size !== aggData.count) {
                        issues.push({
                            type: 'mismatch',
                            id: aggDoc.id,
                            roomId: aggDoc.id,
                            details: `Aggregator says ${aggData.count} ratings, but actually found ${userRatingsSnap.size}`,
                            actionDescription: 'Recalculate and sync aggregate totals',
                            actionType: 'sync',
                            ref: aggDoc.ref
                        });
                    }
                }
            }

            setSystemResults(issues);
            if (Platform.OS === 'web') {
                window.alert(`Scan complete. Found ${issues.length} potential issues.`);
            } else {
                Alert.alert('Scan Complete', `Found ${issues.length} potential issues.`);
            }
        } catch (err) {
            console.error("Health check failed:", err);
            Alert.alert('Error', 'Failed to run health check.');
        } finally {
            setScanning(false);
        }
    };

    const fixIssue = async (issue: any, silent = false) => {
        if (!silent) triggerHaptic();
        try {
            if (issue.type === 'corrupt' && !issue.data?.updatedAt && issue.data?.rating) {
                await updateDoc(issue.ref, { updatedAt: new Date() });
            } else if (issue.type === 'mismatch') {
                const userRatingsSnap = await getDocs(collection(db, 'ratings', issue.id, 'userRatings'));
                const ratings = userRatingsSnap.docs.map(d => d.data().rating).filter(r => typeof r === 'number');
                const newCount = ratings.length;
                const newAvg = newCount > 0 ? ratings.reduce((a, b) => a + b, 0) / newCount : 0;
                await updateDoc(issue.ref, { count: newCount, avg: newAvg });
            } else {
                await deleteDoc(issue.ref);
            }
            setSystemResults(prev => prev.filter(i => i !== issue));
        } catch (err) {
            console.error("Failed to fix issue:", err);
            if (!silent) Alert.alert('Error', 'Action failed.');
            throw err;
        }
    };

    const fixAllIssues = async () => {
        if (systemResults.length === 0) return;

        const confirmMsg = `Are you sure you want to fix all ${systemResults.length} issues? This will perform bulk deletes and updates.`;
        if (Platform.OS === 'web') {
            if (!window.confirm(confirmMsg)) return;
        } else {
            const confirmed = await new Promise(resolve => {
                Alert.alert('Confirm Bulk Fix', confirmMsg, [
                    { text: 'Cancel', onPress: () => resolve(false), style: 'cancel' },
                    { text: 'Fix All', onPress: () => resolve(true), style: 'destructive' }
                ]);
            });
            if (!confirmed) return;
        }

        setIsFixingAll(true);
        triggerHaptic();

        try {
            // Process in sequence to avoid hitting rate limits or causing race conditions on aggregates
            for (const issue of [...systemResults]) {
                await fixIssue(issue, true);
            }

            if (Platform.OS === 'web') {
                window.alert('Successfully processed all issues.');
            } else {
                Alert.alert('Success', 'Successfully processed all issues.');
            }
        } catch (err) {
            console.error("Bulk fix failed segment:", err);
            Alert.alert('Incomplete', 'Some issues could not be fixed. Please run health check again.');
        } finally {
            setIsFixingAll(false);
        }
    };

    const renderPage = ({ item: status }: { item: 'pending' | 'approved' | 'rejected' | 'system' }) => {
        let content;
        if (status === 'system') {
            content = (
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={[
                        styles.listContent,
                        Platform.OS === 'web' && { maxWidth: 800, alignSelf: 'center', width: '100%' }
                    ]}
                >
                    <View style={[styles.card, { padding: 20, backgroundColor: theme.card, borderColor: theme.border, marginBottom: 20 }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>App Notification Banner</Text>
                            <Switch
                                value={bannerActive}
                                onValueChange={setBannerActive}
                                trackColor={{ false: theme.border, true: theme.primary }}
                                thumbColor={Platform.OS === 'ios' ? undefined : '#fff'}
                            />
                        </View>

                        <View style={{ gap: 12 }}>
                            <View>
                                <Text style={[styles.label, { color: theme.subtext, marginBottom: 8 }]}>Quick Templates</Text>
                                <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                                    {[
                                        { label: 'Maint', title: 'Scheduled Maintenance', icon: 'build', color: '#FF9500' },
                                        { label: 'Alert', title: 'System Alert', icon: 'alert-circle', color: '#FF3B30' },
                                        { label: 'Update', title: 'New App Version Available', icon: 'megaphone', color: '#007AFF' },
                                        { label: 'OSU', title: 'OSU Campus Update', icon: 'information-circle', color: '#D73F09' },
                                    ].map((template) => (
                                        <Pressable
                                            key={template.label}
                                            style={[styles.presetButton, { backgroundColor: theme.inputBg, borderColor: theme.border }]}
                                            onPress={() => {
                                                triggerHaptic();
                                                setBannerTitle(template.title);
                                                setBannerIcon(template.icon);
                                                handleHueChange(hexToHue(template.color));
                                            }}
                                        >
                                            <Ionicons name={template.icon as any} size={14} color={theme.primary} />
                                            <Text style={[styles.presetText, { color: theme.text }]}>{template.label}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, { color: theme.subtext, marginBottom: 4 }]}>Banner Title</Text>
                                <TextInput
                                    style={[styles.adminInput, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
                                    value={bannerTitle}
                                    onChangeText={setBannerTitle}
                                    placeholder="e.g. Server Maintenance"
                                    placeholderTextColor={theme.subtext + '88'}
                                />
                            </View>

                            <View>
                                <Text style={[styles.label, { color: theme.subtext, marginBottom: 4 }]}>Description</Text>
                                <TextInput
                                    style={[styles.adminInput, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border, height: 80, textAlignVertical: 'top' }]}
                                    value={bannerDescription}
                                    onChangeText={setBannerDescription}
                                    placeholder="Tell the users what's happening..."
                                    placeholderTextColor={theme.subtext + '88'}
                                    multiline
                                />
                            </View>

                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <Text style={[styles.label, { color: theme.subtext }]}>Border Color</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                        <View style={[styles.colorPreview, { backgroundColor: bannerColor }]} />
                                        <Text style={[styles.value, { color: theme.text, fontSize: 13, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' }]}>{bannerColor}</Text>
                                    </View>
                                </View>

                                <View
                                    ref={sliderRef}
                                    style={styles.sliderContainer}
                                    onLayout={(e) => {
                                        const { width } = e.nativeEvent.layout;
                                        sliderWidth.current = width;
                                        sliderRef.current?.measureInWindow((x) => {
                                            if (x > 0) sliderX.current = x;
                                        });
                                    }}
                                >
                                    <LinearGradient
                                        colors={['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff0000']}
                                        start={{ x: 0, y: 0.5 }}
                                        end={{ x: 1, y: 0.5 }}
                                        style={styles.sliderTrack}
                                    />
                                    <View
                                        style={styles.sliderInteractive}
                                        {...PanResponder.create({
                                            onStartShouldSetPanResponder: () => true,
                                            onMoveShouldSetPanResponder: () => true,
                                            onPanResponderTerminationRequest: () => false,
                                            onPanResponderGrant: (evt) => {
                                                setIsSliding(true);
                                                const x = evt.nativeEvent.locationX;
                                                const hue = Math.max(0, Math.min(360, (x / (sliderWidth.current || 1)) * 360));
                                                handleHueChange(hue);
                                            },
                                            onPanResponderMove: (evt) => {
                                                const x = evt.nativeEvent.locationX;
                                                const hue = Math.max(0, Math.min(360, (x / (sliderWidth.current || 1)) * 360));
                                                handleHueChange(hue);
                                            },
                                            onPanResponderRelease: () => {
                                                setIsSliding(false);
                                            },
                                            onPanResponderTerminate: () => {
                                                setIsSliding(false);
                                            }
                                        }).panHandlers}
                                    >
                                        <View
                                            pointerEvents="none"
                                            style={[styles.sliderThumb, { left: `${(bannerHue / 360) * 100}%`, backgroundColor: bannerColor }]}
                                        />
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', gap: 6, marginTop: 12 }}>
                                    {[
                                        { label: 'Red', color: '#FF3B30' },
                                        { label: 'Yellow', color: '#FFCC00' },
                                        { label: 'Green', color: '#34C759' },
                                        { label: 'Blue', color: '#007AFF' },
                                        { label: 'OSU', color: '#D73F09' }
                                    ].map((preset) => (
                                        <Pressable
                                            key={preset.color}
                                            style={[styles.presetButton, { flex: 1, paddingHorizontal: 4, justifyContent: 'center', backgroundColor: preset.color + '15', borderColor: preset.color + '30' }]}
                                            onPress={() => handleHueChange(hexToHue(preset.color))}
                                        >
                                            <View style={[styles.presetDot, { backgroundColor: preset.color }]} />
                                            <Text style={[styles.presetText, { color: preset.color, fontSize: 11 }]} numberOfLines={1}>{preset.label}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, { color: theme.subtext, marginBottom: 4 }]}>Icon (Ionicons)</Text>
                                <TextInput
                                    style={[styles.adminInput, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
                                    value={bannerIcon}
                                    onChangeText={setBannerIcon}
                                    placeholder="information-circle"
                                    placeholderTextColor={theme.subtext + '88'}
                                />
                                <View style={{ flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                                    {[
                                        { icon: 'warning', label: 'Warning' },
                                        { icon: 'information-circle', label: 'Info' },
                                        { icon: 'alert-circle', label: 'Alert' },
                                        { icon: 'megaphone', label: 'News' },
                                        { icon: 'calendar', label: 'Event' },
                                        { icon: 'build', label: 'Maint.' }
                                    ].map((preset) => (
                                        <Pressable
                                            key={preset.icon}
                                            style={[styles.presetButton, { backgroundColor: theme.inputBg, borderColor: theme.border }]}
                                            onPress={() => {
                                                triggerHaptic();
                                                setBannerIcon(preset.icon);
                                            }}
                                        >
                                            <Ionicons name={preset.icon as any} size={14} color={theme.text} />
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.actionButton,
                                    { backgroundColor: theme.primary, borderColor: theme.primary, marginTop: 8, opacity: (pressed || isSavingBanner) ? 0.7 : 1 }
                                ]}
                                onPress={saveBanner}
                                disabled={isSavingBanner}
                            >
                                {isSavingBanner ? <ActivityIndicator color="#fff" size="small" /> : <Ionicons name="save-outline" size={20} color="#fff" />}
                                <Text style={[styles.actionText, { color: '#fff' }]}>Save Banner Settings</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={[styles.card, { padding: 20, backgroundColor: theme.card, borderColor: theme.border }]}>
                        <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 8 }]}>Database Health</Text>
                        <Text style={[styles.emptyText, { color: theme.subtext, fontSize: 14, textAlign: 'left', marginBottom: 20 }]}>
                            Scan for corrupted, orphaned, or mismatched ratings. Corrupted ratings usually stay hidden from the "Your Reviews" tab.
                        </Text>
                        <Pressable
                            style={({ pressed }) => [
                                styles.actionButton,
                                { backgroundColor: getStatusColor('system'), borderColor: getStatusColor('system'), opacity: (pressed || scanning) ? 0.7 : 1 }
                            ]}
                            onPress={runHealthCheck}
                            disabled={scanning}
                        >
                            {scanning ? <ActivityIndicator color="#fff" size="small" /> : <Ionicons name="pulse" size={20} color="#fff" />}
                            <Text style={[styles.actionText, { color: '#fff' }]}>Run Health Check</Text>
                        </Pressable>
                    </View>

                    {systemResults.length > 0 && (
                        <View style={{ gap: 12 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                                <Text style={[styles.sectionTitle, { color: theme.text }]}>Found Issues ({systemResults.length})</Text>
                                <Pressable
                                    onPress={fixAllIssues}
                                    disabled={isFixingAll}
                                    style={({ pressed }) => [
                                        {
                                            paddingVertical: 6,
                                            paddingHorizontal: 12,
                                            backgroundColor: getStatusColor('system'),
                                            borderRadius: 8,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 6,
                                            opacity: (pressed || isFixingAll) ? 0.7 : 1
                                        }
                                    ]}
                                >
                                    {isFixingAll ? <ActivityIndicator size="small" color="#fff" /> : <Ionicons name="flash" size={16} color="#fff" />}
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>Fix All</Text>
                                </Pressable>
                            </View>
                            {systemResults.map((issue, idx) => (
                                <View key={idx} style={[styles.card, { padding: 16, backgroundColor: theme.card, borderColor: theme.border }]}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ flex: 1, gap: 4 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                                <Text style={[styles.buildingName, { color: theme.text, fontSize: 16, marginBottom: 0 }]}>{issue.roomId}</Text>
                                                <View style={{ backgroundColor: issue.actionType === 'delete' ? theme.destructive + '22' : '#5856D622', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                                                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: issue.actionType === 'delete' ? theme.destructive : '#5856D6' }}>{issue.type.toUpperCase()}</Text>
                                                </View>
                                            </View>
                                            <Text style={[styles.roomInfo, { color: theme.text, fontSize: 13, marginBottom: 0 }]}>{issue.details}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                <Ionicons name="construct-outline" size={12} color={theme.subtext} />
                                                <Text style={{ color: theme.subtext, fontSize: 12, fontStyle: 'italic' }}>{issue.actionDescription}</Text>
                                            </View>
                                        </View>
                                        <Pressable
                                            onPress={() => fixIssue(issue)}
                                            style={({ pressed }) => [
                                                {
                                                    paddingHorizontal: 16,
                                                    paddingVertical: 8,
                                                    backgroundColor: issue.actionType === 'delete' ? theme.destructive + '15' : getStatusColor('system') + '15',
                                                    borderRadius: 8,
                                                    opacity: pressed ? 0.7 : 1
                                                }
                                            ]}
                                        >
                                            <Text style={{ color: issue.actionType === 'delete' ? theme.destructive : getStatusColor('system'), fontWeight: 'bold' }}>
                                                {issue.actionType === 'delete' ? 'DELETE' : issue.actionType === 'sync' ? 'SYNC' : 'FIX'}
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>
            );
        } else {
            const pageSubmissions = (groupedSubmissions as any)[status];

            content = (
                <>
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
                </>
            );
        }

        return (
            <View style={{ width: Platform.OS === 'web' ? '100%' : windowWidth, height: '100%' }}>
                {content}
            </View>
        );
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return '#FFCC00';
            case 'approved': return '#34C759';
            case 'rejected': return '#FF3B30';
            case 'system': return '#5856D6';
            default: return theme.primary;
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Header />
            <View style={{ flex: 1, marginTop: isDesktopWeb ? (bannerHeight + insets.top + 90) : (bannerHeight > 0 ? (bannerHeight + 75) : insets.top + 75) }}>
                {authLoading || (!isAdmin && !authLoading) ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={theme.primary} />
                    </View>
                ) : (
                    <>
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
                                scrollEnabled={!isSliding}
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
                    </>
                )}
            </View>
        </View>
    );
}

function createStyles(theme: Theme) {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        headerFloatingContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: theme.background,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
        headerTitle: {
            fontSize: 18,
            fontWeight: '600',
        },
        backButton: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
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
        sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
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
        value: {
            fontSize: 16,
            fontWeight: "600",
        },
        adminInput: {
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontSize: 16,
        },
        label: {
            fontSize: 14,
            fontWeight: '600',
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
        colorPreview: {
            width: 24,
            height: 24,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
        },
        sliderContainer: {
            height: 44,
            width: '100%',
            justifyContent: 'center',
            position: 'relative',
        },
        sliderTrack: {
            height: 12,
            borderRadius: 6,
            width: '100%',
        },
        sliderInteractive: {
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            zIndex: 2,
        },
        sliderThumb: {
            width: 28,
            height: 28,
            borderRadius: 14,
            borderWidth: 3,
            borderColor: '#fff',
            position: 'absolute',
            marginLeft: -14,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            elevation: 4,
        },
        presetButton: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 8,
            borderWidth: 1,
            gap: 6,
        },
        presetDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
        },
        presetText: {
            fontSize: 12,
            fontWeight: '600',
        },
    });
}

