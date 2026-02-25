import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebaseConfig';

export interface BannerConfig {
    active: boolean;
    title: string;
    description: string;
    icon: string;
    borderColor: string;
}

interface AppContextType {
    bannerConfig: BannerConfig | null;
    bannerHeight: number;
    setBannerHeight: (height: number) => void;
    updateBannerConfig: (config: BannerConfig) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [bannerConfig, setBannerConfig] = useState<BannerConfig | null>(null);
    const [bannerHeight, setBannerHeight] = useState(0);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'config', 'banner'), (snapshot) => {
            if (snapshot.exists()) {
                setBannerConfig(snapshot.data() as BannerConfig);
            } else {
                // Initial default config if doc doesn't exist
                setBannerConfig({
                    active: false,
                    title: '',
                    description: '',
                    icon: 'information-circle',
                    borderColor: '#D73F09',
                });
            }
        }, (error) => {
            console.warn('Banner config listener error (likely rules):', error.message);
            // Fail silently and keep default null/hidden state
        });

        return unsub;
    }, []);

    const updateBannerConfig = async (config: BannerConfig) => {
        await setDoc(doc(db, 'config', 'banner'), config);
    };

    return (
        <AppContext.Provider value={{ bannerConfig, bannerHeight, setBannerHeight, updateBannerConfig }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}