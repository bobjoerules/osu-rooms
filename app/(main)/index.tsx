import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AccordionItem } from '../../components/Accordion';
import BuildingRating from '../../components/BuildingRating';
import RoomList from '../../components/RoomList';
import { BUILDINGS_DATA } from '../../data/rooms';
import { useHapticFeedback, useSettings } from '../../lib/SettingsContext';
import { Theme, useTheme } from '../../theme';

const isPlaceholderImage = (imageUrl: string | undefined): boolean => {
  if (!imageUrl) return false;
  return imageUrl.includes('placeholder.png');
};

export default function Index() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { showPlaceholders, showBuildingImages } = useSettings();
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= 768;
  const triggerHaptic = useHapticFeedback();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const flatListRef = useRef<FlatList>(null);
  const headerHeight = Platform.OS === 'ios' ? 60 : 75;

  const handleBuildingPress = useCallback((id: string, index: number) => {
    triggerHaptic();
    const isSearching = searchQuery.trim().length > 0;
    if (isDesktopWeb && !isSearching) {
      router.push(`/building/${id}`);
      return true;
    }

    const isExpanding = !expandedIds[id];

    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));

    if (isExpanding && !isDesktopWeb) {
      // Small delay to allow the layout animation to start/prepare
      const headerOffset = Platform.OS === 'web'
        ? insets.top + headerHeight + 75 + 16 // account for web search bar spacer
        : insets.top + headerHeight;
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index,
          viewPosition: 0,
          viewOffset: headerOffset,
          animated: true,
        });
      }, 100);
    }

    return false;
  }, [isDesktopWeb, router, triggerHaptic, searchQuery, expandedIds, insets.top, headerHeight]);

  const accordionItems = useMemo(() => {
    const isSearching = searchQuery.trim().length > 0;
    const lowerQuery = searchQuery.toLowerCase();

    const filtered = BUILDINGS_DATA.map(building => {
      const isHiddenByDefault = building.id === 'backrooms';
      if (!isSearching && isHiddenByDefault) {
        return null;
      }

      const buildingNameMatch = building.name.toLowerCase().includes(lowerQuery);

      const matchingRooms = building.rooms.filter(room => {
        const hasPhotos = room.images?.length > 0 && !isPlaceholderImage(room.images[0]);
        const roomName = room.id.split('-').pop() || '';

        if (isSearching) {
          const nameMatch = roomName.toLowerCase().includes(lowerQuery);
          const aliasMatch = room.searchAliases?.some(alias =>
            alias.toLowerCase().includes(lowerQuery)
          );
          return nameMatch || aliasMatch;
        }

        return showPlaceholders || hasPhotos;
      });

      if (isSearching) {
        if (matchingRooms.length > 0) {
          return { ...building, rooms: matchingRooms };
        }
        if (buildingNameMatch) {
          return { ...building };
        }
        return null;
      }

      if (matchingRooms.length > 0) {
        return { ...building, rooms: matchingRooms };
      }

      return null;
    }).filter((item): item is typeof BUILDINGS_DATA[0] => item !== null);

    filtered.sort((a, b) => a.name.localeCompare(b.name));

    return filtered.map(building => {
      const buildingImage = building.images?.[0];
      const hasValidImage = buildingImage && !isPlaceholderImage(buildingImage);

      const isSearching = searchQuery.trim().length > 0;
      return {
        id: building.id,
        title: (
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{building.name}</Text>
            <BuildingRating roomIds={building.rooms.map(r => r.id)} />
          </View>
        ),
        content: (isDesktopWeb && !isSearching) ? null : <RoomList rooms={building.rooms} />,
        image: buildingImage,
        showImage: showBuildingImages && hasValidImage,
      };
    });
  }, [searchQuery, styles.title, theme.text, showPlaceholders, showBuildingImages, isDesktopWeb]);

  const renderItem = useCallback(({ item, index }: { item: any, index: number }) => {
    const isSearching = searchQuery.trim().length > 0;
    return (
      <View style={isDesktopWeb ? (isSearching ? styles.listItemFullWidth : styles.gridItem) : undefined}>
        <AccordionItem
          title={item.title}
          isExpanded={isSearching || !!expandedIds[item.id]}
          onPress={() => handleBuildingPress(item.id, index)}
          image={item.image}
          showImage={item.showImage}
          containerStyle={[
            styles.itemContainer,
            { marginVertical: isDesktopWeb ? 0 : 8 }
          ]}
        >
          {item.content}
        </AccordionItem>
      </View>
    );
  }, [isDesktopWeb, searchQuery, expandedIds, handleBuildingPress, styles.gridItem, styles.listItemFullWidth, styles.itemContainer]);



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
                border: 1px solid ${theme.border} !important;
                background-color: ${theme.card} !important;
              }
              [data-grid-item]:hover {
                box-shadow: 0 16px 24px rgba(0,0,0,0.10), 0 8px 8px rgba(0,0,0,0.06) !important;
                z-index: 5;
              }
              /* Glassmorphism for headers on web */
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
        data={accordionItems}
        keyExtractor={(item) => item.id}
        numColumns={isDesktopWeb && !(searchQuery.trim().length > 0) ? 3 : 1}
        key={isDesktopWeb && !(searchQuery.trim().length > 0) ? 'web-grid' : 'list-one-col'}
        columnWrapperStyle={isDesktopWeb && !(searchQuery.trim().length > 0) ? styles.columnWrapper : undefined}
        renderItem={renderItem}
        maxToRenderPerBatch={20}
        windowSize={10}
        updateCellsBatchingPeriod={0}
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={20}
        extraData={searchQuery}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: true,
          });
        }}
        style={[{ flex: 1 }, isDesktopWeb && { width: '100%', maxWidth: 1200, alignSelf: 'center' }]}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: (Platform.OS === 'web' ? insets.top + headerHeight + 75 + 16 : insets.top + headerHeight),
            paddingBottom: insets.bottom + 16,
          }
        ]}
      />

      <View
        style={[
          styles.headerContainer,
          {
            top: 0,
            left: 0,
            right: 0,
            height: Platform.OS === 'web' ? insets.top + headerHeight + 75 + 16 : insets.top + headerHeight,
            backgroundColor: theme.background, // Fallback for mobile web
            paddingTop: Platform.OS === 'web' ? 16 : 0,
          }
        ]}
        {...(Platform.OS === 'web' ? { dataSet: { 'glass-header': 'true' } } : {})}
      >
        {Platform.OS === 'web' && (
          <View style={{ height: 75 }} />
        )}
        <SafeAreaView edges={['top']}>
          <View style={[styles.header, isDesktopWeb && { width: '100%', maxWidth: 1200, alignSelf: 'center' }]}>
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
      // bottom padding is applied dynamically in contentContainerStyle
    },
    columnWrapper: {
      gap: 16,
      paddingHorizontal: 16,
    },
    gridItem: {
      flex: 1,
      maxWidth: '31%',
      marginVertical: 8,
    },
    listItemFullWidth: {
      flex: 1,
      maxWidth: '100%',
      marginVertical: 8,
    },
    itemContainer: {
      borderRadius: 12,
      borderWidth: 1,
      overflow: 'hidden',
    },
  });
}
