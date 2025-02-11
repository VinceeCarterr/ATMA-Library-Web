import axios from "axios";

const apiBaseURL = "http://127.0.0.1:8000/api";

export const GetAllBooks = async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");
    const response = await axios.get(`${apiBaseURL}/buku`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetched books:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};


export const CreateBook = async (bookData) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await axios.post(`${apiBaseURL}/buku`, bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Book successfully added:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

