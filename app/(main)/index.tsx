import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AccordionItem } from '../../components/Accordion';
import BuildingRating from '../../components/BuildingRating';
import RoomList from '../../components/RoomList';
import { Building, firebaseImage } from '../../data/rooms';
import { useBuildings } from '../../lib/DatabaseContext';
import { useHapticFeedback, useSettings } from '../../lib/SettingsContext';
import { useUser } from '../../lib/UserContext';
import { Theme, useTheme } from '../../theme';

const isPlaceholderImage = (imageUrl: string | undefined): boolean => {
  if (!imageUrl) return false;
  return imageUrl.includes('placeholder.png');
};

const BuildingListItem = React.memo(({
  item,
  index,
  isExpanded,
  onPress,
  isDesktopWeb,
  isSearching,
  showBuildingImages,
  theme,
  styles,
  allRoomIds,
  buildingImage,
  isAdmin
}: {
  item: Building,
  index: number,
  isExpanded: boolean,
  onPress: (id: string, index: number) => void,
  isDesktopWeb: boolean,
  isSearching: boolean,
  showBuildingImages: boolean,
  theme: Theme,
  styles: any,
  allRoomIds?: string[],
  buildingImage?: any,
  isAdmin: boolean
}) => {
  const hasValidImage = buildingImage && !isPlaceholderImage(buildingImage);

  const title = (
    <View style={{ flex: 1 }}>
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
      <BuildingRating
        roomIds={allRoomIds || item.rooms.map(r => r.id)}
        initialAvg={item.avgRating}
        initialCount={item.count}
      />
    </View>
  );

  const content = (isDesktopWeb && !isSearching) ? null : <RoomList rooms={item.rooms} isAdmin={isAdmin} />;

  return (
    <View style={isDesktopWeb ? (isSearching ? styles.listItemFullWidth : styles.gridItem) : undefined}>
      <AccordionItem
        title={title}
        isExpanded={isExpanded}
        onPress={() => {
          onPress(item.id, index);
          return false;
        }}
        image={buildingImage}
        showImage={showBuildingImages && hasValidImage}
        containerStyle={[
          styles.itemContainer,
          { marginVertical: isDesktopWeb ? 0 : 8 }
        ]}
      >
        {content}
      </AccordionItem>
    </View>
  );
});

export default function Index() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { showPlaceholders, showBuildingImages, lowPowerMode } = useSettings();
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= 768;
  const triggerHaptic = useHapticFeedback();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const expandedRef = useRef<Record<string, boolean>>({});
  const flatListRef = useRef<FlatList>(null);
  const { buildings, loading } = useBuildings();
  useEffect(() => {
    if (!loading && buildings.length > 0) {
      buildings.forEach(b => {
        const img = b.rooms?.[0]?.images?.[0];
        const target = b.images?.[0] || img;
        if (target && typeof target === 'string' && target.startsWith('http')) {
          Image.prefetch(target);
        }
      });
    }
  }, [loading, buildings]);
  const { isAdmin } = useUser();
  const headerHeight = Platform.OS === 'ios' ? 60 : 75;

  const handleBuildingPress = useCallback((id: string, index: number) => {
    triggerHaptic();
    const isSearching = deferredSearchQuery.trim().length > 0;
    if (isDesktopWeb && !isSearching) {
      router.push(`/building/${id}`);
      return;
    }

    setExpandedIds(prev => {
      const currentlyExpanded = prev[id];
      const newState = {
        ...prev,
        [id]: !currentlyExpanded
      };
      expandedRef.current = newState;

      if (!currentlyExpanded && !isDesktopWeb) {
        const headerOffset = Platform.OS === 'web'
          ? insets.top + headerHeight + 75 + (width < 768 ? 8 : 16)
          : insets.top + headerHeight;

        requestAnimationFrame(() => {
          flatListRef.current?.scrollToIndex({
            index,
            viewPosition: 0,
            viewOffset: headerOffset,
            animated: true,
          });
        });
      }

      return newState;
    });
  }, [isDesktopWeb, router, triggerHaptic, deferredSearchQuery, insets.top, headerHeight, width]);

  const searchableBuildings = useMemo(() => {
    return buildings.map(b => ({
      ...b,
      lowerName: b.name.toLowerCase(),
      roomNames: b.rooms.map(r => ({
        id: r.id,
        lowerName: (r.id.split('-').pop() || '').toLowerCase(),
        isHidden: !!r.isHidden,
        hasPhotos: r.images?.length > 0 && !isPlaceholderImage(r.images?.[0]),
        aliases: (r.searchAliases || []).map(a => a.toLowerCase())
      }))
    }));
  }, [buildings]);

  const filteredBuildings = useMemo(() => {
    const isSearching = deferredSearchQuery.trim().length > 0;
    const lowerQuery = deferredSearchQuery.toLowerCase();

    const filtered = searchableBuildings.reduce<any[]>((acc, b) => {
      const isHiddenByDefault = b.id === 'backrooms';
      if (!isSearching && isHiddenByDefault) return acc;

      const buildingNameMatch = b.lowerName.includes(lowerQuery);

      const matchingRooms = b.roomNames.filter(rn => {
        if (rn.isHidden && !isAdmin) return false;

        if (isSearching) {
          const nameMatch = rn.lowerName.includes(lowerQuery);
          const aliasMatch = rn.aliases.some(a => a.includes(lowerQuery));
          return nameMatch || aliasMatch;
        }

        return showPlaceholders || rn.hasPhotos;
      });

      if (isSearching) {
        if (matchingRooms.length > 0) {
          acc.push({ ...b, rooms: b.rooms.filter(r => matchingRooms.some(m => m.id === r.id)) });
        } else if (buildingNameMatch) {
          acc.push(b);
        }
      } else if (matchingRooms.length > 0) {
        acc.push({ ...b, rooms: b.rooms.filter(r => matchingRooms.some(m => m.id === r.id)) });
      }

      return acc;
    }, []);

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [deferredSearchQuery, showPlaceholders, searchableBuildings, isAdmin]);

  const renderItem = useCallback(({ item, index }: { item: any, index: number }) => {
    const isSearching = searchQuery.trim().length > 0;
    const buildingImage = item.images?.[0];
    const resolvedImage = typeof buildingImage === 'string' && !buildingImage.startsWith('http')
      ? firebaseImage(buildingImage)
      : buildingImage;

    return (
      <BuildingListItem
        item={item}
        index={index}
        isExpanded={isSearching || !!expandedRef.current[item.id]}
        onPress={handleBuildingPress}
        isDesktopWeb={isDesktopWeb}
        isSearching={isSearching}
        showBuildingImages={showBuildingImages}
        theme={theme}
        styles={styles}
        allRoomIds={item.allRoomIds}
        buildingImage={resolvedImage}
        isAdmin={isAdmin}
      />
    );
  }, [isDesktopWeb, searchQuery, handleBuildingPress, showBuildingImages, theme, styles, isAdmin]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const isSearching = searchQuery.trim().length > 0;
  const calculatedColumns = useMemo(() => {
    if (!isDesktopWeb || isSearching) return 1;
    if (width >= 2400) return 6;
    if (width >= 2000) return 5;
    if (width >= 1600) return 4;
    return 3;
  }, [isDesktopWeb, isSearching, width]);

  const calculatedMaxWidth = useMemo(() => {
    if (!isDesktopWeb) return undefined;
    if (width >= 2400) return 2400;
    if (width >= 2000) return 2000;
    if (width >= 1600) return 1600;
    return 1200;
  }, [isDesktopWeb, width]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {Platform.OS === 'web' && (
        <style>
          {`
            /* Style scrollbar on web */
            ::-webkit-scrollbar {
              width: 12px;
            }
            ::-webkit-scrollbar-track {
              background: ${theme.background};
            }
            ::-webkit-scrollbar-thumb {
              background: ${theme.border};
              border-radius: 6px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: ${theme.subtext};
            }

            @media (min-width: 768px) {
              [data-grid-item] {
                transition: box-shadow 0.2s ease, border-color 0.2s ease !important;
                will-change: box-shadow !important;
                border: none !important;
                background-color: ${theme.card} !important;
              }
              [data-grid-item]:hover {
                box-shadow: 0 16px 24px rgba(0,0,0,0.10), 0 8px 8px rgba(0,0,0,0.06) !important;
                z-index: 5;
              }
              [data-glass-header] {
                backdrop-filter: blur(12px) !important;
                -webkit-backdrop-filter: blur(12px) !important;
                background-color: ${theme.background}cc !important;
                border-bottom: 1px solid ${theme.border}44 !important;
              }
              .search-bar-inner {
                transition: all 0.2s ease !important;
              }
              .search-bar-inner:focus-within {
                border-color: ${theme.primary} !important;
                box-shadow: 0 0 0 4px ${theme.primary}22 !important;
                background-color: ${theme.card} !important;
              }
            }
          `}
        </style>
      )}
      <FlatList
        ref={flatListRef}
        data={filteredBuildings}
        keyExtractor={(item) => item.id}
        numColumns={calculatedColumns}
        key={`${calculatedColumns}-${isSearching ? 'search' : 'grid'}`}
        columnWrapperStyle={calculatedColumns > 1 ? styles.columnWrapper : undefined}
        renderItem={renderItem}
        maxToRenderPerBatch={lowPowerMode ? 5 : 10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={lowPowerMode ? 8 : 12}
        windowSize={lowPowerMode ? 11 : 21}
        removeClippedSubviews={Platform.OS === 'android'}
        extraData={expandedIds}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: true,
          });
        }}
        style={[{ flex: 1 }, isDesktopWeb && { width: '100%', maxWidth: calculatedMaxWidth, alignSelf: 'center' }]}
        contentContainerStyle={useMemo(() => [
          styles.scrollContent,
          {
            paddingTop: (
              Platform.OS === 'web'
                ? insets.top + headerHeight + 75 + (width < 768 ? 8 : 16)
                : (insets.top || (Platform.OS === 'ios' ? 20 : 0)) + headerHeight
            ),
            paddingBottom: insets.bottom + (Platform.OS === 'android' ? 80 : 16),
          }
        ], [styles.scrollContent, insets.top, insets.bottom, headerHeight, width])}
      />

      <View
        style={useMemo(() => [
          styles.headerContainer,
          {
            top: 0,
            left: 0,
            right: 0,
            height: Platform.OS === 'web' ? insets.top + headerHeight + 75 + (width < 768 ? 8 : 16) : insets.top + headerHeight,
            backgroundColor: theme.background,
            paddingTop: Platform.OS === 'web' ? 16 : 0,
          }
        ], [styles.headerContainer, insets.top, headerHeight, width, theme.background])}
        {...(Platform.OS === 'web' ? { dataSet: { 'glass-header': 'true' } } : {})}
      >
        {Platform.OS === 'web' && (
          <View style={{ height: 75 }} />
        )}
        <SafeAreaView edges={['top']}>
          <View style={[styles.header, isDesktopWeb && { width: '100%', maxWidth: calculatedMaxWidth, alignSelf: 'center' }]}>
            <View
              style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }, isDesktopWeb && { maxWidth: 600, alignSelf: 'center', width: '100%' }]}
              className="search-bar-inner"
            >
              <Ionicons name="search" size={20} color={theme.subtext} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search buildings or rooms..."
                placeholderTextColor={theme.placeholder}
                value={searchQuery}
                onChangeText={setSearchQuery}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    headerContainer: {
      position: 'absolute',
      zIndex: 10,
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      gap: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      height: Platform.OS === 'android' ? 40 : undefined,
      paddingVertical: 0,
      textAlignVertical: 'center',
    },
    scrollContent: {
      paddingHorizontal: 16,
    },
    columnWrapper: {
      gap: 16,
      paddingHorizontal: 16,
      justifyContent: 'center',
    },
    gridItem: {
      flex: 1,
      maxWidth: 380,
      marginVertical: 12,
      marginHorizontal: 8,
    },
    listItemFullWidth: {
      flex: 1,
      maxWidth: '100%',
      marginVertical: 8,
    },
    itemContainer: {
      borderRadius: 12,
      overflow: 'hidden',
    },
  });
}