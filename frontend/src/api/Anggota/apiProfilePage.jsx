import useAxios from "../index";

const apiUser = {
  getUserById: async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("user"));

      if (!userData || !userData.id_user) {
        console.error("User ID tidak ditemukan di sessionStorage.");
        return null;
      }

      const userId = userData.id_user;
      const axiosInstance = useAxios();
      const response = await axiosInstance.get(`/user/${userId}`);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Gagal mengambil data user:", response);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  },

  updateUser: async (updatedData) => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      if (!userData || !userData.id_user) {
        console.error("User ID tidak ditemukan di sessionStorage.");
        return null;
      }
      const userId = userData.id_user;

      const axiosInstance = useAxios();
      const response = await axiosInstance.put(`/user/${userId}`, updatedData);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Gagal mengedit data user:", response);
        return null;
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  },

  updateProfilePhoto: async (formData) => {
    try {
      const axiosInstance = useAxios();
      const response = await axiosInstance.post(
        "/user/profile-photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Gagal mengedit foto profil:", response);
        return null;
      }
    } catch (error) {
      console.error("Error updating profile photo:", error);
      return null;
    }
  },
};

export default apiUser;
