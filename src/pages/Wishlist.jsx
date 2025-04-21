import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";
import "../styles/Wishlist.css"; // Optional styling

const WishlistView = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // Get full image URL
  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("http")) return imagePath;
    const cleanPath = imagePath.replace(/\.\.\/\.\.\/Server\//, "");
    return `http://localhost:5000/${cleanPath}`;
  };

  // Fetch wishlist items
  const fetchWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      setWishlist(data);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      await fetch(`http://localhost:5000/api/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ userId })
      });
      setWishlist(wishlist.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  if (loading) return <div>Loading wishlist...</div>;

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-card">
              <img
                src={getImageUrl(item.image)}
                alt={item.title}
                className="wishlist-image"
                onClick={() => navigate(`/product/${item.id}`)}
              />
              <h4>{item.title}</h4>
              <p>₹{item.price.toLocaleString()}</p>
              <div className="wishlist-actions">
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="wishlist-remove"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistView;
