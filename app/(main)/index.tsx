import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
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
  const { showPlaceholders, showBuildingImages } = useSettings();
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= 768;
  const triggerHaptic = useHapticFeedback();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const headerHeight = Platform.OS === 'ios' ? 60 : 75;

  const handleBuildingPress = useCallback((id: string) => {
    triggerHaptic();
    if (isDesktopWeb) {
      router.push(`/building/${id}`);
      return true;
    }
    setExpandedId(prev => prev === id ? null : id);
    return false;
  }, [isDesktopWeb, router, triggerHaptic]);

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

      if (isSearching && buildingNameMatch) {
        return { ...building };
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

      return {
        id: building.id,
        title: (
          <View>
            <Text style={[styles.title, { color: theme.text }]}>{building.name}</Text>
            <BuildingRating roomIds={building.rooms.map(r => r.id)} />
          </View>
        ),
        content: isDesktopWeb ? null : <RoomList rooms={building.rooms} />,
        image: buildingImage,
        showImage: showBuildingImages && hasValidImage,
      };
    });
  }, [searchQuery, styles.title, theme.text, showPlaceholders, showBuildingImages, isDesktopWeb]);

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <View style={isDesktopWeb ? styles.gridItem : undefined}>
        <AccordionItem
          title={item.title}
          isExpanded={searchQuery.trim().length > 0 || expandedId === item.id}
          onPress={() => handleBuildingPress(item.id)}
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
  }, [isDesktopWeb, searchQuery, expandedId, handleBuildingPress, styles.gridItem, styles.itemContainer]);


  const insets = useSafeAreaInsets();

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
          `}
        </style>
      )}
      <FlatList
        data={accordionItems}
        keyExtractor={(item) => item.id}
        numColumns={isDesktopWeb ? 3 : 1}
        key={isDesktopWeb ? 'web-grid' : 'mobile-list'}
        columnWrapperStyle={isDesktopWeb ? styles.columnWrapper : undefined}
        renderItem={renderItem}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={10}
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: (Platform.OS === 'web' ? insets.top + headerHeight + 75 : insets.top + headerHeight) }
        ]}
      />

      <View style={[styles.headerContainer, { top: Platform.OS === 'web' ? 75 : 0, left: 0, right: 0, height: insets.top + headerHeight }]}>
        {Platform.OS === 'web' && (
          <View style={{ position: 'absolute', top: -75, left: 0, right: isDesktopWeb ? 20 : 0, height: 75, backgroundColor: theme.background }} />
        )}
        <View style={StyleSheet.absoluteFill}>
          <LinearGradient
            colors={[theme.background, theme.background, theme.background + '00']}
            locations={Platform.OS === 'web' ? [0, 0.5, 1] : [0, 0.92, 1]}
            style={[StyleSheet.absoluteFill, { right: isDesktopWeb ? 20 : 8 }]}
            pointerEvents="none"
          />
        </View>
        <SafeAreaView edges={['top']}>
          <View style={styles.header}>
            <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
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
      paddingBottom: 80,
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
    itemContainer: {
      borderRadius: 12,
      borderWidth: 1,
      overflow: 'hidden',
    },
  });
}
