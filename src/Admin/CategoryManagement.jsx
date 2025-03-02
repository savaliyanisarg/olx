import React, { useState } from "react";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    "Cars",
    "Mobile Phones",
    "Houses",
    "Electronics",
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (name) => {
    setCategories(categories.filter((category) => category !== name));
  };

  // Internal CSS Styles
  const styles = {
    container: {
      maxWidth: "500px",
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    inputGroup: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "15px",
    },
    input: {
      flex: "1",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    addBtn: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "8px 12px",
      border: "none",
      borderRadius: "4px",
      marginLeft: "5px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    addBtnHover: {
      backgroundColor: "#0056b3",
    },
    categoryList: {
      listStyle: "none",
      padding: "0",
    },
    categoryItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      borderBottom: "1px solid #ddd",
      fontWeight: "bold",
      color: "#0e0f0f",
      transition: "color 0.3s ease",
    },
    deleteBtn: {
      backgroundColor: "#dc3545",
      color: "white",
      padding: "6px 10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    deleteBtnHover: {
      backgroundColor: "#c82333",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Category Management</h2>

      {/* Add Category Input */}
      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={handleAddCategory}
          style={styles.addBtn}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.addBtnHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.addBtn.backgroundColor)}
        >
          Add Category
        </button>
      </div>

      {/* Category List */}
      <ul style={styles.categoryList}>
        {categories.map((category, index) => (
          <li key={index} style={styles.categoryItem}>
            {category}
            <button
              onClick={() => handleDeleteCategory(category)}
              style={styles.deleteBtn}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.deleteBtnHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = styles.deleteBtn.backgroundColor)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
