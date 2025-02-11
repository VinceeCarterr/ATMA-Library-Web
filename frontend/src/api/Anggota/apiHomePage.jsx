import useAxios from "../index"; // Adjust the import path as needed

const apiHomePage = {
  getTopBooks: async () => {
    try {
      const axiosInstance = useAxios();
      const response = await axiosInstance.get("/buku/top");

      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Failed to fetch top books:", response);
        return [];
      }
    } catch (error) {
      console.error("Error fetching top books:", error);
      return [];
    }
  },

  getNewArrivalBooks: async () => {
    try {
      const axiosInstance = useAxios();
      const response = await axiosInstance.get("/buku");

      if (response.status === 200) {
        const books = response.data;
        // Sort by thn_terbit descending and take the first two
        return books
          .sort((a, b) => b.thn_terbit - a.thn_terbit)
          .slice(0, 2);
      } else {
        console.error("Failed to fetch new arrival books:", response);
        return [];
      }
    } catch (error) {
      console.error("Error fetching new arrival books:", error);
      return [];
    }
  },
};

export default apiHomePage;
