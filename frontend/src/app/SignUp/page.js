"use client"

import { SignUpUser } from "../services/authServices";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function SignUp()
{
    const { SignIn } = useAuth();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

    const handleInputChanges = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
          const response = await SignUpUser(form);
          setSuccess("Account created successfully!");
          setTimeout(() => {
            SignIn(response.token);
          }, 2000);
          
        } catch (err) 
        {
          if (err.message) {
            setError(err.message);
          }

          else if (err.message.includes("Email exist")) {
            setError("User already exist by this email");
          }

          else if (err.message.includes("Require fileds")) {
            setError("Require all fileds filled");
          }

          else
          {
            setError("Sign-up failed");  
          }
        }
        finally
        {
            setLoading(false);
        }          
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-200 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-800">
            Create Account
          </h2>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleInputChanges}
              placeholder="Full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleInputChanges}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleInputChanges}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            } text-white py-2 rounded-md text-lg`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/SignIn" className="text-green-600 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    );
}