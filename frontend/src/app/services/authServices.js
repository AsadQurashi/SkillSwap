import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export const SignInUser = async (data) =>
{
    try {
        const response = await axios.post(`${API}/auth/SignIn`, data);
        return response.data;
    }
    catch (error)
    {
        if (error.response)
        {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          throw new Error(error.response.data.message || "Sign-in failed");
        }

        else if (error.request)
        {
          // The request was made but no response was received
          throw new Error("Network erro! Please check you connection");
        }

        else
        {
            // Something happened in setting up the request that triggered an Error
            throw new Error("Request setrup error");
        }
        
    }
}


// SignUp

export const SignUpUser = async (data) =>
{
    try 
    {
        const response = await axios.post(`${API}/auth/SignUp`, data);
        return response.data;
    }
    catch(error)
    {
        if (error.response)
        {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
            throw new Error(error.response.data.message || "Sign-up failed");
        }

        else if (error.request)
        {
             // The request was made but no response was received
            throw new Error("Network error! check your network connection");
        }

        else
        {
          // Something happened in setting up the request that triggered an Error
            throw new Error("Request setup error");
        }
    }
}
