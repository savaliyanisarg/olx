import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import HomePage from "./pages/HomePage";
import AdCategories from "./pages/categories"; // Fixed typo
import LoginSignup from "./pages/login"; // Case sensitivity fixed
import AdPostForm from "./pages/postads";
import ProductDetails from "./pages/ProductDetails";
import AdminPanel from "./Admin/AdminPanel";
import Wishlist from "./pages/Wishlist"; // Added missing page
import ProfilePage from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
// import AdminPanel from "./Admin/AdminPanel";
//import NotFound from "./pages/NotFound"; // 404 Page

const App = () => {
  return (
    <StrictMode> {/* Optional for debugging */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<AdCategories />} /> {/* Fixed route name */}
          <Route path="/postads" element={<AdPostForm />} />
          <Route path="/login" element={<LoginSignup />} /> 
          <Route path="/product/:id" element={<ProductDetails />} /> {/* Fixed typo */}
          <Route path="/Adminlogin" element={<AdminPanel />} /> 
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<ProfilePage />} /> {/* Added missing page */}
          <Route path="/editprofile" element={<EditProfile />} /> {/* Added missing page */}
          <Route path="/Admin/AdminPanel" element={<AdminPanel />} /> {/* Added missing page*/}
          {/* <Route path="*" element={<NotFound />} /> Handle unknown routes */}
        </Routes>
      </Router>
    </StrictMode>
  );
};

// Render the App component
createRoot(document.getElementById("root")).render(<App />);
