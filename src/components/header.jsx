import React from "react";
import { FaHeart, FaUserCircle, FaComments } from "react-icons/fa"; // Importing icons
import { useNavigate } from "react-router-dom"; // For navigation
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();

  // Handle navigation clicks
  const handleLogin = () => navigate("/login");
  const handleProfileClick = () => navigate("/profile");
  const handleWishlistClick = () => navigate("/wishlist");
  const handleChatClick = () => navigate("/messages"); // Navigate to Chat Page

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

            {/* Wishlist Icon */}
            <div className="wishlist-icon" onClick={handleWishlistClick} style={{ cursor: "pointer" }}>
              <FaHeart size={24} color="#FF4081" />
            </div>

            {/* Chat Icon */}
            <div className="chat-icon" onClick={handleChatClick} style={{ cursor: "pointer", marginLeft: "10px" }}>
              <FaComments size={24} color="#007bff" />
            </div>

            {/* Profile Icon */}
            <div className="profile-icon" onClick={handleProfileClick} style={{ cursor: "pointer", marginLeft: "10px" }}>
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
