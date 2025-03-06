import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/Profile.css"; // Include the CSS file for styling
import Header from "../components/Header"; // Import Header component
import Footer from "../components/Footer"; // Import Footer component

const ProfilePage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Navigate to Edit Profile page
  const handleEditProfile = () => {
    navigate("/EditProfile"); // Redirects to Edit Profile Page
  };

  return (
    <>
      <Header /> {/* Include Header */}

      <div className="profile-container">
        <div className="profile-card">
          {/* Profile Image */}
          <div className="profile-image">
            <img
              src="src/assets/profile.png" // Replace with dynamic image URL
              alt="Profile"
            />
          </div>

          {/* User Details */}
          <div className="profile-details">
            <h2>John Doe</h2>
            <p>Email: john.doe@example.com</p>
            <p>Phone: +1 234 567 8901</p>
            <p>Location: New York, USA</p>
          </div>

          {/* Edit Profile Button */}
          <div className="profile-actions">
            <button className="edit-profile-button" onClick={handleEditProfile}>
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <Footer /> {/* Include Footer */}
    </>
  );
};

export default ProfilePage;
