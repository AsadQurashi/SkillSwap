"use client";

import AuthProvider from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function ClientLayout({ children }) {
  const Pathname = usePathname();

  const noNavbarRoutes = ["/SignIn", "/SignUp"];
  const adminRoutes = Pathname?.startsWith("/admin");

  const showNavbar = !noNavbarRoutes.includes(Pathname) && adminRoutes;
  const showFooter = !noNavbarRoutes.includes(Pathname) && adminRoutes;

  if (adminRoutes) {
    return (
      <AuthProvider>
        {children} {/* This will be wrapped by AdminLayout */}
      </AuthProvider>
    );
  }

  // For regular routes - show navbar + content + footer
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {showNavbar && <Navbar />}
        <main className="flex-grow">{children}</main>
        {showFooter && <Footer />}
      </div>
    </AuthProvider>
  );
}
