import React from "react";
import "../styles/Profile.css"; // CSS file for styling

const Profile = () => {
  // Example user data (replace with actual data from API or backend)
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    location: "Mumbai, Maharashtra",
    joined: "January 2022",
    profilePicture: "https://via.placeholder.com/150",
    listings: [
      {
        id: 1,
        title: "Honda Civic 2020",
        price: "₹ 9,50,000",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        title: "iPhone 13 Pro Max",
        price: "₹ 1,20,000",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        title: "Samsung 55\" 4K TV",
        price: "₹ 50,000",
        image: "https://via.placeholder.com/150",
      },
    ],
  };

  return (
    <div className="profile-container">
      {/* Profile Details Section */}
      <div className="profile-header">
        <img
          src={userData.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-info">
          <h2>{userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Location: {userData.location}</p>
          <p>Joined: {userData.joined}</p>
        </div>
      </div>

      {/* User Listings Section */}
      <div className="profile-listings">
        <h3>Your Listings</h3>
        <div className="listings-grid">
          {userData.listings.map((item) => (
            <div key={item.id} className="listing-card">
              <img
                src={item.image}
                alt={item.title}
                className="listing-image"
              />
              <h4 className="listing-title">{item.title}</h4>
              <p className="listing-price">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
