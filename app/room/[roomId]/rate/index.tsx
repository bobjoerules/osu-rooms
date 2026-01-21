import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import StarRating from '../../../../components/StarRating';
import TemperatureRating from '../../../../components/TemperatureRating';
import { Theme, useTheme } from '../../../../theme';
import { useHapticFeedback } from '../../../../lib/SettingsContext';

export default function RateRoomModal() {
    const { roomId } = useLocalSearchParams<{ roomId: string }>();
    const router = useRouter();
    const theme = useTheme();
    const triggerHaptic = useHapticFeedback();
    const styles = useMemo(() => createStyles(theme), [theme]);

    const finalRoomId = Array.isArray(roomId) ? roomId[0] : roomId;

    const handleClose = () => {
        triggerHaptic();
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace(`/room/${finalRoomId}`);
        }
    };

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={handleClose}
        >
            <TouchableWithoutFeedback>
                <View style={styles.popup}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: theme.text }]}>Rate Room</Text>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={theme.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.content}>
                        <View style={styles.ratingGroup}>
                            <Text style={[styles.label, { color: theme.text }]}>Overall Rating</Text>
                            <StarRating itemId={finalRoomId as string} size={40} />
                        </View>

                        <View style={styles.ratingGroup}>
                            <Text style={[styles.label, { color: theme.text }]}>Chairs</Text>
                            <StarRating itemId={`${finalRoomId}_chairs`} size={40} />
                        </View>

                        <View style={styles.ratingGroup}>
                            <Text style={[styles.label, { color: theme.text }]}>Lighting</Text>
                            <StarRating itemId={`${finalRoomId}_lighting`} size={40} />
                        </View>

                        <View style={styles.ratingGroup}>
                            <Text style={[styles.label, { color: theme.text }]}>Projector/Screen Visibility</Text>
                            <StarRating itemId={`${finalRoomId}_projector`} size={40} />
                        </View>

                        <View style={styles.ratingGroup}>
                            <Text style={[styles.label, { color: theme.text }]}>Temperature</Text>
                            <TemperatureRating itemId={`${finalRoomId}_temperature`} />
                        </View>

                        <TouchableOpacity
                            style={[styles.doneButton, { backgroundColor: theme.primary }]}
                            onPress={handleClose}
                        >
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </TouchableOpacity>
    );
}

function createStyles(theme: Theme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        popup: {
            width: '90%',
            maxHeight: '80%',
            backgroundColor: theme.card,
            borderRadius: 16,
            overflow: 'hidden',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
            backgroundColor: theme.card,
        },
        title: {
            fontSize: 18,
            fontWeight: '600',
            color: theme.text,
        },
        closeButton: {
            padding: 4,
        },
        content: {
            padding: 24,
            gap: 24,
        },
        subtitle: {
            fontSize: 16,
            lineHeight: 22,
            marginBottom: 8,
        },
        ratingGroup: {
            gap: 12,
            alignItems: 'center',
        },
        label: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.text,
        },
        doneButton: {
            marginTop: 24,
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
        },
        doneButtonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: '600',
        },
    });
}
