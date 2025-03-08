import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminPanel.css"; // Custom styles for Seller Management

const SellerManagement = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Example function to fetch sellers data
  useEffect(() => {
    const fetchSellers = () => {
      // This should be replaced with a real API call to fetch seller data
      const exampleSellers = [
        { id: 1, name: "John Doe", contact: "+91 98765 43210", rating: 4.5 },
        { id: 2, name: "Alice Smith", contact: "+91 99876 54321", rating: 4.8 },
        { id: 3, name: "Michael Brown", contact: "+91 98765 12345", rating: 4.2 },
      ];
      setSellers(exampleSellers);
      setLoading(false);
    };

    fetchSellers();
  }, []);

  const handleViewSeller = (sellerId) => {
    navigate(`/admin/seller-profile/${sellerId}`);
  };

  const handleDeleteSeller = (sellerId) => {
    if (window.confirm("Are you sure you want to delete this seller?")) {
      // Logic to delete the seller
      alert(`Seller ${sellerId} deleted`);
      setSellers(sellers.filter(seller => seller.id !== sellerId)); // Remove from the list
    }
  };

  return (
    <div className="seller-management">
      <h2>Seller Management</h2>
      {loading ? (
        <p>Loading sellers...</p>
      ) : (
        <table className="seller-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller.id}>
                <td>{seller.name}</td>
                <td>{seller.contact}</td>
                <td>{seller.rating}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => handleViewSeller(seller.id)}
                  >
                    View Profile
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteSeller(seller.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SellerManagement;
