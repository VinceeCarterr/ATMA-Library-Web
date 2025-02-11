import React, { useState, useEffect } from "react";
import { Carousel, Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { GetAllBooksByCategory } from "../../api/Admin/apiBookAdmin";
import { SignOut } from "../../api/apiAuth";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [originalBooksByCategory, setOriginalBooksByCategory] = useState({});
  const [booksByCategory, setBooksByCategory] = useState({});
  const [bookSearch, setBookSearch] = useState("");
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000"; 

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/components/Admin/BookAdmin.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const books = await GetAllBooksByCategory();
        setOriginalBooksByCategory(books); // Save original data
        setBooksByCategory(books); // Initialize displayed data
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (!bookSearch.trim()) {
      // If search term is empty, reset books
      setBooksByCategory(originalBooksByCategory);
      return;
    }

    // Filter books by title (case-insensitive)
    const filteredBooksByCategory = Object.entries(originalBooksByCategory).reduce(
      (acc, [category, books]) => {
        const filteredBooks = books.filter((book) =>
          book.judul.toLowerCase().includes(bookSearch.toLowerCase())
        );

        if (filteredBooks.length > 0) {
          acc[category] = filteredBooks;
        }

        return acc;
      },
      {}
    );

    setBooksByCategory(filteredBooksByCategory);
  }, [bookSearch, originalBooksByCategory]);

  const handleAddNewBook = () => {
    navigate("/AddBookAdmin");
  };

  const handleLogout = async () => {
    const result = await SignOut();
    if (result.success) {
      console.log("Logout successful");
      navigate("/");
    } else {
      console.error("Logout failed:", result.error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="home-container">
      {/* App Bar */}
      <header className="app-bar">
        <div className="logo">
          <a href="/" className="logo-link">
            <img
              src="/src/assets/images/logo-image.png"
              alt="Logo"
              className="logo-image"
            />
            <span className="logo-text">Atma Library</span>
          </a>
        </div>
          <div className="search-bar">
            <Form.Control
              type="text"
              placeholder="Search for books here..."
              value={bookSearch}
              onChange={(e) => setBookSearch(e.target.value)}
              className="search-input"
            />
          </div>
        <nav className="nav-links">
          <Link to="/HomePage" className="nav-link">
            Home
          </Link>
          <Link to="/mybooks" className="nav-link">
            MyBooks
          </Link>
          <Link to="/CategoryPage" className="nav-link-active">
            Category
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </nav>
      </header>

      {/* Books Section */}
      <section className="category-books-section">
        <h2 className="section-title">Library Books by Category</h2>
        <Container>
          {loading ? (
            <div className="loading-container">
              <p>Loading books...</p>
            </div>
          ) : Object.keys(booksByCategory).length > 0 ? (
            Object.entries(booksByCategory).map(([category, books]) => (
              <div key={category} className="category-section mb-5">
                {/* Category Title */}
                <h3 className="category-title">{category}</h3>

                {/* Horizontal Scrollable Books */}
                <div className="books-carousel">
                  {books.map((book) => (
                    <Link
                      key={book.id}
                      to={`/BookAnggota/${book.id_buku}`}
                      className="book-card-link"
                    >
                      <div className="book-card shadow-sm">
                        <img
                          src={`${baseURL}/storage/${book.book_poster}`}
                          alt={book.judul}
                          className="book-cover"
                        />
                        <h5 className="book-title">{book.judul}</h5>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-books-container">
              <p>No books available.</p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default CategoryPage;
