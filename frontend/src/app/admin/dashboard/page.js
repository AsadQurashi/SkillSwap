"use client";

import { useState, useEffect } from "react";
import adminService from "@/app/services/adminServices";
import StatsCard from "@/app/component/admin/StatsCard";
import UserAnalyticsChart from "@/app/component/admin/charts/UserAnalyticsChart";
import ActivityChart from "@/app/component/admin/charts/ActivityChart";
import RecentActivityTable from "@/app/component/admin/charts/RecentActivityTable";
import LoadingSpinner from "@/app/component/ui/LoadingSpinner";

export default function Dashboard()
{
    const [stats, setStats] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            setError('');

            const [statsData, activityData, analyticData] = await Promise.all([
                adminService.getDashboardStats(),
                adminService.getRecentActivity(),
                adminService.getAnalytics(30)
            ]);

            setStats(statsData);
            setRecentActivity(activityData);
            setAnalytics(analyticData);
        }
        catch (error) {
            setError(error.message);
            console.error("Dashboard loading error:", error);
        }
        finally {
            setLoading(false);
        }
    };

    if (loading)
    {
        return (
            <div className="flex items-center justify-center min-h-96">
                <LoadingSpinner size='large' />
            </div>
        );
    }

    if (error)
    {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                    <span className="text-red-600 mr-2">❌</span>
                    <h3 className="text-red-800 font-semibold">
                        Error Loading Dashboard
                    </h3>
                </div>
                <p className="text-red-600 mt-2">{error}</p>
                <button onClick={loadDashboardData}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">
                    Overview of your platform&rsquo;s performance and activities{" "}
                </p>
            </div>

            {/* Stats Card */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Total Users"
                        value={stats.total_users}
                        icon="👥"
                        color="blue"
                    />
                    <StatsCard
                        title="Total Skills"
                        value={stats.total_skills}
                        icon="💡"
                        color="green"
                    />
                    <StatsCard
                        title="Pending Skills"
                        value={stats.pending_skills}
                        icon="⏳"
                        color="yellow"
                    />
                    <StatsCard
                        title="Pending Reports"
                        value={stats.pending_reports}
                        icon="🚩"
                        color="red"
                    />
                </div>
            )}

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Analytics Chart */}
                {analytics && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            User Analytics (Last 30 Days)
                        </h3>
                        <UserAnalyticsChart data={analytics} />
                    </div>
                )}
                {/* Activity Chart */}
                {stats?.peak_hours && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Platform Activity
                        </h3>
                        <ActivityChart data={stats.peak_hours} />
                    </div>
                )}
                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Recent Admin Activity
                    </h3>
                    <RecentActivityTable activities={recentActivity} />
                </div>
            </div>
        </div>
    );
}