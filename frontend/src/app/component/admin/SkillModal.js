"use client";

import { useState } from "react";
import { format } from "date-fns";

export default function SkillModal({
  skill,
  onClose,
  onApprove,
  onReject,
  actionLoading,
}) {
  const [rejectNote, setRejectNote] = useState("");

  console.log("Skill info from skill model", { skill })

  const handleApprove = () => {
    onApprove(skill.id, "Skill approved after review");
  };

  const handleReject = () => {
    if (!rejectNote.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }
    onReject(skill.id, rejectNote);
  };

  if (!skill) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {skill.name}
              </h2>
              <p className="text-gray-600 mt-1">by {skill.user_name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Skill Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Name
                </label>
                <p className="text-gray-900">{skill.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proficiency Level
                </label>
                <p className="text-gray-900 capitalize">{skill.level}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <p className="text-gray-900 whitespace-pre-wrap">
                  {skill.description}
                </p>
              </div>
            </div>
          </div>

          {/* Media Attachments */}
          {(skill.video || skill.image || skill.link || skill.document) && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Attachments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skill.video && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Video
                    </label>
                    <a
                      href={skill.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all"
                    >
                      View Video
                    </a>
                  </div>
                )}
                {skill.image && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image
                    </label>
                    <a
                      href={skill.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all"
                    >
                      View Image
                    </a>
                  </div>
                )}
                {skill.link && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link
                    </label>
                    <a
                      href={skill.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all"
                    >
                      {skill.link}
                    </a>
                  </div>
                )}
                {skill.document && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Document
                    </label>
                    <a
                      href={skill.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all"
                    >
                      View Document
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Statistics */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {skill.view_count || 0}
                </div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {skill.session_count || 0}
                </div>
                <div className="text-sm text-gray-600">Sessions</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {skill.created_at
                    ? format(new Date(skill.created_at), "MMM dd")
                    : "N/A"}
                </div>
                <div className="text-sm text-gray-600">Created</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {skill.updated_at
                    ? format(new Date(skill.updated_at), "MMM dd")
                    : "N/A"}
                </div>
                <div className="text-sm text-gray-600">Updated</div>
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          {skill.status === "pending" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Admin Actions
              </h3>

              {/* Reject Reason Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason (required for rejection)
                </label>
                <textarea
                  value={rejectNote}
                  onChange={(e) => setRejectNote(e.target.value)}
                  placeholder="Provide a clear reason for rejection..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleApprove}
                  disabled={actionLoading === skill.id}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {actionLoading === skill.id
                    ? "Approving..."
                    : "Approve Skill"}
                </button>
                <button
                  onClick={handleReject}
                  disabled={actionLoading === skill.id || !rejectNote.trim()}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {actionLoading === skill.id ? "Rejecting..." : "Reject Skill"}
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
