import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import apiUser from "../../api/Anggota/apiProfilePage";
import { SignOut } from "../../api/apiAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const userData = await apiUser.getUserById();
      if (userData) {
        setUser(userData);
        setNewAddress(userData.address);
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/src/components/Anggota/Profile.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // const tampilToast = (message) => {
  //   console.log("Toast message:", message);
  //   console.log("Show Toast:", showToast);
  //   toast.success(message);
  //   toast.error(message);
  // };

  const handleLogout = async () => {
    const result = await SignOut();
    if (result.success) {
      navigate("/", { state: { toastMessage: "Logout successful!" } });
    } else {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const handleEditAddress = async () => {
    if (isEditingAddress) {
      const updatedData = { address: newAddress };
      const result = await apiUser.updateUser(updatedData);
      if (result) {
        setUser((prevUser) => ({ ...prevUser, address: newAddress }));
        setIsEditingAddress(false);
        toast.success("Address updated successfully!");
      } else {
        toast.error("Failed to update address. Please try again.");
      }
    } else {
      setIsEditingAddress(true);
    }
  };

  const handleEditPassword = async () => {
    if (isEditingPassword) {
      if (newPassword.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return;
      }
      const updatedData = { password: newPassword };
      const result = await apiUser.updateUser(updatedData);
      if (result) {
        setNewPassword("");
        setIsEditingPassword(false);
        toast.success("Password updated successfully!");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } else {
      setIsEditingPassword(true);
    }
  };

  const handleUploadProfilePhoto = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      toast.error("No File Selected");
      return;
    }

    const formData = new FormData();
    formData.append("profile_photo", file);

    try {
      const result = await apiUser.updateProfilePhoto(formData);
      console.log(result);
      if (result.message === "Profile photo updated successfully") {
        setUser((prevUser) => ({
          ...prevUser,
          profile_photo_path: result.data.profile_photo_path,
        }));
        toast.success("Profile photo updated successfully!");
      } else {
        toast.error("Failed to update profile photo. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading profile photo:", error);
      tampilToast("Failed to update profile photo. Please try again.");
    }
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
            <Link to="/mybooks" className="nav-link">
              MyBooks
            </Link>
            <Link to="/CategoryPage" className="nav-link">
              Category
            </Link>
            <Link to="/profile" className="nav-link-active">
              Profile
            </Link>
            <button className="btn btn-logout" onClick={handleLogout}>
              Log Out
            </button>
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
            <Spinner
              animation="border"
              role="status"
              style={{ color: "#ff7043" }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Container className="mt-5 mb-5 p-3 profile-container">
              {user && (
                <>
                  <div className="d-flex align-items-center m-2">
                    <div className="position-relative">
                      {user.profile_photo_path ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${user.profile_photo_path}`}
                          className="img-fluid rounded-circle profile-pic"
                          alt="Profile Picture"
                          style={{ width: "100px", height: "100px" }}
                        />
                      ) : (
                        <img
                          src="https://picsum.photos/200/300"
                          className="img-fluid rounded-circle profile-pic"
                          alt="Profile Picture"
                          style={{ width: "100px", height: "100px" }}
                        />
                      )}
                      <div className="edit-button">
                        <i
                          className="bi bi-pencil"
                          style={{ color: "white", fontSize: "14px" }}
                          onClick={() => document.getElementById("pfp").click()}
                        ></i>
                        <input
                          type="file"
                          name="pfp"
                          id="pfp"
                          className="d-none"
                          onChange={(event) => {
                            handleUploadProfilePhoto(event);
                          }}
                          accept="image/*"
                        />
                      </div>
                    </div>
                    <h2 className="ms-4">Hello, {user.name}!</h2>
                  </div>

                  <Row className="g-3 mt-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>User ID</Form.Label>
                        <Form.Control
                          type="text"
                          name="id_user"
                          value={user.id_user}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="no_telp"
                          value={user.no_telp}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={user.name}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={user.email}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            name="address"
                            value={newAddress}
                            readOnly={!isEditingAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                          />
                          <Button
                            onClick={handleEditAddress}
                            className="button-edit-custom"
                          >
                            {isEditingAddress ? (
                              <i className="bi bi-check"></i>
                            ) : (
                              <i className="bi bi-pencil"></i>
                            )}
                          </Button>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={isShowPassword ? "text" : "password"}
                            name="password"
                            value={newPassword}
                            readOnly={!isEditingPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <Button
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className="button-edit-custom"
                          >
                            {isShowPassword ? (
                              <i className="bi bi-eye-slash"></i>
                            ) : (
                              <i className="bi bi-eye"></i>
                            )}
                          </Button>
                          <Button
                            onClick={handleEditPassword}
                            className="button-edit-custom"
                          >
                            {isEditingPassword ? (
                              <i className="bi bi-check"></i>
                            ) : (
                              <i className="bi bi-pencil"></i>
                            )}
                          </Button>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              )}
            </Container>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ProfilePage;