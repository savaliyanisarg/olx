import React from "react";
import Header from "../components/header";
// import Banner from "../components/Banner"; // Import the Banner
import ProductList from "../components/product";
import Footer from "../components/footer";

import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div>
      <Header />
      {/* <Banner /> Add the Banner here */}
      <main>
        <ProductList />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
