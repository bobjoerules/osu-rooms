import * as Haptics from 'expo-haptics';
import { usePathname } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useLayoutEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { useHapticFeedback, useSettings } from '../../lib/SettingsContext';

export default function TabLayout() {
    const pathname = usePathname();
    const triggerHaptic = useHapticFeedback();
    const { useBetaFeatures, showSubmitTab } = useSettings();
    const lastPathname = useRef<string | null>(null);

    useLayoutEffect(() => {
        if (lastPathname.current !== null && pathname !== lastPathname.current) {
            triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
        }
        lastPathname.current = pathname;
    }, [pathname, triggerHaptic]);

    if (useBetaFeatures) {
        return (
            <>
                {Platform.OS === 'web' && <style>{``}</style>}
                <NativeTabs tintColor="#D73F09">
                    <NativeTabs.Trigger name="index">
                        <Label>Rooms</Label>
                        <Icon sf="square.grid.2x2.fill" drawable="ic_menu_home" />
                    </NativeTabs.Trigger>
                    {showSubmitTab && (
                        <NativeTabs.Trigger name="submit">
                            <Label>Add Room</Label>
                            <Icon sf="plus.circle.fill" drawable="ic_input_add" />
                        </NativeTabs.Trigger>
                    )}
                    <NativeTabs.Trigger name="osu">
                        <Label>OSU</Label>
                        <Icon sf="link" drawable="ic_menu_share" />
                    </NativeTabs.Trigger>
                    <NativeTabs.Trigger name="account">
                        <Label>Account</Label>
                        <Icon sf="person.fill" drawable="ic_menu_allfriends" />
                    </NativeTabs.Trigger>
                </NativeTabs>
            </>
        );
    }

    return (
        <>
            {Platform.OS === 'web' && <style>{``}</style>}
            <NativeTabs tintColor="#D73F09">
                <NativeTabs.Trigger name="index">
                    <Label>Rooms</Label>
                    <Icon sf="square.grid.2x2.fill" drawable="ic_menu_home" />
                </NativeTabs.Trigger>
                {showSubmitTab && (
                    <NativeTabs.Trigger name="submit">
                        <Label>Add Room</Label>
                        <Icon sf="plus.circle.fill" drawable="ic_input_add" />
                    </NativeTabs.Trigger>
                )}
                <NativeTabs.Trigger name="account">
                    <Label>Account</Label>
                    <Icon sf="person.fill" drawable="ic_menu_allfriends" />
                </NativeTabs.Trigger>
            </NativeTabs>
        </>
    );
}
