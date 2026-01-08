import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RatingDisplay from '../../components/RatingDisplay';
import { getRoomById } from '../../data/rooms';
import { Theme, useTheme } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function RoomDetail() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const router = useRouter();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fallback if roomId is an array (sometimes happens with dynamic routes)
  const finalRoomId = Array.isArray(roomId) ? roomId[0] : roomId;

  const roomData = getRoomById(finalRoomId as string) || {
    id: 'unknown',
    name: 'Unknown Room',
    building: 'Unknown Building',
    images: [require('../../assets/images/placeholder.png')],
    floor: 'Unknown',
    capacity: 'Unknown',
    roomType: 'Unknown',
  };

  const IMAGE_WIDTH = SCREEN_WIDTH * 0.88;
  const GAP = 12;
  const SNAP_INTERVAL = IMAGE_WIDTH + GAP;

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = scrollOffset / SNAP_INTERVAL;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeImageIndex) {
      setActiveImageIndex(roundIndex);
    }
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

        <View style={styles.imageContainer}>
          {roomData.images.length > 1 ? (
            <>
              <FlatList
                data={roomData.images}
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                snapToInterval={SNAP_INTERVAL}
                snapToAlignment="start"
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: 16 }}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Image
                    source={item}
                    style={[
                      styles.headerImage,
                      {
                        width: IMAGE_WIDTH,
                        marginRight: index === roomData.images.length - 1 ? 0 : GAP,
                      }
                    ]}
                    transition={500}
                  />
                )}
              />
              <View style={styles.paginationDots}>
                {roomData.images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      activeImageIndex === index ? styles.activeDot : { backgroundColor: theme.subtext + '50' }
                    ]}
                  />
                ))}
              </View>
            </>
          ) : (
            <Image
              source={roomData.images[0]}
              style={[styles.headerImage, { width: SCREEN_WIDTH - 32, marginHorizontal: 16 }]}
              transition={500}
            />
          )}
        </View>

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
            <Text style={[styles.buildingName, { color: theme.text }]}>Room Type: {roomData.roomType || 'Unknown'}</Text>
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
    imageContainer: {
      position: 'relative',
    },
    headerImage: {
      height: 240,
      resizeMode: 'cover',
      borderRadius: 16,
    },
    paginationDots: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 12,
      alignSelf: 'center',
      gap: 6,
      backgroundColor: 'rgba(0,0,0,0.3)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    activeDot: {
      backgroundColor: '#fff',
      width: 12,
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
