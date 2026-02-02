import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StarRating from '../../../../components/StarRating';
import TemperatureRating from '../../../../components/TemperatureRating';
import { auth, db } from '../../../../firebaseConfig';
import { useHapticFeedback } from '../../../../lib/SettingsContext';
import { useUser } from '../../../../lib/UserContext';
import { Theme, useTheme } from '../../../../theme';


const MAX_COMMENT_LENGTH = 500;

const MemoStarRating = React.memo(StarRating);

// Simple profanity filter list - in a real app, use a library or API
const OBSCENE_WORDS = [
    'fuck', 'shit', 'asshole', 'bitch', 'cunt', 'dick', 'nigger', 'faggot'
    // ... add more as needed, or use a library if available
];

function containsProfanity(text: string) {
    const lowerText = text.toLowerCase();
    return OBSCENE_WORDS.some(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        return regex.test(lowerText);
    });
}

export default function RateRoomModal() {
    const { roomId } = useLocalSearchParams<{ roomId: string }>();
    const router = useRouter();
    const theme = useTheme();
    const triggerHaptic = useHapticFeedback();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const [comment, setComment] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const { canComment } = useUser();
    const insets = useSafeAreaInsets();
    const scrollViewRef = useRef<ScrollView>(null);

    const finalRoomId = Array.isArray(roomId) ? roomId[0] : roomId;

    useEffect(() => {
        async function fetchInitialComment() {
            const user = auth.currentUser;
            if (!user || !finalRoomId) return;
            try {
                const userRef = doc(db, 'ratings', finalRoomId, 'userRatings', user.uid);
                const snap = await getDoc(userRef);
                if (snap.exists()) {
                    setComment(snap.data().comment || '');
                }
            } catch (err) {
                console.error("Error fetching initial comment:", err);
            } finally {
                setInitialLoad(false);
            }
        }

        fetchInitialComment();
    }, [finalRoomId]);

    const handleClose = (shouldHaptic = true) => {
        if (shouldHaptic) triggerHaptic();
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace(`/room/${finalRoomId}`);
        }
    };

    const handleDone = async () => {
        if (containsProfanity(comment)) {
            triggerHaptic();
            Alert.alert(
                "Inappropriate Content",
                "Your comment contains language that violates our community guidelines. Please remove any offensive language before submitting.",
                [{ text: "OK" }]
            );
            return;
        }

        setIsSaving(true);
        try {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, 'ratings', finalRoomId as string, 'userRatings', user.uid);
                const updateData: any = {
                    userId: user.uid,
                    userEmail: user.email,
                    displayName: user.displayName,
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
            {/* Background Overlay */}
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
                <View style={[styles.container, { paddingTop: insets.top }]}>
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
                                        <Text style={[styles.label, { color: theme.text }]}>Any additional comments?</Text>
                                        <Text style={[styles.charCount, {
                                            color: comment.length >= MAX_COMMENT_LENGTH ? theme.destructive : theme.subtext
                                        }]}>
                                            {comment.length} / {MAX_COMMENT_LENGTH}
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={[styles.commentInput, {
                                            backgroundColor: theme.inputBg,
                                            color: theme.text,
                                            borderColor: theme.border,
                                            height: 120,
                                        }]}
                                        placeholder="Share your experience (optional)..."
                                        placeholderTextColor={theme.placeholder}
                                        value={comment}
                                        onChangeText={setComment}
                                        multiline
                                        numberOfLines={4}
                                        textAlignVertical="top"
                                        maxLength={MAX_COMMENT_LENGTH}
                                        blurOnSubmit={false}
                                        onFocus={() => {
                                            setTimeout(() => {
                                                scrollViewRef.current?.scrollToEnd({ animated: true });
                                            }, 250);
                                        }}
                                    />
                                </View>
                            )}
                        </ScrollView>
                    </View>

                    <TouchableOpacity
                        style={[styles.doneButton, { backgroundColor: theme.primary }]}
                        onPress={() => handleDone()}
                        disabled={isSaving}
                    >
                        <Text style={styles.doneButtonText}>{isSaving ? 'Saving...' : 'Done'}</Text>
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
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
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
            // Add shadow to make it pop against the background
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        },
        doneButtonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
        },
        commentGroup: {
            gap: 12,
            width: '100%',
            alignItems: 'center', // Added back to center the header and input
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
        commentInput: {
            borderRadius: 12,
            borderWidth: 1,
            padding: 16,
            fontSize: 16,
            width: '100%',
        },
    });
}
