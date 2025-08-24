"use client";

import SkillForm from "@/app/component/CreateSkill";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken } from "@/app/utils/token";
import { GetById } from "@/app/services/skillServieces";

export default function EditSkillPage() {
  const { id } = useParams();
  const [skillData, setSkillData] = useState(null);

  useEffect(() => {
    const loadSkill = async () => {
      try {
        const token = getToken();
        const data = await GetById(id, token);
          setSkillData(data);
          console.log("skill",data);
      } catch (err) {
        console.error("Failed to load skill:", err);
      }
    };

    if (id) loadSkill();
  }, [id]);

  if (!skillData) return <p className="p-6">Loading skill...</p>;

  return <SkillForm editSKill={skillData} id = {id} />;
}
