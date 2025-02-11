import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignUp } from "../../api/apiAuth";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    no_telp: "",
    email: "",
    password: "",
    role: "anggota",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.no_telp) newErrors.no_telp = "Phone number is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await SignUp(formData);
      toast.success("Account created successfully! Redirecting...", {
        position: "top-right",
        autoClose: 500,
      });
  
      console.log(response);
  
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
  
      setFormData({
        name: "",
        address: "",
        no_telp: "",
        email: "",
        password: "",
        role: "anggota",
      });
      setErrors({});
    } catch (error) {
      toast.error(error.message || "Registration failed. Try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Registration error:", error);
    }
  };  

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/components/Auth/Register.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-carousel">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/src/assets/images/login-image1.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/src/assets/images/login-image2.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/src/assets/images/login-image3.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="auth-form">
        <div className="auth-form-header">
          <h2>Create Your Account</h2>
        </div>
        <div className="auth-form-body">
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <p className="error-text">{errors.address}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="no_telp">Phone Number</label>
              <input
                type="text"
                id="no_telp"
                name="no_telp"
                placeholder="Enter your phone number"
                value={formData.no_telp}
                onChange={handleChange}
              />
              {errors.no_telp && <p className="error-text">{errors.no_telp}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>
            <button type="submit">Create</button>
          </form>
          <p className="login-footer">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
