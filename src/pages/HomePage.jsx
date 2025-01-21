import React from "react";
import Header from "../components/header.jsx"; // Adjust path if necessary
import Footer from "..components/footer.jsx"; // Adjust path if necessary
import ProductList from "..pages/product.jsx"; // Adjust path if necessary
import "../styles/HomePage.css"; // Optional: Add a custom stylesheet for the homepage

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Header />
      <main className="main-content">
        <h1>Welcome to Our Store</h1>
        <ProductList />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
