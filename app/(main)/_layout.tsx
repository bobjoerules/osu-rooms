import * as Haptics from 'expo-haptics';
import { Tabs, useSegments } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import CustomTabBar from '../../components/CustomTabBar';
import { useHapticFeedback, useSettings } from '../../lib/SettingsContext';

export default function TabLayout() {
    const { useBetaFeatures, showSubmitTab, showReviewsTab } = useSettings();
    const triggerHaptic = useHapticFeedback();
    const segments = useSegments();
    const lastTab = useRef(segments[segments.length - 1]);

    useEffect(() => {
        const currentTab = segments[segments.length - 1];
        if (currentTab !== lastTab.current) {
            lastTab.current = currentTab;
            triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
        }
    }, [segments, triggerHaptic]);

    if (Platform.OS === 'android') {
        return (
            <Tabs
                screenOptions={{
                    headerShown: false,
                }}
                tabBar={() => <CustomTabBar />}
            >
                <Tabs.Screen name="index" />
                <Tabs.Screen name="add" />
                <Tabs.Screen name="osu" />
                <Tabs.Screen name="reviews" />
                <Tabs.Screen name="account" />
            </Tabs>
        );
    }

    const triggers = [
        <NativeTabs.Trigger key="index" name="index">
            <Label>Rooms</Label>
            <Icon sf="square.grid.2x2.fill" drawable="ic_menu_home" />
        </NativeTabs.Trigger>,
        showSubmitTab ? (
            <NativeTabs.Trigger key="add" name="add">
                <Label>Add/Edit</Label>
                <Icon sf="plus.circle.fill" drawable="ic_input_add" />
            </NativeTabs.Trigger>
        ) : null,
        useBetaFeatures ? (
            <NativeTabs.Trigger key="osu" name="osu">
                <Label>OSU</Label>
                <Icon sf="link" drawable="ic_menu_share" />
            </NativeTabs.Trigger>
        ) : null,
        showReviewsTab ? (
            <NativeTabs.Trigger key="reviews" name="reviews">
                <Label>Reviews</Label>
                <Icon sf="star.bubble.fill" drawable="ic_menu_edit" />
            </NativeTabs.Trigger>
        ) : null,
        <NativeTabs.Trigger key="account" name="account">
            <Label>Account</Label>
            <Icon sf="person.fill" drawable="ic_menu_allfriends" />
        </NativeTabs.Trigger>
    ].filter(Boolean);

    return (
        <NativeTabs tintColor="#D73F09">
            {triggers}
        </NativeTabs>
    );
}