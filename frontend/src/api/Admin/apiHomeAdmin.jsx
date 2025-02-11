import axios from "axios";

const apiBaseURL = "http://127.0.0.1:8000/api";

export const apiHomeAdmin = async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await axios.get(`${apiBaseURL}/peminjaman`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const peminjamanData = response.data;

    console.log("All peminjaman data fetched:", peminjamanData);
    return peminjamanData;
  } catch (error) {
    console.error("Error fetching peminjaman data:", error);
    throw error;
  }
};

export const apiUpdateStatus = async (id, status) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await axios.put(
      `http://127.0.0.1:8000/api/peminjaman/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};


export const apiDeletePeminjaman = async (id) => {
  try {
    console.log("Deleting peminjaman data with ID:", id); // Log the request

    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await axios.delete(`${apiBaseURL}/peminjaman/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(`Peminjaman data with ID ${id} deleted successfully.`);
    return response.data; // Return success message
  } catch (error) {
    console.error("Error deleting peminjaman data:", error);
    throw error;
  }
};

export const createPengembalian = async (id_pinjam, id_user, jml_denda) => {
  try {
    console.log("Creating pengembalian:", { id_pinjam, id_user, jml_denda }); // Log request data

    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await axios.post(
      `${apiBaseURL}/pengembalian`,
      {
        id_pinjam,
        id_user,
        jml_denda,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Pengembalian created successfully:", response.data);
    return response.data; // Return created data
  } catch (error) {
    console.error("Error creating pengembalian:", error.response?.data || error.message);
    throw error;
  }
};



