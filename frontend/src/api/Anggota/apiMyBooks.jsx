import useAxios from "../index";

const apiMyBooks = {
  getPeminjamanByUserId: async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      if (!userData || !userData.id_user) {
        console.error("User  ID tidak ditemukan di sessionStorage.");
        return null;
      }
      const userId = userData.id_user;

      const axiosInstance = useAxios();
      const response = await axiosInstance.get(`/peminjaman/user/${userId}`);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Gagal mengambil data peminjaman:", response);
        return null;
      }
    } catch (error) {
      console.error("Error fetching peminjaman:", error);
      return null;
    }
  },
};

export default apiMyBooks;
