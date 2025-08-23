"use client";

import SkillList from "@/app/component/DisplaySkillList";

const DisplaySkills = () => {
  return (
    <SkillList
      onEdit={() => {}} // No-op function to avoid errors
      reFreshTrigger={0}
    />
  );
};

export default DisplaySkills;