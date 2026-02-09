import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Alert,
    FlatList,
    Linking,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { OSU_LINKS } from '../../data/osuLinks';
import { useHapticFeedback } from '../../lib/SettingsContext';
import { useTheme } from '../../theme';

export default function OsuScreen() {
    const theme = useTheme();
    const triggerHaptic = useHapticFeedback();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const isDesktopWeb = Platform.OS === 'web' && width >= 768;

    const handleOpenLink = async (item: typeof OSU_LINKS[0]) => {
        triggerHaptic();

        if (item.appScheme && Platform.OS !== 'web') {
            try {
                await Linking.openURL(item.appScheme);
                return;
            } catch (e) {
                console.log('Failed to open app scheme:', e);
            }
        }

        let targetUrl = item.url;
        if (Platform.OS === 'android' && item.androidUrl) {
            targetUrl = item.androidUrl;
        } else if (isDesktopWeb && item.websiteUrl) {
            targetUrl = item.websiteUrl;
        }

        try {
            await Linking.openURL(targetUrl);
        } catch (e) {
            Alert.alert('Error', 'Could not open the link.');
        }
    };

    let categorizedLinks: Record<string, typeof OSU_LINKS> = {};
    if (isDesktopWeb) {
        categorizedLinks['Websites'] = OSU_LINKS
            .filter(link => link.title !== 'OSU Rooms (Web)')
            .map(link => ({ ...link, category: 'Websites' }));
    } else {
        categorizedLinks = OSU_LINKS.reduce((acc, link) => {
            const cat = link.category;
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(link);
            return acc;
        }, {} as Record<string, typeof OSU_LINKS>);
    }

    const renderSection = (title: string, data: typeof OSU_LINKS, hideTitle?: boolean) => (
        <View style={styles.sectionContainer}>
            {!(hideTitle) && (
                <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
            )}
            <View style={[styles.sectionBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
                {data.map((item, index) => (
                    <Pressable
                        key={item.url}
                        style={({ pressed }) => [
                            styles.linkItem,
                            index !== data.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border },
                            pressed && { backgroundColor: theme.border + '33' }
                        ]}
                        onPress={() => handleOpenLink(item)}
                    >
                        <View style={[styles.iconBox, { backgroundColor: theme.primary + '15' }]}>
                            <Ionicons name={item.icon as any || 'link'} size={20} color={theme.primary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.linkLabel, { color: theme.text }]}>{item.title}</Text>
                            <Text style={[styles.linkUrl, { color: theme.subtext }]} numberOfLines={1}>
                                {isDesktopWeb && item.websiteUrl
                                    ? item.websiteUrl
                                    : (Platform.OS === 'android' && item.androidUrl)
                                        ? item.androidUrl
                                        : item.url}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.border} />
                    </Pressable>
                ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
            <View style={[
                styles.header,
                Platform.OS === 'web' && { paddingTop: 75 + 16 },
                isDesktopWeb && { width: '100%', maxWidth: 1200, alignSelf: 'center' }
            ]}>
                <Text style={[styles.title, { color: theme.text }]}>OSU Resources</Text>
                <Text style={[styles.subtitle, { color: theme.subtext }]}>Useful links/resources for students</Text>
            </View>

            <FlatList
                data={[]}
                renderItem={() => null}
                style={[{ flex: 1 }, isDesktopWeb && { width: '100%', maxWidth: 1200, alignSelf: 'center' }]}
                contentContainerStyle={[
                    styles.listContent,
                    { paddingBottom: insets.bottom + (Platform.OS === 'android' ? 80 : 24) }
                ]}
                ListHeaderComponent={
                    <View>
                        {categorizedLinks['Websites'] && categorizedLinks['Websites'].length > 0 && renderSection('Websites', categorizedLinks['Websites'], isDesktopWeb)}
                        {!isDesktopWeb && categorizedLinks['Apps'] && renderSection('Apps', categorizedLinks['Apps'])}
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        marginTop: 4,
    },
    listContent: {
        padding: 20,
        paddingTop: 0,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        marginLeft: 4,
    },
    sectionBox: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkLabel: {
        fontSize: 16,
        fontWeight: '600',
    },
    linkUrl: {
        fontSize: 12,
        marginTop: 2,
    },
});