import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { GetAllUsers } from "../../api/Admin/apiUser";

const UserReturnsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalUsers, setOriginalUsers] = useState([]);
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await GetAllUsers();
        // Filter users by role "anggota"
        const filteredUsers = data.filter((user) => user.role === "anggota");
        setUsers(filteredUsers);
        setOriginalUsers(filteredUsers); // Keep original data for filtering
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setUsers(originalUsers);
      return;
    }

    // Filter users based on search term
    const filteredData = originalUsers.filter((user) =>
      (user.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    setUsers(filteredData);
  }, [searchTerm, originalUsers]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/src/components/Admin/UserReturning.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleDetails = (userId) => {
    navigate(`/return-details/${userId}`);
  };

  return (
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
        <div className="search-bar">
          <Form.Control
            type="text"
            placeholder="Search by user name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <nav className="nav-links">
          <Link to="/HomeAdmin" className="nav-link">
            Home
          </Link>
          <Link to="/BookAdmin" className="nav-link">
            Books
          </Link>
          <Link to="/returning" className="nav-link-active">
            Returning
          </Link>
        </nav>
      </header>

      <section className="user-returns-section py-5 mt-5">
        <Container>
          <h3 className="text-center mb-4 section-title">User Returns</h3>
          {loading && <p>Loading data...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          {!loading && !error && (
            <Row>
              {users.map((user) => (
                <Col key={user.id} sm={12} md={6} lg={3} className="mb-4">
                  <div className="book-card">
                    <img
                      src={`${baseURL}/storage/${user.profile_photo_path}`}
                      alt={user.name}
                      className="book-cover"
                    />
                    <div className="book-title">{user.name + " - " + user.id_user|| "Unknown User"}</div>
                    <div className="no-telp">No. Telp: {user.no_telp || "N/A"}</div>
                    <Button
                      variant="info"
                      onClick={() => handleDetails(user.id_user)}
                      className="book-card-link"
                    >
                      View Details
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
};

export default UserReturnsPage;

