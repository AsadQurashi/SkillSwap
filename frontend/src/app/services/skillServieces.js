import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;


// Post Method
export const CreateSkill = async (data, token) => {
    try {
        if (!token) {
            throw new Error("no token found")
        }
        const response = await axios.post(`${API}/Skill/PostSkill`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Error creating skill", error?.response?.data || error.message);
        throw error;
        
    }
};


// Get all skilles
export const GetAllSkills = async (token) => {
    try {
        if (!token) {
            throw new Error("no token found");
        }
        const response = await axios.get(`${API}/Skill/GetAllSkills`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    }
    catch (error) {
        console.error("Error fetching all skill", error?.response?.data || error.message);
        throw error;
    }
};

// Get by id
export const GetById = async (id, token) => {
    try {
        if (!token) {
            throw new Error("token not found");
        }

        const response = await axios.get(`${API}/Skill/GetById/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        return response.data;
    }
    catch (error) {
        console.error("Error in getting skill by id", error?.response?.data || error.message);
        throw error;
    }
};

// Upodate Skill
export const UpdateSkill = async (id, data, token) => {
    try {
        if (!token) {
            throw new Error("Token not found");
        }
        const response = await axios.put(
          `${API}/Skill/UpdateSkill/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;

    }
    catch (error) {
        console.error("Error in update skills", error?.response?.data || error.message);
        throw error;
    }
};


// Dete By id
export const DeleteSkill = async (id, token) =>
{ 
    try {
        if (!token)
        {
            throw new Error("token not found");
        }
        const response = await axios.delete(`${API}/Skill/DeleteById/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    }
    catch (error)
    {
        console.error("Couldn't delte", error?.response?.data || error.message);
        throw error;
    }
}
