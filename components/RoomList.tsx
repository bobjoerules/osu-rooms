import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
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

  const handleRoomPress = (roomId: string) => {
    triggerHaptic();
    router.push(`/room/${roomId}`);
  };

  const renderRoomItem = ({ item }: { item: Room }) => {
    const roomName = item.id.split('-').pop() || '???';
    return (
      <TouchableOpacity
        style={[styles.roomCard, isDesktopWeb && styles.roomCardGrid]}
        onPress={() => handleRoomPress(item.id)}
        activeOpacity={0.7}
      >
        <View style={isDesktopWeb ? styles.roomImageGridContainer : undefined}>
          {item.images && item.images.length > 0 && (
            <Image source={item.images[0]} style={isDesktopWeb ? styles.roomImageGrid : styles.roomImage} />
          )}
        </View>
        <View style={styles.roomContent}>
          <Text style={[styles.roomName, { color: theme.text }]}>Room {roomName}</Text>
          <RatingDisplay itemId={item.id} size={16} align="flex-start" />
        </View>
        {!isDesktopWeb && <Ionicons name="chevron-forward" size={20} color={theme.subtext} />}
      </TouchableOpacity>
    );
  };

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
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  roomImageGridContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  roomImageGrid: {
    width: '100%',
    height: '100%',
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  }
});
