import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react"; // Import Heart icon
import "../styles/ProductList.css";


const ProductListing = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL CATEGORIES");
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Honda City 2020", price: "₹12,00,000", image: "src/assets/car.png", category: "Cars" },
    { id: 2, name: "Samsung Galaxy S22", price: "₹80,000", image: "src/assets/mobile.png", category: "Mobile Phones" },
    { id: 3, name: "Yamaha R15", price: "₹1,50,000", image: "src/assets/bike.png", category: "Motorcycles" },
    { id: 4, name: "For Rent: Luxury Villa", price: "₹1,00,000/month", image: "src/assets/home.png", category: "For Rent: Houses & Apartments" },
    { id: 5, name: "Scooty Pep+", price: "₹50,000", image: "src/assets/scooty.png", category: "Scooters" },
    { id: 6, name: "Sony Bravia TV", price: "₹70,000", image: "src/assets/Tv.png", category: "Electronics" },
  ];

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const toggleWishlist = (product) => {
    const updatedWishlist = wishlist.some((item) => item.id === product.id)
      ? wishlist.filter((item) => item.id !== product.id) // Remove if exists
      : [...wishlist, product]; // Add if not exists

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const filteredProducts =
    selectedCategory === "ALL CATEGORIES"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="product-listing-container">
      <nav className="nav-bar">
        <ul>
          {["ALL CATEGORIES", "Cars", "Motorcycles", "Mobile Phones", "For Rent: Houses & Apartments", "Scooters"].map((category) => (
            <li key={category} className={selectedCategory === category ? "active" : ""} onClick={() => setSelectedCategory(category)}>
              {category}
            </li>
          ))}
        </ul>
      </nav>

      <div className="section">
        <h2>{selectedCategory}</h2>

        {/* Wishlist Button (Navigates to Wishlist Page) */}
        {/* <button className="view-wishlist-btn" onClick={() => navigate("/wishlist")}>
          View Wishlist ({wishlist.length})
        </button> */}

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" onClick={() => navigate(`/product/${product.id}`)} />
              <h4 className="product-name">{product.name}</h4>
              <p className="product-price">{product.price}</p>

              {/* Add to Wishlist Button */}
              <button className="wishlist-btn" onClick={() => toggleWishlist(product)}>
                <Heart size={20} color={wishlist.some((item) => item.id === product.id) ? "red" : "gray"} />
                {wishlist.some((item) => item.id === product.id) ? " Remove from Wishlist" : " Add to Wishlist"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
