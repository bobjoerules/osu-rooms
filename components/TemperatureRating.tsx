import { LinearGradient } from 'expo-linear-gradient';
import { doc, onSnapshot, runTransaction, serverTimestamp, getDoc } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { useHapticFeedback } from '../lib/SettingsContext';
import { Theme, useTheme } from '../theme';

type TemperatureValue = 1 | 2 | 3; // 1=cold, 2=just right, 3=hot
type TemperatureRatingProps = { itemId: string; width?: number };

export default function TemperatureRating({ itemId, width }: TemperatureRatingProps) {
  const theme = useTheme();
  const triggerHaptic = useHapticFeedback();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [avg, setAvg] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [myValue, setMyValue] = useState<TemperatureValue | 0>(0);
  const [error, setError] = useState<string | null>(null);

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
      setMyValue(0);
      return;
    }
    const userRef = doc(db, 'ratings', itemId, 'userRatings', user.uid);
    const unsub = onSnapshot(userRef, (snap) => {
      const data = snap.data() as { rating?: number } | undefined;
      const r = data?.rating ?? 0;
      if (r === 1 || r === 2 || r === 3) setMyValue(r as TemperatureValue);
      else setMyValue(0);
    });
    return unsub;
  }, [itemId]);

  async function rate(value: TemperatureValue) {
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

    const prevMy = myValue;
    const prevAvg = avg;
    const prevCount = count;

    // Optimistic update
    setMyValue(value);
    let newCount = count;
    let newAvg = avg;
    if (prevMy) {
      newAvg = (avg * count - prevMy + value) / Math.max(1, count);
    } else {
      newCount = count + 1;
      newAvg = (avg * count + value) / newCount;
    }
    setAvg(newAvg);
    setCount(newCount);

    // Check if user is test account
    let isTestAccount = false;
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().role === 'test') {
        isTestAccount = true;
      }
    } catch (e) {
      console.error('Error checking user role:', e);
    }

    // Skip Firebase write if test account
    if (isTestAccount) {
      triggerHaptic();
      return;
    }

    const itemRef = doc(db, 'ratings', itemId);
    const userRef = doc(db, 'ratings', itemId, 'userRatings', user.uid);
    try {
      await runTransaction(db, async (tx) => {
        const itemSnap = await tx.get(itemRef);
        const userSnap = await tx.get(userRef);
        const currentAvg = (itemSnap.exists() ? (itemSnap.data() as any).avg : 0) || 0;
        const currentCount = (itemSnap.exists() ? (itemSnap.data() as any).count : 0) || 0;
        const oldRating = userSnap.exists() ? (userSnap.data() as any).rating : null;

        let txCount = currentCount;
        let txAvg = currentAvg;
        if (oldRating == null) {
          txCount = currentCount + 1;
          txAvg = (currentAvg * currentCount + value) / txCount;
        } else {
          txAvg = (currentAvg * currentCount - oldRating + value) / Math.max(1, currentCount);
        }

        tx.set(userRef, { rating: value, updatedAt: serverTimestamp() }, { merge: true });
        tx.set(itemRef, { avg: txAvg, count: txCount, updatedAt: serverTimestamp() }, { merge: true });
      });
      triggerHaptic();
    } catch (e) {
      setError('Failed to save rating.');
      setMyValue(prevMy);
      setAvg(prevAvg);
      setCount(prevCount);
    }
  }

  const options: Array<{ label: string; value: TemperatureValue }> = [
    { label: 'Cold', value: 1 },
    { label: 'Just right', value: 2 },
    { label: 'Hot', value: 3 },
  ];

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={["#3B82F6", "#10B981", "#EF4444"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradient,
          width ? { width, alignSelf: 'center' } : { width: '100%', alignSelf: 'stretch' },
        ]}
      >
        <View style={styles.segmentRow}>
          {options.map((opt) => (
            <Pressable
              key={opt.value}
              style={[styles.segment, myValue === opt.value && styles.segmentActive]}
              onPress={() => rate(opt.value)}
            >
              <Text style={styles.segmentText}>{opt.label}</Text>
            </Pressable>
          ))}
        </View>
      </LinearGradient>
      {/* Meta text intentionally hidden for temperature rating */}
      {error && <Text style={[styles.error]}>{error}</Text>}
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    wrapper: { alignItems: 'center', gap: 8 },
    gradient: {
      width: '100%',
      borderRadius: 12,
      padding: 2,
    },
    segmentRow: {
      flexDirection: 'row',
      overflow: 'hidden',
      borderRadius: 10,
      backgroundColor: 'transparent',
    },
    segment: {
      flex: 1,
      paddingVertical: Platform.OS === 'web' ? 10 : 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00000022',
    },
    segmentActive: {
      backgroundColor: '#00000055',
    },
    segmentText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 14,
    },
    meta: { fontSize: 13 },
    error: { color: theme.destructive, fontSize: 13 },
  });
}
