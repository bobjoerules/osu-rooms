import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StarRating from '../../../../components/StarRating';
import TemperatureRating from '../../../../components/TemperatureRating';
import { auth, db } from '../../../../firebaseConfig';
import { useApp } from '../../../../lib/AppContext';
import { useBuildings } from '../../../../lib/DatabaseContext';
import { checkProfanity } from '../../../../lib/profanity';
import { useHapticFeedback } from '../../../../lib/SettingsContext';
import { useUser } from '../../../../lib/UserContext';
import { Theme, useTheme } from '../../../../theme';


const MAX_COMMENT_LENGTH = 500;

const MemoStarRating = React.memo(StarRating);



export default function RateRoomModal() {
    const { roomId, initialComment } = useLocalSearchParams<{ roomId: string, initialComment?: string }>();
    const router = useRouter();
    const theme = useTheme();
    const { bannerHeight } = useApp();
    const triggerHaptic = useHapticFeedback();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const [comment, setComment] = useState(initialComment || '');
    const [isSaving, setIsSaving] = useState(false);
    const [initialLoad, setInitialLoad] = useState(!initialComment);
    const { user, loading: authLoading, canComment } = useUser();
    const insets = useSafeAreaInsets();
    const scrollViewRef = useRef<ScrollView>(null);
    const { buildings } = useBuildings();

    const finalRoomId = Array.isArray(roomId) ? roomId[0] : roomId;
    const building = useMemo(() => {
        return buildings.find(b => b.rooms.some(r => r.id === finalRoomId));
    }, [buildings, finalRoomId]);

    useEffect(() => {
        if (authLoading || !user || !finalRoomId) {
            if (!authLoading && !user) setInitialLoad(false);
            return;
        }
        const userRef = doc(db, 'ratings', finalRoomId, 'userRatings', user.uid);
        const unsubscribe = onSnapshot(userRef, (snap) => {
            if (snap.exists()) {
                const data = snap.data();
                setComment(prev => {
                    const isUnchanged = prev === (initialComment || "");
                    if (prev === "" || (initialLoad && isUnchanged)) {
                        return data.comment || "";
                    }
                    return prev;
                });
            }
            setInitialLoad(false);
        }, (err) => {
            console.error("Error syncing comment:", err);
            setInitialLoad(false);
        });

        return unsubscribe;
    }, [finalRoomId, user, authLoading]);

    const handleClose = (shouldHaptic = true) => {
        if (shouldHaptic) triggerHaptic();
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace(`/room/${finalRoomId}`);
        }
    };

    const handleDone = async () => {
        setIsSaving(true);

        const hasProfanity = await checkProfanity(comment);
        if (hasProfanity) {
            setIsSaving(false);
            triggerHaptic();
            Alert.alert(
                "Inappropriate Content",
                "Your comment contains language that violates our community guidelines. Please remove any offensive language before submitting.",
                [{ text: "OK" }]
            );
            return;
        }

        try {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, 'ratings', finalRoomId as string, 'userRatings', user.uid);
                const updateData: any = {
                    userId: user.uid,
                    userEmail: user.email,
                    displayName: user.displayName,
                    userPhotoUrl: user.photoURL || null,
                    updatedAt: serverTimestamp()
                };

                if (canComment) {
                    updateData.comment = comment.trim();
                }

                await setDoc(userRef, updateData, { merge: true });
            }
            handleClose(false);
        } catch (err) {
            console.error('Error saving comment:', err);
        } finally {
            setIsSaving(false);
        }
    };

    const STAR_SIZE = 40;
    const starWidth = 5 * (STAR_SIZE + 8);

    return (
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <TouchableOpacity
                style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
                activeOpacity={1}
                onPress={() => handleClose()}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={0}
            >
                <View style={[styles.container, { paddingTop: bannerHeight > 0 ? bannerHeight : insets.top }]}>
                    <View style={styles.popup}>


                        <ScrollView
                            ref={scrollViewRef}
                            contentContainerStyle={[styles.content, { paddingBottom: 20 }]}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.ratingGroup}>
                                <Text style={[styles.label, { color: theme.text }]}>Overall Rating</Text>
                                <MemoStarRating
                                    itemId={finalRoomId as string}
                                    buildingId={building?.id}
                                    size={STAR_SIZE}
                                />
                            </View>

                            <View style={styles.ratingGroup}>
                                <Text style={[styles.label, { color: theme.text }]}>Chairs</Text>
                                <MemoStarRating itemId={`${finalRoomId}_chairs`} size={STAR_SIZE} />
                            </View>

                            <View style={styles.ratingGroup}>
                                <Text style={[styles.label, { color: theme.text }]}>Lighting</Text>
                                <MemoStarRating itemId={`${finalRoomId}_lighting`} size={STAR_SIZE} />
                            </View>

                            <View style={styles.ratingGroup}>
                                <Text style={[styles.label, { color: theme.text }]}>Projector/Screen Visibility</Text>
                                <MemoStarRating itemId={`${finalRoomId}_projector`} size={STAR_SIZE} />
                            </View>

                            <View style={styles.ratingGroup}>
                                <Text style={[styles.label, { color: theme.text }]}>Temperature</Text>
                                <TemperatureRating itemId={`${finalRoomId}_temperature`} width={starWidth} />
                            </View>

                            {canComment && (
                                <View style={styles.commentGroup}>
                                    <View style={styles.commentHeader}>
                                        <Text style={[styles.label, { color: theme.text }]}>Text Review</Text>
                                        <Text style={[styles.charCount, {
                                            color: comment.length >= MAX_COMMENT_LENGTH ? theme.destructive : theme.subtext
                                        }]}>
                                            {comment.length} / {MAX_COMMENT_LENGTH}
                                        </Text>
                                    </View>
                                    <View style={[styles.commentInputContainer, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
                                        <TextInput
                                            style={[styles.commentInput, {
                                                color: theme.text,
                                            }]}
                                            placeholder={initialLoad ? "Scanning for past reviews..." : "Add a review (optional)..."}
                                            placeholderTextColor={theme.placeholder}
                                            value={comment}
                                            onChangeText={setComment}
                                            multiline
                                            numberOfLines={4}
                                            textAlignVertical="top"
                                            maxLength={MAX_COMMENT_LENGTH}
                                            blurOnSubmit={false}
                                            editable={!initialLoad}
                                            onFocus={() => {
                                                setTimeout(() => {
                                                    scrollViewRef.current?.scrollToEnd({ animated: true });
                                                }, 250);
                                            }}
                                        />
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                    </View>

                    <TouchableOpacity
                        style={[styles.doneButton, { backgroundColor: theme.primary }, (isSaving || initialLoad) && styles.doneButtonDisabled]}
                        onPress={() => handleDone()}
                        disabled={isSaving || initialLoad}
                    >
                        <Text style={styles.doneButtonText}>
                            {isSaving ? 'Saving...' : initialLoad ? 'Loading...' : 'Done'}
                        </Text>
                    </TouchableOpacity>

                    {isSaving && (
                        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 16, justifyContent: 'center', alignItems: 'center', zIndex: 100 }]}>
                            <ActivityIndicator size="large" color="#fff" />
                        </View>
                    )}
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

function createStyles(theme: Theme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
        },
        popup: {
            width: '90%',
            maxHeight: '80%',
            backgroundColor: theme.card,
            borderRadius: 16,
            overflow: 'hidden',
            elevation: 5,
            boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
        },
        content: {
            padding: 24,
            paddingTop: 20,
            gap: 16,
        },
        subtitle: {
            fontSize: 16,
            lineHeight: 22,
            marginBottom: 8,
        },
        ratingGroup: {
            gap: 6,
            alignItems: 'center',
        },
        label: {
            fontSize: 15,
            fontWeight: '600',
            color: theme.text,
        },
        doneButton: {
            marginTop: 20,
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            width: '90%',
            elevation: 4,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
        doneButtonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
        },
        doneButtonDisabled: {
            backgroundColor: theme.border,
            opacity: 1,
        },
        commentGroup: {
            gap: 12,
            width: '100%',
        },
        commentHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
        },
        charCount: {
            fontSize: 12,
            fontWeight: '500',
        },
        commentInputContainer: {
            borderRadius: 12,
            borderWidth: 1,
            width: '100%',
            height: 120,
            overflow: 'hidden',
        },
        commentInput: {
            flex: 1,
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 12,
            fontSize: 16,
        },
    });
}