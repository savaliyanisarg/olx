import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EditProfile.css";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    profileImage: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Fetch user data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          throw new Error("No email found in localStorage. Please log in again.");
        }

        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: { email },
        });

        if (response.data && response.data.email === email) {
          setFormData({
            name: response.data.name || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
            location: response.data.location || "",
            profileImage: response.data.profileImage || "",
          });
          setApiError(null);
        } else {
          throw new Error("Email mismatch. Please log in again.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setApiError(error.response?.data?.message || "Failed to fetch profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, profileImage: "Please upload a valid image file." });
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, profileImage: "Image size should be less than 2MB." });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
      setErrors({ ...errors, profileImage: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits).";
    }
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    setLoading(true);

    // Create FormData to handle file and text fields
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("phone", formData.phone);
    formDataToSubmit.append("location", formData.location);
    formDataToSubmit.append("originalEmail", localStorage.getItem("email"));
    
    // Append file (if selected)
    if (formData.profileImageFile) {
      formDataToSubmit.append("profileImage", formData.profileImageFile);
    }

    try {
      const token = localStorage.getItem("token");
      const storedEmail = localStorage.getItem("email");
      
      if (!token || !storedEmail) {
        throw new Error("Authentication required. Please log in again.");
      }

      const response = await axios.put(
        "http://localhost:5000/api/Editprofile",
        formDataToSubmit,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"  // Ensure correct header for file upload
          },
        }
      );

      if (response.status === 200) {
        // Update localStorage if email was changed
        if (formData.email !== storedEmail) {
          localStorage.setItem("email", formData.email);
        }
        
        alert("Profile updated successfully!");
        navigate("/profile");
      } else {
        throw new Error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setApiError(
        error.response?.data?.message || 
        "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
};

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <button className="back-button" onClick={handleGoBack}>
        &larr; Back to Profile
      </button>

      {apiError && <div className="alert alert-danger">{apiError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="profileImage">Profile Picture</label>
          <div className="profile-picture-container">
            <img
              src={formData.profileImage || "/assets/profile.png"}
              alt="Profile"
              className="profile-picture"
              onError={(e) => {
                e.target.src = "/assets/profile.png";
              }}
            />
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="profileImage" className="file-upload-label">
              Choose File
            </label>
            {formData.profileImage && (
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => setFormData({...formData, profileImage: ""})}
              >
                Remove
              </button>
            )}
          </div>
          {errors.profileImage && (
            <div className="error-message">{errors.profileImage}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className={errors.phone ? "error-input" : ""}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your location"
            className={errors.location ? "error-input" : ""}
          />
          {errors.location && <div className="error-message">{errors.location}</div>}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="save-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;