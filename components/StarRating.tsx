import { FontAwesome } from '@expo/vector-icons';
import {
  doc,
  onSnapshot,
  runTransaction,
  serverTimestamp
} from 'firebase/firestore';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { useHapticFeedback } from '../lib/SettingsContext';
import { Theme, useTheme } from '../theme';

export type StarRatingProps = {
  itemId: string;
  initialMax?: number;
  size?: number;
  showMetaText?: boolean;
  comment?: string;
  onCommentChange?: (comment: string) => void;
};

export default function StarRating({ itemId, initialMax = 5, size = 40, showMetaText = false, onCommentChange }: StarRatingProps) {
  const theme = useTheme();
  const triggerHaptic = useHapticFeedback();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [avg, setAvg] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [myRating, setMyRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [previewRating, setPreviewRating] = useState<number | null>(null);
  const slotWidthRef = useRef<number | null>(null);
  const rowHeightRef = useRef<number | null>(null);
  const lastPreviewRef = useRef<number | null>(null);
  const rowRef = useRef<View | null>(null);
  const rowBoxRef = useRef<{ x: number; y: number; width: number; height: number; ready: boolean }>({ x: 0, y: 0, width: 0, height: 0, ready: false });

  if (!itemId) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.error}>Invalid item ID</Text>
      </View>
    );
  }

  useEffect(() => {
    const itemRef = doc(db, 'ratings', itemId);
    const unsub = onSnapshot(itemRef, (snap) => {
      const data = snap.data() as { avg?: number; count?: number } | undefined;
      setAvg(data?.avg ?? 0);
      setCount(data?.count ?? 0);
    });
    return unsub;
  }, [itemId]);



  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setMyRating(0);
      return;
    }
    const userRef = doc(db, 'ratings', itemId, 'userRatings', user.uid);
    const unsub = onSnapshot(userRef, (snap) => {
      const data = snap.data() as { rating?: number } | undefined;
      setMyRating(data?.rating ?? 0);
    });
    return unsub;
  }, [itemId]);

  async function rate(value: number) {
    setError(null);
    const user = auth.currentUser;
    if (!user) {
      setError('Sign in to rate.');
      return;
    }

    if (!user.emailVerified) {
      setError('Please verify your email to rate rooms.');
      return;
    }

    const previousMyRating = myRating;
    const previousAvg = avg;
    const previousCount = count;

    setMyRating(value);

    let newOptimisticCount = count;
    let newOptimisticAvg = avg;

    if (previousMyRating > 0) {
      newOptimisticAvg = (avg * count - previousMyRating + value) / count;
    } else {
      newOptimisticCount = count + 1;
      newOptimisticAvg = (avg * count + value) / newOptimisticCount;
    }

    setAvg(newOptimisticAvg);
    setCount(newOptimisticCount);

    const itemRef = doc(db, 'ratings', itemId);
    const userRef = doc(db, 'ratings', itemId, 'userRatings', user.uid);

    try {
      await runTransaction(db, async (tx) => {
        const itemSnap = await tx.get(itemRef);
        const userSnap = await tx.get(userRef);
        const currentAvg = (itemSnap.exists() ? (itemSnap.data() as any).avg : 0) || 0;
        const currentCount = (itemSnap.exists() ? (itemSnap.data() as any).count : 0) || 0;
        const oldRating = userSnap.exists() ? (userSnap.data() as any).rating : null;

        let newCount = currentCount;
        let newAvg = currentAvg;
        if (oldRating == null) {
          newCount = currentCount + 1;
          newAvg = (currentAvg * currentCount + value) / newCount;
        } else {
          newAvg = (currentAvg * currentCount - oldRating + value) / currentCount;
        }

        tx.set(userRef, { rating: value, updatedAt: serverTimestamp() }, { merge: true });
        tx.set(
          itemRef,
          { avg: newAvg, count: newCount, updatedAt: serverTimestamp() },
          { merge: true }
        );
      });
    } catch {
      setError('Failed to save rating.');
      setMyRating(previousMyRating);
      setAvg(previousAvg);
      setCount(previousCount);
    }
  }

  const calculateRatingFromTouch = (pageX: number, pageY: number) => {
    const box = rowBoxRef.current;
    if (!box.ready || box.width <= 0) return null;
    const slotWidth = box.width / initialMax;
    const rowH = box.height;
    const relX = pageX - box.x;
    const relY = pageY - box.y;
    const verticalMargin = Math.min(8, rowH * 0.2);

    if (relY < -verticalMargin || relY > rowH + verticalMargin) {
      return null;
    }

    const unclampedIndex = Math.ceil(relX / slotWidth);
    const starIndex = Math.min(initialMax, Math.max(1, unclampedIndex));

    if (starIndex >= 1 && starIndex <= initialMax) {
      const starStartX = (starIndex - 1) * slotWidth;
      const positionInStar = relX - starStartX;
      const half = slotWidth / 2;
      const deadzone = Math.min(8, slotWidth * 0.12);
      const isLeftHalf = positionInStar < half;

      const last = lastPreviewRef.current;
      if (last !== null) {
        const lastIsHalf = last % 1 !== 0;
        const lastStar = lastIsHalf ? Math.ceil(last) : last;
        if (lastStar === starIndex && Math.abs(positionInStar - half) <= deadzone) {
          return last;
        }
      }

      const rating = isLeftHalf ? starIndex - 0.5 : starIndex;
      return Math.max(0.5, Math.min(rating, initialMax));
    }
    return null;
  };

  const handleDragStart = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;

    if (rowRef.current) {
      rowRef.current.measure((x, y, width, height, px, py) => {
        rowBoxRef.current = { x: px, y: py, width, height, ready: true };
        rowHeightRef.current = height;
        slotWidthRef.current = width / initialMax;

        const rating = calculateRatingFromTouch(pageX, pageY);
        if (rating !== null) {
          setPreviewRating(rating);
          lastPreviewRef.current = rating;
        }
      });
    }
  };

  const handleDragMove = (event: any) => {
    if (event.nativeEvent.touches.length > 1) {
      return;
    }

    const { pageX, pageY } = event.nativeEvent;
    const rating = calculateRatingFromTouch(pageX, pageY);
    if (rating !== null && rating !== lastPreviewRef.current) {
      triggerHaptic();
      setPreviewRating(rating);
      lastPreviewRef.current = rating;
    }
  };

  const handleDragEnd = async () => {
    if (lastPreviewRef.current !== null) {
      triggerHaptic();
      await rate(lastPreviewRef.current);
    }
    setPreviewRating(null);
    lastPreviewRef.current = null;
  };

  const displayRating = previewRating !== null ? previewRating : myRating;
  const activeStarColor = theme.starActive;
  const inactiveStarColor = theme.starInactive;

  return (
    <View style={styles.wrapper} collapsable={false}>
      <View
        ref={rowRef}
        collapsable={false}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
        onResponderGrant={handleDragStart}
        onResponderMove={handleDragMove}
        onResponderRelease={handleDragEnd}
        onLayout={() => {
          if (!rowRef.current) return;
          rowRef.current.measure((x, y, width, height, pageX, pageY) => {
            rowHeightRef.current = height;
            slotWidthRef.current = width / initialMax;
            rowBoxRef.current = { x: pageX, y: pageY, width, height, ready: true };
          });
        }}
        style={styles.row}
      >
        {Array.from({ length: initialMax }).map((_, i) => {
          const starIndex = i + 1;
          const fullStar = Math.floor(displayRating);
          const hasHalf = displayRating % 1 !== 0;
          const halfStarIndex = Math.floor(displayRating) + 1;

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

          const handleStarPress = (event: any) => {
            const touchX = event.nativeEvent.locationX;
            const isLeftHalf = touchX < (size + 8) / 2;
            const rating = isLeftHalf ? starIndex - 0.5 : starIndex;
            rate(rating);
          };

          return (
            <View
              key={starIndex}
              style={styles.starBtn}
            >
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
      {error && <Text style={styles.error}>{error}</Text>}
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