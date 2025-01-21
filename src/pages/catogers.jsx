import React from 'react';
import './Styaling.css';

const AdCategories = () => {
  const categories = [
    { icon: '🚗', title: 'OLX Autos (Cars)' },
    { icon: '🏠', title: 'Properties' },
    { icon: '📱', title: 'Mobiles' },
    { icon: '💼', title: 'Jobs' },
    { icon: '🚲', title: 'Bikes' },
    { icon: '🖥️', title: 'Electronics and Appliances' },
    { icon: '👕', title: 'Fashion' },
    { icon: '🎸', title: 'Books Sports and Hobbies' },
    { icon: '🧰', title: 'Services' },
  ];

  return (
    <div className="container">
      <h1>POST YOUR ADS</h1>
      <div className="category-list">
        <h2>CHOOSE A CATEGORY</h2>
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <span className="category-icon">{category.icon}</span>
            <span className="category-title">{category.title}</span>
            <span className="category-arrow"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdCategories;