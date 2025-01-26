import React, { useState } from "react";
import "../styles/Postads.css"; // Link to CSS file

const PostAdForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.title || formData.title.length < 5)
      newErrors.title = "Title must be at least 5 characters";
    if (!formData.description || formData.description.length < 10)
      newErrors.description = "Description must be at least 10 characters";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be a positive number";
    if (!formData.location)
      newErrors.location = "Location is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted:", formData);
      alert("Your ad has been submitted successfully!");
      setFormData({
        category: "",
        title: "",
        description: "",
        price: "",
        location: "",
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="post-ad-container">
      <h1 className="form-title">Post Your Ad</h1>
      <form onSubmit={handleSubmit} className="post-ad-form">
        {/* Select Category */}
        <div className="form-group">
          <label htmlFor="category">Select Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Choose a category</option>
            <option value="cars">Cars</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
          </select>
          {errors.category && <p className="error-message">{errors.category}</p>}
        </div>

        {/* Include Some Details */}
        <div className="section-title">Include Some Details</div>
        <div className="form-group">
          <label htmlFor="title">Ad Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a title for your ad"
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide details about your ad"
          ></textarea>
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </div>

        {/* Set a Price */}
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter the price"
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </div>

        {/* Upload Photos */}
        <div className="section-title">Upload Photos</div>
        <div className="upload-grid">
          <div className="upload-box">Click to Upload</div>
          <div className="upload-box">Click to Upload</div>
          <div className="upload-box">Click to Upload</div>
        </div>

        {/* Confirm Location */}
        <div className="form-group">
          <label htmlFor="location">Confirm Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your location"
          />
          {errors.location && <p className="error-message">{errors.location}</p>}
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="submit-button" type="submit">
            Submit
          </button>
          <button
            className="reset-button"
            type="button"
            onClick={() =>
              setFormData({
                category: "",
                title: "",
                description: "",
                price: "",
                location: "",
              })
            }
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostAdForm;
