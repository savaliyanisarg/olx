import React, { useState } from "react";
import "../styles/Styaling.css";

const AdPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    image: null,
  });

  const [errors, setErrors] = useState({}); // State to track validation errors

  const validateForm = () => {
    const newErrors = {};

    // Title validation: Must be at least 5 characters and not empty
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters long.";
    }

    // Description validation: Must be at least 20 characters
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (formData.description.length < 20) {
      newErrors.description =
        "Description must be at least 20 characters long.";
    }

    // Price validation: Must be a positive number and required
    if (!formData.price) {
      newErrors.price = "Price is required.";
    } else if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    // Category validation: Must be selected
    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    // Location validation: Must be at least 3 characters
    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    } else if (formData.location.length < 3) {
      newErrors.location = "Location must be at least 3 characters long.";
    }

    // Image validation: Must upload a valid image
    if (!formData.image) {
      newErrors.image = "Please upload an image.";
    } else if (!/\.(jpg|jpeg|png)$/i.test(formData.image.name)) {
      newErrors.image = "Only JPG, JPEG, and PNG files are allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Form is valid if there are no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Data Submitted:", formData);
      alert("Ad Posted Successfully!");
      // Add API integration logic here to post the ad
    } else {
      console.log("Validation failed:", errors);
    }
  };

  return (
    <div className="ad-post-form-container">
      <h2>Post a New Ad</h2>
      <form className="ad-post-form" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Ad Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter ad title"
            value={formData.title}
            onChange={handleInputChange}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your item"
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleInputChange}
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Cars">Cars</option>
            <option value="Mobile Phones">Mobile Phones</option>
            <option value="Bikes">Bikes</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleInputChange}
          />
          {errors.location && <p className="error">{errors.location}</p>}
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Post Ad
        </button>
      </form>
    </div>
  );
};

export default AdPostForm;
