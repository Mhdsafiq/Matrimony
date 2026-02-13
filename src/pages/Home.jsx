import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { UserCheck, MessageCircle, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <UserCheck size={40} className="feature-icon" />,
      title: "Genuine Profiles",
      desc: "Every profile is manually verified mostly to ensure your safety and trust."
    },
    {
      icon: <ShieldCheck size={40} className="feature-icon" />,
      title: "100% Secure",
      desc: "Your privacy is our priority. Advanced encryption keeps your data safe."
    },
    {
      icon: <MessageCircle size={40} className="feature-icon" />,
      title: "Instant Chat",
      desc: "Connect instantly with your matches through our secure messaging platform."
    },
    {
      icon: <HeartHandshake size={40} className="feature-icon" />,
      title: "Perfect Match",
      desc: "Our AI-driven algorithm finds the most compatible partners for you."
    }
  ];

  const successStories = [
    {
      names: "Ravi & Anjali",
      image: "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?w=500&auto=format&fit=crop&q=60",
      story: "We met on Sri Mayan Matrimony and instantly connected. Within 6 months, we tied the knot!"
    },
    {
      names: "Arjun & Sneha",
      image: "https://images.unsplash.com/photo-1595959183082-7bce70848dd2?w=500&auto=format&fit=crop&q=60",
      story: "Thanks to the detailed preferences, I found someone who shares my values and dreams."
    },
    {
      names: "Vikram & Priya",
      image: "https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?w=500&auto=format&fit=crop&q=60",
      story: "The best platform for serious relationships. Highly recommended for finding your soulmate."
    }
  ];

  return (
    <div className="home-page">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Sri Mayan?</h2>
            <p>We bring people together with love, trust, and technology.</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card glass-panel">
                <div className="icon-wrapper">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section stories-section">
        <div className="container">
          <div className="section-header">
            <h2>Happy Stories</h2>
            <p>Real people, real love. Be our next success story.</p>
          </div>
          <div className="stories-grid">
            {successStories.map((story, index) => (
              <div key={index} className="story-card">
                <div className="story-image">
                  <img src={story.image} alt={story.names} />
                </div>
                <div className="story-content">
                  <h3>{story.names}</h3>
                  <p>"{story.story}"</p>
                  <a href="/stories" className="read-more">Read more <ArrowRight size={16} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2>Your Soulmate is Waiting</h2>
          <p>Don't wait for destiny. Create your own happily ever after today.</p>
          <a href="/register" className="btn btn-primary cta-btn">Register Free Now</a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
