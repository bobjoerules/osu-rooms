import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';

/**
 * Dedicated Account Deletion Page for Google Play Data Safety compliance.
 */
export default function DeleteAccountRequest() {
    const theme = useTheme();
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isDesktopWeb = Platform.OS === 'web' && width >= 768;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        backButton: {
            marginRight: 16,
            padding: 4,
        },
        headerTitle: {
            fontSize: 20,
            fontWeight: '600',
            color: theme.text,
        },
        contentContainer: {
            padding: 20,
            paddingBottom: 40,
        },
        section: {
            marginBottom: 24,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: '700',
            color: theme.text,
            marginBottom: 12,
        },
        paragraph: {
            fontSize: 16,
            color: theme.text,
            lineHeight: 24,
            marginBottom: 12,
        },
        stepContainer: {
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: theme.border,
        },
        stepText: {
            fontSize: 16,
            color: theme.text,
            lineHeight: 24,
        },
        bold: {
            fontWeight: '700',
        },
        webContainer: {
            width: '100%',
            maxWidth: 800,
            alignSelf: 'center',
        },
        footerLink: {
            color: theme.primary,
            textDecorationLine: 'underline',
        }
    });

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <Stack.Screen options={{ title: 'Delete Account - OSU Rooms', headerShown: false }} />

            <View style={[styles.header, isDesktopWeb && styles.webContainer]}>
                {router.canGoBack() && (
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={theme.text} />
                    </TouchableOpacity>
                )}
                <Text style={styles.headerTitle}>Account Deletion Request</Text>
            </View>

            <ScrollView contentContainerStyle={[styles.contentContainer, isDesktopWeb && styles.webContainer]}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Requesting Account Deletion for OSU Rooms</Text>
                    <Text style={styles.paragraph}>
                        At <Text style={styles.bold}>OSU Rooms</Text> (developed by bobjoerules), we respect your privacy and provide a simple way to delete your data and account.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { fontSize: 18 }]}>How to delete your account</Text>
                    <Text style={styles.paragraph}>
                        You can delete your account immediately from within the app by following these steps:
                    </Text>

                    <View style={styles.stepContainer}>
                        <Text style={styles.stepText}>1. Open the <Text style={styles.bold}>OSU Rooms</Text> app or website.</Text>
                    </View>
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepText}>2. Navigate to the <Text style={styles.bold}>Account</Text> tab (bottom right icon).</Text>
                    </View>
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepText}>3. Ensure you are signed in.</Text>
                    </View>
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepText}>4. Scroll down and tap the red <Text style={styles.bold}>Delete Account</Text> button.</Text>
                    </View>
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepText}>5. Confirm the deletion in the pop-up window.</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { fontSize: 18 }]}>Web Request / Manual Assistance</Text>
                    <Text style={styles.paragraph}>
                        If you are unable to access the app or wish to request deletion manually, please contact the developer directly at:
                    </Text>
                    <Text style={[styles.paragraph, styles.bold]}>Email: email@bobjoerules.com</Text>
                    <Text style={styles.paragraph}>
                        Please provide your registered email address. Requests sent via email are typically processed within 48 to 72 hours.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { fontSize: 18 }]}>What data is deleted?</Text>
                    <Text style={styles.paragraph}>
                        When you delete your account, the following data is permanently purged from our systems:
                    </Text>
                    <Text style={styles.paragraph}>• Your authentication profile (email address and login credentials).</Text>
                    <Text style={styles.paragraph}>• Your user profile record (display name, role).</Text>
                    <Text style={styles.paragraph}>• Your unique user ID mapping.</Text>
                    <Text style={styles.paragraph}>• Direct associations with Any submitted ratings or reviews.</Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { fontSize: 18 }]}>What data is kept?</Text>
                    <Text style={styles.paragraph}>
                        We do not retain personal identifiable information after deletion. However:
                    </Text>
                    <Text style={styles.paragraph}>
                        • Basic analytics logs (device model, app version) that do not contain personal identifiers may persist in Firebase logs for up to 30 days for debugging purposes before being automatically rotated out.
                    </Text>
                    <Text style={styles.paragraph}>
                        • Any aggregate ratings (e.g., the average score of a room) will remain, but will no longer be linked to your identity.
                    </Text>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity onPress={() => router.push('/privacy')}>
                        <Text style={styles.footerLink}>View full Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}