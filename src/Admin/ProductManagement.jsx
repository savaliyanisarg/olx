import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  // Fetch ads from the server on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ads"); // Adjust base URL as needed
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/ads/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2>Product Management</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ background: "#007bff", color: "white" }}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={styles.tr}>
              <td style={styles.td}>{product.id}</td>
              <td style={styles.td}>{product.title}</td>
              <td style={styles.td}>₹{product.price}</td>
              <td style={styles.td}>{product.location}</td>
              <td style={styles.td}>
                <button onClick={() => handleDeleteProduct(product.id)} style={styles.button}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: { padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" },
  td: { padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" },
  tr: { background: "#f9f9f9" },
  button: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default ProductManagement;
