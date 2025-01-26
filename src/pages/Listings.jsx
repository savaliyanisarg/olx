// src/pages/Listings.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Replace with your API URL
    axios.get("https://api.example.com/listings").then((response) => {
      setListings(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Manage Listings</h1>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing.id}>
              <td>{listing.id}</td>
              <td>{listing.title}</td>
              <td>{listing.status}</td>
              <td>
                <button>Approve</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listings;
