import * as Haptics from 'expo-haptics';
import { useSegments } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useEffect, useRef } from 'react';
import { useHapticFeedback, useSettings } from '../../lib/SettingsContext';

export default function TabLayout() {
    const { useBetaFeatures, showSubmitTab, showDormTab, showReviewsTab } = useSettings();
    const triggerHaptic = useHapticFeedback();
    const segments = useSegments();
    const lastTab = useRef(segments[segments.length - 1]);

    useEffect(() => {
        const currentTab = segments[segments.length - 1];
        if (currentTab !== lastTab.current) {
            lastTab.current = currentTab;
            // Immediate haptic on tab/segment change
            triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
        }
    }, [segments, triggerHaptic]);


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
        showDormTab ? (
            <NativeTabs.Trigger key="dorm" name="dorm">
                <Label>Dorms</Label>
                <Icon sf="person.2.fill" drawable="ic_menu_allfriends" />
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