'use client';

import { auth } from '@/firebase';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        setCurrentUser(null);
        return signOut(auth);
    }

    function resetPasswordEmail(email) {
        return sendPasswordResetEmail(auth, email);
    }

    const value = {
        currentUser,
        isLoadingUser,
        signup,
        login,
        logout,
        resetPasswordEmail,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log('Authenticate user');
            setIsLoadingUser(true);
            try {
                setCurrentUser(user);
                if (!user) throw new Error('User not found');
            } catch (err) {
                console.log(err.message);
            } finally {
                setIsLoadingUser(false);
            }
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
