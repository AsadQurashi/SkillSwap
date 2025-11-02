"use client";

import { useEffect, useState } from "react";
import { getToken } from "../utils/token";
import {
  Loader2,
  XCircle,
  Upload,
  FileText,
  ImageIcon,
  Video,
  Link2,
} from "lucide-react";
import { CreateSkill, UpdateSkill } from "../services/skillServieces";

export default function SkillForm({ editSKill, onComplete, onCancel, id }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    video: null,
    link: "",
    image: null,
    document: null,
    level: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [dragActive, setDragActive] = useState({
    video: false,
    image: false,
    document: false,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (editSKill) {
      setForm({
        name: editSKill.name || "",
        description: editSKill.description || "",
        video: editSKill.video || null,
        link: editSKill.link || "",
        image: editSKill.image || null,
        document: editSKill.document || null,
        level: editSKill.level || "",
      });
    }
  }, [editSKill]);

  const handleDrag = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive({ ...dragActive, [field]: true });
    } else if (e.type === "dragleave") {
      setDragActive({ ...dragActive, [field]: false });
    }
  };

  const handleDrop = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive({ ...dragActive, [field]: false });

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      // Validate file types
      if (field === "image" && !file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      if (field === "video" && !file.type.startsWith("video/")) {
        setError("Please upload a video file");
        return;
      }
      if (
        field === "document" &&
        !file.type.includes("pdf") &&
        !file.type.includes("document")
      ) {
        setError("Please upload a PDF or DOC file");
        return;
      }

      setForm({ ...form, [field]: file });
    }
  };

  const handleFileChange = (e, field) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, [field]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (!form.name.trim() || !form.level) {
      setError("Please fill all required fields (*)");
      setLoading(false);
      return;
    }

    try {
      const token = getToken();
      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("link", form.link);
      data.append("level", form.level);
      if (form.video) data.append("video", form.video);
      if (form.image) data.append("image", form.image);
      if (form.document) data.append("document", form.document);

      if (editSKill) {
        await UpdateSkill(editSKill.id, data, token);
        setSuccess("Skill updated successfully! 🎉");
      } else {
        await CreateSkill(data, token);
        setSuccess("Skill created successfully! 🎉");
      }

      if (onComplete) onComplete();
      setTimeout(() => clearForm(), 1500);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 400) setError("Please fill all required fields correctly");
      else if (status === 401)
        setError("You are not authorized. Please log in");
      else if (err.request)
        setError("No response from server. Try again later");
      else setError("Unexpected error: " + err.message);
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
      level: "",
    });
    setError("");
    setSuccess("");
    if (onCancel) onCancel();
  };

  const removeFile = (field) => {
    setForm({ ...form, [field]: null });
  };

  const FileUploadArea = ({
    field,
    accept,
    label,
    icon: Icon,
    description,
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-800">
        <Icon className="inline h-4 w-4 mr-2" />
        {label}
      </label>
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
          dragActive[field]
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-25"
        }`}
        onDragEnter={(e) => handleDrag(e, field)}
        onDragLeave={(e) => handleDrag(e, field)}
        onDragOver={(e) => handleDrag(e, field)}
        onDrop={(e) => handleDrop(e, field)}
      >
        <input
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(e, field)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">
          {form[field]
            ? form[field].name
            : `Drag & drop or click to upload ${description}`}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {accept.includes("*") ? "Any file type" : accept}
        </p>
        {form[field] && (
          <button
            type="button"
            onClick={() => removeFile(field)}
            className="mt-2 text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Remove file
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div
        className={`relative w-full max-w-2xl transition-all duration-500 ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Glassmorphism Card */}
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/60 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">
                {editSKill ? "Edit Skill" : "Add New Skill"}
              </h2>
              <p className="text-blue-100 text-sm">
                {editSKill
                  ? "Update your skill details"
                  : "Share your expertise with the community"}
              </p>
            </div>
            <button
              onClick={clearForm}
              type="button"
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Success/Error Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-shake">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in-up">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-500"
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

            {/* Skill Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Skill Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., JavaScript, Graphic Design, Public Speaking"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 transition-all duration-200 placeholder-gray-400"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Briefly describe this skill, what you can teach, or what makes you proficient..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 transition-all duration-200 placeholder-gray-400 resize-none"
              />
            </div>

            {/* Skill Level */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Skill Level <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 transition-all duration-200"
              >
                <option value="">Select your proficiency level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            {/* External Link */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                <Link2 className="inline h-4 w-4 mr-2" />
                External Link
              </label>
              <input
                type="url"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://example.com/portfolio"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 transition-all duration-200 placeholder-gray-400"
              />
            </div>

            {/* File Upload Sections */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Video Upload */}
              <FileUploadArea
                field="video"
                accept="video/*"
                label="Upload Video"
                icon={Video}
                description="a video demonstration"
              />

              {/* Image Upload */}
              <FileUploadArea
                field="image"
                accept="image/*"
                label="Upload Image"
                icon={ImageIcon}
                description="an image"
              />
            </div>

            {/* Document Upload */}
            <FileUploadArea
              field="document"
              accept=".pdf,.doc,.docx,.txt"
              label="Upload Document"
              icon={FileText}
              description="a document"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] ${
                loading
                  ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
              }`}
            >
              <div className="flex items-center justify-center">
                {loading && (
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                )}
                {loading
                  ? "Processing..."
                  : editSKill
                  ? "Update Skill"
                  : "Create Skill"}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}