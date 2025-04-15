import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import "../styles/ProductList.css";

const ProductListing = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL CATEGORIES");
  const [wishlist, setWishlist] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOrder, setSortOrder] = useState("");
  const [showWishlistOnly, setShowWishlistOnly] = useState(false); // State to toggle wishlist view
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
        const response = await fetch("http://localhost:5000/ads");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch wishlist from the backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Get userId from localStorage
        const response = await fetch(`http://localhost:5000/api/wishlist?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add authentication token
          },
        });
        if (!response.ok) throw new Error("Failed to fetch wishlist");
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  // Toggle product in wishlist
  const toggleWishlist = async (product) => {
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    try {
      if (isInWishlist) {
        // Remove from wishlist
        await fetch(`http://localhost:5000/api/wishlist/${product.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setWishlist(wishlist.filter((item) => item.id !== product.id));
      } else {
        // Add to wishlist
        await fetch("http://localhost:5000/api/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ adId: product.id, userId: localStorage.getItem("userId") }),
        });
        setWishlist([...wishlist, product]);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  // Navigate to wishlist page
  const goToWishlist = () => {
    setShowWishlistOnly(!showWishlistOnly); // Toggle wishlist view
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

  // Show only wishlist items if `showWishlistOnly` is true
  if (showWishlistOnly) {
    filteredProducts = filteredProducts.filter((product) =>
      wishlist.some((item) => item.id === product.id)
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-listing-container">
      <nav className="nav-bar">
        <ul>
          {["ALL CATEGORIES", "Cars", "Motorcycles", "Mobile Phones", "For Rent: Houses & Apartments", "Scooters"].map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </nav>

      <div className="filters">
        <input
          type="number"
          placeholder="Min Price"
          value={priceRange.min}
          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceRange.max}
          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
        />
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
        <button
          onClick={goToWishlist}
          style={{ marginLeft: "10px", padding: "5px 10px" }}
        >
          {showWishlistOnly ? "Show All Products" : "View Wishlist"}
        </button>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={getImageUrl(product.image)}
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