import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { FlatList, Platform, Image as RNImage, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useHapticFeedback } from '../lib/SettingsContext';
import { useTheme } from '../theme';
import RatingDisplay from './RatingDisplay';

import { Room } from '../data/rooms';

interface RoomListProps {
  rooms: Room[];
}

export default function RoomList({ rooms }: RoomListProps) {
  const theme = useTheme();
  const router = useRouter();
  const triggerHaptic = useHapticFeedback();

  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= 768;

  const handleRoomPress = useCallback((roomId: string) => {
    triggerHaptic();
    router.push(`/room/${roomId}`);
  }, [router, triggerHaptic]);

  const renderRoomItem = useCallback(({ item }: { item: Room }) => {
    const roomName = item.id.split('-').pop() || '???';
    return (
      <TouchableOpacity
        style={[styles.roomCard, isDesktopWeb && styles.roomCardGrid, { backgroundColor: theme.card }]}
        onPress={() => handleRoomPress(item.id)}
        activeOpacity={0.7}
        {...(isDesktopWeb ? { dataSet: { 'grid-item': 'true' } } : {})}
      >
        <View style={isDesktopWeb ? styles.roomImageGridContainer : undefined}>
          {item.images && item.images.length > 0 && (
            Platform.OS === 'web' ? (
              <RNImage
                source={{ uri: item.images[0] as string }}
                style={isDesktopWeb ? styles.roomImageGrid : styles.roomImage}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={item.images[0]}
                style={isDesktopWeb ? styles.roomImageGrid : styles.roomImage}
                contentFit="cover"
                transition={200}
              />
            )
          )}
        </View>
        <View style={[styles.roomContent, isDesktopWeb && styles.roomContentGrid]}>
          <Text style={[styles.roomName, { color: theme.text }]} numberOfLines={isDesktopWeb ? 2 : 1}>
            {/^[A-Za-z\s]+$/.test(roomName) ? roomName : `Room ${roomName}`}
          </Text>
          <RatingDisplay itemId={item.id} size={16} align={isDesktopWeb ? 'center' : 'flex-start'} />
        </View>
        {!isDesktopWeb && <Ionicons name="chevron-forward" size={20} color={theme.subtext} />}
      </TouchableOpacity>
    );
  }, [handleRoomPress, isDesktopWeb, theme.card, theme.text, theme.subtext]);

  return (
    <FlatList
      data={rooms}
      renderItem={renderRoomItem}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      numColumns={isDesktopWeb ? 3 : 1}
      key={isDesktopWeb ? 'grid-3' : 'list-1'}
      columnWrapperStyle={isDesktopWeb ? styles.columnWrapper : undefined}
    />
  );
}

const styles = StyleSheet.create({
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 8,
    padding: 12,
  },
  roomImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  roomContent: {
    flex: 1,
  },
  roomName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  roomCardGrid: {
    flex: 1,
    maxWidth: '31%',
    flexDirection: 'column',
    marginHorizontal: '1%',
    marginVertical: 12,
    padding: 0,
    borderRadius: 16,
    overflow: 'hidden',
  },
  roomImageGridContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    minHeight: 150,
    backgroundColor: '#00000010',
    overflow: 'hidden',
  },
  roomImageGrid: {
    width: '100%',
    height: '100%',
  },
  roomContentGrid: {
    padding: 16,
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  }
});