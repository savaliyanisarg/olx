import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css"; // Ensure correct styling
import Header from "../components/Header";
import Footer from "../components/Footer";

const products = [
  {
    id: 1,
    name: "Honda City 2020",
    price: "₹12,00,000",
    description: "Well-maintained Honda City 2020 with single ownership. Regularly serviced and driven only 20,000 km.",
    location: "Bangalore, Karnataka",
    image: "/src/assets/car.png",
    seller: {
      name: "John Doe",
      contact: "+91 98765 43210",
      image: "/src/assets/seller1.png",
      rating: 4.5,
      listings: 12,
    }
  },
  {
    id: 2,
    name: "Samsung Galaxy S22",
    price: "₹80,000",
    description: "Brand new Samsung Galaxy S22 with warranty.",
    location: "Mumbai, Maharashtra",
    image: "/assets/mobile.png",
    seller: {
      name: "Alice Smith",
      contact: "+91 99876 54321",
      image: "/src/assets/seller2.png",
      rating: 4.8,
      listings: 8,
    }
  },
  {
    id: 3,
    name: "Yamaha R15",
    price: "₹1,50,000",
    description: "A sporty Yamaha R15 with excellent condition.",
    location: "Delhi, India",
    image: "/assets/bike.png",
    seller: {
      name: "Michael Brown",
      contact: "+91 98765 12345",
      image: "/src/assets/seller3.png",
      rating: 4.2,
      listings: 15,
    }
  }
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate("/")} className="home-button">Back to Home</button>
      </div>
    );
  }

  const relatedAds = products.filter((item) => item.id !== parseInt(id));

  const handleContactSeller = () => {
    navigate(`/chat/`);
  };

  const googleApiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your actual API key

  // Google Map Embed URL (interactive)
  const googleMapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${encodeURIComponent(product.location)}`;

  // Google Static Map URL (fallback image)
  const googleStaticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
    product.location
  )}&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7C${encodeURIComponent(
    product.location
  )}&key=${googleApiKey}`;

  return (
    <div>
      <Header />

      <div className="product-details-container">
        <button onClick={() => navigate(-1)} className="back-button">← Back</button>

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

        {/* Google Map Section */}
        <div className="product-map">
          <h3>Location Map</h3>
          <iframe
            width="600"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src={googleMapEmbedUrl}
            allowFullScreen
            title="Google Map"
          ></iframe>
          <noscript>
            <img src={googleStaticMapUrl} alt="Location Map" className="map-image" />
          </noscript>
        </div>

        <div className="seller-profile">
          <h3>Seller Profile</h3>
          <div className="seller-info">
            <img src={product.seller.image} alt={product.seller.name} className="seller-image" />
            <div className="seller-details">
              <h4>{product.seller.name}</h4>
              <p><strong>Contact: </strong>{product.seller.contact}</p>
              <p><strong>Ratings: </strong>⭐{product.seller.rating}/5</p>
              <p><strong>Listings: </strong> {product.seller.listings} items</p>
            </div>
          </div>
          <button className="contact-seller-button" onClick={handleContactSeller}>
            CHAT WITH SELLER
          </button>
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

      <Footer />
    </div>
  );
};

export default ProductDetails;
