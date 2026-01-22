import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BuildingRating from '../../components/BuildingRating';
import RoomList from '../../components/RoomList';
import { BUILDINGS_DATA } from '../../data/rooms';
import { useHapticFeedback, useSettings } from '../../lib/SettingsContext';
import { Theme, useTheme } from '../../theme';

const isPlaceholderImage = (imageUrl: string | undefined): boolean => {
    if (!imageUrl) return false;
    return imageUrl.includes('placeholder.png');
};

export default function BuildingDetail() {
    const { buildingId } = useLocalSearchParams<{ buildingId: string }>();
    const router = useRouter();
    const theme = useTheme();
    const { showPlaceholders } = useSettings();
    const triggerHaptic = useHapticFeedback();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const isDesktopWeb = Platform.OS === 'web' && width >= 768;
    const styles = useMemo(() => createStyles(theme), [theme]);

    const building = useMemo(() =>
        BUILDINGS_DATA.find(b => b.id === buildingId),
        [buildingId]);

    const filteredRooms = useMemo(() => {
        if (!building) return [];
        return building.rooms.filter(room => {
            const hasPhotos = room.images?.length > 0 && !isPlaceholderImage(room.images[0]);
            return showPlaceholders || hasPhotos;
        });
    }, [building, showPlaceholders]);

    if (!building) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.text }}>Building not found</Text>
                <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
                    <Text style={{ color: theme.primary }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {Platform.OS === 'web' && (
                <style>
                    {`
                        @media (min-width: 768px) {
                            [data-grid-item] {
                                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
                                border: 1px solid ${theme.border} !important;
                                background-color: ${theme.card} !important;
                            }
                            [data-grid-item]:hover {
                                transform: translateY(-6px) scale(1.01) !important;
                                box-shadow: 0 20px 40px rgba(0,0,0,0.12), 0 10px 10px rgba(0,0,0,0.06) !important;
                                z-index: 5;
                            }
                            [data-glass-header] {
                                backdrop-filter: blur(12px) !important;
                                -webkit-backdrop-filter: blur(12px) !important;
                                background-color: ${theme.background}cc !important;
                                border-bottom: 1px solid ${theme.border}44 !important;
                            }
                        }
                    `}
                </style>
            )}
            <View
                style={[styles.headerFloatingContainer, { top: 0, left: 0, right: isDesktopWeb ? 12 : 0, height: insets.top + (isDesktopWeb ? 85 : 75) }]}
                {...(isDesktopWeb ? { dataSet: { 'glass-header': 'true' } } : {})}
            >
                <SafeAreaView edges={['top']}>
                    <View style={[
                        styles.header,
                        isDesktopWeb && { maxWidth: 1200, alignSelf: 'center', width: '100%' },
                        { marginTop: isDesktopWeb ? 16 : 0, marginBottom: 10 }
                    ]}>
                        <Pressable
                            onPress={() => {
                                triggerHaptic();
                                if (router.canGoBack()) {
                                    router.back();
                                } else {
                                    router.push('/');
                                }
                            }}
                            style={styles.backButton}
                        >
                            <Ionicons name="chevron-back" size={28} color={theme.text} />
                        </Pressable>
                        <View style={styles.headerTitleContainer}>
                            <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>
                                {building.name}
                            </Text>
                            <BuildingRating roomIds={building.rooms.map(r => r.id)} />
                        </View>
                        <View style={{ width: 40 }} />
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingTop: insets.top + (isDesktopWeb ? 100 : 80) },
                    isDesktopWeb && { maxWidth: 1200, alignSelf: 'center', width: '100%' }
                ]}
            >
                <View style={[isDesktopWeb ? styles.gridWrapper : undefined]}>
                    <RoomList rooms={filteredRooms} />
                </View>
            </ScrollView>
        </View>
    );
}

function createStyles(theme: Theme) {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        headerFloatingContainer: {
            position: 'absolute',
            zIndex: 10,
            backgroundColor: theme.background,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
        backButton: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
        },
        headerTitleContainer: {
            flex: 1,
            alignItems: 'center',
        },
        headerTitle: {
            fontSize: 18,
            fontWeight: '600',
        },
        scrollContent: {
            paddingHorizontal: 16,
            paddingBottom: 40,
        },
    });
}
