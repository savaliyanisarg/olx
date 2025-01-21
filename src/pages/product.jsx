import React from "react";
import "../styles/ProductList.css"; // Adjust relative to the actual file location

const ProductList = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      title: "Honda Civic 2020",
      price: "₹ 9,50,000",
      location: "Mumbai, Maharashtra",
      posted: "2 days ago",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      title: "iPhone 13 Pro Max",
      price: "₹ 1,20,000",
      location: "Bangalore, Karnataka",
      posted: "1 week ago",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      title: "Yamaha R15 V3",
      price: "₹ 1,50,000",
      location: "Delhi",
      posted: "3 days ago",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/150",
      title: "Samsung 55\" 4K TV",
      price: "₹ 50,000",
      location: "Hyderabad, Telangana",
      posted: "5 hours ago",
    },
  ];

  return (
    <div className="product-list-container">
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">{product.price}</p>
            <p className="product-location">{product.location}</p>
            <p className="product-posted">{product.posted}</p>
            <button className="contact-button">Contact Seller</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
