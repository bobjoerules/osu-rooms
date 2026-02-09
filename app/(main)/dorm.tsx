import { Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useMemo, useState } from 'react';
import {
    ActionSheetIOS,
    ActivityIndicator,
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    useWindowDimensions
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { auth, db, storage } from '../../firebaseConfig';
import { useBuildings } from '../../lib/DatabaseContext';
import { useHapticFeedback } from '../../lib/SettingsContext';
import { Theme, useTheme } from '../../theme';

interface DormPost {
    id: string;
    text: string;
    hall: string;
    userId: string;
    username: string;
    createdAt: any;
    likes: string[];
    imageUrl?: string;
}


export default function DormScreen() {
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    useBuildings();
    const triggerHaptic = useHapticFeedback();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const isDesktopWeb = Platform.OS === 'web' && width >= 768;

    const [user, setUser] = useState(auth.currentUser);
    const [posts, setPosts] = useState<DormPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPostText, setNewPostText] = useState('');
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        const role = userData.role;
                        setIsAdmin(role === "admin" || role === "owner");
                    }
                } catch (err) {
                    console.error("Error checking role:", err);
                }
            } else {
                setIsAdmin(false);
            }
        });
        return unsubscribe;
    }, []);

    const userEmail = user?.email;
    const isOSUVerified = !!(userEmail && user?.emailVerified && userEmail.toLowerCase().endsWith('@oregonstate.edu'));

    useEffect(() => {
        const q = query(collection(db, 'dorm_posts'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newPosts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as DormPost[];
            setPosts(newPosts);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const buildingNames = useMemo(() => {
        return [
            "Bloss Hall",
            "Buxton Hall",
            "Callahan Hall",
            "Cauthorn Hall",
            "Finley Hall",
            "Halsell Hall",
            "Hawley Hall",
            "International Learning-Living Center (ILLC)",
            "Keiser Hall",
            "McNary Hall",
            "Poling Hall",
            "Sackett Hall",
            "Tebeau Hall",
            "Weatherford Hall",
            "West Hall",
            "Wilson Hall"
        ].sort();
    }, []);

    const pickImage = async () => {
        triggerHaptic();
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleAddPost = async () => {
        triggerHaptic();
        if (!newPostText.trim() || !selectedBuilding) return;

        setSubmitting(true);
        try {
            let imageUrl = null;
            if (image) {
                const blob: Blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () { resolve(xhr.response); };
                    xhr.onerror = function (e) { reject(new TypeError("Network request failed")); };
                    xhr.responseType = "blob";
                    xhr.open("GET", image, true);
                    xhr.send(null);
                });

                const filename = `dorm_posts/${Date.now()}-${auth.currentUser?.uid}.jpg`;
                const storageRef = ref(storage, filename);
                await uploadBytes(storageRef, blob);
                imageUrl = await getDownloadURL(storageRef);
            }

            await addDoc(collection(db, 'dorm_posts'), {
                text: newPostText.trim(),
                hall: selectedBuilding,
                userId: auth.currentUser?.uid,
                username: auth.currentUser?.displayName || 'Anonymous',
                createdAt: serverTimestamp(),
                likes: [],
                imageUrl
            });
            setModalVisible(false);
            setNewPostText('');
            setSelectedBuilding('');
            setImage(null);
        } catch (error) {
            console.error("Error adding post: ", error);
            Alert.alert("Error", "Failed to post. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleLike = async (post: DormPost) => {
        triggerHaptic();
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const postRef = doc(db, 'dorm_posts', post.id);
        const isLiked = post.likes?.includes(userId);

        try {
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(userId) : arrayUnion(userId)
            });
        } catch (error) {
            console.error("Error updating like: ", error);
        }
    };

    const handleDeletePost = async (post: DormPost) => {
        triggerHaptic();

        const performDelete = async () => {
            try {
                await deleteDoc(doc(db, 'dorm_posts', post.id));
            } catch (error) {
                console.error("Error deleting post: ", error);
                Alert.alert("Error", "Failed to delete post.");
            }
        };

        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Delete Post'],
                    destructiveButtonIndex: 1,
                    cancelButtonIndex: 0,
                    title: 'Delete post?',
                    message: 'This action cannot be undone.'
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) {
                        performDelete();
                    }
                }
            );
        } else {
            const confirm = async () => {
                if (Platform.OS === 'web') {
                    return window.confirm("Are you sure you want to delete this post?");
                } else {
                    return new Promise((resolve) => {
                        Alert.alert(
                            "Delete Post",
                            "Are you sure you want to delete this post? This action cannot be undone.",
                            [
                                { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
                                { text: "Delete", style: "destructive", onPress: () => resolve(true) }
                            ]
                        );
                    });
                }
            };

            if (await confirm()) {
                performDelete();
            }
        }
    };

    const renderItem = ({ item }: { item: DormPost }) => {
        const userId = auth.currentUser?.uid;
        const isLiked = item.likes?.includes(userId || '');
        const date = item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'Just now';

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.hallName}>{item.hall}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>

                {item.imageUrl && (
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.postImage}
                        contentFit="cover"
                        transition={200}
                    />
                )}

                <Text style={styles.postText}>{item.text}</Text>

                <View style={styles.cardFooter}>
                    <Text style={styles.username}>@{item.username}</Text>
                    <View style={styles.actions}>
                        {(isAdmin || item.userId === userId) && (
                            <Pressable style={styles.deleteButton} onPress={() => handleDeletePost(item)}>
                                <Ionicons name="trash-outline" size={18} color={theme.destructive} />
                            </Pressable>
                        )}
                        <Pressable style={styles.likeButton} onPress={() => handleLike(item)}>
                            <Ionicons name={isLiked ? "heart" : "heart-outline"} size={20} color={isLiked ? "#FF3B30" : theme.subtext} />
                            <Text style={[styles.likeCount, { color: theme.subtext }]}>{item.likes?.length || 0}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    };

    if (!isOSUVerified) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Ionicons name="lock-closed" size={48} color={theme.subtext} />
                <Text style={[styles.message, { marginTop: 16 }]}>Access Restricted</Text>
                <Text style={styles.subMessage}>You must have a verified Oregon State University email to access this tab.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={[
                styles.header,
                Platform.OS === 'web' && { paddingTop: 75 + 16 },
                isDesktopWeb && { width: '100%', maxWidth: 1200, alignSelf: 'center' }
            ]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[styles.title, { color: theme.text }]}>Dorm Posts</Text>
                    <Pressable
                        onPress={() => { triggerHaptic(); setModalVisible(true); }}
                        style={styles.addButtonContainer}
                    >
                        {Platform.OS === 'ios' ? (
                            <GlassView
                                glassEffectStyle="regular"
                                isInteractive={true}
                                tintColor="rgba(30,30,30,0.8)"
                                style={styles.addButtonBlur}
                            >
                                <Ionicons name="add" size={24} color="#fff" />
                            </GlassView>
                        ) : (
                            <View style={styles.addButton}>
                                <Ionicons name="add" size={24} color="#fff" />
                            </View>
                        )}
                    </Pressable>
                </View>
            </View>

            <View style={[{ flex: 1 }, isDesktopWeb && { width: '100%', maxWidth: 1200, alignSelf: 'center' }]}>
                {loading ? (
                    <View style={styles.centered}>
                        <ActivityIndicator size="large" color={theme.primary} />
                    </View>
                ) : posts.length === 0 ? (
                    <View style={styles.centered}>
                        <Ionicons name="chatbubbles-outline" size={48} color={theme.subtext + '44'} />
                        <Text style={[styles.message, { marginTop: 16, color: theme.subtext }]}>No posts yet</Text>
                        <Text style={styles.subMessage}>Be the first to share an update from your hall!</Text>
                    </View>
                ) : (
                    <FlatList
                        data={posts}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={[{ flex: 1 }, isDesktopWeb && { width: '100%', maxWidth: 1200, alignSelf: 'center' }]}
                        contentContainerStyle={[
                            styles.listContent,
                            { paddingBottom: insets.bottom + (Platform.OS === 'android' ? 80 : 40) }
                        ]}
                    />
                )}
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.modalContainer}
                        pointerEvents="box-none"
                    >
                        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>New Post</Text>
                                <Pressable onPress={() => setModalVisible(false)}>
                                    <Ionicons name="close" size={24} color={theme.text} />
                                </Pressable>
                            </View>

                            <Text style={styles.label}>Building</Text>
                            <View style={styles.dropdownContainer}>
                                <Pressable
                                    style={styles.pickerTrigger}
                                    onPress={() => setIsPickerOpen(!isPickerOpen)}
                                >
                                    <Text style={[styles.pickerText, !selectedBuilding && { color: theme.placeholder }]}>
                                        {selectedBuilding || "Select a hall"}
                                    </Text>
                                    <Ionicons name={isPickerOpen ? "chevron-up" : "chevron-down"} size={20} color={theme.subtext} />
                                </Pressable>
                            </View>

                            {isPickerOpen && (
                                <View style={styles.pickerList}>
                                    <FlatList
                                        data={buildingNames}
                                        keyExtractor={item => item}
                                        nestedScrollEnabled
                                        renderItem={({ item }) => (
                                            <Pressable
                                                style={styles.pickerItem}
                                                onPress={() => {
                                                    setSelectedBuilding(item);
                                                    setIsPickerOpen(false);
                                                }}
                                            >
                                                <Text style={styles.pickerItemText}>{item}</Text>
                                            </Pressable>
                                        )}
                                    />
                                </View>
                            )}

                            <Text style={styles.label}>Message</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Share something..."
                                placeholderTextColor={theme.placeholder}
                                multiline
                                numberOfLines={4}
                                value={newPostText}
                                onChangeText={setNewPostText}
                            />

                            <Text style={styles.label}>Image (Optional)</Text>
                            <Pressable style={styles.imagePicker} onPress={pickImage}>
                                {image ? (
                                    <View style={{ width: '100%', height: '100%' }}>
                                        <Image source={{ uri: image }} style={styles.previewImage} contentFit="cover" />
                                        <Pressable
                                            style={styles.removeImage}
                                            onPress={(e) => {
                                                e.stopPropagation();
                                                triggerHaptic();
                                                setImage(null);
                                            }}
                                        >
                                            <Ionicons name="close-circle" size={24} color="#fff" />
                                        </Pressable>
                                    </View>
                                ) : (
                                    <View style={styles.imagePlaceholder}>
                                        <Ionicons name="camera-outline" size={32} color={theme.subtext} />
                                        <Text style={{ color: theme.subtext, marginTop: 4 }}>Add a photo</Text>
                                    </View>
                                )}
                            </Pressable>

                            <Pressable
                                style={[styles.submitButton, (!selectedBuilding || !newPostText.trim() || submitting) && styles.disabledButton]}
                                onPress={handleAddPost}
                                disabled={!selectedBuilding || !newPostText.trim() || submitting}
                            >
                                {submitting ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.submitButtonText}>Post</Text>
                                )}
                            </Pressable>
                        </Pressable>
                    </KeyboardAvoidingView>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}

function createStyles(theme: Theme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        centered: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            paddingBottom: 80,
        },
        header: {
            paddingHorizontal: 20,
            paddingVertical: 16,
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
        },
        subtitle: {
            fontSize: 14,
            marginTop: 4,
        },
        addButtonBlur: {
            width: 44,
            height: 44,
            borderRadius: 22,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.1)',
            overflow: 'visible',
        },
        addButton: {
            backgroundColor: theme.primary,
            width: 44,
            height: 44,
            borderRadius: 22,
            justifyContent: 'center',
            alignItems: 'center',
        },
        listContent: {
            padding: 20,
            paddingTop: 0,
            gap: 16,
        },
        card: {
            backgroundColor: theme.card,
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.border,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
        },
        postImage: {
            width: '100%',
            height: 200,
            borderRadius: 8,
            marginBottom: 12,
        },
        cardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
        },
        hallName: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.primary,
        },
        date: {
            fontSize: 12,
            color: theme.subtext,
        },
        postText: {
            fontSize: 16,
            color: theme.text,
            marginBottom: 12,
            lineHeight: 22,
        },
        cardFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        username: {
            fontSize: 13,
            color: theme.subtext,
            fontWeight: '500',
            flex: 1,
        },
        actions: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        deleteButton: {
            padding: 4,
            opacity: 0.7,
        },
        likeButton: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            padding: 4,
        },
        likeCount: {
            fontSize: 14,
        },
        message: {
            fontSize: 18,
            fontWeight: '600',
            color: theme.text,
            textAlign: 'center',
        },
        subMessage: {
            fontSize: 14,
            color: theme.subtext,
            marginTop: 8,
            textAlign: 'center',
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContainer: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
        },
        modalContent: {
            backgroundColor: theme.card,
            borderRadius: 24,
            padding: 24,
            width: '100%',
            maxWidth: 400,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
        },
        modalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        modalTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
        },
        label: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.text,
            marginBottom: 8,
            marginTop: 12,
        },
        dropdownContainer: {
            zIndex: 10,
        },
        pickerTrigger: {
            backgroundColor: theme.card,
            padding: 12,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        pickerText: {
            fontSize: 16,
            color: theme.text,
        },
        pickerList: {
            maxHeight: 200,
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 12,
            marginTop: 4,
        },
        pickerItem: {
            padding: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        pickerItemText: {
            fontSize: 16,
            color: theme.text,
        },
        input: {
            backgroundColor: theme.card,
            padding: 12,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.border,
            fontSize: 16,
            color: theme.text,
            textAlignVertical: 'top',
        },
        submitButton: {
            backgroundColor: theme.primary,
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
            marginTop: 24,
        },
        disabledButton: {
            opacity: 0.5,
        },
        submitButtonText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
        },
        imagePicker: {
            height: 150,
            backgroundColor: theme.card,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.border,
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        },
        imagePlaceholder: {
            alignItems: 'center',
        },
        previewImage: {
            width: '100%',
            height: '100%',
        },
        removeImage: {
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 12,
        },
    });
}