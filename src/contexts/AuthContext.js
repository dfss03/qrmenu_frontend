import React, { createContext, useState } from 'react';

import {iniciarSesion as iniciarSesionApi, registro as registroApi} from '../apis';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(false);

    const iniciarSesion = async (usuario, contraseña, callback) => {
        setLoading(true);
        const response = await iniciarSesionApi(usuario, contraseña)
        console.log("response", response);

        if (response && response.auth_token) {
            localStorage.setItem("token", response.auth_token);
            setToken(response.auth_token);
            callback();
        }

        setLoading(false);
    }

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        setToken("");
    }

    const registro = async (usuario, contraseña, callback) => {
        setLoading(true);
        const response = await registroApi(usuario, contraseña);
        if (response && response.id) {
            callback();
        }
        setLoading(false);
    }
    
    const value = {
        token,
        loading,
        iniciarSesion,
        cerrarSesion,
        registro,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export default AuthContext;