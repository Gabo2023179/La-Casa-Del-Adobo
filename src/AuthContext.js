// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from './firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const db = getFirestore(app);

    const login = async (email, password) => {
        try {
            const docRef = doc(db, 'users', email); // Suponiendo que el email se usa como ID de documento
            const docSnap = await getDoc(docRef);

            if (docSnap.exists() && docSnap.data().password === password) {
                setCurrentUser({ email });
            } else {
                throw new Error('Credenciales incorrectas');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
