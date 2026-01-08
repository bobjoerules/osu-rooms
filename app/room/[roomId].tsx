import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RatingDisplay from '../../components/RatingDisplay';
import { getRoomById } from '../../data/rooms';
import { Theme, useTheme } from '../../theme';

export default function RoomDetail() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const router = useRouter();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Fallback if roomId is an array (sometimes happens with dynamic routes)
  const finalRoomId = Array.isArray(roomId) ? roomId[0] : roomId;

  const roomData = getRoomById(finalRoomId as string) || {
    id: 'unknown',
    name: 'Unknown Room',
    building: 'Unknown Building',
    image: require('../../assets/images/placeholder.png'),
    floor: 'Unknown',
    capacity: 'Unknown',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>{roomData.name} - {roomData.building}</Text>
          <View style={{ width: 40 }} />
        </View>

        {roomData.image && (
          <Image source={roomData.image} style={styles.headerImage} transition={500} />
        )}

        <View style={styles.content}>
          <View style={styles.mainRatingSection}>
            <View style={styles.overallRating}>
              <Text style={[styles.ratingLabel, { color: theme.subtext }]}>Overall Rating</Text>
              <RatingDisplay itemId={finalRoomId as string} size={28} />
            </View>

            <TouchableOpacity
              style={[styles.rateButton, { backgroundColor: theme.primary, marginTop: 8, flexDirection: 'row', gap: 8 }]}
              onPress={() => router.push(`/room/${finalRoomId}/rate`)}
            >
              <Ionicons name="pencil" size={18} color="#fff" />
              <Text style={styles.rateButtonText}>Rate Room</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mainRatingSection}>
            <Text style={[styles.sectionTitle, { color: theme.subtext, width: '100%', textAlign: 'center' }]}>Detailed Ratings</Text>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.text }]}>Chairs</Text>
              <RatingDisplay itemId={`${finalRoomId}_chairs`} size={24} showMetaText={false} />
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.text }]}>Lighting</Text>
              <RatingDisplay itemId={`${finalRoomId}_lighting`} size={24} showMetaText={false} />
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.text }]}>Projector Visibility</Text>
              <RatingDisplay itemId={`${finalRoomId}_projector`} size={24} showMetaText={false} />
            </View>

          </View>

          <View style={styles.infoSection}>
            <Text style={[styles.sectionTitle, { color: theme.subtext, width: '100%', textAlign: 'center' }]}>Info</Text>
            <View style={styles.infoSeparator} />
            <Text style={[styles.buildingName, { color: theme.text }]}>Building: {roomData.building}</Text>
            <View style={styles.infoSeparator} />
            <Text style={[styles.buildingName, { color: theme.text }]}>Seating Size: {roomData.capacity}</Text>
            <View style={styles.infoSeparator} />
            <Text style={[styles.floor, { color: theme.text }]}>Floor: {roomData.floor}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 8,
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
    },
    headerImage: {
      width: 'auto',
      height: 240,
      resizeMode: 'cover',
      marginHorizontal: 16,
      borderRadius: 16,
    },
    content: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    mainRatingSection: {
      marginBottom: 20,
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      gap: 20,
    },
    overallRating: {
      alignItems: 'center',
      gap: 8,
    },
    ratingLabel: {
      fontSize: 14,
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    separator: {
      width: '80%',
      height: 1,
      backgroundColor: theme.border,
      opacity: 0.5,
    },
    userRating: {
      alignItems: 'center',
      gap: 8,
    },
    infoSection: {
      marginBottom: 20,
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 20,
      gap: 12,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    buildingName: {
      fontSize: 14,
      lineHeight: 20,
    },
    floor: {
      fontSize: 14,
      lineHeight: 20,
    },
    infoSeparator: {
      height: 1,
      backgroundColor: theme.border,
      opacity: 0.3,
      width: '100%',
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    detailLabel: {
      fontSize: 16,
      fontWeight: '500',
    },
    rateButton: {
      marginTop: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rateButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
}
