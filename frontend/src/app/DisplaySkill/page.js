"use client";

import { useEffect, useState } from "react";
import { GetAllSkills, DeleteSkill } from "../services/skillServieces";
import { getToken } from "../utils/token";
import { Loader2, Edit, Trash2, XCircle } from "lucide-react";

export default function SkillList({ onEdit }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const loadSkills = async () => {
    try {
      setError("");
      const token = getToken();
      const { data } = await GetAllSkills(token);
      setSkills(data);
    } catch (err) {
      console.error("Error fetching skills:", err);
      setError("Failed to load skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      const token = getToken();
      await DeleteSkill(confirmDelete.id, token);
      setSkills((prev) =>
        prev.filter((skill) => skill.id !== confirmDelete.id)
      );
      setConfirmDelete(null);
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete skill. Please try again.");
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  return (
    <div className="mt-8 px-3 md:px-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 border border-red-200">
          {error}
        </div>
      )}

      {skills.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-100">
            <p className="text-lg font-medium text-gray-700">No skills found</p>
            <p className="text-sm text-gray-500 mt-1">
              Try adding a new skill to get started!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-3 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex justify-between items-center border border-gray-100"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {skill.name}
                </h3>
                <p className="text-gray-600 mt-1">{skill.description}</p>
                <span className="inline-block mt-2 text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                  {skill.level}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(skill)}
                  className="p-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-full transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => setConfirmDelete(skill)}
                  className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <XCircle className="mx-auto text-red-500" size={40} />
            <h2 className="text-lg font-semibold mt-3">
              Delete “{confirmDelete.name}”?
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
