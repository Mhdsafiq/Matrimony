import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          {/* Brand */}
          <div className="footer-brand">
            <h2 className="brand-title">Sri Mayan Matrimony</h2>
            <p className="brand-subtitle">
              Building bonds of love and trust. <br /> Since 2024.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon"><Facebook size={20} /></a>
              <a href="#" className="social-icon"><Twitter size={20} /></a>
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="#" className="social-icon"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Explore</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/search">Search Matches</a></li>
              <li><a href="/services">Membership Plans</a></li>
              <li><a href="/success-stories">Success Stories</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-links">
            <h3>Legal</h3>
            <ul>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/refund">Refund Policy</a></li>
              <li><a href="/security">Security Tips</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <div className="contact-item">
              <MapPin size={18} />
              <span>123 Love Avenue, Relationship City, India 500081</span>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <span>support@srimayan.com</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sri Mayan Matrimony. All rights reserved.</p>
          <div className="heart-msg">
            Made with <Heart size={14} fill="#e74c3c" color="#e74c3c" /> in India
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
