import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListing from "../components/product";
import ProductDetails from "../pages/ProductDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
