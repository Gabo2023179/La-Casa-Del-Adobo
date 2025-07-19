import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { app } from '../firebase';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const db = getFirestore(app);

    const { login } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Guardar usuario en Firestore
            const userDocRef = doc(db, 'users', email); // Suponiendo que el email se usa como ID de documento
            await setDoc(userDocRef, { password }); // Guardar la contraseña (considera hashearla en producción)

            // Iniciar sesión después de registrarse
            await login(email, password);
        } catch (error) {
            setError('Error al registrarse: ' + error.message);
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Registrarse</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
