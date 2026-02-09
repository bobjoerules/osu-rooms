import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme';

type Props = {
    rating: number;
    max?: number;
    size?: number;
};

export default function StaticStarRating({ rating, max = 5, size = 16 }: Props) {
    const theme = useTheme();
    const activeStarColor = theme.starActive;
    const inactiveStarColor = theme.starInactive;

    return (
        <View style={styles.row}>
            {Array.from({ length: max }).map((_, i) => {
                const starIndex = i + 1;
                const fullStar = Math.floor(rating);
                const hasHalf = rating % 1 !== 0;
                const halfStarIndex = Math.floor(rating) + 1;

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
                    <View key={starIndex} style={styles.star}>
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
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row' },
    star: { paddingHorizontal: 4 },
});