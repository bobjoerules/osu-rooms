import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collectionGroup, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import StaticStarRating from '../../components/StaticStarRating';
import { db } from '../../firebaseConfig';
import { useBuildings } from '../../lib/DatabaseContext';
import { useHapticFeedback } from '../../lib/SettingsContext';
import { useUser } from '../../lib/UserContext';
import { Theme, useTheme } from '../../theme';

interface UserReview {
    id: string;
    itemId: string;
    rating: number;
    comment: string;
    updatedAt: any;
    roomName?: string;
    buildingName?: string;
}

export default function ReviewsScreen() {
    const theme = useTheme();
    const router = useRouter();
    const { user, loading: userLoading } = useUser();
    const { getRoomById, loading: dbLoading } = useBuildings();
    const triggerHaptic = useHapticFeedback();
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const isDesktopWeb = Platform.OS === 'web' && width >= 768;
    const styles = useMemo(() => createStyles(theme, isDesktopWeb), [theme, isDesktopWeb]);

    const [reviews, setReviews] = useState<UserReview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const q = query(
            collectionGroup(db, 'userRatings'),
            where('userId', '==', user.uid),
            orderBy('updatedAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedReviews: UserReview[] = snapshot.docs.map(doc => {
                const data = doc.data();
                const parentId = doc.ref.parent.parent?.id; // The itemId/roomId from 'ratings/{itemId}/userRatings/{userId}'

                return {
                    id: doc.id,
                    itemId: parentId || '',
                    rating: data.rating,
                    comment: data.comment || '',
                    updatedAt: data.updatedAt,
                };
            });

            // Filter for only main room ratings (those that correspond to a real room)
            // and maybe filter out those without a rating OR comment if we want to be strict.
            // But usually every userRating doc has at least a rating or a comment.

            const processedReviews = fetchedReviews
                .map(review => {
                    const roomInfo = getRoomById(review.itemId);
                    if (roomInfo) {
                        return {
                            ...review,
                            roomName: roomInfo.room.id.split('-').pop() || '???',
                            buildingName: roomInfo.buildingName
                        };
                    }
                    return review;
                })
                .filter(review => review.roomName); // Only show reviews for recognized rooms

            setReviews(processedReviews);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching user reviews:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, [user, getRoomById]);

    const renderReviewItem = ({ item }: { item: UserReview }) => (
        <Pressable
            style={({ pressed }) => [
                styles.reviewCard,
                { backgroundColor: theme.card, borderColor: theme.border },
                pressed && { opacity: 0.7 }
            ]}
            onPress={() => {
                triggerHaptic();
                router.push(`/room/${item.itemId}` as any);
            }}
        >
            <View style={styles.reviewHeader}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.roomName, { color: theme.text }]}>
                        {/^[A-Za-z\s]+$/.test(item.roomName || '') ? item.roomName : `Room ${item.roomName}`}
                    </Text>
                    <Text style={[styles.buildingName, { color: theme.subtext }]}>{item.buildingName}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <StaticStarRating rating={item.rating || 0} size={16} />
                    <Text style={[styles.dateText, { color: theme.subtext }]}>
                        {item.updatedAt?.toDate() ? new Date(item.updatedAt.toDate()).toLocaleDateString() : ''}
                    </Text>
                </View>
            </View>
            {item.comment ? (
                <Text style={[styles.commentText, { color: theme.text }]} numberOfLines={3}>
                    {item.comment}
                </Text>
            ) : (
                <Text style={[styles.noCommentText, { color: theme.subtext }]}>No text review provided</Text>
            )}
        </Pressable>
    );

    if (userLoading || loading || dbLoading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    if (!user) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={[styles.content, styles.centered]}>
                    <Ionicons name="person-circle-outline" size={64} color={theme.subtext} />
                    <Text style={[styles.emptyTitle, { color: theme.text }]}>Sign in to view your reviews</Text>
                    <Text style={[styles.emptySubtitle, { color: theme.subtext }]}>
                        Your ratings and reviews will appear here once you've made some.
                    </Text>
                    <Pressable
                        style={[styles.button, { backgroundColor: theme.primary }]}
                        onPress={() => {
                            triggerHaptic();
                            router.push('/account' as any);
                        }}
                    >
                        <Text style={styles.buttonText}>Go to Account</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }


    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={[
                styles.header,
                isDesktopWeb && { width: '100%', maxWidth: 1200, alignSelf: 'center' }
            ]}>
                <Text style={[styles.title, { color: theme.text }]}>Your Reviews</Text>
                <Text style={[styles.subtitle, { color: theme.subtext }]}>
                    {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} shared
                </Text>
            </View>
            <FlatList
                data={reviews}
                renderItem={renderReviewItem}
                keyExtractor={(item) => item.itemId}
                style={[{ flex: 1 }, isDesktopWeb && { width: '100%', maxWidth: 1200, alignSelf: 'center' }]}
                contentContainerStyle={[
                    styles.listContent,
                    { paddingBottom: Math.max(insets.bottom, 20) + 80 }
                ]}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="star-outline" size={64} color={theme.subtext} />
                        <Text style={[styles.emptyTitle, { color: theme.text }]}>No reviews yet</Text>
                        <Text style={[styles.emptySubtitle, { color: theme.subtext }]}>
                            Start rating rooms to see your contributions here!
                        </Text>
                        <Pressable
                            style={[styles.button, { backgroundColor: theme.primary }]}
                            onPress={() => {
                                triggerHaptic();
                                router.push('/' as any);
                            }}
                        >
                            <Text style={styles.buttonText}>Explore Rooms</Text>
                        </Pressable>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

function createStyles(theme: Theme, isDesktopWeb: boolean) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        centered: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        content: {
            flex: 1,
            width: '100%',
            maxWidth: isDesktopWeb ? 600 : '100%',
            alignSelf: 'center',
        },
        header: {
            paddingHorizontal: 20,
            paddingVertical: 16,
            backgroundColor: theme.background,
            ...(Platform.OS === 'web' && { paddingTop: 75 + 16 }),
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
        },
        subtitle: {
            fontSize: 14,
            marginTop: 4,
        },
        listContent: {
            padding: 16,
            maxWidth: isDesktopWeb ? 800 : '100%',
            alignSelf: 'center',
            width: '100%',
        },
        reviewCard: {
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
        },
        reviewHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 12,
        },
        roomName: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        buildingName: {
            fontSize: 14,
            marginTop: 2,
        },
        ratingContainer: {
            alignItems: 'flex-end',
            gap: 4,
        },
        dateText: {
            fontSize: 12,
        },
        commentText: {
            fontSize: 15,
            lineHeight: 20,
            marginBottom: 12,
        },
        noCommentText: {
            fontSize: 14,
            fontStyle: 'italic',
            marginBottom: 12,
        },
        footer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderTopWidth: 1,
            borderTopColor: theme.border + '22',
            paddingTop: 12,
        },
        viewMore: {
            fontSize: 14,
            fontWeight: '600',
            marginRight: 4,
        },
        emptyContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 100,
            paddingHorizontal: 40,
        },
        emptyTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 16,
            textAlign: 'center',
        },
        emptySubtitle: {
            fontSize: 16,
            marginTop: 8,
            textAlign: 'center',
            marginBottom: 24,
        },
        button: {
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 12,
            elevation: 2,
        },
        buttonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
        },
    });
}
