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
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();

  // Function to get full image URL
  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    const cleanPath = imagePath.replace(/\.\.\/\.\.\/Server\//, "");
    return `http://localhost:5000/${cleanPath}`;
  };

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/ads"); // Fetch from your backend API
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Set fetched products to state
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, []);

  // Fetch wishlist from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Toggle product in wishlist
  const toggleWishlist = (product) => {
    const updatedWishlist = wishlist.some((item) => item.id === product.id)
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Filter and sort products
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

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
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
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={getImageUrl(product.image)} // Use getImageUrl to construct the full image URL
              alt={product.title}
              className="product-image"
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <h4 className="product-name">{product.title}</h4>
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