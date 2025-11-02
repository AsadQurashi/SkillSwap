"use client";
import { useState } from "react";
import { format } from "date-fns";

export default function SkillTable({ skills, onApprove, onReject, onViewDetails, actionLoading }) {
    const [rejectNote, setRejectNote] = useState('');
    const [showRejectForm, setShowRejectForm] = useState(null); 
    console.log("Skill in skill table",skills)

    const handleApprove = (skillId) => {
        onApprove(skillId, "Skill approved by admin"); 
    };

    const handleReject = (skillId) => {
        if (!rejectNote.trim()) {
            alert("Please provide a reason for rejection");
            return;
        }
        onReject(skillId, rejectNote);
        setShowRejectForm(null);
        setRejectNote('');
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
            approved: { color: "bg-green-100 text-green-800", label: "Approved" },
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

    if (!skills || skills.length === 0) { 
        return (
            <div className="p-6 text-center text-gray-500">
                No skills found matching your criteria
            </div>
        );
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200"> 
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
                            Skill
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Level
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
                    {skills.map((skill) => ( 
                        <tr key={skill.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">
                                        {skill.name} 
                                    </div>
                                    <div className="text-sm text-gray-500 line-clamp-2">
                                        {skill.description} 
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {skill.user_name} 
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {skill.level} 
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusBadge(skill.status)} 
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {skill.created_at 
                                    ? format(new Date(skill.created_at), "MMM dd, yyyy") 
                                    : "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onViewDetails(skill)} 
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        View
                                    </button>
                                    {skill.status === "pending" && ( 
                                        <>
                                            <button
                                                onClick={() => handleApprove(skill.id)} 
                                                disabled={actionLoading === skill.id} 
                                                className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                            >
                                                {actionLoading === skill.id 
                                                    ? "Approving..."
                                                    : "Approve"}
                                            </button>
                                            {showRejectForm === skill.id ? ( 
                                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                                        <h3 className="text-lg font-semibold mb-4">
                                                            Reject Skill
                                                        </h3>
                                                        <textarea
                                                            value={rejectNote}
                                                            onChange={(e) => setRejectNote(e.target.value)}
                                                            placeholder="Please provide a reason for rejection..."
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                                            rows="4"
                                                        />
                                                        <div className="flex gap-2 justify-end">
                                                            <button
                                                                onClick={() => setShowRejectForm(null)}
                                                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(skill.id)} 
                                                                disabled={actionLoading === skill.id} 
                                                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                                                            >
                                                                {actionLoading === skill.id 
                                                                    ? "Rejecting..."
                                                                    : "Reject"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setShowRejectForm(skill.id)} 
                                                    disabled={actionLoading === skill.id} 
                                                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}