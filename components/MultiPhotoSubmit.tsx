import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { auth, db, storage } from '../firebaseConfig';
import { useHapticFeedback } from '../lib/SettingsContext';
import { Theme, useTheme } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MultiPhotoSubmit() {
    const theme = useTheme();
    const router = useRouter();
    const triggerHaptic = useHapticFeedback();
    const insets = useSafeAreaInsets();
    const { buildingID, roomNumber } = useLocalSearchParams<{ buildingID: string, roomNumber: string }>();

    const [images, setImages] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const isDesktop = Platform.OS === 'web' && SCREEN_WIDTH > 768;
    const styles = useMemo(() => createStyles(theme, isDesktop), [theme, isDesktop]);

    const pickImages = async () => {
        triggerHaptic();
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
                allowsMultipleSelection: true,
                quality: 0.8,
            });

            if (!result.canceled) {
                const newUris = result.assets.map(asset => asset.uri);
                setImages(prev => [...prev, ...newUris]);
            }
        } catch (error) {
            console.error('Pick image error:', error);
            if (Platform.OS === 'web') {
                window.alert('Failed to open image gallery.');
            } else {
                Alert.alert('Error', 'Failed to open image gallery.');
            }
        }
    };

    const removeImage = (index: number) => {
        triggerHaptic();
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (images.length === 0) return;

        triggerHaptic();
        if (!auth.currentUser) {
            if (Platform.OS === 'web') {
                window.alert('You must be signed in to upload photos.');
            } else {
                Alert.alert('Error', 'You must be signed in to upload photos.');
            }
            return;
        }

        await auth.currentUser.reload();
        if (!auth.currentUser.emailVerified) {
            if (Platform.OS === 'web') {
                window.alert('Please verify your email address to upload photos.');
            } else {
                Alert.alert('Verification Required', 'Please verify your email address to upload photos.');
            }
            return;
        }

        setSubmitting(true);
        try {
            const uploadedUrls: string[] = [];

            for (const uri of images) {
                const blob: Blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        resolve(xhr.response);
                    };
                    xhr.onerror = function (e) {
                        reject(new TypeError("Network request failed"));
                    };
                    xhr.responseType = "blob";
                    xhr.open("GET", uri, true);
                    xhr.send(null);
                });

                const filename = `submissions/${Date.now()}-${auth.currentUser?.uid}-${uploadedUrls.length}.jpg`;
                const storageRef = ref(storage, filename);
                await uploadBytes(storageRef, blob);
                const url = await getDownloadURL(storageRef);
                uploadedUrls.push(url);
            }

            await addDoc(collection(db, 'submissions'), {
                building: buildingID,
                roomNumber: roomNumber,
                imageUrls: uploadedUrls,
                imageUrl: uploadedUrls[0], // Keep for backward compatibility
                userId: auth.currentUser?.uid,
                userEmail: auth.currentUser?.email,
                status: 'pending',
                createdAt: serverTimestamp(),
            });

            if (Platform.OS === 'web') {
                window.alert('Success: Photos submitted for review!');
            } else {
                Alert.alert('Success', 'Photos submitted for review!');
            }
            router.back();
        } catch (error: any) {
            console.error('Upload Error:', error);
            if (Platform.OS === 'web') {
                window.alert('Failed to upload photos. Please try again.');
            } else {
                Alert.alert('Upload Error', 'Failed to upload photos. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const renderItem = ({ item, index }: { item: string, index: number }) => (
        <View style={styles.imageWrapper}>
            <Image source={{ uri: item }} style={styles.thumbnail} contentFit="cover" />
            <Pressable style={styles.removeBtn} onPress={() => removeImage(index)}>
                <Ionicons name="close-circle" size={24} color="#FF3B30" />
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Pressable onPress={() => { triggerHaptic(); router.back(); }} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color={theme.text} />
                </Pressable>
                <Text style={styles.headerTitle}>Add Photos</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.infoBox}>
                    <Text style={[styles.infoText, { color: theme.text }]}>
                        Room: <Text style={{ fontWeight: 'bold' }}>{roomNumber}</Text>
                    </Text>
                    <Text style={[styles.infoText, { color: theme.text }]}>
                        Building: <Text style={{ fontWeight: 'bold' }}>{buildingID}</Text>
                    </Text>
                </View>

                {images.length > 0 ? (
                    <FlatList
                        data={images}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        numColumns={isDesktop ? 4 : 2}
                        columnWrapperStyle={styles.imageGrid}
                        contentContainerStyle={styles.listContent}
                        ListHeaderComponent={
                            <Pressable style={styles.addMoreBtn} onPress={pickImages}>
                                <Ionicons name="add-circle-outline" size={24} color={theme.primary} />
                                <Text style={[styles.addMoreText, { color: theme.primary }]}>Add More</Text>
                            </Pressable>
                        }
                    />
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="images-outline" size={80} color={theme.border} />
                        <Text style={[styles.emptyTitle, { color: theme.text }]}>No photos selected</Text>
                        <Pressable style={[styles.selectBtn, { backgroundColor: theme.primary }]} onPress={pickImages}>
                            <Ionicons name="library" size={24} color="#fff" />
                            <Text style={styles.selectBtnText}>Select Photos</Text>
                        </Pressable>
                    </View>
                )}
            </View>

            {images.length > 0 && (
                <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
                    <Pressable
                        style={[styles.submitButton, { backgroundColor: theme.primary }, submitting && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.submitButtonText}>Submit {images.length} Photo{images.length !== 1 ? 's' : ''}</Text>
                        )}
                    </Pressable>
                </View>
            )}
        </SafeAreaView>
    );
}

function createStyles(theme: Theme, isDesktop: boolean) {
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
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.border + '44',
        },
        backButton: {
            width: 40,
            height: 40,
            justifyContent: 'center',
        },
        headerTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text,
        },
        content: {
            flex: 1,
        },
        infoBox: {
            padding: 20,
            backgroundColor: theme.card,
            margin: 16,
            borderRadius: 12,
            gap: 4,
            borderWidth: 1,
            borderColor: theme.border + '44',
        },
        infoText: {
            fontSize: 16,
        },
        imageGrid: {
            gap: 12,
            paddingHorizontal: 16,
        },
        listContent: {
            paddingBottom: 20,
        },
        imageWrapper: {
            flex: 1,
            aspectRatio: 1,
            borderRadius: 12,
            overflow: 'hidden',
            backgroundColor: theme.card,
            maxWidth: (SCREEN_WIDTH - 44) / (isDesktop ? 4 : 2),
        },
        thumbnail: {
            width: '100%',
            height: '100%',
        },
        removeBtn: {
            position: 'absolute',
            top: 4,
            right: 4,
            backgroundColor: '#fff',
            borderRadius: 15,
        },
        addMoreBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: 16,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: theme.primary,
            borderRadius: 12,
            margin: 16,
            marginTop: 0,
        },
        addMoreText: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        emptyState: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 40,
            gap: 12,
        },
        emptyTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 8,
        },
        emptySubtitle: {
            fontSize: 16,
            textAlign: 'center',
            lineHeight: 22,
        },
        selectBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: 12,
            gap: 10,
            marginTop: 20,
        },
        selectBtnText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        footer: {
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: theme.border + '44',
            backgroundColor: theme.background,
        },
        submitButton: {
            height: 56,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
        },
        submitButtonDisabled: {
            opacity: 0.5,
        },
        submitButtonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
        },
    });
}
