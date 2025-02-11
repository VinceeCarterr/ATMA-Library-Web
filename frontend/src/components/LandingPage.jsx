import React, { useState, useEffect } from "react";
import { Carousel, Button, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import apiLandingPage from "../api/apiLandingPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await apiLandingPage.getTopBooks();
        setPopularBooks(books);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/components/LandingPage.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="landing-container">
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
        <div className="auth-buttons">
          <Link to="/login">
            <button className="btn btn-login">Log In</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-register">Register</button>
          </Link>
        </div>
      </header>

      {/* Image Carousel */}
      <section className="carousel-section">
        <Carousel interval={3000} fade wrap>
          <Carousel.Item>
            <div className="carousel-overlay">
              <img
                className="carousel-image"
                src="/src/assets/images/carousel/bg-image1.jpg"
                alt="Slide 1"
              />
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-overlay">
              <img
                className="carousel-image"
                src="/src/assets/images/carousel/bg-image2.jpg"
                alt="Slide 2"
              />
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-overlay">
              <img
                className="carousel-image"
                src="/src/assets/images/carousel/bg-image3.jpg"
                alt="Slide 3"
              />
            </div>
          </Carousel.Item>
        </Carousel>

        <div className="carousel-caption">
          <h2>Welcome to Atma Library</h2>
          <p>Explore an extensive collection of books and resources.</p>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="popular-books-section">
        <h2 className="section-title">Popular Books</h2>
        <p className="section-subtitle">
          Explore top books loved by readers worldwide, from gripping fiction to
          inspiring non-fiction. Find your next favorite read among the
          bestsellers!
        </p>
        <div className="books-container">
          <div className="books-grid">
            {loading ? (
              <p>Loading books...</p>
            ) : popularBooks.length > 0 ? (
              popularBooks.map((book) => (
                <Link to="/login" key={book.id} className="book-card-link">
                  <div key={book.id} className="book-card">
                    <img
                      src={`${baseURL}/storage/${book.book_poster}`}
                      alt={book.judul}
                      className="book-cover"
                    />
                    <h3 className="book-title">{book.judul}</h3>
                  </div>
                </Link>
              ))
            ) : (
              <p>No popular books available.</p>
            )}
          </div>
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LandingPage;
