"use client";

import { useState, useEffect } from "react";
import UserTable from "@/app/component/admin/UserTable";
import UserModal from "@/app/component/admin/UserModal";
import adminService from "@/app/services/adminServices";
import LoadingSpinner from "@/app/component/ui/LoadingSpinner";
import { toast } from "react-hot-toast";

export default function UserManagement()
{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        total: 0,
        pages: 0
    });

    const [filters, setFilters] = useState(
        {
            search: '',
            role: ''
        }
    );

    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadUsers();

    }, [pagination.page, filters]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError('');

            const params = {
                page: pagination.page,
                per_page: pagination.per_page,
                ...filters
            };
            const response = await adminService.getUsers(params);
            setUsers(response.users);
            setPagination(prev => ({
                ...prev,
                total: response.total,
                pages: response.pages,
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

    const handleSearch = (searchValue) => {
      setFilters((prev) => ({ ...prev, search: searchValue }));
      setPagination((prev) => ({ ...prev, page: 1 }));
    };

    const handleRoleFilter = (role) => {
        setFilters(prev => ({ ...prev, role }));
        setPagination(prev => ({ ...prev, page: 1 }))
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleUpdateUser = async (userData) => {
        try {
            if (userData.role) {
                await adminService.updateUserRole(selectedUser.id, userData.role);
                toast.success("User role updated successfully");
            }
            
            if (typeof userData.is_active !== 'undefined') {
                await adminService.toggleUserStatus(selectedUser.id);
                toast.success("User status updated successfully");
            }
            setIsModalOpen(false);
            setSelectedUser(null);
            loadUsers();
        }
        catch (err) {
            toast.error(err.message);
        }
    };

    const refreshData = () => {
      loadUsers();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            User Management
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manage users, roles, and account status
                        </p>
                    </div>
                    <button
                        onClick={refreshData}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            </div>
            {/* Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search Users
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search by name or email..."
                            value={filters.search}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    {/* Role Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filter by Role
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filters.role}
                            onChange={(e) => handleRoleFilter(e.target.value)}
                        >
                            <option value="">All Roles</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="super_admin">Super Admin</option>
                        </select>
                    </div>
                    {/* Result Count */}
                    <div className="flex items-end">
                        <p className="text-gray-600">
                            Showing {users.length} of {pagination.total} users
                        </p>
                    </div>
                </div>
            </div>

            {/* User Table */}
            <div className="bg-white rounded-lg shadow-sm">
                {loading ? (
                    <div className="flex items-center justify-center min-h-64">
                        <LoadingSpinner size="large" />
                    </div>
                ) : error ? (
                    <div className="p-6 text-center">
                        <div className="text-red-600 mb-4"> {error} </div>
                        <button
                            onClick={loadUsers}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <>
                        <UserTable
                            users={users}
                            onEditUser={handleEditUser}
                            onUpdateUser={handleUpdateUser}
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
            {/* Modal User */}
            {
                isModalOpen && (
                    <UserModal
                        user={selectedUser}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedUser(null);
                        }
                        }
                        onSave={handleUpdateUser}
                    />
                )
            }
        </div>
    );
}