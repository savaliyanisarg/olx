import React from "react";
import "../styles/ProductList.css"; // CSS for styles

const ProductListing = () => {
  // Sample Data for Products
  const lastSearchProducts = [
    {
      id: 1,
      name: "Honda City 2020",
      price: "₹12,00,000",
      image: "https://via.placeholder.com/200?text=Honda+City",
    },
    {
      id: 2,
      name: "Samsung Galaxy S22",
      price: "₹80,000",
      image: "https://via.placeholder.com/200?text=Samsung+Galaxy",
    },
    {
      id: 3,
      name: "iPhone 13",
      price: "₹1,00,000",
      image: "https://via.placeholder.com/200?text=iPhone+13",
    },
    {
      id: 4,
      name: "Yamaha R15",
      price: "₹1,50,000",
      image: "https://via.placeholder.com/200?text=Yamaha+R15",
    },
  ];

  const freshRecommendations = [
    {
      id: 1,
      name: "Sony Bravia TV",
      price: "₹70,000",
      image: "https://via.placeholder.com/200?text=Sony+Bravia+TV",
    },
    {
      id: 2,
      name: "Wooden Sofa Set",
      price: "₹25,000",
      image: "https://via.placeholder.com/200?text=Wooden+Sofa+Set",
    },
    {
      id: 3,
      name: "MacBook Air M1",
      price: "₹1,00,000",
      image: "https://via.placeholder.com/200?text=MacBook+Air",
    },
    {
      id: 4,
      name: "Dell XPS 15",
      price: "₹1,50,000",
      image: "https://via.placeholder.com/200?text=Dell+XPS",
    },
    {
      id: 5,
      name: "iPad Pro",
      price: "₹85,000",
      image: "https://via.placeholder.com/200?text=iPad+Pro",
    },
    {
      id: 6,
      name: "Bose Headphones",
      price: "₹25,000",
      image: "https://via.placeholder.com/200?text=Bose+Headphones",
    },
    {
      id: 1,
      name: "Sony Bravia TV",
      price: "₹70,000",
      image: "https://via.placeholder.com/200?text=Sony+Bravia+TV",
    },
    {
      id: 2,
      name: "Wooden Sofa Set",
      price: "₹25,000",
      image: "https://via.placeholder.com/200?text=Wooden+Sofa+Set",
    },
    {
      id: 3,
      name: "MacBook Air M1",
      price: "₹1,00,000",
      image: "https://via.placeholder.com/200?text=MacBook+Air",
    },
    {
      id: 4,
      name: "Dell XPS 15",
      price: "₹1,50,000",
      image: "https://via.placeholder.com/200?text=Dell+XPS",
    },
    {
      id: 5,
      name: "iPad Pro",
      price: "₹85,000",
      image: "https://via.placeholder.com/200?text=iPad+Pro",
    },
    {
      id: 6,
      name: "Bose Headphones",
      price: "₹25,000",
      image: "src/assets/car.png",
    },
  ];

  // Function to render products dynamically
  const renderProducts = (products) =>
    products.map((product) => (
      <div className="product-card" key={product.id}>
        <img src={product.image} alt={product.name} className="product-image" />
        <h4 className="product-name">{product.name}</h4>
        <p className="product-price">{product.price}</p>
      </div>
    ));

  return (
    <div className="product-listing-container">
      {/* Based on your last search */}
      <div className="section">
        <h2>Based on your last search</h2>
        <div className="product-grid">{renderProducts(lastSearchProducts)}</div>
      </div>

      {/* Fresh Recommendations */}
      <div className="section">
        <h2>Fresh Recommendations</h2>
        <div className="product-grid">{renderProducts(freshRecommendations)}</div>
      </div>
    </div>
  );
};

export default ProductListing;
