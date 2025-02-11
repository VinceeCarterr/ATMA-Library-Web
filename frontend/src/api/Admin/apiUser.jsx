import axios from "axios";

const apiBaseURL = "http://127.0.0.1:8000/api";

// Function untuk get all users tetap sama
export const GetAllUsers = async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");
    
    const response = await axios.get(`${apiBaseURL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log("Fetched users:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Tambah function baru untuk search
export const SearchUsers = async (searchQuery) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");
    
    const response = await axios.get(`${apiBaseURL}/user/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        search: searchQuery
      }
    });
    console.log("Search results:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

export const GetUserReturns = async (userId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Authorization token is missing.");
      
      const response = await axios.get(`${apiBaseURL}/pengembalian/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log("Fetched user returns:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user returns:", error);
      throw error;
    }
  };