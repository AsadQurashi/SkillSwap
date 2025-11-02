"use client";

import { useState } from "react";
import { format } from "date-fns";

export default function UserTable({ users, onEditUser, onUpdateUser })
{
    const [updatingUserId, setUpdatingUserId] = useState(null);

    const handleRoleChange = async (user, newRole) => {
        try {
            setUpdatingUserId(user.id);
            await onUpdateUser({ ...user, role: newRole });
        }
        finally {
            setUpdatingUserId(null);
        }
        
    };
    
    const handleStatusToggle = async (user) => {
        try {
            setUpdatingUserId(user.id);
            await onUpdateUser({ ...user, is_active: !user.is_active });
        }
        finally {
            setUpdatingUserId(null);
        }
    };

    if (!users || users.length===0)
    {
        return (
            <div className="p-6 text-center text-gray-500">
                No user found matching your criteria
            </div>
        );
    };

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user, e.target.value)}
                    disabled={updatingUserId === user.id}
                    className={`text-sm border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      user.role === "super_admin"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : user.role === "admin"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleStatusToggle(user)}
                    disabled={updatingUserId === user.id}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.is_active
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    } disabled:opacity-50`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                    {updatingUserId === user.id && (
                      <span className="ml-2 animate-spin">⟳</span>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.skills_count || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.created_at
                    ? format(new Date(user.created_at), "MMM dd, yyyy")
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEditUser(user)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleStatusToggle(user)}
                    className="text-red-600 hover:text-red-900"
                  >
                    {user.is_active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}