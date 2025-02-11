import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { SignIn } from "../../api/apiAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromSS = sessionStorage.getItem("token"); // Gunakan kunci "token"
    setToken(tokenFromSS);
    if (tokenFromSS) {
      navigate("/HomePage");
    }
  }, [navigate]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/src/components/Auth/Login.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await SignIn({ email, password });
  
      // Ambil token dari respons
      const token = response.token;
      if (!token) {
        throw new Error("Token is not present in the API response.");
      }
  
      // Login sukses, tampilkan toast
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 500,
      });
  
      console.log("Token saved:", token);
  
      setTimeout(() => {
        // Navigasi berdasarkan role user
        if (response.user.role === "admin") {
          navigate("/HomeAdmin");
        } else {
          navigate("/HomePage");
        }
      }, 2000);
    } catch (error) {
      // Tampilkan toast error jika login gagal
      toast.error("Invalid credentials. Please try again!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Login error:", error);
    }
  };

  return (
    !token && (
      <div className="login-container">
        <div className="carousel-container">
          <Carousel>
            <Carousel.Item>
              <img
                className="carousel-image"
                src="/src/assets/images/login-image1.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carousel-image"
                src="/src/assets/images/login-image2.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carousel-image"
                src="/src/assets/images/login-image3.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="login-card">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Please log in to continue</p>
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          <p className="login-footer">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
        <ToastContainer />
      </div>
    )
  );
};

export default Login;
