import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./components/LandingPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import HomePage from "./components/Anggota/HomePage";
import HomeAdmin from "./components/Admin/HomeAdmin";
import BookAdmin from "./components/Admin/BookAdmin";
import AddBookAdmin from "./components/Admin/AddBookAdmin";
import UserReturning from "./components/Admin/UserReturning";
import CategoryPage from "./components/Anggota/CategoryPage";
import EditBookAdmin from "./components/Admin/EditBook";
import Profile from "./components/Anggota/Profile";
import MyBooks from "./components/Anggota/MyBooks";
import UserReturnsPage from "./components/Admin/UserReturning";
import ReturningDetails from "./components/Admin/ReturningDetails";
import BookAnggota from "./components/Anggota/BookAnggota";

const App = () => {
  return (
    <Router>
      <>
      <Routes>
        /** Auth */
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        /**Admin */
        <Route path="/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/BookAdmin" element={<BookAdmin />} />
        <Route path="/AddBookAdmin" element={<AddBookAdmin />} />
        <Route path="/Returning" element={<UserReturnsPage />} />
        <Route path="/EditBook/:id" element={<EditBookAdmin />} />
        <Route path="/return-details/:userId" element={<ReturningDetails />} />

        /**Anggota */
        <Route path="/profile" element={<Profile />} />
        <Route path="/myBooks" element={<MyBooks />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/CategoryPage" element={<CategoryPage />} />
        <Route path="/userreturning/:userid" element={<UserReturning />} />
        <Route path="/BookAnggota/:id" element={<BookAnggota />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
      </>
    </Router>
  );
};

export default App;
