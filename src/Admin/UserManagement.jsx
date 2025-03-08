import React from "react";

const UserManagement = () => {
  const sellers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Michael Brown", email: "michael.brown@example.com" },
  ];

  const handleDeleteSeller = (id) => {
    console.log(`Deleting seller with ID: ${id}`);
    // Logic to delete the seller
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>User Management</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ background: "#007bff", color: "white" }}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller.id} style={styles.tr}>
              <td style={styles.td}>{seller.id}</td>
              <td style={styles.td}>{seller.name}</td>
              <td style={styles.td}>{seller.email}</td>
              <td style={styles.td}>
                <button onClick={() => handleDeleteSeller(seller.id)} style={styles.button}>Delete</button>
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

export default UserManagement;
