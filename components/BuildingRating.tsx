import { FontAwesome } from '@expo/vector-icons';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from '../firebaseConfig';
import { useTheme } from '../theme';

export type BuildingRatingProps = {
    roomIds: string[];
    size?: number;
};

export default function BuildingRating({ roomIds, size = 14 }: BuildingRatingProps) {
    const theme = useTheme();
    const [roomRatings, setRoomRatings] = useState<Record<string, { avg: number; count: number }>>({});

    useEffect(() => {
        setRoomRatings({});
        const unsubs = roomIds.map((id) =>
            onSnapshot(doc(db, 'ratings', id), (snap) => {
                const data = snap.data() as { avg?: number; count?: number } | undefined;
                setRoomRatings((prev) => ({
                    ...prev,
                    [id]: { avg: data?.avg ?? 0, count: data?.count ?? 0 },
                }));
            })
        );
        return () => {
            unsubs.forEach((u) => u());
        };
    }, [roomIds]);

    const { avg, count } = useMemo(() => {
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
    }, [roomRatings]);

    if (count === 0) return null;

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

                    if (starIndex <= fullStar) {
                        starName = 'star';
                        baseColor = theme.starActive;
                    } else if (hasHalf && starIndex === halfStarIndex) {
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
                {avg.toFixed(1)} ({count})
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
