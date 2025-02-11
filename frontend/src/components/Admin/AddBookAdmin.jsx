import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllBooks, CreateBook } from "../../api/Admin/apiAddBookAdmin";

const AddBookAdmin = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/components/Admin/AddBookAdmin.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publicationDate, setPublicationDate] = useState(null);
  const [stock, setStock] = useState("");
  const [id, setId] = useState(0);
  const [bookImage, setBookImage] = useState(null);
  const [jmlPinjam, setJmlPinjam] = useState(0);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState(""); 
  const navigate = useNavigate();

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    setIsFormDirty(true);
  };

  const fetchBooks = async () => {
    try {
      const books = await GetAllBooks();
      console.log("Fetched books:", books);
  
      if (books.length > 0) {
        const latestId = Math.max(...books.map((book) => book.id_buku));
        setId(latestId + 1);
      } else {
        setId(1);
      }
    } catch (error) {
      toast.error("Unable to fetch books. Please try again later.");
      console.error("Error fetching books:", error);
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.error("Please fill in the Title field.");
      return;
    }
    if (!author) {
      toast.error("Please fill in the Author field.");
      return;
    }
    if (!category) {
      toast.error("Please select a Category.");
      return;
    }
    if (!isbn) {
      toast.error("Please fill in the ISBN field.");
      return;
    }
    if (!publicationDate) {
      toast.error("Please select a Publication Date.");
      return;
    }
    if (!bookImage) {
      toast.error("Please select a Book Image.");
      return;
    }
    if (!stock) {
      toast.error("Please fill in the Stock field.");
      return;
    }


    const stockCount = parseInt(stock, 10) || 0;
    const thnTerbit = publicationDate.toISOString().split("T")[0];

    const formData = new FormData();
    formData.append("kategori", category);
    formData.append("thn_terbit", thnTerbit);
    formData.append("judul", title);
    formData.append("pengarang", author);
    formData.append("isbn", isbn || "");
    formData.append("stok", stockCount);
    formData.append("id", id);
    if (bookImage) {
      formData.append("book_poster", bookImage);
    }
    formData.append("status", "available");
    formData.append("jml_pinjam", parseInt(jmlPinjam, 10));

    try {
      await CreateBook(formData);
      toast.success("Book successfully added!");
      setTitle("");
      setAuthor("");
      setCategory("");
      setIsbn("");
      setPublicationDate(null);
      setStock("");
      setBookImage(null);
      fetchBooks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add book. Please try again."
      );
      console.error("Error adding book:", error);
    }
  };

  const handleCancel = () => {
    setShowConfirmDialog(false); 
  };

  const handleNavigate = (path) => {
    if (isFormDirty) {
      setNavigationTarget(path);
      setShowConfirmDialog(true);
    } else {
      navigate(path); 
    }
  };

  const handleConfirmNavigate = () => {
    setShowConfirmDialog(false); 
    navigate(navigationTarget);
  };

  const handleBeforeUnload = (event) => {
    if (isFormDirty) {
      const message =
        "You have unsaved changes, are you sure you want to leave?";
      event.returnValue = message; 
      return message; 
    }
  };

  useEffect(() => {
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [isFormDirty]);

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="home-container">
      <ToastContainer />
      <header className="app-bar">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="logo">
            <Link to="/" className="logo-link">
              <img
                src="/src/assets/images/logo-image.png"
                alt="Logo"
                className="logo-image"
              />
              <span className="logo-text">Atma Library</span>
            </Link>
          </div>
          <nav className="nav-links">
            <Link
              to="/HomeAdmin"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("/HomeAdmin");
              }}
            >
              Home
            </Link>
            <Link to="/BookAdmin" className="nav-link">
              Books
            </Link>
            <Link
              to="/Returning"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("/Returning");
              }}
            >
              Returning
            </Link>
          </nav>
        </Container>
      </header>

      <section className="form-section">
        <Container>
          <Card className="form-card">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => handleInputChange(e, setTitle)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={category}
                      onChange={(e) => handleInputChange(e, setCategory)}
                    >
                      <option value="">Select category</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Romance">Romance</option>
                      <option value="Horror">Horror</option>
                      <option value="Kids">Kids</option>
                      <option value="Fiction">Fiction</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter author"
                      value={author}
                      onChange={(e) => handleInputChange(e, setAuthor)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter ISBN"
                      value={isbn}
                      onChange={(e) => handleInputChange(e, setIsbn)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Publication Date</Form.Label>
                    <DatePicker
                      selected={publicationDate}
                      onChange={(date) => {
                        setPublicationDate(date);
                        setIsFormDirty(true); 
                      }}
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                      placeholderText="Select a date"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Book Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setBookImage(e.target.files[0])}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter stock"
                      value={stock}
                      onChange={(e) => handleInputChange(e, setStock)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={id || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-center mt-4">
                <Button variant="primary" type="submit" className="btn-submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
        </Container>
      </section>

      {showConfirmDialog && (
        <div className="confirm-dialog">
          <div className="confirm-dialog-content">
            <p>You have unsaved changes. Are you sure you want to leave?</p>
            <div className="button-container">
              <button className="button-leave" onClick={handleConfirmNavigate}>
                Yes
              </button>
              <button className="button-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBookAdmin;
