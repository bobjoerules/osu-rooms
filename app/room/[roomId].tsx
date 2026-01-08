import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import RatingDisplay from '../../components/RatingDisplay';
import { getRoomById } from '../../data/rooms';
import { auth, db } from '../../firebaseConfig';
import { Theme, useTheme } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function RoomDetail() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const router = useRouter();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // Fallback if roomId is an array (sometimes happens with dynamic routes)
  const finalRoomId = Array.isArray(roomId) ? roomId[0] : roomId;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (err) {
          console.error("Error checking admin status:", err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });
    return unsub;
  }, []);

  const handleResetRoom = () => {
    Alert.alert(
      "Reset Room Data",
      `Are you sure you want to reset all ratings for ${roomData.name}? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            setResetLoading(true);
            try {
              const batch = writeBatch(db);

              // 1. Reset main aggregate
              batch.delete(doc(db, "ratings", finalRoomId as string));

              // 2. Reset detail aggregates
              batch.delete(doc(db, "ratings", `${finalRoomId}_chairs`));
              batch.delete(doc(db, "ratings", `${finalRoomId}_lighting`));
              batch.delete(doc(db, "ratings", `${finalRoomId}_projector`));

              // 3. Optional: Delete individual user ratings if you want a FULL reset
              // Note: For a true full reset, you'd need to fetch and delete all docs in userRatings subcollections.
              // This basic reset will clear the averages.

              await batch.commit();
              Alert.alert("Success", "Room ratings have been reset.");
            } catch (err) {
              console.error("Reset failed:", err);
              Alert.alert("Error", "Failed to reset room data.");
            } finally {
              setResetLoading(false);
            }
          }
        }
      ]
    );
  };

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

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: insets.top + 50 }}
      >
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
                    contentFit="cover"
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
              contentFit="cover"
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
            <Text style={[styles.buildingName, { color: theme.text }]}>Capacity: {roomData.capacity}</Text>
            <View style={styles.infoSeparator} />
            <Text style={[styles.floor, { color: theme.text }]}>Floor: {roomData.floor}</Text>
          </View>

          {isAdmin && (
            <TouchableOpacity
              style={[styles.resetButton, { backgroundColor: theme.destructive + '15', borderColor: theme.destructive + '30' }]}
              onPress={handleResetRoom}
              disabled={resetLoading}
            >
              {resetLoading ? (
                <ActivityIndicator color={theme.destructive} />
              ) : (
                <>
                  <Ionicons name="trash-outline" size={20} color={theme.destructive} />
                  <Text style={[styles.resetButtonText, { color: theme.destructive }]}>Reset Room Ratings</Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Floating Header with Fade Effect */}
      <View style={[styles.headerFloatingContainer, { top: 0, left: 0, right: 0, height: insets.top + 75 }]}>
        <LinearGradient
          colors={[theme.background, theme.background, theme.background + 'CC', theme.background + '00']}
          locations={[0, 0.55, 0.8, 1]}
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={28} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>
              {roomData.name} - {roomData.building}
            </Text>
            <View style={{ width: 40 }} />
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
    },
    headerFloatingContainer: {
      position: 'absolute',
      zIndex: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 8,
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
    resetButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 1,
      marginTop: 10,
      marginBottom: 30,
    },
    resetButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
  });
}
