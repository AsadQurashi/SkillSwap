"use client";

import SkillForm from "@/app/component/CreateSkill";
import SkillList from "@/app/component/DisplaySkillList";
import { useState } from "react";

export default function Handle_Skill_Components() {
  const [editSKill, setEditSkill] = useState(null);
  const [reFreshTrigger, setreFreshTrigger] = useState(0);

  return (
    <div className="p-6">
      <SkillForm
        editSKill={editSKill}
        onComplete={() => {
          setEditSkill(null);
          setreFreshTrigger((prev) => prev + 1);
        }}
        onCancel={() => setEditSkill(null)}
      />

      <SkillList
        onEdit={(skill) => setEditSkill(skill)}
        reFreshTrigger={reFreshTrigger}
      />
    </div>
  );
}
