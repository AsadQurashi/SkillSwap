"use client";

import AuthProvider from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";


export default function ClientLayout({ children }) {
  const Pathname = usePathname();

  const noNavbarRoutes = ["/SignIn", "/SignUp"];

  const showNavbar = !noNavbarRoutes.includes(Pathname);

  return (
    <AuthProvider>
      {showNavbar && <Navbar />}
      {children}
    </AuthProvider>
  );
}
