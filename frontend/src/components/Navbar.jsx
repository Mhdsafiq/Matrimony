import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowLeft } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {location.pathname !== '/' && (
            <button
              onClick={() => navigate(-1)}
              className="nav-back-btn"
              title="Go Back"
              aria-label="Go Back"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <Link to="/" className="logo">
            <img src="/logo.png" alt="Sri Mayan" className="logo-img" />
          </Link>
        </div>

        {/* Desktop Menu - Hide on Landing Page */}
        {!isLandingPage && (
          <ul className="nav-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/interests">Interests</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/matches">Matches</Link></li>
          </ul>
        )}

        <div className="nav-actions">
          {isLandingPage && (
            <div className="landing-nav-actions">
              <Link to="/login" className="nav-login-link">
                Login
              </Link>
              <Link to="/" className="btn nav-register-btn">
                Register for Free
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle - Only if not landing page */}
        {!isLandingPage && (
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && !isLandingPage && (
        <div className="mobile-menu glass-panel">
          <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/profile" onClick={() => setIsOpen(false)}>My Profile</Link>
          <Link to="/search" onClick={() => setIsOpen(false)}>Search</Link>
          <Link to="/interests" onClick={() => setIsOpen(false)}>Interests</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/matches" onClick={() => setIsOpen(false)}>Matches</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
