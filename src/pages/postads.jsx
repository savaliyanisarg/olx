import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/Adpost.css";

const AdPostForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) newErrors.price = "Valid price is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.image) newErrors.image = "Please upload an image.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/ads", {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();
      if (response.ok) {
        alert("Ad posted successfully!");
        navigate("/");
      } else {
        alert(result.error || "Failed to post ad");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error posting ad");
    }
    setLoading(false);
  };

  return (
    <div className="ad-post-form-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft className="back-icon" /> Back
      </button>
      <h2>Post a New Ad</h2>
      <form className="ad-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Ad Title</label>
          <input type="text" id="title" name="title" placeholder="Enter ad title" value={formData.title} onChange={handleInputChange} />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder="Describe your item" value={formData.description} onChange={handleInputChange} />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input type="number" id="price" name="price" placeholder="Enter price" value={formData.price} onChange={handleInputChange} />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
            <option value="" disabled>Select a category</option>
            <option value="Cars">Cars</option>
            <option value="Mobile Phones">Mobile Phones</option>
            <option value="Bikes">Bikes</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" placeholder="Enter location" value={formData.location} onChange={handleInputChange} />
          {errors.location && <p className="error">{errors.location}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>

        <button type="submit" className="submit-button" disabled={loading}>{loading ? "Posting..." : "Post Ad"}</button>
      </form>
    </div>
  );
};

export default AdPostForm;
