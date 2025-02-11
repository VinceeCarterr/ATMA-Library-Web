import axios from "axios";

const apiBaseURL = "http://127.0.0.1:8000/api";

// Function to create a new peminjaman
export const CreatePeminjaman = async (idUser, idBuku, tglPinjam, tglKembali, status = "pending") => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await axios.post(
      `${apiBaseURL}/peminjaman`,
      {
        id_user: idUser,
        id_buku: idBuku,
        tgl_pinjam: tglPinjam,
        tgl_kembali: tglKembali,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Peminjaman created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating peminjaman:", error);
    throw error;
  }
};

// Function to check if the user has already borrowed a book
export const CheckUserBook = async (idUser, idBuku) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Authorization token is missing.");
  
      const response = await axios.post(
        `${apiBaseURL}/peminjaman/check`,
        { id_user: idUser, id_buku: idBuku },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Check user book response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error checking user book:", error);
      throw error;
    }
  };


