import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface SettingsContextType {
    showPlaceholders: boolean;
    setShowPlaceholders: (value: boolean) => void;
    useHaptics: boolean;
    setUseHaptics: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const PLACEHOLDERS_KEY = '@osu_room_rates_show_placeholders';
const HAPTICS_KEY = '@osu_room_rates_use_haptics';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [showPlaceholders, setShowPlaceholders] = useState(false);
    const [useHaptics, setUseHaptics] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load initial settings
        const loadSettings = async () => {
            try {
                const [placeholdersValue, hapticsValue] = await Promise.all([
                    AsyncStorage.getItem(PLACEHOLDERS_KEY),
                    AsyncStorage.getItem(HAPTICS_KEY),
                ]);

                if (placeholdersValue !== null) {
                    setShowPlaceholders(JSON.parse(placeholdersValue));
                }
                if (hapticsValue !== null) {
                    setUseHaptics(JSON.parse(hapticsValue));
                }
            } catch (e) {
                console.error('Failed to load settings', e);
            } finally {
                setIsLoading(false);
            }
        };
        loadSettings();
    }, []);

    const updateShowPlaceholders = async (value: boolean) => {
        try {
            setShowPlaceholders(value);
            await AsyncStorage.setItem(PLACEHOLDERS_KEY, JSON.stringify(value));
        } catch (e) {
            console.error('Failed to save settings', e);
        }
    };

    const updateUseHaptics = async (value: boolean) => {
        try {
            setUseHaptics(value);
            await AsyncStorage.setItem(HAPTICS_KEY, JSON.stringify(value));
        } catch (e) {
            console.error('Failed to save settings', e);
        }
    };

    if (isLoading) {
        return null; // Or a loading spinner
    }

    return (
        <SettingsContext.Provider value={{
            showPlaceholders,
            setShowPlaceholders: updateShowPlaceholders,
            useHaptics,
            setUseHaptics: updateUseHaptics
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

export function useHapticFeedback() {
    const { useHaptics } = useSettings();

    const trigger = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
        if (useHaptics && Platform.OS !== 'web') {
            Haptics.impactAsync(style);
        }
    };

    return trigger;
}
