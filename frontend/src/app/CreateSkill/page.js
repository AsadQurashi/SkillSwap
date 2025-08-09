"use client";

import { useState } from "react";
import { CreateSkill } from "../services/skillServieces";
import { getToken } from "../utils/token";
import { Loader2, XCircle } from "lucide-react";

export default function SkillForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    video: null,
    link: "",
    image: null,
    document: null,
    level: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = getToken();
      console.log("DEBUG token:", token);

      
      const data = new FormData();

      data.append("name", form.name);
      data.append("description", form.description);
      data.append("link", form.link);
      data.append("level", form.level);
      if (form.video) data.append("video", form.video);
      if (form.image) data.append("image", form.image);
      if (form.document) data.append("document", form.document);

      

      const response = await CreateSkill(data, token);
      setSuccess("✅ Skill created successfully!");
      clearForm();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 400)
        setError("⚠️ Please fill all required fields correctly.");
      else if (status === 401)
        setError("🔐 You are not authorized. Please log in.");
      else if (error.request)
        setError("📡 No response from server. Try again later.");
      else setError("❌ Unexpected error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setForm({
      name: "",
      description: "",
      video: null,
      link: "",
      image: null,
      document: null,
      level : ""
    });
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10 border border-indigo-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">
            🛠️ Add New Skill
          </h2>
          <button
            onClick={clearForm}
            type="button"
            title="Clear form"
            className="text-red-500 hover:text-red-700"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              📝 Skill Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g., JavaScript"
              className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              📖 Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Briefly describe this skill..."
              className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Level */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              📊 Skill Level *
            </label>
            <select
              required
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">-- Select Level --</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          {/* Video Upload */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              🎥 Upload Video
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setForm({ ...form, video: e.target.files[0] })}
              className="block w-full text-sm text-gray-600"
            />
            {form.video && (
              <p className="text-sm text-indigo-600 mt-1">
                🎬 Selected: {form.video.name}
              </p>
            )}
          </div>

          {/* Link */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              🔗 External Link
            </label>
            <input
              type="url"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              🖼️ Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              className="block w-full text-sm text-gray-600"
            />
            {form.image && (
              <p className="text-sm text-indigo-600 mt-1">
                🖌️ Selected: {form.image.name}
              </p>
            )}
          </div>

          {/* Document Upload */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              📄 Upload Document (PDF/DOC)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setForm({ ...form, document: e.target.files[0] })
              }
              className="block w-full text-sm text-gray-600"
            />
            {form.document && (
              <p className="text-sm text-indigo-600 mt-1">
                📂 Selected: {form.document.name}
              </p>
            )}
          </div>

          {/* Feedback */}
          {error && (
            <p className="text-red-600 bg-red-100 rounded p-2 text-sm">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 bg-green-100 rounded p-2 text-sm">
              {success}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-medium py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Submitting...
              </>
            ) : (
              "🚀 Submit Skill"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
