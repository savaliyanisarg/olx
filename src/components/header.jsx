import React from "react";
import { FaHeart, FaUserCircle } from "react-icons/fa"; // Importing icons
import "../styles/Header.css";
import Footer from "./footer";

const Header = () => {
  const handleProfileClick = () => {
    console.log("Profile icon clicked"); // Replace with navigation logic
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
            <input
              type="text"
              placeholder="Find Cars, Mobile Phones and more..."
            />
            <button>Search</button>
          </div>

          {/* User Actions */}
          <div className="actions">
            {/* Using <a> for navigation to sell page */}
            <a href="./catogers.jsx">
              <button className="sell-button">Sell</button>
            </a>

            <div className="wishlist-icon">
              <FaHeart size={24} color="#FF4081" />
            </div>

            <div
              className="profile-icon"
              onClick={handleProfileClick}
              style={{ cursor: "pointer" }}
            >
              <FaUserCircle size={32} color="#000" />
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        {/* <nav className="nav-bar">
          <ul>
            <li>ALL CATEGORIES</li>
            <li>Cars</li>
            <li>Motorcycles</li>
            <li>Mobile Phones</li>
            <li>For Sale: Houses & Apartments</li>
            <li>Scooters</li>
            <li>Commercial & Other Vehicles</li>
            <li>For Rent: Houses & Apartments</li>
          </ul>
        </nav> */}
      </header>

      {/* Footer Section (Imported Footer) */}
    </div>
  );
};

export default Header;
