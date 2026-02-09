import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Building } from '../data/rooms';
import { db } from '../firebaseConfig';

interface DatabaseContextType {
    buildings: Building[];
    loading: boolean;
    error: Error | null;
    getRoomById: (roomId: string) => { room: any, buildingName: string } | null;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const q = query(collection(db, 'buildings'), orderBy('name', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const buildingsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Building[];

            setBuildings(buildingsData);
            setLoading(false);
        }, (err) => {
            console.error('Error fetching buildings:', err);
            setError(err);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const getRoomById = useCallback((roomId: string) => {
        for (const building of buildings) {
            const room = building.rooms?.find(r => r.id === roomId);
            if (room) {
                return { room, buildingName: building.name };
            }
        }
        return null;
    }, [buildings]);

    const value = React.useMemo(() => ({
        buildings,
        loading,
        error,
        getRoomById
    }), [buildings, loading, error, getRoomById]);

    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    );
}

export function useBuildings() {
    const context = useContext(DatabaseContext);
    if (context === undefined) {
        throw new Error('useBuildings must be used within a DatabaseProvider');
    }
    return context;
}