import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <Heart className="logo-icon" size={28} />
          <span className="logo-text">Sri Mayan Matrimony</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/interests">Interests</Link></li>
          <li><Link to="/about">About Us</Link></li>

          <li><Link to="/matches">Matches</Link></li>
        </ul>

        <div className="nav-actions">
          <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Login
          </Link>
          <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Register Free
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu glass-panel">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/search" onClick={() => setIsOpen(false)}>Search</Link>
          <Link to="/interests" onClick={() => setIsOpen(false)}>Interests</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/matches" onClick={() => setIsOpen(false)}>Matches</Link>
          <div className="mobile-actions">
            <Link to="/login" className="btn btn-outline" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" className="btn btn-primary" onClick={() => setIsOpen(false)}>Register Free</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
