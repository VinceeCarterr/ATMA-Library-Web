import axios from "axios";

const apiBaseURL = "http://127.0.0.1:8000/api";

export const GetAllBooksByCategory = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Authorization token is missing.");
  
      const response = await axios.get(`${apiBaseURL}/buku`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const books = response.data;
  
      const booksByCategory = books.reduce((categories, book) => {
        const category = book.kategori || "Uncategorized";
        
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(book);
        return categories;
      }, {});
  
      console.log("Books organized by kategori:", booksByCategory);
      return booksByCategory;
    } catch (error) {
      console.error("Error fetching books by category:", error);
      throw error;
    }
  };  
