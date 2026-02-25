import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { applyActionCode } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig';
import { useTheme } from '../theme';

export default function VerifyEmail() {
    const { oobCode, mode } = useLocalSearchParams<{ oobCode?: string, mode?: string }>();
    const router = useRouter();
    const theme = useTheme();

    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        handleVerification();
    }, [oobCode, mode]);

    const handleVerification = async () => {
        if (!oobCode) {
            setStatus('error');
            setErrorMessage('Invalid verification link.');
            return;
        }

        try {
            await applyActionCode(auth, oobCode);
            setStatus('success');
        } catch (error: any) {
            console.error('Verification error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Failed to verify email.');
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
        },
        card: {
            backgroundColor: theme.card,
            padding: 32,
            borderRadius: 24,
            alignItems: 'center',
            width: '100%',
            maxWidth: 400,
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.text,
            marginTop: 16,
            marginBottom: 8,
            textAlign: 'center',
        },
        message: {
            fontSize: 16,
            color: theme.subtext,
            textAlign: 'center',
            marginBottom: 24,
            lineHeight: 22,
        },
        button: {
            backgroundColor: theme.primary,
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 12,
            width: '100%',
            alignItems: 'center',
            marginTop: 8,
        },
        buttonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {status === 'verifying' && (
                    <>
                        <ActivityIndicator size="large" color={theme.primary} />
                        <Text style={styles.title}>Verifying Email...</Text>
                        <Text style={styles.message}>Please wait while we verify your email address.</Text>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <Ionicons name="checkmark-circle" size={64} color="#34C759" />
                        <Text style={styles.title}>Email Verified!</Text>
                        <Text style={styles.message}>Your email has been successfully verified. You can now rate rooms and submit updates.</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => window.close()}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <Ionicons name="alert-circle" size={64} color={theme.destructive} />
                        <Text style={styles.title}>Verification Failed</Text>
                        <Text style={styles.message}>{errorMessage}</Text>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }]}
                            onPress={() => router.replace('/account')}
                        >
                            <Text style={[styles.buttonText, { color: theme.text }]}>Go to Account</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
}