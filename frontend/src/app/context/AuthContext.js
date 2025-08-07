"use client";


import { createContext, useContext, useEffect, useState } from "react";
import { getToken , saveToken , removeToken } from "@/app/utils/token";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (token) {
            setUser({ token })
        }
    }, []);

    const SignIn = (token) => {
        saveToken(token);
        setUser({ token })
        router.push('/Dashboard');
    };

    const SignOut = (token) => {
        removeToken(token);
        setUser(null)
        router.push('/SignIn');
    };

    return (
        <AuthContext.Provider value={{ user, SignIn, SignOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);