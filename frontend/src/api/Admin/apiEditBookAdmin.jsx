import axios from "axios";

const apiBaseURL = "http://127.0.0.1:8000/api";

// Fetch Book by ID
export const GetBookById = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await axios.get(`${apiBaseURL}/buku/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(`Book with ID ${id} fetched successfully:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};

// Update Book
export const UpdateBook = async (id, bookData) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");

    bookData.append("_method", "PUT");

    const response = await axios.post(`http://127.0.0.1:8000/api/buku/${id}`, bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(`Book with ID ${id} updated successfully:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Delete Book
export const DeleteBook = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await axios.delete(`${apiBaseURL}/buku/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(`Book with ID ${id} deleted successfully.`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
    throw error;
  }
};
