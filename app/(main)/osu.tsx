import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    Alert,
    FlatList,
    Linking,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    useWindowDimensions
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { OSU_LINKS, OsuLink } from '../../data/osuLinks';
import { useApp } from '../../lib/AppContext';
import { useHapticFeedback } from '../../lib/SettingsContext';
import { Theme, useTheme } from '../../theme';

export default function OsuScreen() {
    const theme = useTheme();
    const triggerHaptic = useHapticFeedback();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const { bannerHeight } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<'All' | 'Apps' | 'Websites'>('All');

    const isDesktopWeb = Platform.OS === 'web' && width >= 768;
    const styles = useMemo(() => createStyles(theme, isDesktopWeb, bannerHeight, insets), [theme, isDesktopWeb, bannerHeight, insets]);

    const handleOpenLink = async (item: OsuLink) => {
        triggerHaptic();

        if (item.appScheme && Platform.OS !== 'web') {
            try {
                await Linking.openURL(item.appScheme);
                return;
            } catch (e) {
                console.log('App not installed or scheme failed:', e);
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

    const filteredLinks = useMemo(() => {
        let links = OSU_LINKS;

        if (activeCategory !== 'All') {
            links = links.filter(link => link.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            links = links.filter(link =>
                link.title.toLowerCase().includes(query) ||
                link.category.toLowerCase().includes(query)
            );
        }

        return links;
    }, [searchQuery, activeCategory]);

    const categories: ('All' | 'Apps' | 'Websites')[] = ['All', 'Apps', 'Websites'];

    const numColumns = isDesktopWeb ? (width >= 1200 ? 3 : 2) : 1;

    const renderLinkItem = ({ item }: { item: OsuLink }) => (
        <Pressable
            style={({ pressed }) => [
                styles.linkCard,
                { backgroundColor: theme.card, borderColor: theme.border },
                pressed && { transform: [{ scale: 0.98 }], backgroundColor: theme.border + '22' }
            ]}
            onPress={() => handleOpenLink(item)}
        >
            <View style={[styles.iconContainer, { backgroundColor: theme.primary + '15' }]}>
                <Ionicons name={item.icon as any || 'link'} size={24} color={theme.primary} />
            </View>
            <View style={styles.linkInfo}>
                <View style={styles.linkHeader}>
                    <Text style={[styles.linkTitle, { color: theme.text }]} numberOfLines={1}>
                        {item.title}
                    </Text>
                    <View style={[styles.categoryBadge, { backgroundColor: theme.border + '33' }]}>
                        <Text style={[styles.categoryText, { color: theme.subtext }]}>
                            {item.category === 'Apps' ? 'App' : 'Web'}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.linkSubtext, { color: theme.subtext }]} numberOfLines={1}>
                    {isDesktopWeb && item.websiteUrl
                        ? item.websiteUrl.replace(/^https?:\/\//, '')
                        : (Platform.OS === 'android' && item.androidUrl)
                            ? 'Open in Play Store'
                            : item.url.replace(/^https?:\/\//, '')}
                </Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color={theme.subtext} style={styles.chevron} />
        </Pressable>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {Platform.OS === 'web' && (
                <style>
                    {`
                        @media (min-width: 768px) {
                            [data-glass-header] {
                                backdrop-filter: blur(12px) !important;
                                -webkit-backdrop-filter: blur(12px) !important;
                                background-color: ${theme.background}cc !important;
                                border-bottom: 1px solid ${theme.border}44 !important;
                            }
                            .link-card-hover:hover {
                                border-color: ${theme.primary}66 !important;
                                transform: translateY(-2px);
                                box-shadow: ${theme.boxShadow} !important;
                            }
                        }
                    `}
                </style>
            )}

            <View
                style={styles.headerContainer}
                {...(Platform.OS === 'web' ? { dataSet: { 'glass-header': 'true' } } : {})}
            >
                <SafeAreaView edges={['top']} style={{ paddingBottom: 0 }}>
                    <View style={styles.headerContent}>
                        <View>
                            <Text style={[styles.title, { color: theme.text }]}>OSU Resources</Text>
                            <Text style={[styles.subtitle, { color: theme.subtext }]}>Essential links for students</Text>
                        </View>
                    </View>

                    <View style={styles.searchAndFilter}>
                        <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
                            <Ionicons name="search" size={20} color={theme.subtext} />
                            <TextInput
                                style={[styles.searchInput, { color: theme.text }]}
                                placeholder="Search resources..."
                                placeholderTextColor={theme.placeholder}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoCapitalize="none"
                            />
                            {searchQuery.length > 0 && (
                                <Pressable onPress={() => setSearchQuery('')}>
                                    <Ionicons name="close-circle" size={20} color={theme.subtext} />
                                </Pressable>
                            )}
                        </View>

                        <View style={styles.categoryContainer}>
                            {categories.map((cat) => (
                                <Pressable
                                    key={cat}
                                    onPress={() => {
                                        triggerHaptic();
                                        setActiveCategory(cat);
                                    }}
                                    style={[
                                        styles.categoryChip,
                                        { backgroundColor: theme.card, borderColor: theme.border },
                                        activeCategory === cat && { backgroundColor: theme.primary, borderColor: theme.primary }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.categoryChipText,
                                            { color: theme.text },
                                            activeCategory === cat && { color: theme.buttonText, fontWeight: '700' }
                                        ]}
                                    >
                                        {cat}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            <FlatList
                data={filteredLinks}
                keyExtractor={(item) => item.url}
                renderItem={renderLinkItem}
                numColumns={numColumns}
                key={`${numColumns}`}
                contentContainerStyle={[
                    styles.listContent,
                    { paddingBottom: insets.bottom + 100 }
                ]}
                columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="search-outline" size={64} color={theme.border} />
                        <Text style={[styles.emptyText, { color: theme.subtext }]}>No resources found matching "{searchQuery}"</Text>
                    </View>
                }
            />
        </View>
    );
}

function createStyles(theme: Theme, isDesktopWeb: boolean, bannerHeight: number, insets: any) {
    const baseHeaderHeight = Platform.OS === 'web' ? 160 : 180;
    const topOffset = Platform.OS === 'web' ? 75 + bannerHeight : bannerHeight;

    return StyleSheet.create({
        container: {
            flex: 1,
        },
        headerContainer: {
            paddingTop: topOffset,
            zIndex: 10,
            width: '100%',
        },
        headerContent: {
            paddingHorizontal: 20,
            paddingVertical: 12,
            maxWidth: 1200,
            alignSelf: 'center',
            width: '100%',
        },
        title: {
            fontSize: 32,
            fontWeight: '800',
            letterSpacing: -0.5,
        },
        subtitle: {
            fontSize: 16,
            marginTop: 2,
        },
        searchAndFilter: {
            paddingHorizontal: 20,
            paddingBottom: 16,
            gap: 12,
            maxWidth: 1200,
            alignSelf: 'center',
            width: '100%',
        },
        searchBar: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderRadius: 14,
            borderWidth: 1,
            gap: 10,
        },
        searchInput: {
            flex: 1,
            fontSize: 16,
            padding: 0,
        },
        categoryContainer: {
            flexDirection: 'row',
            gap: 8,
        },
        categoryChip: {
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            borderWidth: 1,
        },
        categoryChipText: {
            fontSize: 14,
            fontWeight: '600',
        },
        listContent: {
            padding: 20,
            maxWidth: 1200,
            alignSelf: 'center',
            width: '100%',
        },
        columnWrapper: {
            gap: 16,
            justifyContent: 'flex-start',
        },
        linkCard: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderRadius: 18,
            borderWidth: 1,
            marginBottom: 12,
            gap: 16,
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                },
                android: {
                    elevation: 2,
                }
            }),
        },
        iconContainer: {
            width: 52,
            height: 52,
            borderRadius: 14,
            justifyContent: 'center',
            alignItems: 'center',
        },
        linkInfo: {
            flex: 1,
        },
        linkHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginBottom: 2,
        },
        linkTitle: {
            fontSize: 18,
            fontWeight: '700',
        },
        categoryBadge: {
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 6,
        },
        categoryText: {
            fontSize: 10,
            fontWeight: '800',
            textTransform: 'uppercase',
        },
        linkSubtext: {
            fontSize: 13,
        },
        chevron: {
            opacity: 0.5,
        },
        emptyState: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 60,
            gap: 16,
        },
        emptyText: {
            fontSize: 16,
            textAlign: 'center',
            maxWidth: 250,
        },
    });
}