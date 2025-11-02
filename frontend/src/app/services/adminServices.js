import axios from "axios";
import { getToken , removeToken } from "../utils/token";

const API_Base_URL = process.env.NEXT_PUBLIC_API_URL || '';

class AdminService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_Base_URL}/admin`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add Token to request

    this.api.interceptors.request.use((config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle Token Expiration

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          removeToken();
          window.location.href = "/SignIn";
        }
        return Promise.reject(error);
      }
    );
  }

  // Dashboard stats
  async getDashboardStats() {
    try {
      const response = await this.api.get("/dashboard/stats");
      return response.data;
    } catch (error) {
      this.handleError(error, "Failed to fetch dashboard stats");
    }
  }

  // Recent Activity
  async getRecentActivity() {
    try {
      const response = await this.api.get("/dashboard/activity");
      return response.data;
    } catch (error) {
      this.handleError(error, "Failed to fetch recent activity");
    }
  }
  // Get analytics
  async getAnalytics(days = 30) {
    try {
      const response = await this.api.get(`/dashboard/analytics?days=${days}`);
      return response.data;
    } catch (error) {
      this.handleError(error, "Failed to fetch analytics");
    }
  }

  // Get user
  async getUsers(params = {}) {
    try {
      const response = await this.api.get("/users", { params });
      return response.data;
    } catch (error) {
      this.handleError(error, "Failed to fetch users");
    }
  }

  // Udate User Role
  async updateUserRole(userId, role) {
    try {
      const response = await this.api.put(`/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      this.handleError(error, "Failed to update user role");
    }
  }

  // Toggel user status
  async toggleUserStatus(userId) {
    try {
      const response = await this.api.put(`/users/${userId}/status`);
      return response.data;
    } catch (error) {
      this.handleError(error, "Failed to toggle status");
    }
  }

    // Skills management
    async getSkills(params = {})
    {
        try
        {
            const response = await this.api.get('/skills', { params });
            return response.data;
        }
        catch (error)
        {
            this.handleError(error, "Failed to fetch skills");
        }
    }
    // Approve Skill
    async approveSkill(skillId, adminNotes = '')
    {
        try
        {
            const response = await this.api.put(`/skills/${skillId}/approve`, { admin_notes:adminNotes });
            return response.data;
        }
        catch (error)
        {
            this.handleError(error, "Failed to approve skill");
        }
    }

    // Reject Skill
    async rejectSkill(skillId, adminNotes = '')
    {
        try
        {
            const response = await this.api.put(`/skills/${skillId}/reject`, {admin_notes: adminNotes });
            return response.data;
        }
        catch (error)
        {
            this.handleError(error, "Failed to reject skill");
        }
    }

    // Reports management
    async getReports(params = {})
    {
        try
        {
            const response = await this.api.get('/reports', { params });
            return response.data;
        }
        catch (error)
        {
            this.handleError(error , "Failed to fetch reports")
        }
    }

    // Resolve Reports
    async resolveReport(reportId, status, adminNotes)
    {
        try
        {
            const response = await this.api.put(`/reports/${reportId}/resolve`, {
                status,
                admin_notes: adminNotes
            });
            return response.data;
        }
        catch (error)
        {
            this.handleError(error, "Failed to resolve report");
        }
    }

    // Error Handling
    handleError(error, defaultMessage)
    {
        console.error("AdminService", error);

        if (error.response?.data?.message)
        {
            throw new Error(error.response.data.message);
        }
        else if (error.message)
        {
            throw new Error(error.message);
        }
        else
        {
            throw new Error(defaultMessage);    
        }
    }
}

const adminService = new AdminService();

export default adminService;