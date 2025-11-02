export const saveToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const removeToken = () => {
  localStorage.removeItem("authToken");
};

// User data functions - FIXED VERSION
export const saveUser = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

export const getUser = () => {
  const user = localStorage.getItem("userData");
  // ✅ Fixed: Check for "undefined" string and null/undefined
  if (!user || user === "undefined" || user === "null") {
    return null;
  }
  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem("userData");
};