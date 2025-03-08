import React, { useState, useEffect } from "react";
import "../styles/Banner.css";

const images = [
  "/assets/banner1.jpg",
  "/assets/banner2.jpg",
  "/assets/banner3.jpg"
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner">
      <img src={images[currentIndex]} alt="Banner" className="banner-image" />
    </div>
  );
};

export default Banner;
