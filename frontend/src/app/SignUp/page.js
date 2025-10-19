// "use client";

// import { SignUpUser } from "../services/authServices";
// import { useAuth } from "../context/AuthContext";
// import { useState } from "react";
// import { useRouter } from "next/navigation";


// export default function SignUp()
// {
//     const { SignIn } = useAuth();
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });

//   const router = useRouter();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");

//     const handleInputChanges = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) =>
//     {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//           const response = await SignUpUser(form);
//           console.log("Response from backend:", response);
//           setSuccess("Account created successfully! Redirecting...");
//           // await SignIn(response.access_token , response.user);
//           router.push('/SignIn')
          
//         } catch (err) 
//         {
//           if (err.message) {
//             setError(err.message);
//           }

//           else if (err.message.includes("Email exist")) {
//             setError("User already exist by this email");
//           }

//           else if (err.message.includes("Require fileds")) {
//             setError("Require all fileds filled");
//           }

//           else
//           {
//             setError("Sign-up failed");  
//           }
//         }
//         finally
//         {
//             setLoading(false);
//         }          
//     }

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-200 flex items-center justify-center">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
//         >
//           <h2 className="text-3xl font-extrabold text-center text-gray-800">
//             Create Account
//           </h2>

//           {error && <p className="text-sm text-red-600">{error}</p>}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Name
//             </label>
//             <input
//               name="name"
//               type="text"
//               value={form.name}
//               onChange={handleInputChanges}
//               placeholder="Full name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               name="email"
//               type="email"
//               value={form.email}
//               onChange={handleInputChanges}
//               placeholder="Email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               name="password"
//               type="password"
//               value={form.password}
//               onChange={handleInputChanges}
//               placeholder="Password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           {success && <p className="text-sm text-green-600">{success}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full ${
//               loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
//             } text-white py-2 rounded-md text-lg`}
//           >
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>

//           <p className="text-center text-sm text-gray-500">
//             Already have an account?{" "}
//             <a href="/SignIn" className="text-green-600 hover:underline">
//               Sign in
//             </a>
//           </p>
//         </form>
//       </div>
//     );
// }

"use client";

import { SignUpUser } from "../services/authServices";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const { SignIn } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when user starts typing
    if (error) setError("");

    // Check password strength in real-time
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score++;
    else feedback.push("At least 8 characters");

    if (/[A-Z]/.test(password)) score++;
    else feedback.push("One uppercase letter");

    if (/[a-z]/.test(password)) score++;
    else feedback.push("One lowercase letter");

    if (/[0-9]/.test(password)) score++;
    else feedback.push("One number");

    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push("One special character");

    setPasswordStrength({
      score,
      feedback:
        feedback.length > 0
          ? `Needs: ${feedback.slice(0, 2).join(", ")}`
          : "Strong password!",
    });
  };

  const getPasswordStrengthColor = () => {
    if (form.password.length === 0) return "bg-gray-200";
    if (passwordStrength.score <= 2) return "bg-red-500";
    if (passwordStrength.score <= 3) return "bg-yellow-500";
    if (passwordStrength.score <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Additional client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await SignUpUser(form);
      console.log("Response from backend:", response);
      setSuccess("Account created successfully! Redirecting...");

      setTimeout(() => {
        router.push("/SignIn");
      }, 2000);
    } catch (err) {
      if (err.message.includes("Email exist")) {
        setError("An account with this email already exists");
      } else if (err.message.includes("Require fileds")) {
        setError("Please fill in all required fields");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-100 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div
        className={`relative w-full max-w-md transition-all duration-500 ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Card with Glassmorphism Effect */}
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/60 overflow-hidden">
          {/* Decorative Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">
                Join Us Today
              </h2>
              <p className="text-green-100 text-sm">
                Create your account and get started
              </p>
            </div>

            {/* Floating Icons */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/20 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-shake">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-500 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in-up">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-500 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      {success}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleInputChanges}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 transition-all duration-200 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleInputChanges}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 transition-all duration-200 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password Input with Strength Indicator */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                {form.password && (
                  <span
                    className={`text-xs font-medium ${
                      passwordStrength.score <= 2
                        ? "text-red-600"
                        : passwordStrength.score <= 3
                        ? "text-yellow-600"
                        : passwordStrength.score <= 4
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
                  >
                    {passwordStrength.feedback}
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleInputChanges}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 transition-all duration-200 placeholder-gray-400"
                  required
                />
              </div>

              {/* Password Strength Bar */}
              {form.password && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] ${
                loading
                  ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl"
              }`}
            >
              <div className="flex items-center justify-center">
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {loading ? "Creating Account..." : "Create Account"}
              </div>
            </button>

            {/* Terms and Conditions */}
            <p className="text-xs text-center text-gray-500">
              By creating an account, you agree to our{" "}
              <a
                href="/terms"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Privacy Policy
              </a>
            </p>

            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/SignIn"
                className="font-semibold text-green-600 hover:text-green-800 transition-colors duration-200 underline-offset-2 hover:underline"
              >
                Sign in now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}