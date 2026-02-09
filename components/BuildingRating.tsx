import { FontAwesome } from '@expo/vector-icons';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from '../firebaseConfig';
import { useTheme } from '../theme';

export type BuildingRatingProps = {
    roomIds: string[];
    size?: number;
    priority?: boolean;
    initialAvg?: number;
    initialCount?: number;
};

const ratingCache: Record<string, { avg: number; count: number }> = {};
const listeners: Record<string, number> = {};

export default function BuildingRating({ roomIds, size = 14, priority = false, initialAvg, initialCount }: BuildingRatingProps) {
    const theme = useTheme();
    const [roomRatings, setRoomRatings] = useState<Record<string, { avg: number; count: number }>>(() => {
        const initial: Record<string, { avg: number; count: number }> = {};
        roomIds.forEach(id => {
            if (ratingCache[id]) initial[id] = ratingCache[id];
        });
        return initial;
    });

    useEffect(() => {
        if (initialCount !== undefined && initialCount > 0) return;
        let isActive = true;
        const unsubs: (() => void)[] = [];

        const startListening = () => {
            if (!isActive) return;

            roomIds.forEach((id) => {
                const unsub = onSnapshot(doc(db, 'ratings', id), (snap) => {
                    if (!isActive) return;
                    const data = snap.data() as { avg?: number; count?: number } | undefined;
                    const rating = { avg: data?.avg ?? 0, count: data?.count ?? 0 };

                    ratingCache[id] = rating;

                    setRoomRatings((prev) => ({
                        ...prev,
                        [id]: rating,
                    }));
                });
                unsubs.push(unsub);
            });
        };

        const timer = priority ? null : setTimeout(startListening, 400);
        if (priority) startListening();

        return () => {
            isActive = false;
            if (timer) clearTimeout(timer);
            unsubs.forEach((u) => u());
        };
    }, [roomIds, priority]);

    const { avg, count } = useMemo(() => {
        if (initialCount !== undefined && initialCount > 0) {
            return { avg: initialAvg || 0, count: initialCount };
        }

        let totalScore = 0;
        let totalCount = 0;

        Object.values(roomRatings).forEach(r => {
            if (r.count > 0) {
                totalScore += r.avg * r.count;
                totalCount += r.count;
            }
        });

        return {
            avg: totalCount > 0 ? totalScore / totalCount : 0,
            count: totalCount
        };
    }, [roomRatings, initialAvg, initialCount]);

    return (
        <View style={styles.container}>
            <View style={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => {
                    const starIndex = i + 1;
                    const fullStar = Math.floor(avg);
                    const hasHalf = avg % 1 !== 0;
                    const halfStarIndex = Math.floor(avg) + 1;

                    let starName: string = 'star-o';
                    let showHalfOverlay = false;
                    let baseColor = theme.starInactive;

                    if (count > 0 && starIndex <= fullStar) {
                        starName = 'star';
                        baseColor = theme.starActive;
                    } else if (count > 0 && hasHalf && starIndex === halfStarIndex) {
                        starName = 'star-o';
                        showHalfOverlay = true;
                        baseColor = theme.starInactive;
                    }

                    return (
                        <View key={starIndex} style={styles.starWrapper}>
                            <FontAwesome name={starName as any} size={size} color={baseColor} />
                            {showHalfOverlay && (
                                <FontAwesome
                                    name="star-half"
                                    size={size}
                                    color={theme.starActive}
                                    style={styles.halfStar}
                                />
                            )}
                        </View>
                    );
                })}
            </View>
            <Text style={[styles.text, { color: theme.subtext }]}>
                {count > 0 ? `${avg.toFixed(1)}` : 'No ratings'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starWrapper: {
        paddingHorizontal: 0.5,
    },
    halfStar: {
        position: 'absolute',
        top: 0,
        left: 0.5,
    },
    text: {
        fontSize: 12,
        fontWeight: '500',
    },
});