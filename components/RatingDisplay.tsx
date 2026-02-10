import { FontAwesome } from '@expo/vector-icons';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from '../firebaseConfig';
import { Theme, useTheme } from '../theme';

export type RatingDisplayProps = {
  itemId: string;
  initialMax?: number;
  size?: number;
  showMetaText?: boolean;
  align?: 'center' | 'flex-start' | 'flex-end';
};

const ratingCache: Record<string, { avg: number; count: number }> = {};

export default function RatingDisplay({ itemId, initialMax = 5, size = 40, showMetaText = true, align = 'center' }: RatingDisplayProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [avg, setAvg] = useState<number>(() => ratingCache[itemId]?.avg ?? 0);
  const [count, setCount] = useState<number>(() => ratingCache[itemId]?.count ?? 0);

  if (!itemId) {
    return (
      <View style={[styles.wrapper, { alignItems: align }]}>
        <Text style={styles.error}>Invalid item ID</Text>
      </View>
    );
  }

  useEffect(() => {
    // Reset state immediately when itemId changes
    setAvg(ratingCache[itemId]?.avg ?? 0);
    setCount(ratingCache[itemId]?.count ?? 0);

    const itemRef = doc(db, 'ratings', itemId);
    const unsub = onSnapshot(itemRef, (snap) => {
      const data = snap.data() as { avg?: number; count?: number } | undefined;
      const newAvg = data?.avg ?? 0;
      const newCount = data?.count ?? 0;

      ratingCache[itemId] = { avg: newAvg, count: newCount };
      setAvg(newAvg);
      setCount(newCount);
    });
    return unsub;
  }, [itemId]);

  const activeStarColor = theme.starActive;
  const inactiveStarColor = theme.starInactive;

  return (
    <View style={[styles.wrapper, { alignItems: align }]}>
      <View style={styles.row}>
        {Array.from({ length: initialMax }).map((_, i) => {
          const starIndex = i + 1;
          const fullStar = Math.floor(avg);
          const hasHalf = avg % 1 !== 0;
          const halfStarIndex = Math.floor(avg) + 1;

          let starName: string = 'star-o';
          let showHalfOverlay = false;
          let baseColor = inactiveStarColor;

          if (starIndex <= fullStar) {
            starName = 'star';
            baseColor = activeStarColor;
          } else if (hasHalf && starIndex === halfStarIndex) {
            starName = 'star-o';
            showHalfOverlay = true;
            baseColor = inactiveStarColor;
          }

          return (
            <View key={starIndex} style={styles.starBtn}>
              <View>
                <FontAwesome
                  name={starName as any}
                  size={size}
                  color={baseColor}
                />
                {showHalfOverlay && (
                  <FontAwesome
                    name="star-half"
                    size={size}
                    color={activeStarColor}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  />
                )}
              </View>
            </View>
          );
        })}
      </View>
      {showMetaText && (
        <Text style={styles.meta}>
          {count > 0 ? `${avg.toFixed(1)} / ${initialMax} • ${count} ratings` : 'No ratings yet'}
        </Text>
      )}
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    wrapper: { alignItems: 'center', gap: 8 },
    row: { flexDirection: 'row' },
    starBtn: { paddingHorizontal: 4 },
    meta: { color: theme.subtext, fontSize: 14 },
    error: { color: theme.destructive, fontSize: 13 },
  });
}