"use client";

import LoadingSpinner from "@/app/component/ui/LoadingSpinner";
import adminService from "@/app/services/adminServices";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SkillTable from "@/app/component/admin/SkillTable";
import SkillModal from "@/app/component/admin/SkillModal";

export default function SkillsManagement() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    total: 0,
    pages: 0,
  });
  const [filters, setFilters] = useState({
    status: "",
  });

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadSkills();
  }, [pagination.page, filters]);

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError("");
      const params = {
        page: pagination.page,
        per_page: pagination.per_page,
        ...filters,
      };

      const response = await adminService.getSkills(params);
      setSkills(response.skills);
      setPagination((prev) => ({
        ...prev,
        total: response.total,
        pages: response.pages,
      }));
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilter = (status) => {
    setFilters((prev) => ({ ...prev, status }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleApproveSkill = async (skillId, admminNotes = "") => {
    try {
      setActionLoading(skillId);
      await adminService.approveSkill(skillId, admminNotes);
      toast.success("Skill approved successfully");
      loadSkills();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectSkill = async (skillId, adminNotes = "") => {
    try {
      setActionLoading(skillId);
      await adminService.rejectSkill(skillId, adminNotes);
      toast.success("Skill rejected successfully");
      loadSkills();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleViewDetails = (skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const refreshData = () => {
    loadSkills();
  };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg items-center">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Skill Management
                        </h1>
                        <p className="text-gray-800 mt-1">
                            Review and manage user-submitted skills
                        </p>
                    </div>
                    <button
                        onClick={refreshData}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            </div>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="bloc text-sm font-medium text-gray-700 mb-2">
                            Filter by status
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filters.status}
                            onChange={(e) => handleStatusFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    {/* Stats */}
                    <div className="md:col-span-2 flex items-end gap-4">
                        <div className="text-sm">
                            <span className="text-gray-600">Total Skills</span>
                            <span className="ml-2 font-semibold"> {pagination.total}</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray600">Pending</span>
                            <span className="ml-2 font-semibold text-yellow-600">
                                {skills.filter((s) => s.status === "pending").length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skill Table */}
            <div className="bg-white rounded-lg shadow-sm">
                {loading ? (
                    <div className="flex items-center justify-center min-h-64">
                        <LoadingSpinner size="large" />
                    </div>
                ) : error ? (
                    <div className="p-6 text-center">
                        <div className="text-red-600 mb-4">{error}</div>
                        <button
                            onClick={loadSkills}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>
                ) : (
                    <>
                        <SkillTable
                            skills={skills}
                            onApprove={handleApproveSkill}
                            onReject={handleRejectSkill}
                            onViewDetails={handleViewDetails}
                            actionLoading={actionLoading}
                        />
                        {/* // pagination */}
                        {pagination.pages > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-700">
                                        Page {pagination.page} of {pagination.pages}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            onClick={() => handlePageChange(pagination.page - 1)}
                                            disabled={pagination.page === 1}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            onClick={() => handlePageChange(pagination.page + 1)}
                                            disabled={pagination.page === pagination.pages}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            {/* Skill Data Model */}
            {isModalOpen && (
                <SkillModal
                    skill={selectedSkill}
                    onClose={() => {
                        setIsModalOpen(false)
                        setSelectedSkill(null)
                    }}
                    onApprove={handleApproveSkill}
                    onReject={handleRejectSkill}
                    actionLoading={actionLoading}
                />
            )}

        </div>
    );
};
