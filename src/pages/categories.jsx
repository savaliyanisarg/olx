import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AdCategories = () => {
  const navigate = useNavigate();

  const categories = [
    { icon: "🚗", title: "OLX Autos (Cars)" },
    { icon: "🏠", title: "Properties" },
    { icon: "📱", title: "Mobiles" },
    { icon: "💼", title: "Jobs" },
    { icon: "🚲", title: "Bikes" },
    { icon: "🖥️", title: "Electronics and Appliances" },
    { icon: "👕", title: "Fashion" },
    { icon: "🎸", title: "Books Sports and Hobbies" },
    { icon: "🧰", title: "Services" },
  ];

  // Internal CSS as JavaScript Objects
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      textAlign: "center",
    },
    heading: {
      fontSize: "28px",
      color: "#333",
      marginBottom: "15px",
    },
    categoryList: {
      background: "#f9f9f9",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    categoryHeading: {
      fontSize: "22px",
      marginBottom: "15px",
      color: "#007bff",
    },
    categoryItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "white",
      padding: "12px 15px",
      margin: "10px 0",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "0.3s",
    },
    categoryItemHover: {
      background: "#007bff",
      color: "white",
    },
    categoryIcon: {
      fontSize: "24px",
      marginRight: "10px",
    },
    categoryTitle: {
      flexGrow: "1",
      fontSize: "18px",
      fontWeight: "500",
    },
    categoryArrow: {
      fontSize: "20px",
      color: "gray",
    },
    backArrow: {
      display: "flex",
      alignItems: "center",
      fontSize: "18px",
      cursor: "pointer",
      color: "#333",
      position: "absolute",
      top: "20px",
      left: "20px",
      fontWeight: "bold",
    },
    postAddBtn: {
      display: "block",
      width: "200px",
      margin: "20px auto",
      padding: "10px",
      fontSize: "18px",
      fontWeight: "bold",
      color: "#fff",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      textAlign: "center",
      transition: "background-color 0.3s ease",
    },
    postAddBtnHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      {/* Back Arrow at the top-left */}
      <div style={styles.backArrow} onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </div>

      <h1 style={styles.heading}>POST YOUR ADS</h1>
      <div style={styles.categoryList}>
        <h2 style={styles.categoryHeading}>CHOOSE A CATEGORY</h2>
        {categories.map((category, index) => (
          <div
            key={index}
            style={styles.categoryItem}
            onMouseEnter={(e) => (e.currentTarget.style.background = styles.categoryItemHover.background)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            onClick={() => navigate(`/sell/${category.title.toLowerCase().replace(/\s+/g, "-")}`)}
          >
            <span style={styles.categoryIcon}>{category.icon}</span>
            <span style={styles.categoryTitle}>{category.title}</span>
            <span style={styles.categoryArrow}>➡️</span>
          </div>
        ))}
      </div>

      {/* Post Add Button */}
      <button
        style={styles.postAddBtn}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.postAddBtnHover.backgroundColor)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
        onClick={() => navigate("/postads")}
      >
        POST ADD
      </button>
    </div>
  );
};

export default AdCategories;
