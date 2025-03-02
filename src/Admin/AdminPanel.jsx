import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManagement from "./UserManagement";
import ProductManagement from "./ProductManagement";
import CategoryManagement from "./CategoryManagement";
import "../styles/AdminPanel.css"; // Custom styles for Admin Panel

const AdminPanel = () => {
  const [selectedSection, setSelectedSection] = useState("users");
  const navigate = useNavigate();

  const renderSection = () => {
    switch (selectedSection) {
      case "users":
        return <UserManagement />;
      case "products":
        return <ProductManagement />;
      case "categories":
        return <CategoryManagement />;
      default:
        return <UserManagement />;
    }
  };

  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing authentication tokens)
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="admin-panel">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setSelectedSection("users")}>User Management</li>
          <li onClick={() => setSelectedSection("products")}>Product Management</li>
          <li onClick={() => setSelectedSection("categories")}>
            Category Management
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>
      <main className="admin-content">{renderSection()}</main>
    </div>
  );
};

export default AdminPanel;
