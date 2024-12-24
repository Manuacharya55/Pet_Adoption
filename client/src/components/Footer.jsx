import React from 'react'
import "../styles/navbar.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-container">
      <div className="footer-section">
        <h3>About Us</h3>
        <p>
          We connect pet lovers with pet shops to find their perfect companions.
          Join us in making adoption easy and accessible.
        </p>
      </div>
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Follow Us</h3>
        <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 The Happy Paws. All rights reserved.</p>
    </div>
  </footer>
  
  )
}

export default Footer