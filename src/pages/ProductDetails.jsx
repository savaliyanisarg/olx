import React from "react";
import "../styles/ProductDetails.css"; // Add relevant styles

import Header from "../components/Header"; // Ensure this path is correct
import Footer from "../components/Footer"; // Ensure this path is correct

const ProductDetails = () => {
  // Sample product data
  const product = {
    id: 1,
    name: "Honda City 2020",
    price: "₹12,00,000",
    description:
      "Well-maintained Honda City 2020 with single ownership. Regularly serviced and driven only 20,000 km.",
    location: "Bangalore, Karnataka",
    image: "src/assets/car.png",
    seller: {
      name: "John Doe",
      contact: "+91 98765 43210",
    },
  };

  // Sample related ads
  const relatedAds = [
    {
      id: 2,
      name: "Hyundai Creta 2021",
      price: "₹15,00,000",
      image: "https://via.placeholder.com/200?text=Hyundai+Creta",
    },
    {
      id: 3,
      name: "Toyota Innova Crysta",
      price: "₹22,00,000",
      image: "https://via.placeholder.com/200?text=Toyota+Innova",
    },
    {
      id: 4,
      name: "Maruti Suzuki Swift",
      price: "₹6,50,000",
      image: "https://via.placeholder.com/200?text=Swift",
    },
  ];

  return (
    <div>
      {/* Header Component */}
      <Header />

      {/* Product Details Section */}
      <div className="product-details-container">
        {/* Product Image and Info */}
        <div className="product-main">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <h2 className="product-price">{product.price}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-location">
              <strong>Location: </strong>
              {product.location}
            </p>
          </div>
        </div>

        {/* Seller Details */}
        <div className="seller-details">
          <h3>Seller Details</h3>
          <p>
            <strong>Name: </strong>
            {product.seller.name}
          </p>
          <p>
            <strong>Contact: </strong>
            {product.seller.contact}
          </p>
          <button className="contact-seller-button">Contact Seller</button>
        </div>

        {/* Related Ads */}
        <div className="related-ads">
          <h3>Related Ads</h3>
          <div className="related-ads-grid">
            {relatedAds.map((ad) => (
              <div className="related-ad-card" key={ad.id}>
                <img src={ad.image} alt={ad.name} />
                <h4>{ad.name}</h4>
                <p>{ad.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default ProductDetails;
