import React from "react";
import "../styles/ProductDetails.css";
import Header from "../components/header";
import Footer from "../components/footer";

const ProductDetails = () => {
  const product = {
    title: "Skoda Fabia",
    price: "₹ 9,18,000",
    description:
      "I am willing to sell my lovely car due to financial issues. Want a buyer fast, giving an amazing offer for the first comer. New construction house for rent near Shangri near AUS University Satna.",
    details: {
      model: "2001",
      mileage: "85,844 km",
      fuel: "CNG",
      transmission: "Manual",
      variant: "Version RS5",
    },
    location: "Railway station, Indore, MP",
    posted: "3 days ago",
    image: "src/assets/car.png",
  };

  const seller = {
    name: "Katrina Mills",
    joined: "Member since January 2022",
    contact: "Chat With Seller",
  };

  return (
    <>
      <Header />
      <div className="content">
        <div className="product-details-container">
          {/* Product Image and Info */}
          <div className="product-details-main">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-info">
              <h1 className="product-title">{product.title}</h1>
              <h2 className="product-price">{product.price}</h2>
              <p className="product-posted">{product.posted}</p>
              <p className="product-description">{product.description}</p>

              {/* Product Details Table */}
              <div className="product-details-table">
                <h3>Details</h3>
                <ul>
                  <li>
                    <strong>Model:</strong> {product.details.model}
                  </li>
                  <li>
                    <strong>Mileage:</strong> {product.details.mileage}
                  </li>
                  <li>
                    <strong>Fuel:</strong> {product.details.fuel}
                  </li>
                  <li>
                    <strong>Transmission:</strong> {product.details.transmission}
                  </li>
                  <li>
                    <strong>Variant:</strong> {product.details.variant}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="seller-details">
            <h3>Seller Description</h3>
            <div className="seller-info">
              <p className="seller-name">{seller.name}</p>
              <p className="seller-joined">{seller.joined}</p>
              <button className="seller-contact-button">{seller.contact}</button>
            </div>
            {/* Map Section */}
            <div className="product-location">
              <h3>Posted In</h3>
              <p>{product.location}</p>
              <div className="map-placeholder">
                <img src="" alt="Map Placeholder" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetails;
