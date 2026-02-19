import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, doc, getDocs, onSnapshot, orderBy, query, updateDoc, where, writeBatch } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, Platform, Pressable, Image as RNImage, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import RatingDisplay from '../../components/RatingDisplay';
import StaticStarRating from '../../components/StaticStarRating';
import TemperatureDisplay from '../../components/TemperatureDisplay';
import { firebaseImage } from '../../data/rooms';
import { auth, db } from '../../firebaseConfig';
import { useBuildings } from '../../lib/DatabaseContext';
import { useHapticFeedback } from '../../lib/SettingsContext';
import { useUser } from '../../lib/UserContext';
import { Theme, useTheme } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function RoomDetail() {
  const { getRoomById, loading: dbLoading } = useBuildings();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const router = useRouter();
  const theme = useTheme();
  const triggerHaptic = useHapticFeedback();
  const { width: windowWidth } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && windowWidth >= 768;
  const styles = useMemo(() => createStyles(theme, isDesktopWeb), [theme, isDesktopWeb]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { isAdmin } = useUser();
  const [resetLoading, setResetLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseStartX, setMouseStartX] = useState(0);
  const [comments, setComments] = useState<{ id: string, rating: number, comment: string, userEmail?: string, displayName?: string, userPhotoUrl?: string | null, updatedAt: any }[]>([]);

  const finalRoomId = Array.isArray(roomId) ? roomId[0] : roomId;


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
    if (Platform.OS === 'web') {
      const confirmed = window.confirm("Are you sure you want to delete this comment? This will only remove the text, keeping the user's star rating.");
      if (confirmed) {
        try {
          await updateDoc(doc(db, 'ratings', finalRoomId as string, 'userRatings', userId), {
            comment: ""
          });
        } catch (err) {
          console.error("Error deleting comment:", err);
        }
      }
      return;
    }

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
    if (!roomInfo) {
      return {
        id: 'unknown',
        name: '???',
        building: 'Unknown Building',
        images: [firebaseImage('placeholder.png')],
        floor: 'Unknown',
        capacity: 'Unknown',
        roomType: 'Unknown',
      };
    }

    const resolvedImages = (roomInfo.room.images || []).map((img: any) =>
      typeof img === 'string' && !img.startsWith('http')
        ? firebaseImage(img)
        : img
    );

    return {
      ...roomInfo.room,
      building: roomInfo.buildingName,
      buildingId: roomInfo.buildingId,
      name: roomInfo.room.id.split('-').pop() || '???',
      images: resolvedImages.length > 0 ? resolvedImages : [firebaseImage('placeholder.png')]
    };
  }, [getRoomById, finalRoomId]);

  const handleResetRoom = useCallback(async () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(`Are you sure you want to reset all ratings for Room ${roomData.name}? This cannot be undone.`);
      if (confirmed) {
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
          window.alert("Room ratings have been reset.");
        } catch (err) {
          console.error("Reset failed:", err);
          window.alert("Failed to reset room data.");
        } finally {
          setResetLoading(false);
        }
      }
      return;
    }

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
  }, [triggerHaptic, roomData.name, finalRoomId, db]);

  const handleToggleImportant = useCallback(async () => {
    triggerHaptic();
    const isNowImportant = !roomData.imageUpdateImportant;

    try {
      const buildingsRef = collection(db, 'buildings');
      const q = query(buildingsRef, where('name', '==', roomData.building));
      const buildingSnap = await getDocs(q);

      if (!buildingSnap.empty) {
        const buildingDoc = buildingSnap.docs[0];
        const buildingData = buildingDoc.data();
        const updatedRooms = buildingData.rooms.map((r: any) => {
          if (r.id === finalRoomId) {
            return { ...r, imageUpdateImportant: isNowImportant };
          }
          return r;
        });

        await updateDoc(doc(db, 'buildings', buildingDoc.id), {
          rooms: updatedRooms
        });
      }
    } catch (err) {
      console.error("Failed to toggle importance:", err);
      if (Platform.OS === 'web') {
        window.alert("Failed to update room status.");
      } else {
        Alert.alert("Error", "Failed to update room status.");
      }
    }
  }, [triggerHaptic, roomData.building, roomData.imageUpdateImportant, finalRoomId, db]);

  const handleToggleVisibility = useCallback(async () => {
    triggerHaptic();
    const isNowHidden = !roomData.isHidden;

    try {
      const buildingsRef = collection(db, 'buildings');
      const q = query(buildingsRef, where('name', '==', roomData.building));
      const buildingSnap = await getDocs(q);

      if (!buildingSnap.empty) {
        const buildingDoc = buildingSnap.docs[0];
        const buildingData = buildingDoc.data();
        const updatedRooms = buildingData.rooms.map((r: any) => {
          if (r.id === finalRoomId) {
            return { ...r, isHidden: isNowHidden };
          }
          return r;
        });

        await updateDoc(doc(db, 'buildings', buildingDoc.id), {
          rooms: updatedRooms
        });
      }
    } catch (err) {
      console.error("Failed to toggle visibility:", err);
      if (Platform.OS === 'web') {
        window.alert("Failed to update room visibility.");
      } else {
        Alert.alert("Error", "Failed to update room visibility.");
      }
    }
  }, [triggerHaptic, roomData.building, roomData.isHidden, finalRoomId, db]);

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

  const Header = ({ title = "Loading..." }) => (
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
              } else if (roomData.buildingId) {
                router.replace(`/building/${roomData.buildingId}`);
              } else {
                router.replace('/');
              }
            }}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color={theme.text} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>
            {title}
          </Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>
    </View>
  );

  if (dbLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header />
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
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

        <View
          style={[styles.imageContainer, isDesktopWeb && { paddingHorizontal: 16 }]}
          {...(Platform.OS === 'web' ? {
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMoveWrapper,
            onMouseUp: handleMouseUp
          } : {})}
          {...(roomData.images.length > 1 && Platform.OS === 'web' ? { dataSet: { 'carousel-container': 'true' } } : {})}
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
                    cachePolicy="memory-disk"
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
              cachePolicy="memory-disk"
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
                  style={isAdmin ? [styles.adminIconButton, { backgroundColor: theme.border, borderColor: theme.border }] : [styles.actionButton, { backgroundColor: theme.border }]}
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
                  <Ionicons name="pencil" size={isAdmin ? 24 : 20} color={theme.subtext} style={!isAdmin ? { marginRight: 8 } : undefined} />
                  {!isAdmin && <Text style={[styles.actionButtonText, { color: theme.subtext }]} numberOfLines={1} adjustsFontSizeToFit>Rate Room</Text>}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.adminIconButton, { backgroundColor: theme.border, borderColor: theme.border }]}
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
                  <Ionicons name="camera" size={24} color={theme.subtext} />
                </TouchableOpacity>

                {isAdmin && (
                  <>
                    <TouchableOpacity
                      style={[styles.adminIconButton, { backgroundColor: theme.primary + '15', borderColor: theme.primary + '30' }]}
                      onPress={handleToggleVisibility}
                    >
                      <Ionicons name={roomData.isHidden ? "eye-off" : "eye"} size={24} color={theme.primary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.adminIconButton, { backgroundColor: theme.message + '15', borderColor: theme.message + '30' }]}
                      onPress={handleToggleImportant}
                    >
                      <Ionicons name={roomData.imageUpdateImportant ? "bookmark" : "bookmark-outline"} size={24} color={theme.message} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.adminIconButton, { backgroundColor: theme.destructive + '15', borderColor: theme.destructive + '30' }]}
                      onPress={handleResetRoom}
                      disabled={resetLoading}
                    >
                      {resetLoading ? (
                        <ActivityIndicator size="small" color={theme.destructive} />
                      ) : (
                        <Ionicons name="arrow-undo" size={24} color={theme.destructive} />
                      )}
                    </TouchableOpacity>
                  </>
                )}
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
                      <View style={styles.reviewAvatar}>
                        {(item.id === auth.currentUser?.uid ? auth.currentUser?.photoURL : item.userPhotoUrl) ? (
                          Platform.OS === 'web' ? (
                            <RNImage
                              source={{ uri: (item.id === auth.currentUser?.uid ? auth.currentUser?.photoURL : item.userPhotoUrl) as string }}
                              style={styles.reviewAvatarImage}
                              resizeMode="cover"
                            />
                          ) : (
                            <Image
                              source={{ uri: (item.id === auth.currentUser?.uid ? auth.currentUser?.photoURL : item.userPhotoUrl) as string }}
                              style={styles.reviewAvatarImage}
                              contentFit="cover"
                              transition={200}
                            />
                          )
                        ) : (
                          <Text style={styles.reviewAvatarText}>
                            {(item.displayName || item.userEmail || "?").charAt(0).toUpperCase()}
                          </Text>
                        )}
                      </View>
                      <View>
                        <Text style={[styles.reviewUser, { color: theme.text }]}>
                          {item.displayName || item.userEmail?.split('@')[0] || 'Anonymous'}
                        </Text>
                        <Text style={[styles.reviewDate, { color: theme.subtext }]}>
                          {item.updatedAt?.toDate() ? new Date(item.updatedAt.toDate()).toLocaleDateString() : ''}
                        </Text>
                      </View>
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


        </View>
      </ScrollView>

      <Header title={`${/^[A-Za-z\s]+$/.test(roomData.name) ? roomData.name : `Room ${roomData.name}`} - ${roomData.building}`} />
    </View >
  );
}

function createStyles(theme: Theme, isDesktopWeb: boolean) {
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
      height: isDesktopWeb ? 500 : 240,
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
      flexWrap: 'wrap',
      gap: 12,
      width: '100%',
      justifyContent: 'center',
    },
    actionButton: {
      flex: 1,
      maxWidth: 185,
      flexDirection: 'row',
      marginTop: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionButtonText: {
      fontSize: 14,
      fontWeight: '600',
    },
    adminIconButton: {
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
      borderWidth: 1,
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
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    reviewAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#8882',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    reviewAvatarImage: {
      width: '100%',
      height: '100%',
    },
    reviewAvatarText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.subtext,
    },
    reviewUser: {
      fontSize: 14,
      fontWeight: 'bold',
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