// app/component/AdminFooter.js
"use client";

export default function AdminFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6 mt-auto">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          &copy; 2024 SkillShare Admin Panel. All rights reserved.
        </p>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span>v1.0.0</span>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </footer>
  );
}
