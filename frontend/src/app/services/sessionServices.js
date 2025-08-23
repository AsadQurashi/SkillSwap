import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default async function CreateSession(data, token)
{ 
    const response = await axios.post(`${API}/session/CreateSession`, data,
        {
            headers: {
                Authorization: `Bearer${token}` 
            
        } }
    )
}