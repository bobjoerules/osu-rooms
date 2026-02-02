import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, writeBatch } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import RatingDisplay from '../../components/RatingDisplay';
import StaticStarRating from '../../components/StaticStarRating';
import TemperatureDisplay from '../../components/TemperatureDisplay';
import { auth, db } from '../../firebaseConfig';
import { useBuildings } from '../../lib/DatabaseContext';
import { useHapticFeedback } from '../../lib/SettingsContext';
import { Theme, useTheme } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const STORAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/osu-room-rates.firebasestorage.app/o';

const firebaseImage = (path: string): string => {
  const encodedPath = encodeURIComponent(path);
  return `${STORAGE_URL}/${encodedPath}?alt=media`;
};

export default function RoomDetail() {
  const { getRoomById, loading: dbLoading } = useBuildings();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const router = useRouter();
  const theme = useTheme();
  const triggerHaptic = useHapticFeedback();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { width: windowWidth } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && windowWidth >= 768;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseStartX, setMouseStartX] = useState(0);
  const [comments, setComments] = useState<{ id: string, rating: number, comment: string, userEmail?: string, displayName?: string, updatedAt: any }[]>([]);

  const finalRoomId = Array.isArray(roomId) ? roomId[0] : roomId;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && (userDoc.data().role === "admin" || userDoc.data().role === "owner")) {
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

  useEffect(() => {
    const q = query(
      collection(db, 'ratings', finalRoomId as string, 'userRatings'),
      orderBy('updatedAt', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((d: any) => d.comment && d.comment.trim().length > 0);
      setComments(data as any);
    });
    return unsub;
  }, [finalRoomId]);

  const handleDeleteComment = async (userId: string) => {
    triggerHaptic();
    Alert.alert(
      "Delete Comment",
      "Are you sure you want to delete this comment? This will only remove the text, keeping the user's star rating.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const userRef = doc(db, 'ratings', finalRoomId as string, 'userRatings', userId);
              await updateDoc(doc(db, 'ratings', finalRoomId as string, 'userRatings', userId), {
                comment: ""
              });
            } catch (err) {
              console.error("Error deleting comment:", err);
            }
          }
        }
      ]
    );
  };

  const roomData = useMemo(() => {
    const roomInfo = getRoomById(finalRoomId as string);
    return roomInfo ? {
      ...roomInfo.room,
      building: roomInfo.buildingName,
      name: roomInfo.room.id.split('-').pop() || '???'
    } : {
      id: 'unknown',
      name: '???',
      building: 'Unknown Building',
      images: [firebaseImage('placeholder.png')],
      floor: 'Unknown',
      capacity: 'Unknown',
      roomType: 'Unknown',
    };
  }, [getRoomById, finalRoomId]);

  const handleResetRoom = useCallback(() => {
    triggerHaptic();
    Alert.alert(
      "Reset Room Data",
      `Are you sure you want to reset all ratings for Room ${roomData.name}? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            triggerHaptic();
            setResetLoading(true);
            try {
              const ratingKeys = [
                finalRoomId as string,
                `${finalRoomId}_chairs`,
                `${finalRoomId}_lighting`,
                `${finalRoomId}_projector`,
                `${finalRoomId}_temperature`,
              ];

              const BATCH_LIMIT = 450;
              let batch = writeBatch(db);
              let ops = 0;

              for (const key of ratingKeys) {
                const usersCol = collection(db, 'ratings', key, 'userRatings');
                const usersSnap = await getDocs(usersCol);
                usersSnap.forEach((userDoc) => {
                  batch.delete(doc(db, 'ratings', key, 'userRatings', userDoc.id));
                  ops++;
                });

                if (ops >= BATCH_LIMIT) {
                  await batch.commit();
                  batch = writeBatch(db);
                  ops = 0;
                }

                batch.delete(doc(db, 'ratings', key));
                ops++;
                if (ops >= BATCH_LIMIT) {
                  await batch.commit();
                  batch = writeBatch(db);
                  ops = 0;
                }
              }

              if (ops > 0) {
                await batch.commit();
              }
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
  }, [triggerHaptic, roomData.name, finalRoomId]);

  const isRoomValid = !!(getRoomById(finalRoomId as string));

  const handleMouseDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseDown) return;

    const currentX = (e as any).clientX;
    const diff = mouseStartX - currentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      const newIndex = diff > 0
        ? Math.min(roomData.images.length - 1, activeImageIndex + 1)
        : Math.max(0, activeImageIndex - 1);

      if (newIndex !== activeImageIndex) {
        setActiveImageIndex(newIndex);
        flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
      }
      setMouseDown(false);
    }
  }, [mouseDown, mouseStartX, activeImageIndex, roomData.images.length]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDown) {
      handleMouseDrag(e);
    }
  }, [mouseDown, handleMouseDrag]);

  const IMAGE_WIDTH = SCREEN_WIDTH * 0.88;
  const GAP = 12;
  const SNAP_INTERVAL = IMAGE_WIDTH + GAP;
  const SIDE_PADDING = (SCREEN_WIDTH - IMAGE_WIDTH) / 2;
  const DESKTOP_IMAGE_WIDTH = isDesktopWeb ? Math.min(1168, windowWidth - 80) : IMAGE_WIDTH;

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;

    if (isDesktopWeb) {
      const index = Math.round(scrollOffset / (DESKTOP_IMAGE_WIDTH + GAP));
      if (index >= 0 && index < roomData.images.length) {
        setActiveImageIndex(index);
      }
    } else {
      const index = Math.round((scrollOffset + SIDE_PADDING) / SNAP_INTERVAL);
      if (index >= 0 && index < roomData.images.length) {
        setActiveImageIndex(index);
      }
    }
  }, [isDesktopWeb, DESKTOP_IMAGE_WIDTH, GAP, SIDE_PADDING, SNAP_INTERVAL, roomData.images.length]);

  const onMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    let nearestIndex: number;

    if (isDesktopWeb) {
      const itemSize = DESKTOP_IMAGE_WIDTH + GAP;
      nearestIndex = Math.round(scrollOffset / itemSize);
      if (nearestIndex >= 0 && nearestIndex < roomData.images.length) {
        flatListRef.current?.scrollToIndex({ index: nearestIndex, animated: true });
        setActiveImageIndex(nearestIndex);
      }
    } else {
      const itemSize = IMAGE_WIDTH + GAP;
      nearestIndex = Math.round((scrollOffset + SIDE_PADDING) / itemSize);
      if (nearestIndex >= 0 && nearestIndex < roomData.images.length) {
        setActiveImageIndex(nearestIndex);
      }
    }
  }, [isDesktopWeb, DESKTOP_IMAGE_WIDTH, GAP, SIDE_PADDING, IMAGE_WIDTH, roomData.images.length]);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const newIndex = Math.max(0, activeImageIndex - 1);
        if (newIndex !== activeImageIndex) {
          setActiveImageIndex(newIndex);
          flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const newIndex = Math.min(roomData.images.length - 1, activeImageIndex + 1);
        if (newIndex !== activeImageIndex) {
          setActiveImageIndex(newIndex);
          flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImageIndex, roomData.images.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setMouseDown(true);
    setMouseStartX((e as any).clientX);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const handleMouseMoveWrapper = (e: React.MouseEvent) => {
    if (mouseDown) {
      e.preventDefault();
    }
    handleMouseMove(e as any);
  };

  if (dbLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {Platform.OS === 'web' && (
        <style>
          {`
            @media (min-width: 768px) {
              .room-detail-content {
                max-width: 1200px !important;
                margin: 0 auto !important;
                width: 100% !important;
              }
              [data-glass-header] {
                backdrop-filter: blur(12px) !important;
                -webkit-backdrop-filter: blur(12px) !important;
                background-color: ${theme.background}cc !important;
                border-bottom: 1px solid ${theme.border}44 !important;
              }
              /* Avoid overriding global nav positioning to keep it centered */
              .EFtDwW_navigationMenuRoot {
                background-color: ${theme.card} !important;
                border-bottom: 1px solid ${theme.border}44 !important;
              }
              [data-carousel-container] {
                user-select: none !important;
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                cursor: grab;
              }
              [data-carousel-container]:active {
                cursor: grabbing;
              }
              [data-carousel-container] img {
                user-select: none !important;
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                pointer-events: none;
                -webkit-user-drag: none;
                drag: none;
              }
            }
          `}
        </style>
      )}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          { paddingTop: insets.top + (isDesktopWeb ? 100 : 85) },
          isDesktopWeb && { maxWidth: 1200, alignSelf: 'center', width: '100%' }
        ]}
      >
        {/* @ts-ignore */}
        <View
          style={[styles.imageContainer, isDesktopWeb && { paddingHorizontal: 16 }]}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMoveWrapper}
          onMouseUp={handleMouseUp}
          {...(roomData.images.length > 1 ? { dataSet: { 'carousel-container': 'true' } } : {})}
        >
          {roomData.images.length > 1 ? (
            <>
              <FlatList
                ref={flatListRef}
                data={roomData.images}
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                onMomentumScrollEnd={onMomentumScrollEnd}
                scrollEventThrottle={16}
                snapToInterval={isDesktopWeb ? DESKTOP_IMAGE_WIDTH + GAP : SNAP_INTERVAL}
                snapToAlignment="center"
                decelerationRate={isDesktopWeb ? 0.95 : 'fast'}
                disableIntervalMomentum
                pagingEnabled={false}
                contentContainerStyle={{ paddingHorizontal: isDesktopWeb ? 0 : SIDE_PADDING }}
                keyExtractor={(_, index) => `image-${finalRoomId}-${index}`}
                getItemLayout={(data, index) => {
                  const itemWidth = isDesktopWeb ? DESKTOP_IMAGE_WIDTH : IMAGE_WIDTH;
                  const itemLength = itemWidth + GAP;
                  return {
                    length: itemLength,
                    offset: itemLength * index,
                    index,
                  };
                }}
                onScrollToIndexFailed={(error) => {
                  console.warn('Scroll to index failed:', error);
                }}
                renderItem={({ item, index }) => (
                  <Image
                    source={item}
                    contentFit="cover"
                    style={[
                      styles.headerImage,
                      {
                        width: isDesktopWeb ? DESKTOP_IMAGE_WIDTH : IMAGE_WIDTH,
                        marginRight: GAP,
                        borderRadius: isDesktopWeb ? 24 : 16,
                      }
                    ]}
                    transition={200}
                  />
                )}
                scrollEnabled={true}
                nestedScrollEnabled={true}
              />
              <View style={[styles.paginationDots, isDesktopWeb && { bottom: 20 }]}>
                {(roomData.images as any[]).map((_: any, index: number) => (
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
              style={[
                styles.headerImage,
                {
                  width: isDesktopWeb ? '100%' : SCREEN_WIDTH - 32,
                  marginHorizontal: isDesktopWeb ? 0 : 16,
                  borderRadius: isDesktopWeb ? 24 : 16,
                }
              ]}
              transition={500}
            />
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: theme.subtext, width: '100%', textAlign: 'center' }]}>Overall Rating</Text>
            <View style={styles.mainRatingSection}>
              <RatingDisplay itemId={finalRoomId as string} size={32} />

              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: theme.border }]}
                  onPress={async () => {
                    try {
                      if (!auth.currentUser) {
                        if (Platform.OS === 'web') {
                          window.alert('Sign in required: Please sign in to rate this room.');
                        } else {
                          Alert.alert('Sign In Required', 'Please sign in to rate this room.');
                        }
                        return;
                      }
                      await auth.currentUser.reload();
                      if (!auth.currentUser.emailVerified) {
                        if (Platform.OS === 'web') {
                          window.alert('Email verification required: Please verify your email address to rate rooms.');
                        } else {
                          Alert.alert('Email Verification Required', 'Please verify your email address to rate rooms.');
                        }
                        return;
                      }
                      const myReview = comments.find(c => c.id === auth.currentUser?.uid);
                      router.push({
                        pathname: `/room/${finalRoomId}/rate` as any,
                        params: { initialComment: myReview?.comment || '' }
                      });
                    } catch (error) {
                      console.error('Rate button error:', error);
                      if (Platform.OS === 'web') {
                        window.alert('An error occurred. Please try again.');
                      } else {
                        Alert.alert('Error', 'An error occurred. Please try again.');
                      }
                    }
                  }}
                >
                  <Ionicons name="pencil" size={18} color={theme.subtext} style={{ marginRight: 8 }} />
                  <Text style={[styles.actionButtonText, { color: theme.subtext }]} numberOfLines={1} adjustsFontSizeToFit>Rate Room</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: theme.border }]}
                  onPress={() => {
                    triggerHaptic();
                    router.push({
                      pathname: `/room/${finalRoomId}/add-photos` as any,
                      params: {
                        buildingID: roomData.building,
                        roomNumber: roomData.name
                      }
                    });
                  }}
                >
                  <Ionicons name="camera" size={18} color={theme.subtext} style={{ marginRight: 8 }} />
                  <Text style={[styles.actionButtonText, { color: theme.subtext }]} numberOfLines={1} adjustsFontSizeToFit>Upload Photo(s)</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: theme.subtext, width: '100%', textAlign: 'center' }]}>Detailed Ratings</Text>
            <View style={styles.mainRatingSection}>
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

              <View style={[styles.detailRow, { alignItems: 'center' }]}>
                <Text style={[styles.detailLabel, { color: theme.text }]}>Temperature</Text>
                {(() => {
                  const STAR_SIZE_DETAILED = 24;
                  const STAR_PAD = 4;
                  const starWidthDetailed = 5 * (STAR_SIZE_DETAILED + STAR_PAD * 2) - 10;
                  return (
                    <TemperatureDisplay itemId={`${finalRoomId}_temperature`} width={starWidthDetailed} />
                  );
                })()}
              </View>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: theme.subtext, width: '100%', textAlign: 'center' }]}>Info</Text>
            <View style={styles.infoSection}>
              <Text style={[styles.buildingName, { color: theme.text }]}>Building: {roomData.building}</Text>
              <View style={styles.infoSeparator} />
              <Text style={[styles.buildingName, { color: theme.text }]}>Room Type: {roomData.roomType || 'Unknown'}</Text>
              <View style={styles.infoSeparator} />
              <Text style={[styles.buildingName, { color: theme.text }]}>Capacity: {roomData.capacity}</Text>
              <View style={styles.infoSeparator} />
              <Text style={[styles.columnLabel, { color: theme.text }]}>Floor: {roomData.floor}</Text>
            </View>
          </View>

          {comments.length > 0 && (
            <View style={styles.reviewSection}>
              <Text style={[styles.sectionTitle, { color: theme.subtext, width: '100%', textAlign: 'center' }]}>User Reviews</Text>
              {comments.map((item) => (
                <View key={item.id} style={[styles.reviewCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewUserInfo}>
                      <Text style={[styles.reviewUser, { color: theme.text }]}>
                        {item.displayName || item.userEmail?.split('@')[0] || 'Anonymous'}
                      </Text>
                      <Text style={[styles.reviewDate, { color: theme.subtext }]}>
                        {item.updatedAt?.toDate() ? new Date(item.updatedAt.toDate()).toLocaleDateString() : ''}
                      </Text>
                    </View>
                    <View style={styles.reviewHeaderRight}>
                      <StaticStarRating rating={item.rating || 0} size={14} />
                      {isAdmin && (
                        <TouchableOpacity
                          onPress={() => handleDeleteComment(item.id)}
                          style={styles.deleteCommentBtn}
                        >
                          <Ionicons name="trash-outline" size={16} color={theme.destructive} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <Text style={[styles.reviewText, { color: theme.text }]}>{item.comment}</Text>
                </View>
              ))}
            </View>
          )}

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
      </ScrollView >

      <View
        style={[styles.headerFloatingContainer, { top: 0, left: 0, right: isDesktopWeb ? 12 : 0, height: insets.top + (isDesktopWeb ? 85 : 75) }]}
        {...(isDesktopWeb ? { dataSet: { 'glass-header': 'true' } } : {})}
      >
        <SafeAreaView edges={['top']}>
          <View style={[
            styles.header,
            isDesktopWeb && { maxWidth: 1200, alignSelf: 'center', width: '100%' },
            {
              marginTop: Platform.OS === 'web' && isDesktopWeb ? 16 : 0,
              marginBottom: 10
            }
          ]}>
            <Pressable
              onPress={() => {
                triggerHaptic();
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.push('/');
                }
              }}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={28} color={theme.text} />
            </Pressable>
            <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>
              Room {roomData.name} - {roomData.building}
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
      backgroundColor: theme.background,
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
      height: Platform.OS === 'web' ? 500 : 240,
      width: '100%',
      display: 'flex',
      overflow: Platform.OS === 'web' ? 'hidden' : 'visible',
    },
    headerImage: {
      height: '100%',
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
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      gap: 20,
    },
    overallRatingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      position: 'relative',
    },
    rateIconButton: {
      position: 'absolute',
      right: 0,
      width: 42,
      height: 42,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -14,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
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
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 20,
      gap: 12,
    },
    sectionContainer: {
      marginBottom: 20,
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
    actionButtonsContainer: {
      flexDirection: 'row',
      gap: 12,
      width: '100%',
      justifyContent: 'center',
    },
    actionButton: {
      flex: 1,
      maxWidth: 185,
      flexDirection: 'row',
      marginTop: 8,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionButtonText: {
      fontSize: 14,
      fontWeight: '600',
    },
    resetButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 14,
      borderRadius: 12,
      marginTop: 10,
      marginBottom: 30,
    },
    resetButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    suggestButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 12,
      borderRadius: 12,
      marginTop: 8,
    },
    suggestButtonText: {
      fontSize: 14,
      fontWeight: '600',
    },
    reviewSection: {
      gap: 12,
    },
    reviewCard: {
      borderRadius: 16,
      padding: 16,
      gap: 8,
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    reviewUserInfo: {
      flex: 1,
    },
    reviewUser: {
      fontSize: 14,
      fontWeight: '600',
    },
    reviewDate: {
      fontSize: 12,
    },
    reviewText: {
      fontSize: 15,
      lineHeight: 22,
    },
    reviewHeaderRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    deleteCommentBtn: {
      padding: 4,
    },
    columnLabel: {
      fontSize: 14,
      lineHeight: 20,
    }
  });
}

