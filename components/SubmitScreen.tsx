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
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BUILDINGS_DATA } from '../data/rooms';
import { auth, db, storage } from '../firebaseConfig';
import { Theme, useTheme } from '../theme';

export default function SubmitScreen() {
    const theme = useTheme();
    const router = useRouter();
    const styles = useMemo(() => createStyles(theme), [theme]);

    const { initialBuilding, initialRoomNumber } = useLocalSearchParams<{ initialBuilding?: string, initialRoomNumber?: string }>();

    const [building, setBuilding] = useState(initialBuilding || '');
    const [roomNumber, setRoomNumber] = useState(initialRoomNumber || '');
    const [roomType, setRoomType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [isOtherSelected, setIsOtherSelected] = useState(false);

    const buildingNames = useMemo(() => [
        ...BUILDINGS_DATA.map(b => b.name).sort(),
        "Other (Type manually)"
    ], []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!auth.currentUser) {
            Alert.alert('Error', 'You must be signed in to submit room info.');
            return;
        }

        setSubmitting(true);
        try {
            let imageUrl = null;

            if (image) {
                const blob: Blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        resolve(xhr.response);
                    };
                    xhr.onerror = function (e) {
                        reject(new TypeError("Network request failed"));
                    };
                    xhr.responseType = "blob";
                    xhr.open("GET", image, true);
                    xhr.send(null);
                });

                const filename = `submissions/${Date.now()}-${auth.currentUser?.uid}.jpg`;
                const storageRef = ref(storage, filename);
                await uploadBytes(storageRef, blob);
                imageUrl = await getDownloadURL(storageRef);
            }

            await addDoc(collection(db, 'submissions'), {
                building: building.trim(),
                roomNumber: roomNumber.trim(),
                roomType: roomType.trim(),
                capacity: capacity.trim(),
                imageUrl,
                userId: auth.currentUser?.uid,
                userEmail: auth.currentUser?.email,
                status: 'pending',
                createdAt: serverTimestamp(),
            });

            const resetForm = () => {
                setBuilding('');
                setRoomNumber('');
                setRoomType('');
                setCapacity('');
                setImage(null);
                setIsOtherSelected(false);
            };

            resetForm();
            if (initialBuilding || initialRoomNumber) {
                router.back();
            }
        } catch (error: any) {
            console.error('Submission Error:', error.code, error.message);

            let errorMessage = 'Failed to submit. Please try again later.';
            if (error.code === 'permission-denied' || error.code === 'storage/unauthorized') {
                errorMessage = 'Permission denied. Please ensure you have set your Firebase rules to allow creation in the "submissions" collection and uploads to Storage.';
            }

            Alert.alert('Submission Error', errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    bounces={false}
                    alwaysBounceVertical={false}
                    overScrollMode="never"
                >
                    <View style={styles.header}>
                        {(initialBuilding || initialRoomNumber) ? (
                            <Pressable onPress={() => router.back()} style={styles.backButton}>
                                <Ionicons name="close" size={28} color={theme.text} />
                            </Pressable>
                        ) : (
                            <View style={{ width: 40 }} />
                        )}
                        <Text style={styles.headerTitle}>Add/Edit Room</Text>
                        <View style={{ width: 40 }} />
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>Building Name</Text>
                        <View style={styles.dropdownContainer}>
                            <Pressable
                                style={[styles.pickerTrigger, isPickerOpen && styles.pickerTriggerOpen]}
                                onPress={() => setIsPickerOpen(!isPickerOpen)}
                            >
                                <Text style={[
                                    styles.pickerTriggerText,
                                    !building && { color: theme.placeholder }
                                ]}>
                                    {building || "Select a building"}
                                </Text>
                                <Ionicons
                                    name={isPickerOpen ? "chevron-up" : "chevron-down"}
                                    size={20}
                                    color={theme.subtext}
                                />
                            </Pressable>

                            {isPickerOpen && (
                                <View style={styles.inlinePicker}>
                                    <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
                                        {buildingNames.map((item) => (
                                            <Pressable
                                                key={item}
                                                style={styles.inlinePickerItem}
                                                onPress={() => {
                                                    if (item === "Other (Type manually)") {
                                                        setIsOtherSelected(true);
                                                        setBuilding('');
                                                    } else {
                                                        setIsOtherSelected(false);
                                                        setBuilding(item);
                                                    }
                                                    setIsPickerOpen(false);
                                                }}
                                            >
                                                <Text style={[
                                                    styles.inlinePickerItemText,
                                                    building === item && { fontWeight: 'bold' }
                                                ]}>
                                                    {item}
                                                </Text>
                                                {building === item && (
                                                    <Ionicons name="checkmark" size={18} color={theme.text} />
                                                )}
                                            </Pressable>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                        </View>

                        {isOtherSelected && (
                            <TextInput
                                style={styles.input}
                                placeholder="Enter building name"
                                placeholderTextColor={theme.placeholder}
                                value={building}
                                onChangeText={setBuilding}
                                autoFocus
                            />
                        )}

                        <Text style={styles.label}>Room Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 100, 210"
                            placeholderTextColor={theme.placeholder}
                            value={roomNumber}
                            onChangeText={setRoomNumber}
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Room Type</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Classroom, Lab, Lecture Hall"
                            placeholderTextColor={theme.placeholder}
                            value={roomType}
                            onChangeText={setRoomType}
                        />

                        <Text style={styles.label}>Capacity</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 50, 200"
                            placeholderTextColor={theme.placeholder}
                            value={capacity}
                            onChangeText={setCapacity}
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Photo (Recommended)</Text>
                        <Pressable style={styles.imagePicker} onPress={pickImage}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.previewImage} contentFit="cover" />
                            ) : (
                                <View style={styles.imagePlaceholder}>
                                    <Ionicons name="camera-outline" size={24} color={theme.subtext} />
                                    <Text style={styles.imagePlaceholderText}>Tap to add a photo</Text>
                                </View>
                            )}
                        </Pressable>

                        <Pressable
                            style={[
                                styles.submitButton,
                                (!building.trim() || !roomNumber.trim() || submitting) && styles.submitButtonDisabled,
                            ]}
                            onPress={handleSubmit}
                            disabled={!building.trim() || !roomNumber.trim() || submitting}
                        >
                            {submitting ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.submitButtonText}>Submit for Review</Text>
                            )}
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

function createStyles(theme: Theme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        scrollContent: {
            paddingHorizontal: 20,
            paddingBottom: 20,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
        },
        backButton: {
            width: 40,
            height: 40,
            justifyContent: 'center',
        },
        headerTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
        },
        form: {
            marginTop: 12,
            gap: 12,
        },
        label: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.text,
            marginBottom: -6,
        },
        input: {
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 12,
            fontSize: 16,
            color: theme.text,
            borderWidth: 1,
            borderColor: theme.border,
        },
        textArea: {
            height: 80,
            textAlignVertical: 'top',
        },
        imagePicker: {
            height: 200,
            backgroundColor: theme.card,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.border,
            borderStyle: 'dashed',
            overflow: 'hidden',
        },
        previewImage: {
            width: '100%',
            height: '100%',
        },
        imagePlaceholder: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
        },
        imagePlaceholderText: {
            color: theme.subtext,
            fontSize: 14,
        },
        submitButton: {
            backgroundColor: theme.primary,
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
            marginTop: 12,
        },
        submitButtonDisabled: {
            opacity: 0.5,
        },
        submitButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        pickerTrigger: {
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.border,
        },
        pickerTriggerOpen: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderColor: theme.border,
        },
        pickerTriggerText: {
            fontSize: 16,
            color: theme.text,
        },
        dropdownContainer: {
            zIndex: 100,
            position: 'relative',
        },
        inlinePicker: {
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
            borderTopWidth: 0,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            overflow: 'hidden',
        },
        inlinePickerItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: theme.border,
        },
        inlinePickerItemText: {
            fontSize: 16,
            color: theme.text,
        },
    });
}
