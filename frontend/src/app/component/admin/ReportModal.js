"use client";

import { useState } from "react";
import { format } from "date-fns";

export default function ReportModal({
  report,
  onClose,
  onResolve,
  actionLoading,
}) {
  const [resolveData, setResolveData] = useState({
    status: "",
    adminNotes: "",
  });

  const handleResolve = () => {
    if (resolveData.status === "rejected" && !resolveData.adminNotes.trim()) {
      alert("Please provide notes when rejecting a report");
      return;
    }
    onResolve(report.id, resolveData.status, resolveData.adminNotes);
  };

  if (!report) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Report Details
              </h2>
              <p className="text-gray-600 mt-1">
                ID: {report.id} •{" "}
                {format(new Date(report.created_at), "MMM dd, yyyy HH:mm")}
              </p>
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
          {/* Report Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Report Information
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <p className="mt-1 text-gray-900 capitalize">
                    {report.report_type}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <p className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        report.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : report.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <p className="mt-1 text-gray-900 whitespace-pre-wrap">
                    {report.description}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Parties Involved
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Reporter</h4>
                  <p className="text-gray-900">{report.reporter_name}</p>
                  <p className="text-sm text-gray-600">
                    ID: {report.reporter_id}
                  </p>
                </div>

                {report.reported_user_name && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Reported User
                    </h4>
                    <p className="text-gray-900">{report.reported_user_name}</p>
                    <p className="text-sm text-gray-600">
                      ID: {report.reported_user_id}
                    </p>
                  </div>
                )}

                {report.reported_skill_name && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Reported Skill
                    </h4>
                    <p className="text-gray-900">
                      {report.reported_skill_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      ID: {report.reported_skill_id}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Resolution Information */}
          {(report.status === "resolved" || report.status === "rejected") &&
            report.resolved_at && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Resolution Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Resolved By
                    </label>
                    <p className="text-gray-900">
                      {report.resolver_name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Resolved At
                    </label>
                    <p className="text-gray-900">
                      {format(
                        new Date(report.resolved_at),
                        "MMM dd, yyyy HH:mm"
                      )}
                    </p>
                  </div>
                  {report.admin_notes && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Admin Notes
                      </label>
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {report.admin_notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Admin Actions */}
          {report.status === "pending" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Admin Actions
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action
                  </label>
                  <select
                    value={resolveData.status}
                    onChange={(e) =>
                      setResolveData((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select action...</option>
                    <option value="resolved">Mark as Resolved</option>
                    <option value="rejected">Reject Report</option>
                  </select>
                </div>

                {resolveData.status && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Notes
                      {resolveData.status === "rejected" && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <textarea
                      value={resolveData.adminNotes}
                      onChange={(e) =>
                        setResolveData((prev) => ({
                          ...prev,
                          adminNotes: e.target.value,
                        }))
                      }
                      placeholder={
                        resolveData.status === "resolved"
                          ? "Optional notes about resolution..."
                          : "Please provide reason for rejection..."
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                    />
                  </div>
                )}

                {resolveData.status && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleResolve}
                      disabled={
                        actionLoading === report.id ||
                        (resolveData.status === "rejected" &&
                          !resolveData.adminNotes.trim())
                      }
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      {actionLoading === report.id
                        ? "Processing..."
                        : "Confirm Action"}
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
