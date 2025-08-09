"use client";


import { createContext, useContext, useEffect, useState } from "react";
import { getToken , saveToken , removeToken } from "@/app/utils/token";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [authState, setAuthState] = useState(
        {
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading : true
        }
    )
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (token) {
            setAuthState({
                token,
                user: null,
                isAuthentictated: true,
                isLoading: false
            });
        }
        else
        {
            setAuthState(prev => ({ ...prev, isLoading: false }));    
        }
    }, []);

    const SignIn = (token , userData) => {
        saveToken(token);
        setAuthState({
            token,
            user: userData,
            isAuthentictated: true,
            isLoading: false,
        });
        router.push('/Dashboard');
        router.refresh();
    };

    const SignOut = () => {
        const token = getToken();
        removeToken(token);
        setAuthState({
            token: null,
            user: null,
            isAuthentictated: false,
        })
        router.push('/SignIn');
        router.refresh()
    };

    return (
        <AuthContext.Provider value={{ ...authState, SignIn, SignOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);