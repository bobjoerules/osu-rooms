import { LinearGradient } from 'expo-linear-gradient';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import { db } from '../firebaseConfig';
import { Theme, useTheme } from '../theme';

type TemperatureDisplayProps = { itemId: string; width?: number };

export default function TemperatureDisplay({ itemId, width }: TemperatureDisplayProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [avg, setAvg] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [barWidth, setBarWidth] = useState<number>(0);

  useEffect(() => {
    const itemRef = doc(db, 'ratings', itemId);
    const unsub = onSnapshot(itemRef, (snap) => {
      const data = snap.data() as { avg?: number; count?: number } | undefined;
      setAvg(data?.avg ?? 0);
      setCount(data?.count ?? 0);
    });
    return unsub;
  }, [itemId]);

  const onLayout = (e: LayoutChangeEvent) => {
    setBarWidth(e.nativeEvent.layout.width);
  };

  // avg in [0..3], normalize to [0..1]
  const posPct = Math.max(0, Math.min(1, (avg - 1) / 2));
  const markerLeft = barWidth * posPct - 6; // center marker (12px wide)

  const computedWidthStyle = width ? { width } : undefined;

  return (
    <View style={styles.container}>
      <View style={[styles.barContainer, computedWidthStyle]} onLayout={onLayout}>
        <LinearGradient
          colors={["#3B82F6", "#10B981", "#EF4444"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bar}
        />
        <View style={[styles.marker, { left: isNaN(markerLeft) ? 0 : markerLeft }]} />
      </View>
      {/* Labels removed intentionally for a cleaner detailed view */}
      {/* Meta text intentionally hidden for temperature display */}
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: { alignItems: 'center', gap: 6 },
    barContainer: { position: 'relative', width: 180, height: 16, justifyContent: 'center' },
    bar: { height: 10, borderRadius: 6, width: '100%' },
    marker: {
      position: 'absolute',
      top: 2,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.card,
      borderWidth: 2,
      borderColor: theme.border,
    },
    labels: {
      width: 180,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    labelText: { fontSize: 11 },
    meta: { fontSize: 12 },
  });
}
