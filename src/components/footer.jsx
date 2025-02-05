import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Importing icons
import "../styles/Footer.css"; // Corrected CSS file name

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Us Section */}
        <nav className="footer-section">
          <h4>About Us</h4>
          <ul>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/blog">OLX Blog</a></li>
          </ul>
        </nav>

        {/* Help & Support Section */}
        <nav className="footer-section">
          <h4>Help & Support</h4>
          <ul>
            <li><a href="/help-center">Help Center</a></li>
            <li><a href="/safety-tips">Safety Tips</a></li>
            <li><a href="/faqs">FAQs</a></li>
          </ul>
        </nav>

        {/* Follow Us Section */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook size={24} color="#4267B2" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter size={24} color="#1DA1F2" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
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
