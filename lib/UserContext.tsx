import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';

interface UserContextType {
    user: User | null;
    loading: boolean;
    canComment: boolean;
    isAdmin: boolean;
    isOwner: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [canComment, setCanComment] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const isOSU = currentUser.email?.toLowerCase().endsWith('@oregonstate.edu') ?? false;

                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        const role = userDoc.data().role;
                        const adminStatus = role === 'admin';
                        const ownerStatus = role === 'owner';

                        setIsAdmin(adminStatus);
                        setIsOwner(ownerStatus);
                        setCanComment(isOSU || adminStatus || ownerStatus);
                    } else {
                        setCanComment(isOSU);
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    setCanComment(isOSU);
                }
            } else {
                setCanComment(false);
                setIsAdmin(false);
                setIsOwner(false);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        loading,
        canComment,
        isAdmin,
        isOwner
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
