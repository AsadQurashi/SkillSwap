// import Link from "next/link";


// export default function Navbar() {
//     return (
//       <nav className="p-4 bg-gray-100 flex gap-4">
//         <Link href="/">Home</Link>
//         <Link href="/SignIn"> SignIn </Link>
//         <Link href="/SignUp">SignUp</Link>
//         <Link href="/skills/CreateSkill">SkillForm</Link>
//         <Link href="/skills/DisplaySkill">DisplaySkill</Link>
//         <Link href="/session/incomingSession"> Session Request </Link>
//       </nav>
//     );
// }
"use client";
import { useState } from "react";
import Link from "next/link";
import NotificationBell from "../session/notification/page";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#4361ee] to-[#3a0ca3] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <i className="fas fa-hands-helping text-[#f72585] text-2xl"></i>
            <span className="text-2xl font-bold">SkillShare</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-300"
            >
              Home
            </Link>

            <Link
              href="/skills/CreateSkill"
              className="hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-300"
            >
              SkillForm
            </Link>
            <Link
              href="/skills/DisplaySkill"
              className="hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-300"
            >
              DisplaySkill
            </Link>
            <Link
              href="/session/incomingSession"
              className="hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-300"
            >
              Session Request
            </Link>

            <NotificationBell />
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-3">
            <Link
              href="/SignIn"
              className="border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-[#4361ee] transition-all duration-300 font-semibold"
            >
              Sign In
            </Link>
            <Link
              href="/SignUp"
              className="bg-[#f72585] text-white px-6 py-2 rounded-full hover:bg-pink-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-semibold"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-[#3a0ca3] rounded-lg p-4">
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/skills/CreateSkill"
                className="hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                SkillForm
              </Link>
              <Link
                href="/skills/DisplaySkill"
                className="hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                DisplaySkill
              </Link>
              <Link
                href="/session/incomingSession"
                className="hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Session Request
              </Link>
              <div className="flex gap-3 pt-2">
                <Link
                  href="/SignIn"
                  className="border-2 border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-[#4361ee] transition-all duration-300 font-semibold flex-1 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/SignUp"
                  className="bg-[#f72585] text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-all duration-300 font-semibold flex-1 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}