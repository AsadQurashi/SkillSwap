"use client";
import { format } from "date-fns";
import { useState } from "react";

export default function ReportTable({ reports, onResolve, onViewDetails, actionLoading }) {
    const [resolveData, setResolveData] = useState({
        reportId: null,
        status: '',
        adminNotes: ''
    });
    const [showResolveForm, setShowResolveForm] = useState(false);

    const handleResolveReport = (reportId, status) => {
        if (status === 'rejected' || !resolveData.adminNotes.trim()) {
            alert("Please provide admin note when rejecting a report");
            return;
        }
        onResolve(reportId, status, resolveData.adminNotes);
        setShowResolveForm(false);
        setResolveData({ reportId: null, status: '', adminNotes: '' });
    };
    const openResolveForm = (reportId, status) => {
      setResolveData({
        reportId,
        status,
        adminNotes: "",
      });
      setShowResolveForm(true);
    };

    const getStatusBadge = (status) => {
      const statusConfig = {
        pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
        resolved: { color: "bg-green-100 text-green-800", label: "Resolved" },
        rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
      };

      const config = statusConfig[status] || statusConfig.pending;

      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
        >
          {config.label}
        </span>
      );
    };

    const getReportTypeBadge = (type) => {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {type}
        </span>
      );
    };

    if (!reports || reports.length === 0) {
      return (
        <div className="p-6 text-center text-gray-500">
          No reports found matching your criteria
        </div>
      );
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Report Details
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Reporter
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Reported
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {reports.map((report) => (
                            <tr key={report.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            {getReportTypeBadge(report.report_type)}
                                        </div>
                                        <div className="text-sm text-gray-900 font-medium">
                                            {report.reported_skill_name || "User Report"}
                                        </div>
                                        <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                                            {report.description}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {report.reporter_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {report.reported_user_name || "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(report.status)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {report.created_at
                                        ? format(new Date(report.created_at), "MMM dd, yyyy")
                                        : "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onViewDetails(report)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            View
                                        </button>

                                        {report.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        openResolveForm(report.id, "resolved")
                                                    }
                                                    disabled={actionLoading === report.id}
                                                    className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                                >
                                                    Resolve
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openResolveForm(report.id, "rejected")
                                                    }
                                                    disabled={actionLoading === report.id}
                                                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Resolve/Reject Form Modal */}
            {showResolveForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold">
                                {resolveData.status === "resolved"
                                    ? "Resolve Report"
                                    : "Reject Report"}
                            </h3>
                        </div>

                        <div className="p-6">
                            <div className="mb-4">
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

                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={() => setShowResolveForm(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() =>
                                        handleResolve(resolveData.reportId, resolveData.status)
                                    }
                                    disabled={
                                        actionLoading === resolveData.reportId ||
                                        (resolveData.status === "rejected" &&
                                            !resolveData.adminNotes.trim())
                                    }
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {actionLoading === resolveData.reportId
                                        ? "Processing..."
                                        : "Confirm"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}