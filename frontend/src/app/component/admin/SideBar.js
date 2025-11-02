"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const menuItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { path: "/admin/users", label: "User Management", icon: "👥" },
  { path: "/admin/skills", label: "Skill Management", icon: "💡" },
  { path: "/admin/reports", label: "Report Management", icon: "🚩" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, SignOut } = useAuth();

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 border-r border-purple-500/20 h-full fixed z-40 shadow-2xl shadow-purple-500/10">
      {/* Header */}
      <div className="p-6 border-b border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 transition-all duration-500 hover:scale-105 hover:shadow-purple-500/50">
            <span className="text-white font-bold text-xl">SS</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              SkillShare
            </h1>
            <p className="text-purple-300/80 text-sm font-medium">
              Admin Panel
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white font-semibold text-sm truncate">
              {user?.name || "Admin User"}
            </p>
            {user?.role === "super_admin" && (
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg shadow-purple-500/40">
                Super
              </span>
            )}
            {user?.role === "admin" && (
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg shadow-cyan-500/40">
                Admin
              </span>
            )}
          </div>
          <p className="text-purple-200/70 text-xs truncate font-medium">
            {user?.email || "admin@skillshare.com"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-4 rounded-xl transition-all duration-500 group relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/40 transform scale-[1.02] border border-purple-300/50"
                    : "text-purple-100/90 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/5 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20"
                }`}
              >
                {/* Animated background effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 transition-all duration-500 ${
                    isActive ? "opacity-100" : "group-hover:opacity-20"
                  }`}
                ></div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 blur-xl group-hover:opacity-20 transition-opacity duration-500"></div>

                <span
                  className={`text-xl mr-4 z-10 transition-all duration-500 ${
                    isActive
                      ? "scale-110 rotate-12"
                      : "group-hover:scale-110 group-hover:rotate-12"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-semibold z-10 drop-shadow-sm">
                  {item.label}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute right-4 flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                    <div className="w-1 h-1 bg-white/60 rounded-full ml-1 animate-pulse delay-100"></div>
                  </div>
                )}

                {/* Hover arrow indicator */}
                {!isActive && (
                  <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-1">
                    <span className="text-pink-300 text-lg">→</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-1 w-full p-4 border-t border-purple-500/20 bg-slate-900/80 backdrop-blur-sm">
        <button
          onClick={SignOut}
          className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-100 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 hover:text-white transition-all duration-500 font-semibold border border-purple-500/30 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20 group backdrop-blur-sm"
        >
          <span className="mr-3 transition-all duration-500 group-hover:-translate-x-1 group-hover:scale-110">
            ⚡
          </span>
          Sign Out
        </button>
      </div>

      {/* Animated decorative elements */}
      <div className="absolute top-1/2 -right-1 w-2 h-20 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-full opacity-80 animate-pulse"></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-40 right-6 w-1 h-1 bg-pink-400 rounded-full opacity-40 animate-float delay-1000"></div>
        <div className="absolute bottom-40 left-8 w-1 h-1 bg-blue-400 rounded-full opacity-50 animate-float delay-2000"></div>
      </div>
    </div>
  );
}
