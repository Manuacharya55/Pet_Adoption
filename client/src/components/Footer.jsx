import React from "react";
import "../styles/navbar.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            We connect pet lovers with pet shops to find their perfect
            companions. Join us in making adoption easy and accessible.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 The Happy Paws. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
