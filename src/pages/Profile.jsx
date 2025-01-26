import React from "react";
import "../styles/Profile.css"; // Include the CSS file for styling

const ProfilePage = () => {
  const handleEditProfile = () => {
    alert("Redirecting to Edit Profile...");
    // Logic to navigate to edit profile page (e.g., use React Router)
  };

  return (
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
  );
};

export default ProfilePage;
