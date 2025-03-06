import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import "../styles/ProductList.css";

const ProductListing = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL CATEGORIES");
  const [wishlist, setWishlist] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOrder, setSortOrder] = useState("");
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Honda City 2020", price: 1200000, image: "src/assets/car.png", category: "Cars" },
    { id: 2, name: "Samsung Galaxy S22", price: 80000, image: "src/assets/mobile.png", category: "Mobile Phones" },
    { id: 3, name: "Yamaha R15", price: 150000, image: "src/assets/bike.png", category: "Motorcycles" },
    { id: 4, name: "Luxury Villa for Rent", price: 100000, image: "src/assets/home.png", category: "For Rent: Houses & Apartments" },
    { id: 5, name: "Scooty Pep+", price: 50000, image: "src/assets/scooty.png", category: "Scooters" },
    { id: 6, name: "Sony Bravia TV", price: 70000, image: "src/assets/Tv.png", category: "Electronics" },
  ];

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const toggleWishlist = (product) => {
    const updatedWishlist = wishlist.some((item) => item.id === product.id)
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  let filteredProducts = products;

  if (selectedCategory !== "ALL CATEGORIES") {
    filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
  }

  if (priceRange.min || priceRange.max) {
    filteredProducts = filteredProducts.filter((product) => {
      return (
        (!priceRange.min || product.price >= Number(priceRange.min)) &&
        (!priceRange.max || product.price <= Number(priceRange.max))
      );
    });
  }

  if (sortOrder) {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      sortOrder === "low-to-high" ? a.price - b.price : b.price - a.price
    );
  }

  if (showWishlistOnly) {
    filteredProducts = filteredProducts.filter((product) => wishlist.some((item) => item.id === product.id));
  }

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
      
      <div className="filters">
        <input type="number" placeholder="Min Price" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} />
        <input type="number" placeholder="Max Price" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} />
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
        {/* <label>
          <input type="checkbox" checked={showWishlistOnly} onChange={() => setShowWishlistOnly(!showWishlistOnly)} />
          Show Wishlist Only
        </label> */}
      </div>
      
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" onClick={() => navigate(`/product/${product.id}`)} />
            <h4 className="product-name">{product.name}</h4>
            <p className="product-price">₹{product.price.toLocaleString()}</p>
            <button className="wishlist-btn" onClick={() => toggleWishlist(product)}>
              <Heart size={20} color={wishlist.some((item) => item.id === product.id) ? "red" : "gray"} />
              {wishlist.some((item) => item.id === product.id) ? " Remove from Wishlist" : " Add to Wishlist"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
