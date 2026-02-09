import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';

export default function PrivacyPolicy() {
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
            fontSize: 18,
            fontWeight: '600',
            color: theme.text,
            marginBottom: 8,
        },
        paragraph: {
            fontSize: 16,
            color: theme.text,
            lineHeight: 24,
            marginBottom: 12,
        },
        listItem: {
            flexDirection: 'row',
            marginBottom: 8,
            paddingLeft: 8,
        },
        bullet: {
            fontSize: 16,
            color: theme.text,
            marginRight: 8,
        },
        listItemText: {
            fontSize: 16,
            color: theme.text,
            lineHeight: 24,
            flex: 1,
        },
        webContainer: {
            width: '100%',
            maxWidth: 800,
            alignSelf: 'center',
        }
    });

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={[styles.header, isDesktopWeb && styles.webContainer]}>
                {router.canGoBack() && (
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={theme.text} />
                    </TouchableOpacity>
                )}
                <Text style={styles.headerTitle}>Privacy Policy</Text>
            </View>

            <ScrollView contentContainerStyle={[styles.contentContainer, isDesktopWeb && styles.webContainer]}>
                <View style={styles.section}>
                    <Text style={styles.paragraph}>Last updated: {new Date().toLocaleDateString()}</Text>
                    <Text style={styles.paragraph}>
                        This Privacy Policy describes how we collect, use, and share your information when you use our app, OSU Rooms.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Information We Collect</Text>

                    <Text style={[styles.paragraph, { fontWeight: '600' }]}>1. Information You Provide</Text>
                    <Text style={styles.paragraph}>
                        When you create an account or use our app, we may collect the following information:
                    </Text>
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.listItemText}><Text style={{ fontWeight: 'bold' }}>Account Information:</Text> If you sign up, we collect your email address to authenticate you and manage your account.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.listItemText}><Text style={{ fontWeight: 'bold' }}>User Content:</Text> We collect the ratings, reviews, and photos you submit for rooms.</Text>
                    </View>

                    <Text style={[styles.paragraph, { fontWeight: '600', marginTop: 12 }]}>2. Information Collected Automatically</Text>
                    <Text style={styles.paragraph}>
                        We use Firebase (a service by Google) to power our backend. Firebase may collect certain usage data to help us understand how the app is used and to ensure stability:
                    </Text>
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.listItemText}>Device information (e.g., model, OS version)</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.listItemText}>IP address and basic usage logs</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How We Use Your Information</Text>
                    <Text style={styles.paragraph}>
                        We use the information we collect to:
                    </Text>
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.listItemText}>Provide and maintain the OSU Rooms service.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.listItemText}>Authenticate your identity and prevent spam/abuse.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.listItemText}>Display your ratings and reviews to other users.</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Data Deletion</Text>
                    <Text style={styles.paragraph}>
                        You have the right to delete your account and associated data. You can delete your account directly within the app settings, or contact us to request deletion.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Children's Privacy</Text>
                    <Text style={styles.paragraph}>
                        Our service is intended for university students and faculty. We do not knowingly collect personal information from children under the age of 13.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact</Text>
                    <Text style={styles.paragraph}>
                        If you have questions about this policy, please contact us via the app support page.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}