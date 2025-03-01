import React from "react";
import Header from "../components/header";
import ProductList from "../components/product";
import Footer from "../components/footer";
 // Adjust if necessary

import "../styles/HomePage.css";


const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        {/* <h1>Welcome to the Home Page</h1> */}
        <ProductList />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
