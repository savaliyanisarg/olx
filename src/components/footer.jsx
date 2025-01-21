import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Importing icons
import "../styles/Header.css"; // Assuming you have a separate CSS file for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Us Section */}
        <div className="footer-section">
          <h4>About Us</h4>
          <ul>
            <li><a href="#about">Careers</a></li>
            <li><a href="#about">Contact Us</a></li>
            <li><a href="#about">OLX Blog</a></li>
          </ul>
        </div>

        {/* Help & Support Section */}
        <div className="footer-section">
          <h4>Help & Support</h4>
          <ul>
            <li><a href="#help">Help Center</a></li>
            <li><a href="#help">Safety Tips</a></li>
            <li><a href="#help">FAQs</a></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} color="#4267B2" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} color="#1DA1F2" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} color="#C13584" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025 OLX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
