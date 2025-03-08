import React from "react";

const ProductManagement = () => {
  const products = [
    { id: 1, name: "Honda City", price: "₹12,00,000" },
    { id: 2, name: "iPhone 13", price: "₹1,00,000" },
  ];

  const handleDeleteProduct = (id) => {
    console.log(`Deleting product with ID: ${id}`);
    // Logic to delete the product
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Product Management</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ background: "#007bff", color: "white" }}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={styles.tr}>
              <td style={styles.td}>{product.id}</td>
              <td style={styles.td}>{product.name}</td>
              <td style={styles.td}>{product.price}</td>
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
    background: "red", color: "white", border: "none", padding: "5px 10px", 
    cursor: "pointer", borderRadius: "5px"
  }
};

export default ProductManagement;
