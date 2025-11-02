"use client";

import { useState , useEffect } from "react";
import adminService from "@/app/services/adminServices";
import LoadingSpinner from "@/app/component/ui/LoadingSpinner";
import toast from "react-hot-toast";
import ReportModal from "@/app/component/admin/ReportModal";
import ReportTable from "@/app/component/admin/ReportTable";
export default function ReportsManagement()
{
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        total: 0,
        pages: 0,
    });

    const [filters, setFilters] = useState({
        status: ''
    });

    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        loadReports();
    }, [pagination.page, filters]);

    const loadReports = async () => {
        try {
            setLoading(true);
            setError('');

            const params = {
                page: pagination.page,
                per_page: pagination.per_page,
                ...filters
            };
            const response = await adminService.getReports(params);
            setReports(response.reports);
            setPagination(prev => ({
                ...prev, total: response.total, pages: response.pages
            }));
        }
        catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    const handleStatusFilter = (status) => {
        setFilters(prev => ({ ...prev, status }));
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const handleResolveReport = async (reportId, status, adminNotes) => {
        try {
            setActionLoading(reportId);
            await adminService.resolveReport(reportId, status, adminNotes = '');
            toast.success(`Report ${status} successfully`);
            loadReports();
        }
        catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
        finally {
            setActionLoading(false);
        }
    };

    const handleViewDetails = (reportId) => {
        setSelectedReport(reportId);
        setIsModalOpen(true);
    };

    const refreshData = () => {
        loadReports();
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Report Management
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Review and resolve user reports
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
                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filter by Status
                        </label>
                        <select
                            value={filters.status}
                            onChange={(e) => handleStatusFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="resolved">Resolved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    {/* Stats */}
                    <div className="md:col-span-2 flex items-end gap-4">
                        <div className="text-sm">
                            <span className="text-gray-600">Total Reports:</span>
                            <span className="ml-2 font-semibold">{pagination.total}</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-600">Pending:</span>
                            <span className="ml-2 font-semibold text-yellow-600">
                                {reports.filter((r) => r.status === "pending").length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-lg shadow-sm">
                {loading ? (
                    <div className="flex items-center justify-center min-h-64">
                        <LoadingSpinner size="large" />
                    </div>
                ) : error ? (
                    <div className="p-6 text-center">
                        <div className="text-red-600 mb-4">❌ {error}</div>
                        <button
                            onClick={loadReports}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <>
                        <ReportTable
                            reports={reports}
                            onResolve={handleResolveReport}
                            onViewDetails={handleViewDetails}
                            actionLoading={actionLoading}
                        />

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-700">
                                        Page {pagination.page} of {pagination.pages}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handlePageChange(pagination.page - 1)}
                                            disabled={pagination.page === 1}
                                            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => handlePageChange(pagination.page + 1)}
                                            disabled={pagination.page === pagination.pages}
                                            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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

            {/* Report Details Modal */}
            {isModalOpen && (
                <ReportModal
                    report={selectedReport}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedReport(null);
                    }}
                    onResolve={handleResolveReport}
                    actionLoading={actionLoading}
                />
            )}
        </div>
    );
}