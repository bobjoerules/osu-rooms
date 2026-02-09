import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface SettingsContextType {
    showPlaceholders: boolean;
    setShowPlaceholders: (value: boolean) => void;
    useHaptics: boolean;
    setUseHaptics: (value: boolean) => void;
    showBuildingImages: boolean;
    setShowBuildingImages: (value: boolean) => void;
    useBetaFeatures: boolean;
    setUseBetaFeatures: (value: boolean) => void;
    showSubmitTab: boolean;
    setShowSubmitTab: (value: boolean) => void;
    showDormTab: boolean;
    setShowDormTab: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const PLACEHOLDERS_KEY = '@osu_rooms_show_placeholders';
const HAPTICS_KEY = '@osu_rooms_use_haptics';
const BUILDING_IMAGES_KEY = '@osu_rooms_show_building_images';
const BETA_FEATURES_KEY = '@osu_rooms_use_beta_features';
const SHOW_SUBMIT_TAB_KEY = '@osu_rooms_show_submit_tab';
const DORM_TAB_KEY = '@osu_rooms_show_dorm_tab';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [showPlaceholders, setShowPlaceholders] = useState(false);
    const [useHaptics, setUseHaptics] = useState(true);
    const [showBuildingImages, setShowBuildingImages] = useState(Platform.OS !== 'web');
    const [useBetaFeatures, setUseBetaFeatures] = useState(false);
    const [showSubmitTab, setShowSubmitTab] = useState(true);
    const [showDormTab, setShowDormTab] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const [placeholdersValue, hapticsValue, buildingImagesValue, betaFeaturesValue, showSubmitTabValue, showDormTabValue] = await Promise.all([
                    AsyncStorage.getItem(PLACEHOLDERS_KEY),
                    AsyncStorage.getItem(HAPTICS_KEY),
                    AsyncStorage.getItem(BUILDING_IMAGES_KEY),
                    AsyncStorage.getItem(BETA_FEATURES_KEY),
                    AsyncStorage.getItem(SHOW_SUBMIT_TAB_KEY),
                    AsyncStorage.getItem(DORM_TAB_KEY),
                ]);

                if (placeholdersValue !== null) {
                    setShowPlaceholders(JSON.parse(placeholdersValue));
                }
                if (hapticsValue !== null) {
                    setUseHaptics(JSON.parse(hapticsValue));
                }
                if (buildingImagesValue !== null) {
                    setShowBuildingImages(JSON.parse(buildingImagesValue));
                }
                if (betaFeaturesValue !== null) {
                    setUseBetaFeatures(JSON.parse(betaFeaturesValue));
                }
                if (showSubmitTabValue !== null) {
                    setShowSubmitTab(JSON.parse(showSubmitTabValue));
                }
                if (showDormTabValue !== null) {
                    setShowDormTab(JSON.parse(showDormTabValue));
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

    const updateShowBuildingImages = async (value: boolean) => {
        try {
            setShowBuildingImages(value);
            await AsyncStorage.setItem(BUILDING_IMAGES_KEY, JSON.stringify(value));
        } catch (e) {
            console.error('Failed to save settings', e);
        }
    };

    const updateUseBetaFeatures = async (value: boolean) => {
        try {
            setUseBetaFeatures(value);
            await AsyncStorage.setItem(BETA_FEATURES_KEY, JSON.stringify(value));
        } catch (e) {
            console.error('Failed to save settings', e);
        }
    };

    const updateShowSubmitTab = async (value: boolean) => {
        try {
            setShowSubmitTab(value);
            await AsyncStorage.setItem(SHOW_SUBMIT_TAB_KEY, JSON.stringify(value));
        } catch (e) {
            console.error('Failed to save settings', e);
        }
    };

    const updateShowDormTab = async (value: boolean) => {
        try {
            setShowDormTab(value);
            await AsyncStorage.setItem(DORM_TAB_KEY, JSON.stringify(value));
        } catch (e) {
            console.error('Failed to save settings', e);
        }
    };

    const value = React.useMemo(() => ({
        showPlaceholders,
        setShowPlaceholders: updateShowPlaceholders,
        useHaptics,
        setUseHaptics: updateUseHaptics,
        showBuildingImages,
        setShowBuildingImages: updateShowBuildingImages,
        useBetaFeatures,
        setUseBetaFeatures: updateUseBetaFeatures,
        showSubmitTab,
        setShowSubmitTab: updateShowSubmitTab,
        showDormTab,
        setShowDormTab: updateShowDormTab
    }), [
        showPlaceholders,
        useHaptics,
        showBuildingImages,
        useBetaFeatures,
        showSubmitTab,
        showDormTab
    ]);

    return (
        <SettingsContext.Provider value={value}>
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

    const trigger = useCallback((style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
        if (useHaptics && Platform.OS !== 'web') {
            Haptics.impactAsync(style);
        }
    }, [useHaptics]);

    return trigger;
}