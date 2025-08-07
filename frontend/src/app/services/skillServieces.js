import axios from "axios";
import { getToken } from "../utils/token";

const API = process.env.NEXT_PUBLIC_API_URL;

export const CreateSkill = async (data) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error("no token found")
        }
        const response = await axios.post(`${API}/Skill/PostSkill`, data, {
            headers: {
                Authorization: `Bearer ${token}`, 
                "Content-Type" : "multipart/form-data",
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Error creating skill", error?.response?.data || error.message);
        throw error;
        
    }
};