import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { SignOut } from "../../api/apiAuth";
import apiHomePage from "../../api/Anggota/apiHomePage";

const HomePage = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [newArrivalBooks, setNewArrivalBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000"; 
  
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/components/Anggota/HomePage.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    // Fetch popular books
    const fetchBooks = async () => {
      try {
        const books = await apiHomePage.getTopBooks();
        console.log("Fetched books:", books);
        setPopularBooks(books);
      } catch (error) {
        console.error("Error fetching top books:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    // Fetch new arrival books
    const fetchNewArrivals = async () => {
      try {
        const books = await apiHomePage.getNewArrivalBooks();
        console.log("Fetched new arrivals:", books);
        setNewArrivalBooks(books);
      } catch (error) {
        console.error("Error fetching new arrivals:", error.message);
      } finally {
        setLoadingNewArrivals(false);
      }
    };

    fetchNewArrivals();
  }, []);

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
        <nav className="nav-links">
          <Link to="/HomePage" className="nav-link-active">
            Home
          </Link>
          <Link to="/mybooks" className="nav-link">
            MyBooks
          </Link>
          <Link to="/CategoryPage" className="nav-link">
            Category
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
          <button className="btn btn-logout" onClick={handleLogout}>
            Log Out
          </button>
        </nav>
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
          <h2>Welcome Back to Atma Library</h2>
          <p>Your gateway to knowledge and inspiration.</p>
        </div>
      </section>

      <section className="new-arrival-section">
        <div className="new-arrival-container">
          {/* Left side: Text */}
          <div className="new-arrival-text">
            <h2 className="section-title-newBooks">New Arrivals</h2>
            <p className="section-subtitle-newBooks">
              Check out the latest additions to our library collection!
            </p>
          </div>

          {/* Right side: Carousel */}
          <div className="new-arrival-carousel">
            {loadingNewArrivals ? (
              <p>Loading new arrivals...</p>
            ) : newArrivalBooks.length > 0 ? (
              <Carousel interval={3000} indicators={true} controls={true}>
                {newArrivalBooks.map((book) => (
                  <Carousel.Item key={book.id}>
                    <div className="book-carousel-item">
                      <Link to={`/BookAnggota/${book.id_buku}`}>
                        <img
                          className="book-carousel-image"
                          src={`${baseURL}/storage/${book.book_poster}`}
                          alt={book.judul}
                        />
                      </Link>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>No new arrivals available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="popular-books-section">
        <h2 className="section-title">Popular Books</h2>
        <p className="section-subtitle">
          Dive into the top picks of our library and explore timeless classics
          and modern masterpieces.
        </p>
        <div className="books-container">
          <div className="books-grid">
            {loading ? (
              <p>Loading books...</p>
            ) : popularBooks.length > 0 ? (
              popularBooks.map((book) => (
                <Link to={`/BookAnggota/${book.id_buku}`} key={book.id_buku} className="book-card-link">
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

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-container">
          {/* Logo and Library Name */}
          <div className="footer-logo">
            <img
              src="/src/assets/images/logo-image.png"
              alt="Atma Library Logo"
              className="footer-logo-image"
            />
            <h2 className="footer-logo-text">Atma Library</h2>
          </div>

          {/* About Section */}
          <div className="footer-about">
            <h3>About</h3>
            <p>
              Atma Book Library is a digital platform offering easy access to a wide range of books, enabling users to browse, borrow, and manage their reading through a user-friendly interface.
            </p>
          </div>

          {/* Contact Information */}
          <div className="footer-contact">
            <h3>Contact us</h3>
            <p>
              <span>📷 Instagram:</span> @atmalibrary <br />
              <span>📧 Email:</span> atmalibrary@example.com <br />
              <span>📞 Phone:</span> 081234567890
            </p>
          </div>

          {/* Address */}
          <div className="footer-address">
            <h3>Address</h3>
            <p>
              Jl. Babarsari No.1, Janti, Caturtunggal, <br />
              Kec. Depok, Kabupaten Sleman, <br />
              Daerah Istimewa Yogyakarta 55281
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
