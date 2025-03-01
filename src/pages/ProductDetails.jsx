import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css"; // Ensure correct styling

// Import Header and Footer if they exist
// import Header from "../components/Header"; 
// import Footer from "../components/Footer"; 

const products = [
  {
    id: 1,
    name: "Honda City 2020",
    price: "₹12,00,000",
    description: "Well-maintained Honda City 2020 with single ownership. Regularly serviced and driven only 20,000 km.",
    location: "Bangalore, Karnataka",
    image: "/src/assets/car.png", // Ensure image is inside 'public/assets/'
    seller: { name: "John Doe", contact: "+91 98765 43210" }
  },
  {
    id: 2,
    name: "Samsung Galaxy S22",
    price: "₹80,000",
    description: "Brand new Samsung Galaxy S22 with warranty.",
    location: "Mumbai, Maharashtra",
    image: "/assets/mobile.png",
    seller: { name: "Alice Smith", contact: "+91 99876 54321" }
  },
  {
    id: 3,
    name: "Yamaha R15",
    price: "₹1,50,000",
    description: "A sporty Yamaha R15 with excellent condition.",
    location: "Delhi, India",
    image: "/assets/bike.png",
    seller: { name: "Michael Brown", contact: "+91 98765 12345" }
  }
];

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  // Find the selected product based on the ID
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate("/")} className="home-button">Back to Home</button>
      </div>
    );
  }

  return (
    <div>
      {/* Header Component */}
      {/* <Header /> */}

      {/* Product Details Section */}
      <div className="product-details-container">
        <button onClick={() => navigate(-1)} className="back-button">← Back</button>

        {/* Product Image and Info */}
        <div className="product-main">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <h2 className="product-price">{product.price}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-location"><strong>Location: </strong>{product.location}</p>
          </div>
        </div>

        {/* Seller Details */}
        <div className="seller-details">
          <h3>Seller Details</h3>
          <p><strong>Name: </strong>{product.seller.name}</p>
          <p><strong>Contact: </strong>{product.seller.contact}</p>
          <button className="contact-seller-button">Contact Seller</button>
        </div>
      </div>

      {/* Footer Component */}
      {/* <Footer /> */}
    </div>
  );
};

export default ProductDetails;
