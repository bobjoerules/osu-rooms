import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BuildingRating from '../../components/BuildingRating';
import RoomList from '../../components/RoomList';
import { BUILDINGS_DATA } from '../../data/rooms';
import { useHapticFeedback } from '../../lib/SettingsContext';
import { Theme, useTheme } from '../../theme';

export default function BuildingDetail() {
    const { buildingId } = useLocalSearchParams<{ buildingId: string }>();
    const router = useRouter();
    const theme = useTheme();
    const triggerHaptic = useHapticFeedback();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const isDesktopWeb = Platform.OS === 'web' && width >= 768;
    const styles = useMemo(() => createStyles(theme), [theme]);

    const building = useMemo(() =>
        BUILDINGS_DATA.find(b => b.id === buildingId),
        [buildingId]);

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
            <View style={[styles.headerFloatingContainer, { top: 0, left: 0, right: 0, height: insets.top + 75 }]}>
                <SafeAreaView edges={['top']}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => { triggerHaptic(); router.back(); }}
                            style={styles.backButton}
                        >
                            <Ionicons name="chevron-back" size={28} color={theme.text} />
                        </TouchableOpacity>
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
                    { paddingTop: insets.top + 80 }
                ]}
            >
                <View style={[isDesktopWeb ? styles.gridWrapper : undefined]}>
                    <RoomList rooms={building.rooms} />
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
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
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
        gridWrapper: {
            // RoomList internal implementation handles the list, 
            // but we might need to adjust RoomList itself to support grid layout
        }
    });
}
