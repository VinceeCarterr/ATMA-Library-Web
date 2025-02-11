import axios from "axios";

const apiBaseURL = "http://127.0.0.1:8000/api";

/**
 * Fetches the list of returns for a specific user.
 * - Admin: Can fetch all.
 * - User: Only their own returns.
 * @param {number} userId - The ID of the user whose returns we want to fetch.
 * @returns {Promise<Array>} Array of pengembalian objects.
 */
export const apiGetPengembalianByUser = async (userId) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await axios.get(`${apiBaseURL}/pengembalian`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { id_user: userId }, // Send userId as a query parameter
    });

    console.log(`Fetched returns for user ${userId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pengembalian by user:", error);
    throw error;
  }
};

/**
 * Deletes a pengembalian by ID.
 * @param {number} idPengembalian - The ID of the pengembalian to delete.
 * @returns {Promise<void>}
 */
export const apiDeletePengembalian = async (idPengembalian) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await axios.delete(
      `http://127.0.0.1:8000/api/pengembalian/${idPengembalian}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting pengembalian:", error);
    throw error;
  }
};

export const apiClearFine = async (id_pengembalian) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/pengembalian/${id_pengembalian}/clear-fine`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to clear the fine.");
  }
  return await response.json();
};

