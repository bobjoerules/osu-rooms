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
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    Image as RNImage,
    Share,
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
    wing?: string;
    floor?: string;
    roomNumber?: string;
    userId: string;
    username: string;
    userPhotoUrl?: string | null;
    createdAt: any;
    likes: string[];
    imageUrl?: string;
}


export default function DormScreen() {
    const theme = useTheme();
    const { width } = useWindowDimensions();
    const isDesktopWeb = Platform.OS === 'web' && width >= 768;
    const styles = useMemo(() => createStyles(theme, isDesktopWeb), [theme, isDesktopWeb]);
    useBuildings();
    const triggerHaptic = useHapticFeedback();
    const insets = useSafeAreaInsets();

    const [user, setUser] = useState(auth.currentUser);
    const [posts, setPosts] = useState<DormPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPostText, setNewPostText] = useState('');
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [wing, setWing] = useState('');
    const [floor, setFloor] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuData, setMenuData] = useState<{ post: DormPost, px: number, py: number } | null>(null);

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

        const handleImageResult = (result: ImagePicker.ImagePickerResult) => {
            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        };

        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.8,
        };

        const openCamera = async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'We need camera access to take photos.');
                return;
            }
            const result = await ImagePicker.launchCameraAsync(options);
            handleImageResult(result);
        };

        const openLibrary = async () => {
            const result = await ImagePicker.launchImageLibraryAsync(options);
            handleImageResult(result);
        };

        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Take Photo', 'Choose from Library'],
                    cancelButtonIndex: 0,
                    title: 'Add a photo'
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) openCamera();
                    else if (buttonIndex === 2) openLibrary();
                }
            );
        } else {
            // Simple choice for Android/Web (Web usually only supports Library well via browser picker anyway)
            if (Platform.OS === 'web') {
                openLibrary();
            } else {
                Alert.alert(
                    'Add Photo',
                    'Choose a source',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Take Photo', onPress: openCamera },
                        { text: 'Choose from Library', onPress: openLibrary },
                    ]
                );
            }
        }
    };

    const handleAddPost = async () => {
        triggerHaptic();
        if (!selectedBuilding) return;
        // If creating new post, image is required. If editing, we keep old image if no new one.
        if (!editingPostId && !image) return;

        setSubmitting(true);
        try {
            let imageUrl = image;
            // Only upload if it's a new local image (not a firebase URL)
            if (image && !image.startsWith('https://')) {
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

            const postData = {
                text: newPostText.trim() || '',
                hall: selectedBuilding,
                wing: wing.trim() || null,
                floor: floor.trim() || null,
                roomNumber: roomNumber.trim() || null,
                userId: auth.currentUser?.uid,
                username: auth.currentUser?.displayName || 'Anonymous',
                userPhotoUrl: auth.currentUser?.photoURL || null,
                updatedAt: serverTimestamp(),
                imageUrl
            };

            if (editingPostId) {
                await updateDoc(doc(db, 'dorm_posts', editingPostId), postData);
            } else {
                await addDoc(collection(db, 'dorm_posts'), {
                    ...postData,
                    createdAt: serverTimestamp(),
                    likes: [],
                });
            }

            setModalVisible(false);
            setEditingPostId(null);
            setNewPostText('');
            setSelectedBuilding('');
            setWing('');
            setFloor('');
            setRoomNumber('');
            setImage(null);
        } catch (error) {
            console.error("Error saving post: ", error);
            Alert.alert("Error", `Failed to ${editingPostId ? 'save' : 'post'}. Please try again.`);
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

    const handleMorePress = (event: any, post: DormPost) => {
        triggerHaptic();
        // Use coordinates to position the menu
        const { pageX, pageY } = event.nativeEvent;
        setMenuData({ post, px: pageX, py: pageY });
        setMenuVisible(true);
    };

    const handleMoreAction = async (action: 'edit' | 'delete') => {
        if (!menuData) return;
        const post = menuData.post;
        setMenuVisible(false);

        const performDelete = async () => {
            try {
                await deleteDoc(doc(db, 'dorm_posts', post.id));
            } catch (error) {
                console.error("Error deleting post: ", error);
                Alert.alert("Error", "Failed to delete post.");
            }
        };

        if (action === 'edit') {
            setEditingPostId(post.id);
            setNewPostText(post.text);
            setSelectedBuilding(post.hall);
            setWing(post.wing || '');
            setFloor(post.floor || '');
            setRoomNumber(post.roomNumber || '');
            setImage(post.imageUrl || null);
            setModalVisible(true);
        } else if (action === 'delete') {
            if (Platform.OS === 'web') {
                if (window.confirm("Delete Post: Are you sure? This cannot be undone.")) {
                    performDelete();
                }
            } else {
                Alert.alert("Delete Post", "Are you sure? This cannot be undone.", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", style: "destructive", onPress: performDelete }
                ]);
            }
        }
    };
    const handleShare = async (post: DormPost) => {
        triggerHaptic();
        try {
            const message = `Check out this post from ${post.hall}${post.roomNumber ? ` Room ${post.roomNumber}` : ''} on OSU Room Rates!\n\n"${post.text}"${post.imageUrl ? `\n\nImage: ${post.imageUrl}` : ''}`;
            await Share.share({
                message,
                url: post.imageUrl // iOS supports URL separately
            });
        } catch (error) {
            console.error("Error sharing post: ", error);
        }
    };
    const renderItem = ({ item }: { item: DormPost }) => {
        const userId = auth.currentUser?.uid;
        const isLiked = item.likes?.includes(userId || '');
        const date = item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'Just now';

        return (
            <View style={styles.card}>
                {/* Header: User & Location */}
                <View style={styles.igHeader}>
                    <View style={styles.avatar}>
                        {((item.userId === userId ? auth.currentUser?.photoURL : item.userPhotoUrl)) ? (
                            Platform.OS === 'web' ? (
                                <RNImage
                                    source={{ uri: (item.userId === userId ? auth.currentUser?.photoURL : item.userPhotoUrl) as string }}
                                    style={styles.avatarImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Image
                                    source={{ uri: (item.userId === userId ? auth.currentUser?.photoURL : item.userPhotoUrl) as string }}
                                    style={styles.avatarImage}
                                    contentFit="cover"
                                />
                            )
                        ) : (
                            <Text style={styles.avatarText}>{item.username.charAt(0).toUpperCase()}</Text>
                        )}
                    </View>
                    <View style={styles.igHeaderText}>
                        <Text style={styles.igUsername}>{item.username}</Text>
                        <Text style={styles.igLocation}>
                            {[
                                item.hall,
                                item.wing ? `${item.wing} Wing` : null,
                                item.floor ? `Floor ${item.floor}` : null,
                                item.roomNumber ? `Room ${item.roomNumber}` : null
                            ].filter(Boolean).join(' • ')}
                        </Text>
                    </View>
                    {(isAdmin || item.userId === userId) && (
                        <Pressable style={styles.igDeleteButton} onPress={(e) => handleMorePress(e, item)}>
                            <Ionicons name="ellipsis-horizontal" size={20} color={theme.subtext} />
                        </Pressable>
                    )}
                </View>

                {/* Image */}
                {item.imageUrl && (
                    <Pressable
                        onPress={() => {
                            triggerHaptic();
                            setEnlargedImage(item.imageUrl || null);
                        }}
                    >
                        <View style={styles.igPostImageContainer}>
                            {Platform.OS === 'web' ? (
                                <RNImage
                                    source={{ uri: item.imageUrl }}
                                    style={styles.igPostImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    style={styles.igPostImage}
                                    contentFit="cover"
                                    transition={200}
                                />
                            )}
                        </View>
                    </Pressable>
                )}

                {/* Actions & Likes */}
                <View style={styles.igActionsSection}>
                    <View style={styles.igActionsRow}>
                        <Pressable style={styles.igLikeButton} onPress={() => handleLike(item)}>
                            <Ionicons
                                name={isLiked ? "heart" : "heart-outline"}
                                size={26}
                                color={isLiked ? "#FF3B30" : theme.text}
                            />
                            <Text style={styles.igLikesCount}>{item.likes?.length || 0}</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.igCaptionSection}>
                    <Text style={styles.igCaption}>{item.text}</Text>
                    <Text style={styles.igDate}>{date}</Text>
                </View>
            </View>
        );
    };

    if (!isOSUVerified) {
        return (
            <View style={[styles.container, styles.centeredOverlay]}>
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
                    <Text style={[styles.title, { color: theme.text }]}>Dorms</Text>
                    <Pressable
                        onPress={() => {
                            triggerHaptic();
                            setEditingPostId(null);
                            setNewPostText('');
                            setSelectedBuilding('');
                            setWing('');
                            setFloor('');
                            setRoomNumber('');
                            setImage(null);
                            setModalVisible(true);
                        }}
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

            {loading ? (
                <View style={styles.centeredOverlay}>
                    <ActivityIndicator size="large" color={theme.primary} />
                </View>
            ) : posts.length === 0 ? (
                <View style={styles.centeredOverlay}>
                    <Ionicons name="people-outline" size={48} color={theme.subtext + '44'} />
                    <Text style={[styles.message, { marginTop: 16, color: theme.subtext }]}>No posts yet</Text>
                    <Text style={styles.subMessage}>Be the first to share an update from your hall!</Text>
                </View>
            ) : (
                <View style={[{ flex: 1 }, isDesktopWeb && { width: '100%', maxWidth: 1200, alignSelf: 'center' }]}>
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
                </View>
            )}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => {
                        setModalVisible(false);
                        setEditingPostId(null);
                        setNewPostText('');
                        setSelectedBuilding('');
                        setWing('');
                        setFloor('');
                        setRoomNumber('');
                        setImage(null);
                    }}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.modalContainer}
                        pointerEvents="box-none"
                    >
                        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>{editingPostId ? 'Edit Post' : 'New Post'}</Text>
                                <Pressable onPress={() => {
                                    setModalVisible(false);
                                    setEditingPostId(null);
                                    setNewPostText('');
                                    setSelectedBuilding('');
                                    setWing('');
                                    setFloor('');
                                    setRoomNumber('');
                                    setImage(null);
                                }}>
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

                                {isPickerOpen && (
                                    <View style={styles.pickerList}>
                                        <FlatList
                                            data={buildingNames}
                                            keyExtractor={item => item}
                                            nestedScrollEnabled
                                            renderItem={({ item, index }) => (
                                                <Pressable
                                                    style={[
                                                        styles.pickerItem,
                                                        index === 0 && { borderTopWidth: 0 }
                                                    ]}
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
                            </View>

                            <View style={styles.row}>
                                <View style={styles.rowInput}>
                                    <Text style={styles.label}>Wing</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="A, B, C..."
                                        placeholderTextColor={theme.placeholder}
                                        value={wing}
                                        onChangeText={setWing}
                                        maxLength={10}
                                    />
                                </View>
                                <View style={styles.rowInput}>
                                    <Text style={styles.label}>Floor</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="1-5"
                                        placeholderTextColor={theme.placeholder}
                                        value={floor}
                                        onChangeText={setFloor}
                                        keyboardType="numeric"
                                        maxLength={2}
                                    />
                                </View>
                                <View style={styles.rowInput}>
                                    <Text style={styles.label}>Room</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="101"
                                        placeholderTextColor={theme.placeholder}
                                        value={roomNumber}
                                        onChangeText={setRoomNumber}
                                        keyboardType="numeric"
                                        maxLength={10}
                                    />
                                </View>
                            </View>

                            <Text style={styles.label}>Message (Optional)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Share something..."
                                placeholderTextColor={theme.placeholder}
                                multiline
                                numberOfLines={4}
                                value={newPostText}
                                onChangeText={setNewPostText}
                            />

                            <Text style={[styles.label, editingPostId && { color: theme.subtext }]}>
                                {editingPostId ? 'Image (Cannot be changed)' : 'Image'}
                            </Text>
                            <Pressable
                                style={[styles.imagePicker, editingPostId && { opacity: 0.7, borderStyle: 'solid' }]}
                                onPress={editingPostId ? undefined : pickImage}
                                disabled={!!editingPostId}
                            >
                                {image ? (
                                    <View style={{ width: '100%', height: '100%' }}>
                                        <Image source={{ uri: image }} style={styles.previewImage} contentFit="cover" />
                                        {!editingPostId && (
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
                                        )}
                                    </View>
                                ) : (
                                    <View style={styles.imagePlaceholder}>
                                        <Ionicons name="camera-outline" size={32} color={theme.subtext} />
                                        <Text style={{ color: theme.subtext, marginTop: 4 }}>Add a photo</Text>
                                    </View>
                                )}
                            </Pressable>

                            <Pressable
                                style={[styles.submitButton, (!selectedBuilding || !image || submitting) && styles.disabledButton]}
                                onPress={handleAddPost}
                                disabled={!selectedBuilding || !image || submitting}
                            >
                                {submitting ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.submitButtonText}>{editingPostId ? 'Save' : 'Post'}</Text>
                                )}
                            </Pressable>
                        </Pressable>
                    </KeyboardAvoidingView>
                </Pressable>
            </Modal>

            <Modal
                visible={!!enlargedImage}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setEnlargedImage(null)}
            >
                <Pressable
                    style={styles.fullScreenOverlay}
                    onPress={() => setEnlargedImage(null)}
                >
                    <Image
                        source={{ uri: enlargedImage || '' }}
                        style={styles.fullScreenImage}
                        contentFit="contain"
                    />
                </Pressable>
            </Modal>

            {/* Post Options Dropdown */}
            <Modal
                visible={menuVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={() => setMenuVisible(false)}
                >
                    {menuData && (
                        <View style={[
                            styles.popoverMenu,
                            {
                                top: Math.min(menuData.py, SCREEN_HEIGHT - 120),
                                left: Math.min(menuData.px - 140, width - 170)
                            }
                        ]}>
                            <Pressable
                                style={({ pressed }) => [styles.menuItem, pressed && { backgroundColor: theme.border + '44' }]}
                                onPress={() => handleMoreAction('edit')}
                            >
                                <Ionicons name="pencil-outline" size={18} color={theme.text} />
                                <Text style={[styles.menuItemText, { color: theme.text }]}>Edit Text</Text>
                            </Pressable>
                            <View style={[styles.menuDivider, { backgroundColor: theme.border + '44' }]} />
                            <Pressable
                                style={({ pressed }) => [styles.menuItem, pressed && { backgroundColor: theme.destructive + '11' }]}
                                onPress={() => handleMoreAction('delete')}
                            >
                                <Ionicons name="trash-outline" size={18} color={theme.destructive} />
                                <Text style={[styles.menuItemText, { color: theme.destructive }]}>Delete Post</Text>
                            </Pressable>
                        </View>
                    )}
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function createStyles(theme: Theme, isDesktopWeb: boolean) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        centeredOverlay: {
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            zIndex: -1,
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
            padding: 0,
            paddingBottom: 40,
        },
        card: {
            backgroundColor: theme.card,
            borderRadius: 0,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
            marginBottom: 8,
            overflow: 'hidden',
        },
        igHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
        },
        avatar: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: theme.primary + '22',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            overflow: 'hidden',
        },
        avatarImage: {
            width: '100%',
            height: '100%',
        },
        avatarText: {
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.primary,
        },
        igHeaderText: {
            flex: 1,
        },
        igUsername: {
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.text,
        },
        igLocation: {
            fontSize: 12,
            color: theme.subtext,
        },
        igDeleteButton: {
            padding: 4,
        },
        igPostImageContainer: {
            width: '100%',
            aspectRatio: isDesktopWeb ? 16 / 9 : 1,
            minHeight: isDesktopWeb ? 300 : 250,
            maxHeight: isDesktopWeb ? 600 : 500,
            backgroundColor: theme.border + '22',
            overflow: 'hidden',
        },
        igPostImage: {
            width: '100%',
            height: '100%',
        },
        igActionsSection: {
            paddingHorizontal: 12,
            paddingTop: 12,
        },
        igActionsRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            marginBottom: 8,
        },
        igLikeButton: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
        },
        igShareButton: {
            padding: 4,
        },
        igLikesCount: {
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.text,
        },
        igCaptionSection: {
            paddingHorizontal: 12,
            paddingTop: 6,
            paddingBottom: 16,
        },
        igCaption: {
            fontSize: 14,
            color: theme.text,
            lineHeight: 18,
        },
        igCaptionUsername: {
            fontWeight: 'bold',
        },
        igDate: {
            fontSize: 10,
            color: theme.subtext,
            marginTop: 6,
            textTransform: 'uppercase',
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
            zIndex: 100,
            position: 'relative',
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
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: 200,
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 12,
            marginTop: 4,
            zIndex: 1000,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
        },
        pickerItem: {
            padding: 12,
            borderTopWidth: 1,
            borderTopColor: theme.border,
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
        row: {
            flexDirection: 'row',
            gap: 12,
            marginTop: 4,
        },
        rowInput: {
            flex: 1,
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
        fullScreenOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.95)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        fullScreenImage: {
            width: '100%',
            height: '100%',
        },
        popoverMenu: {
            position: 'absolute',
            width: 160,
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 4,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            borderWidth: 1,
            borderColor: theme.border + '44',
            zIndex: 1000,
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            gap: 12,
            borderRadius: 8,
        },
        menuItemText: {
            fontSize: 14,
            fontWeight: '600',
        },
        menuDivider: {
            height: 1,
            marginHorizontal: 8,
        },
    });
}