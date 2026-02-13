import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import './Hero.css';

const heroImages = [
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
];

const Hero = () => {
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-bg-carousel">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Hero Slide ${index + 1}`}
            className={`hero-bg-image ${index === currentImage ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="hero-title animate-fade-in-up">
          Discover a Love <br />
          <span className="text-gradient script-font">Written in the Stars</span>
        </h1>
        <p className="hero-subtitle animate-fade-in-up delay-100">
          The most trusted platform for happy marriages. <br />
          Find your perfect match with Sri Mayan Matrimony.
        </p>

        <div className="cta-container animate-fade-in-up delay-200">
          <button
            onClick={() => navigate('/search')}
            className="btn btn-primary btn-lg"
            style={{
              fontSize: '1.5rem',
              padding: '1rem 3rem',
              borderRadius: '50px',
              boxShadow: '0 10px 25px rgba(212, 175, 55, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Search size={28} />
            Find the one meant for u
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
