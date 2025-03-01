import React from "react";
import { FaHeart, FaUserCircle } from "react-icons/fa"; // Importing icons
import { useNavigate } from "react-router-dom"; // For navigation
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();

  // Handle login click (Navigate to Login Page)
  const handleLogin = () => {
    navigate("/login"); // Redirects to Login Page
  };

  // Handle profile click (Navigate to Profile Page)
  const handleProfileClick = () => {
    navigate("/profile"); // Redirects to Profile Page
  };

  // Handle wishlist click (Navigate to Wishlist Page)
  const handleWishlistClick = () => {
    navigate("/wishlist"); // Redirects to Wishlist Page
  };

  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <div className="header-top">
          {/* Logo */}
          <div className="logo">OLX</div>

          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Find Cars, Mobile Phones and more..." />
            <button>Search</button>
          </div>

          {/* User Actions */}
          <div className="actions">
            {/* Sell Button */}
            <a href="categories">
              <button className="sell-button">Sell</button>
            </a>

            {/* Wishlist Icon (Navigates to Wishlist Page) */}
            <div className="wishlist-icon" onClick={handleWishlistClick} style={{ cursor: "pointer" }}>
              <FaHeart size={24} color="#FF4081" />
            </div>

            {/* Profile Icon (Always Visible) */}
            <div className="profile-icon" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
              <FaUserCircle size={32} color="#000" />
            </div>

            {/* Login Button */}
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
