import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetBookById, UpdateBook, DeleteBook } from "../../api/Admin/apiEditBookAdmin";

const EditBookAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [bookDetails, setBookDetails] = useState({
    id_buku: "",
    judul: "",
    thn_terbit: "",
    pengarang: "",
    kategori: "",
    isbn: "",
    jml_pinjam: 0,
    stok: 0,
    status: "available",
    book_poster: "",
    created_at: "",
  });
  const [bookImage, setBookImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const book = await GetBookById(id);
        setBookDetails({
          id_buku: book.id_buku,
          judul: book.judul,
          thn_terbit: book.thn_terbit,
          pengarang: book.pengarang,
          kategori: book.kategori,
          isbn: book.isbn,
          jml_pinjam: book.jml_pinjam,
          stok: book.stok,
          status: book.status,
          book_poster: book.book_poster,
          created_at: book.created_at,
        });
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch book details.");
        console.error("Error:", error);
      }
    };
    fetchBookDetails();
  }, [id]);

  useEffect(() => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/src/components/Admin/EditBook.css';
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }, []);

  const handleInputChange = (e, field) => {
    let value = e.target.value;
    if (field === "thn_terbit") {
      value = new Date(value).toISOString().split("T")[0];
    }
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedData = new FormData();
  
    Object.keys(bookDetails).forEach((key) => {
      if (key !== "id_buku" && key !== "created_at" && key !== "book_poster") {
        updatedData.append(key, bookDetails[key]);
      }
    });
  
    if (bookImage) {
      updatedData.append("book_poster", bookImage);
    }
  
    console.log("FormData being sent:", [...updatedData.entries()]);
  
    try {
      const response = await UpdateBook(id, updatedData);
      toast.success("Book updated successfully!");
      navigate("/BookAdmin");
    } catch (error) {
      console.error("Error during update:", error.response?.data || error.message);
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([field, messages]) => {
          messages.forEach((msg) => toast.error(`${field}: ${msg}`));
        });
      } else {
        toast.error("Failed to update book. See console for details.");
      }
    }
  };
  
  

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await DeleteBook(id);
      toast.success("Book deleted successfully!");
      navigate("/BookAdmin");
    } catch (error) {
      toast.error("Failed to delete book.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="edit-book-container">
      <ToastContainer />
      {/* App Bar */}
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
                navigate("/HomeAdmin");
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
                navigate("/Returning");
              }}
            >
              Returning
            </Link>
          </nav>
        </Container>
      </header>

      <section className="form-section">
        <Container>
          <Card className="form-card p-4">
            {isLoading ? (
              <p>Loading book details...</p>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Row>
                  {/* Image Section */}
                  <Col md={4} className="text-center">
                    <div className="image-container">
                    <img
                      src={
                        bookImage
                          ? URL.createObjectURL(bookImage) // Preview newly uploaded file
                          : bookDetails.book_poster
                          ? `http://127.0.0.1:8000/storage/${bookDetails.book_poster}`
                          : "/path-to-placeholder.jpg"
                      }
                      alt={bookDetails.judul || "Book Cover"}
                      className="img-fluid rounded"
                    />
                    </div>
                  </Col>

                  {/* Form Section */}
                  <Col md={8}>
                    <Row>
                      {/* ID */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>ID</Form.Label>
                          <Form.Control
                            type="text"
                            value={bookDetails.id_buku}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      {/* Title */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            value={bookDetails.judul}
                            onChange={(e) => handleInputChange(e, "judul")}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      {/* Author */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Author</Form.Label>
                          <Form.Control
                            type="text"
                            value={bookDetails.pengarang}
                            onChange={(e) => handleInputChange(e, "pengarang")}
                          />
                        </Form.Group>
                      </Col>
                      {/* Category */}
                      <Col md={6}>
                      <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                          value={bookDetails.kategori}
                          onChange={(e) => handleInputChange(e, "kategori")}
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
                      {/* ISBN */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>ISBN</Form.Label>
                          <Form.Control
                            type="text"
                            value={bookDetails.isbn}
                            onChange={(e) => handleInputChange(e, "isbn")}
                          />
                        </Form.Group>
                      </Col>
                      {/* Stock */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Stock</Form.Label>
                          <Form.Control
                            type="number"
                            value={bookDetails.stok}
                            onChange={(e) => handleInputChange(e, "stok")}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      {/* Status */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Status</Form.Label>
                          <Form.Select
                            value={bookDetails.status}
                            onChange={(e) => handleInputChange(e, "status")}
                          >
                            <option value="available">Available</option>
                            <option value="borrowed">Borrowed</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      {/* Total Borrowed */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Total Borrowed</Form.Label>
                          <Form.Control
                            type="number"
                            value={bookDetails.jml_pinjam}
                            onChange={(e) => handleInputChange(e, "jml_pinjam")}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* File Upload */}
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Change Book Image</Form.Label>
                          <Form.Control type="file" onChange={handleImageChange} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                      <Form.Group>
                        <Form.Label>Published Year</Form.Label>
                        <Form.Control
                          type="date"
                          value={bookDetails.thn_terbit}
                          onChange={(e) => handleInputChange(e, "thn_terbit")}
                        />
                      </Form.Group>
                      </Col>
                    </Row>

                    {/* Buttons */}
                    <div className="text-end mt-4">
                      <Button variant="danger" className="me-2" onClick={handleDelete}>
                        Delete Book
                      </Button>
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Card>
        </Container>
      </section>
    </div>
  );
};

export default EditBookAdmin;
