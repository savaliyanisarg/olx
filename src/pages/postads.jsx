import React, { useState } from "react";

const categories = [
  "OLX Autos (Cars)",
  "Properties",
  "Mobiles",
  "Jobs",
  "Bikes",
  "Electronics and Appliances",
  "Fashion",
  "Books Sports and Hobbies",
  "Services",
];

const PostAdForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    contact: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("category", formData.category);
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("contact", formData.contact);
    if (formData.image) {
      formDataToSubmit.append("image", formData.image);
    }

    alert(`Ad posted successfully:\n${JSON.stringify(formData, null, 2)}`);
    setFormData({
      category: "",
      title: "",
      description: "",
      price: "",
      contact: "",
      image: null,
    });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Post Your Ad</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ad Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter the title of your ad"
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter a detailed description"
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", minHeight: "100px" }}
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Enter the price"
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          />
        </label>

        <label>
          Contact Information:
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            placeholder="Enter your contact information"
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          />
        </label>

        <label>
          Upload Image:
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ flex: "1", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            />
            {formData.image && <span>{formData.image.name}</span>}
          </div>
        </label>

        <button
          type="submit"
          style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Post Ad
        </button>
      </form>
    </div>
  );
};

export default PostAdForm;
