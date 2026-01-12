import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme';
import RatingDisplay from './RatingDisplay';
import { useHapticFeedback } from '../lib/SettingsContext';

import { Room } from '../data/rooms';

interface RoomListProps {
  rooms: Room[];
}

export default function RoomList({ rooms }: RoomListProps) {
  const theme = useTheme();
  const router = useRouter();
  const triggerHaptic = useHapticFeedback();

  const handleRoomPress = (roomId: string) => {
    triggerHaptic();
    router.push(`/room/${roomId}`);
  };

  const renderRoomItem = ({ item }: { item: Room }) => {
    const roomName = item.id.split('-').pop() || '???';
    return (
      <TouchableOpacity
        style={styles.roomCard}
        onPress={() => handleRoomPress(item.id)}
        activeOpacity={0.7}
      >
        {item.images && item.images.length > 0 && (
          <Image source={item.images[0]} style={styles.roomImage} transition={300} />
        )}
        <View style={styles.roomContent}>
          <Text style={[styles.roomName, { color: theme.text }]}>Room {roomName}</Text>
          <RatingDisplay itemId={item.id} size={16} align="flex-start" />
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.subtext} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={rooms}
      renderItem={renderRoomItem}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
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
});
