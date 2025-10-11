import axios from "axios";


const API = process.env.NEXT_PUBLIC_API_URL;

export default async function CreateSession(sessionData, token)
{ 
    const response = await axios.post(`${API}/session/CreateSession`,sessionData , {
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-type" : "application/json",
      },
    });

    return response.data;
}

// Get All session
export const GetAllSessions = async (token) =>
{
  try {
    if (!token)
    {
      throw new error("Token not found");
    }
    const response = await axios.get(`${API}/session/GetSessionList`, {
      headers:
      {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
  catch(error) {
    console.log("Error in getting session list : ", error?.response?.data);
    throw error;
  }
}

// Respond Session
export const RespondSession = async (sessionId , action , token) =>
{
  try {
    if (!token)
    {
      throw new error("Token not found");
    }
    const response = await axios.post(`${API}/session/ResponseSession/${sessionId}`, { action }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
  catch (error)
  {
    console.log("Error in session response", error?.response?.data);
    throw error
  }
} 