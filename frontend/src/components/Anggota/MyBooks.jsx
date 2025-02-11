import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Toast,
  Alert,
  Card,
  Spinner,
} from "react-bootstrap";
import { SignOut } from "../../api/apiAuth";
import { Link, useNavigate } from "react-router-dom";
import apiMyBooks from "../../api/Anggota/apiMyBooks";

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await apiMyBooks.getPeminjamanByUserId();
      console.log("Fetched data:", result);
      if (result) {
        setMyBooks(result);
      } else {
        console.error("Failed to fetch data");
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/src/components/Anggota/MyBooks.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleLogout = async () => {
    const result = await SignOut();
    if (result.success) {
      console.log("Logout successful");
      navigate("/");
    } else {
      console.error("Logout failed:", result.error);
      tampilToast("Failed to log out. Please try again.");
    }
  };

  const tampilToast = (message) => {
    console.log("Toast message:", message);
    console.log("Show Toast:", showToast);
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <>
      <div className="home-container">
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
            <Link to="/HomePage" className="nav-link">
              Home
            </Link>
            <Link to="/mybooks" className="nav-link-active">
              MyBooks
            </Link>
            <Link to="/CategoryPage" className="nav-link">
              Category
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </nav>
        </header>
        {isLoading ? (
          <div
            className="loading-container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "28rem",
            }}
          >
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h5>Sedang loading...</h5>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "8rem",
            }}
          >
            <Container>
              <Row className="g-5">
                {myBooks.length > 0 ? (
                  myBooks.map((pinjam) => (
                    <Col key={pinjam.id_pinjam} xs={6} md={4} lg={3}>
                      <Card>
                      <Link to={`/BookAnggota/${pinjam.buku.id_buku}`}>
                        <Card.Img
                          variant="top"
                          src={`http://127.0.0.1:8000/storage/${pinjam.buku.book_poster}`}
                          alt="poster buku"
                        />
                        </Link>
                        <Card.Body>
                          <Card.Title className="text-center mb-3">
                            <h5>
                              <strong>{pinjam.buku.judul}</strong>
                            </h5>
                          </Card.Title>{" "}
                          <Card.Text className="text-center">
                            <h6>{pinjam.buku.pengarang}</h6>
                            <h6>
                              <strong>
                                <small>Date Borrow: {pinjam.tgl_pinjam}</small>
                              </strong>
                            </h6>
                            <h6>
                              <strong>
                                <small>Date Return: {pinjam.tgl_kembali}</small>
                              </strong>
                            </h6>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <div style={{ marginTop: "22rem" , marginBottom: "30rem"}} className="text-center">
                    <h1>You dont have any books borrowed {":("} </h1>
                  </div>
                )}
              </Row>
            </Container>
          </div>
        )}
      </div>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={5000}
        autohide
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 1050,
          backgroundColor: "black",
          color: "white",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default MyBooks;
