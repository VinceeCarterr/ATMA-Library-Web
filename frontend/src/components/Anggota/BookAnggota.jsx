import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Button, Spinner, Alert, Row, Col, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetBookById } from "../../api/Admin/apiEditBookAdmin";
import { CreatePeminjaman, CheckUserBook } from "../../api/Anggota/apiBookAnggota";

const BookAnggota = () => {
  const { id: bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borrowStatus, setBorrowStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/src/components/Anggota/BookAnggota.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user || !user.id_user) {
          setError("User not logged in. Redirecting...");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        const data = await GetBookById(bookId);
        setBookData(data);

        const { borrowed, status } = await CheckUserBook(user.id_user, bookId);
        if (borrowed) setBorrowStatus(status);
      } catch (err) {
        console.error("Error in fetchBookDetails:", err.response?.data || err.message);
        setError("Error fetching book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId, navigate]);

  const handleBorrowRequest = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || !user.id_user) {
        setError("User not logged in. Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      const tglPinjam = new Date();
      const tglKembali = new Date();
      tglKembali.setDate(tglPinjam.getDate() + 7);

      await CreatePeminjaman(
        user.id_user,
        bookData.id_buku,
        tglPinjam.toISOString().split("T")[0],
        tglKembali.toISOString().split("T")[0],
        "pending"
      );

      // Update the borrow status to pending
      setBorrowStatus("pending");
      toast.success("Borrow request sent successfully!");
    } catch (err) {
      console.error("Error in handleBorrowRequest:", err.response?.data || err.message);
      toast.error("Failed to send borrow request. Please try again.");
    }
  };

  return (
    <div className="home-container">
      {/* App Bar */}
      <header className="app-bar">
        <div className="logo">
          <a href="/" className="logo-link">
            <img src="/src/assets/images/logo-image.png" alt="Logo" className="logo-image" />
            <span className="logo-text">Atma Library</span>
          </a>
        </div>
        <nav className="nav-links">
          <Link to="/HomePage" className="nav-link">Home</Link>
          <Link to="/mybooks" className="nav-link">MyBooks</Link>
          <Link to="/CategoryPage" className="nav-link">Category</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </nav>
      </header>

      {/* Book Details Section */}
      <Container className="mt-5 pt-5">
        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Row className="align-items-center">
            {/* Left Column - Book Poster */}
            <Col md={5} className="text-center">
              <img
                src={`http://127.0.0.1:8000/storage/${bookData.book_poster}`}
                alt="Book Poster"
                className="book-poster-img"
              />
            </Col>

            {/* Right Column - Book Details */}
            <Col md={7}>
              <Table bordered striped hover className="book-details-table">
                <tbody>
                  <tr>
                    <th>Title</th>
                    <td>{bookData.judul}</td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <td>{bookData.kategori}</td>
                  </tr>
                  <tr>
                    <th>Author</th>
                    <td>{bookData.pengarang}</td>
                  </tr>
                  <tr>
                    <th>Year Published</th>
                    <td>{bookData.thn_terbit}</td>
                  </tr>
                  <tr>
                    <th>ISBN</th>
                    <td>{bookData.isbn}</td>
                  </tr>
                  <tr>
                    <th>Total Borrowed</th>
                    <td>{bookData.jml_pinjam}</td>
                  </tr>
                  <tr>
                    <th>Stock</th>
                    <td>{bookData.stok}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{bookData.stok > 0 ? "Available" : "Unavailable"}</td>
                  </tr>
                </tbody>
              </Table>
              <div className="text-center">
                {borrowStatus === "borrowed" ? (
                  <Button variant="secondary" size="lg" disabled>
                    Borrowed
                  </Button>
                ) : borrowStatus === "pending" ? (
                  <Button variant="warning" size="lg" disabled>
                    Pending
                  </Button>
                ) : bookData.stok > 0 ? (
                  <Button variant="success" size="lg" onClick={handleBorrowRequest}>
                    Borrow Book
                  </Button>
                ) : (
                  <Button variant="secondary" size="lg" disabled>
                    Not Available
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        )}
      </Container>

      {/* React Toastify */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BookAnggota;
