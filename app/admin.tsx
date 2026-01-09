import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { collection, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../firebaseConfig';
import { useTheme } from '../theme';

interface Submission {
    id: string;
    building: string;
    roomNumber: string;
    roomType: string;
    capacity: string;
    imageUrl: string | null;
    userEmail: string;
    createdAt: any;
    status: string;
}

export default function AdminScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, 'submissions'),
            where('status', '==', 'pending'),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Submission[];
            setSubmissions(docs);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching submissions:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const handleAction = async (id: string, status: 'approved' | 'rejected') => {
        try {
            await updateDoc(doc(db, 'submissions', id), {
                status,
                reviewedAt: new Date(),
            });
            Alert.alert('Success', `Submission ${status}.`);
        } catch (error) {
            console.error(`Error ${status} submission:`, error);
            Alert.alert('Error', `Failed to ${status} submission.`);
        }
    };

    const renderItem = ({ item }: { item: Submission }) => (
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            {item.imageUrl && (
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                    contentFit="cover"
                />
            )}
            <View style={styles.cardInfo}>
                <Text style={[styles.buildingName, { color: theme.text }]}>{item.building}</Text>
                <Text style={[styles.roomInfo, { color: theme.subtext }]}>
                    Room {item.roomNumber} • {item.roomType}
                </Text>
                {item.capacity && (
                    <Text style={[styles.roomInfo, { color: theme.subtext }]}>
                        Capacity: {item.capacity}
                    </Text>
                )}
                <Text style={[styles.userEmail, { color: theme.subtext }]}>
                    Submitted by: {item.userEmail}
                </Text>

                <View style={styles.actions}>
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
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color={theme.text} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Review Submissions</Text>
                <View style={{ width: 40 }} />
            </View>

            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={theme.primary} />
                </View>
            ) : submissions.length === 0 ? (
                <View style={styles.centered}>
                    <Ionicons name="documents-outline" size={64} color={theme.subtext} style={{ marginBottom: 16 }} />
                    <Text style={[styles.emptyText, { color: theme.subtext }]}>No pending submissions</Text>
                </View>
            ) : (
                <FlatList
                    data={submissions}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
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
    image: {
        width: '100%',
        height: 200,
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
    actionText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
});
