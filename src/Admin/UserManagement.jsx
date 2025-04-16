import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get("http://localhost:5000/api/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:5000/api/users/${id}`)
        .then(() => {
          console.log(`Deleted user with ID: ${id}`);
          fetchUsers(); // Refresh the user list
        })
        .catch(error => console.error("Error deleting user:", error));
    }
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
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={styles.tr}>
              <td style={styles.td}>{user.id}</td>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.is_admin === 1 ? "Admin" : "User"}</td>
              <td style={styles.td}>
                <button onClick={() => handleDeleteUser(user.id)} style={styles.button}>Delete</button>
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
