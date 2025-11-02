"use client";


import { createContext, useContext, useEffect, useState } from "react";
import { getToken , saveToken , removeToken, getUser, saveUser, removeUser } from "@/app/utils/token";
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
        const userData = getUser();
        
        if (token && userData) {
            setAuthState({
                token,
                user: userData,
                isAuthenticated: true,
                isLoading: false
            });
        }
        else
        {
            setAuthState(prev => ({ ...prev, isLoading: false }));    
        }
    }, []);

    const SignIn = (token, userData) => {
      console.log("🔑 SignIn received:", { token, userData }); // Add this
      saveToken(token);
      saveUser(userData);
      setAuthState({
        token,
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });
      if (userData.role === "admin" || userData.role === "super_admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/Dashboard");
      }

      router.refresh();
    };

    const SignOut = () => {
        removeToken();
        removeUser();
        setAuthState({
            token: null,
            user: null,
            isAuthenticated: false,
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