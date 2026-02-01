import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useSettings } from '../../lib/SettingsContext';

export default function TabLayout() {
    const { useBetaFeatures, showSubmitTab } = useSettings();


    const triggers = [
        <NativeTabs.Trigger key="index" name="index">
            <Label>Rooms</Label>
            <Icon sf="square.grid.2x2.fill" drawable="ic_menu_home" />
        </NativeTabs.Trigger>,
        showSubmitTab ? (
            <NativeTabs.Trigger key="submit" name="submit">
                <Label>Add Room</Label>
                <Icon sf="plus.circle.fill" drawable="ic_input_add" />
            </NativeTabs.Trigger>
        ) : null,
        useBetaFeatures ? (
            <NativeTabs.Trigger key="osu" name="osu">
                <Label>OSU</Label>
                <Icon sf="link" drawable="ic_menu_share" />
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
