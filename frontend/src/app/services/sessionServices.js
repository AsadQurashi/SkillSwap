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