import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const products = [
  {
    id: 1,
    name: "Honda City 2020",
    price: "₹12,00,000",
    description: "Well-maintained Honda City 2020 with single ownership. Regularly serviced and driven only 20,000 km.",
    location: "Bangalore, Karnataka",
    image: "../src/assets/car.png",
    mapLocation: "https://www.google.com/maps?q=Bangalore,Karnataka&output=embed",
    seller: {
      name: "John Doe",
      contact: "+91 98765 43210",
      image: "/assets/seller1.png",
      rating: 4.5,
      listings: 12,
    },
  },
  {
    id: 2,
    name: "Samsung Galaxy S22",
    price: "₹80,000",
    description: "Brand new Samsung Galaxy S22 with warranty.",
    location: "Mumbai, Maharashtra",
    image: "/assets/mobile.png",
    mapLocation: "https://www.google.com/maps?q=Mumbai,Maharashtra&output=embed",
    seller: {
      name: "Alice Smith",
      contact: "+91 99876 54321",
      image: "/assets/seller2.png",
      rating: 4.8,
      listings: 8,
    },
  },
  {
    id: 3,
    name: "Yamaha R15",
    price: "₹1,50,000",
    description: "A sporty Yamaha R15 with excellent condition.",
    location: "Delhi, India",
    image: "/assets/bike.png",
    mapLocation: "https://www.google.com/maps?q=Delhi,India&output=embed",
    seller: {
      name: "Michael Brown",
      contact: "+91 98765 12345",
      image: "/assets/seller3.png",
      rating: 4.2,
      listings: 15,
    },
  },
];

const SellerProfile = ({ seller }) => {
  const handleAdvancedPayment = () => {
    alert("Advanced Payment functionality coming soon!");
  };

  return (
    <div className="seller-profile">
      <h3>Seller Profile</h3>
      <div className="seller-info">
        <img src={seller.image} alt={seller.name} className="seller-image" />
        <div className="seller-details">
          <h4>{seller.name}</h4>
          <p><strong>Contact:</strong> {seller.contact}</p>
          <p><strong>Ratings:</strong> ⭐{seller.rating}/5</p>
          <p><strong>Listings:</strong> {seller.listings} items</p>
        </div>
      </div>
      <button className="contact-seller-button" onClick={() => alert("Chat functionality coming soon!")}>
        CHAT WITH SELLER
      </button>
      {/* New Advanced Payment Button */}
      <button className="advanced-payment-button" onClick={handleAdvancedPayment}>
        MAKE ADVANCED PAYMENT
      </button>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="not-found">
        <Header />
        <div className="not-found-container">
          <h2>Product Not Found</h2>
          <button onClick={() => navigate("/HomePage")} className="home-button">
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Get related ads (excluding the current product)
  const relatedAds = products.filter((item) => item.id !== parseInt(id));

  return (
    <div className="page-container">
      <Header />
      <div className="product-details-container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        {/* Product Image & Details */}
        <div className="product-main">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <h2 className="product-price">{product.price}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-location">
              <strong>Location:</strong> {product.location}
            </p>
          </div>
        </div>

        {/* Seller Profile & Map Section */}
        <div className="seller-map-container">
          <SellerProfile seller={product.seller} />
          <div className="map-container">
            <h3>Seller Location</h3>
            <iframe
              src={product.mapLocation}
              title="Seller Location"
              className="map"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Related Ads Section */}
        <div className="related-ads-container">
          <h3>Related Ads</h3>
          <div className="related-ads">
            {relatedAds.map((ad) => (
              <div key={ad.id} className="related-ad-card" onClick={() => navigate(`/product/${ad.id}`)}>
                <img src={ad.image} alt={ad.name} className="related-ad-image" />
                <h4 className="related-ad-name">{ad.name}</h4>
                <p className="related-ad-price">{ad.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
