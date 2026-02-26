import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../lib/AppContext';
import { useTheme } from '../theme';

export default function NotificationBanner() {
    const { bannerConfig, setBannerHeight } = useApp();
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const [headerHeight, setHeaderHeight] = React.useState(0);
    const heightAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (bannerConfig?.active && headerHeight > 0) {
            Animated.parallel([
                Animated.spring(heightAnim, {
                    toValue: headerHeight + (Platform.OS === 'web' ? (insets.bottom > 0 ? insets.bottom : 10) : 0),
                    useNativeDriver: false,
                    tension: 50,
                    friction: 8,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                })
            ]).start(() => {
                setBannerHeight(Platform.OS === 'web' ? 0 : headerHeight);
            });
        } else {
            Animated.parallel([
                Animated.timing(heightAnim, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                })
            ]).start(() => {
                setBannerHeight(0);
            });
        }
    }, [bannerConfig?.active, headerHeight, insets.bottom]);

    if (!bannerConfig && headerHeight === 0) return null;

    return (
        <>
            <View
                style={{
                    position: 'absolute',
                    top: -2000,
                    left: 0,
                    right: 0,
                    opacity: 0,
                    paddingHorizontal: 16,
                    paddingTop: Platform.OS === 'web' ? 10 : insets.top + 4,
                    paddingBottom: Platform.OS === 'web' ? (insets.bottom > 0 ? insets.bottom : 10) : 10,
                }}
                onLayout={(e) => {
                    const { height } = e.nativeEvent.layout;
                    if (height > 0 && Math.abs(height - headerHeight) > 1) {
                        setHeaderHeight(height);
                    }
                }}
                pointerEvents="none"
            >
                <View style={styles.content}>
                    <View style={[styles.iconContainer, { backgroundColor: (bannerConfig?.borderColor || theme.primary) + '22' }]}>
                        <Ionicons
                            name={bannerConfig?.icon as any || 'information-circle'}
                            size={24}
                            color={bannerConfig?.borderColor || theme.primary}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.title, { color: theme.text }]}>{bannerConfig?.title}</Text>
                        <Text style={[styles.description, { color: theme.subtext }]}>{bannerConfig?.description}</Text>
                    </View>
                </View>
            </View>

            <Animated.View
                style={[
                    styles.container,
                    {
                        height: heightAnim,
                        opacity: opacityAnim,
                        backgroundColor: theme.card,
                        overflow: 'hidden',
                        ...(Platform.OS === 'web'
                            ? { borderTopWidth: bannerConfig?.active ? 2 : 0, borderTopColor: bannerConfig?.borderColor || theme.primary }
                            : { borderBottomWidth: bannerConfig?.active ? 2 : 0, borderBottomColor: bannerConfig?.borderColor || theme.primary }
                        )
                    },
                ]}
            >
                <View
                    style={{
                        paddingTop: Platform.OS === 'web' ? 10 : insets.top + 4,
                        paddingBottom: Platform.OS === 'web' ? (insets.bottom > 0 ? insets.bottom : 10) : 10,
                        paddingHorizontal: 16,
                    }}
                >
                    <View style={styles.content}>
                        <View style={[styles.iconContainer, { backgroundColor: (bannerConfig?.borderColor || theme.primary) + '22' }]}>
                            <Ionicons
                                name={bannerConfig?.icon as any || 'information-circle'}
                                size={22}
                                color={bannerConfig?.borderColor || theme.primary}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={[styles.title, { color: theme.text, fontSize: 15 }]}>{bannerConfig?.title}</Text>
                            <Text style={[styles.description, { color: theme.subtext, fontSize: 12 }]} numberOfLines={2}>{bannerConfig?.description}</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Platform.OS === 'web' ? undefined : 0,
        bottom: Platform.OS === 'web' ? 0 : undefined,
        left: 0,
        right: 0,
        zIndex: 1000,
        ...Platform.select({
            web: {
                boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
            },
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
    },
    description: {
        fontSize: 13,
        marginTop: 2,
        lineHeight: 18,
    },
});
