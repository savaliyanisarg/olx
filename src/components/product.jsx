import React, { useState } from "react";
import "../styles/ProductList.css"; // CSS for styles

const ProductListing = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL CATEGORIES");

  // Sample Data for Products with Categories
  const products = [
    {
      id: 1,
      name: "Honda City 2020",
      price: "₹12,00,000",
      image: "https://via.placeholder.com/200?text=Honda+City",
      category: "Cars",
    },
    {
      id: 2,
      name: "Samsung Galaxy S22",
      price: "₹80,000",
      image: "https://via.placeholder.com/200?text=Samsung+Galaxy",
      category: "Mobile Phones",
    },
    {
      id: 3,
      name: "Yamaha R15",
      price: "₹1,50,000",
      image: "https://via.placeholder.com/200?text=Yamaha+R15",
      category: "Motorcycles",
    },
    {
      id: 4,
      name: "For Rent: Luxury Villa",
      price: "₹1,00,000/month",
      image: "https://via.placeholder.com/200?text=Luxury+Villa",
      category: "For Rent: Houses & Apartments",
    },
    {
      id: 5,
      name: "Scooty Pep+",
      price: "₹50,000",
      image: "https://via.placeholder.com/200?text=Scooty+Pep",
      category: "Scooters",
    },
    {
      id: 6,
      name: "Sony Bravia TV",
      price: "₹70,000",
      image: "https://via.placeholder.com/200?text=Sony+Bravia+TV",
      category: "Electronics",
    },
  ];

  // Filtered products based on the selected category
  const filteredProducts =
    selectedCategory === "ALL CATEGORIES"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Function to render products dynamically
  const renderProducts = (products) =>
    products.map((product) => (
      <div className="product-card" key={product.id}>
        <img src={product.image} alt={product.name} className="product-image" />
        <h4 className="product-name">{product.name}</h4>
        <p className="product-price">{product.price}</p>
      </div>
    ));

  return (
    <div className="product-listing-container">
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <ul>
          {[
            "ALL CATEGORIES",
            "Cars",
            "Motorcycles",
            "Mobile Phones",
            "For Sale: Houses & Apartments",
            "Scooters",
            "Commercial & Other Vehicles",
            "For Rent: Houses & Apartments",
          ].map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </nav>

      {/* Products Section */}
      <div className="section">
        <h2>{selectedCategory}</h2>
        <div className="product-grid">{renderProducts(filteredProducts)}</div>
      </div>
    </div>
  );
};

export default ProductListing;
