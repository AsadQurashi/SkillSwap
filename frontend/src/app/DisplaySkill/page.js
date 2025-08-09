"use client";

import { useEffect, useState } from "react";
import { GetAllSkills , DeleteSkill } from "../services/skillServieces";
import { getToken } from "../utils/token";
import { Loader2, Edit, Trash2 } from "lucide-react";

export default function SkillList({ onEdit }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSkills = async () => {
    try {
      const token = getToken();
      const { data } = await GetAllSkills(token);
      setSkills(data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      const token = getToken();
      await DeleteSkill(id, token);
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  if (loading) return <Loader2 className="animate-spin" />;

  return (
    <div className="grid gap-4 mt-8">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-lg">{skill.name}</h3>
            <p className="text-gray-600">{skill.description}</p>
            <span className="text-sm text-indigo-500">{skill.level}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(skill)}
              className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => handleDelete(skill.id)}
              className="p-2 bg-red-100 hover:bg-red-200 rounded"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
