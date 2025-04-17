import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const products = [
  {
    id: 1,
    name: "Honda City 2020",
    price: "₹120",
    actualPrice: 120, // Added for payment processing (in paise)
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
    price: "₹8000",
    actualPrice: 8000,
    description: "Brand new Samsung Galaxy S22 with warranty.",
    location: "Mumbai, Maharashtra",
    image: "../src/assets/mobile.png",
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
    actualPrice: 150000,
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

const SellerProfile = ({ seller, product }) => {
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleAdvancedPayment = async () => {
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // In production, fetch order_id from your backend
    const options = {
      key: "rzp_test_7vpSzgE2o7c8Ix", // Replace with your test key
      amount: product.actualPrice * 100, // Amount in paise
      currency: "INR",
      name: "Your Store",
      description: `Payment for ${product.name}`,
      image: "https://example.com/logo.png",
      order_id: "", // Should come from backend in production
      handler: function(response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        // Verify payment signature with backend
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
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
      <button className="advanced-payment-button" onClick={handleAdvancedPayment}>
        PAY {product.price}
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

  const relatedAds = products.filter((item) => item.id !== parseInt(id));

  return (
    <div className="page-container">
      <Header />
      <div className="product-details-container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

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

        <div className="seller-map-container">
          <SellerProfile seller={product.seller} product={product} />
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