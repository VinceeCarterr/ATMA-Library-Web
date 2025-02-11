import useAxios from ".";

const apiLandingPage = {
  /**
   * Fetch the top 10 books with the highest `jml_pinjam`
   * @returns {Promise<Array>} A promise that resolves to the list of books
   */
  getTopBooks: async () => {
    try {
      const axiosInstance = useAxios(); // Call useAxios to get the Axios instance
      const response = await axiosInstance.get("/buku/top"); // Use the instance to make the request

      if (response.status === 200) {
        return response.data; // Return the data if successful
      } else {
        console.error("Failed to fetch top books:", response);
        return [];
      }
    } catch (error) {
      console.error("Error fetching top books:", error);
      return [];
    }
  },
};

export default apiLandingPage;
