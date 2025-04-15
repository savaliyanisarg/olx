import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Check if the user is logged in
  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (!email || !token) {
      // Redirect to login page if the user is not logged in
      navigate("/login");
    }
  }, [navigate]);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Retrieve email from localStorage
        const email = localStorage.getItem("email");

        if (!email) {
          throw new Error("No email found in localStorage. Please log in again.");
        }

        // Fetch user data from the backend using the email
        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: { email }, // Pass the email as a query parameter
        });

        // Check if the fetched email matches the localStorage email
        if (response.data.email === email) {
          setUserData(response.data);
          setError(null); // Clear any previous errors
        } else {
          throw new Error("Email mismatch. Please log in again.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message || "Failed to fetch profile data. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    navigate("/EditProfile");
  };

  const handleLogout = () => {
    // Clear localStorage and redirect to login page
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Display loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading profile data...</p>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="profile-container">
        <div className="profile-card">
          {/* Back Button */}
          <button className="back-button" onClick={handleGoBack}>
            &larr; Back
          </button>

          {/* Profile Image */}
          <div className="profile-image">
            <img
              src={userData.profileImage || "/assets/profile.png"} // Use a valid fallback path
              alt="Profile"
              onError={(e) => {
                e.target.src = "/assets/profile.png"; // Fallback image if the URL is invalid
              }}
            />
          </div>

          {/* User Details */}
          <div className="profile-details">
            <h2>{userData.name}</h2>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
            <p>Location: {userData.location}</p>
          </div>

          {/* Edit Profile Button */}
          <div className="profile-actions">
            <button className="edit-profile-button" onClick={handleEditProfile}>
              Edit Profile
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;