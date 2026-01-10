import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
    return (
        <NativeTabs
            tintColor="#D73F09">
            <NativeTabs.Trigger name="submit">
                <Label>Add Room</Label>
                <Icon sf="plus.circle.fill" drawable="ic_input_add" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="index">
                <Label>Rooms</Label>
                <Icon sf="square.grid.2x2.fill" drawable="ic_menu_home" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="account">
                <Label>Account</Label>
                <Icon sf="person.fill" drawable="ic_menu_allfriends" />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
