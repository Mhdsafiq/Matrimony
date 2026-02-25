import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { User, Camera, Star, Users, Edit2, Settings, HelpCircle, ChevronDown, Phone, MessageSquare, TrendingUp, Eye } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: 'Member Name',
    uniqueId: 'SM-XXXXXX',
    photo: '',
    gender: '',
  });

  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfileData(prev => ({ ...prev, ...parsed }));

        // Calculate completion
        const fields = [
          'fullName', 'gender', 'dobDay', 'mobile', 'email',
          'religion', 'country', 'state', 'city',
          'education', 'occupation', 'income', 'photo', 'height'
        ];
        let completed = 0;
        fields.forEach(field => {
          const value = parsed[field];
          if (value && value !== 'Not Specified' && value !== '') {
            completed++;
          }
        });
        setCompletionPercentage(Math.round((completed / fields.length) * 100));
      } catch (e) {
        console.error("Error parsing profile", e);
      }
    }
    const uid = localStorage.getItem('uniqueId');
    if (uid) setProfileData(prev => ({ ...prev, uniqueId: uid }));
  }, []);

  return (
    <div className="home-page">
      <Navbar />

      <div className="dashboard-container">
        {/* Left Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-profile-card">
            <div className="sidebar-avatar">
              {profileData.photo ? (
                <img src={profileData.photo} alt={profileData.fullName} />
              ) : (
                <User size={50} color="#9ca3af" />
              )}
            </div>
            <h3 className="sidebar-name">{profileData.fullName}</h3>
            <div className="sidebar-brand">
              <span>☘️ Sri Mayan Matrimony</span>
            </div>
            <div className="sidebar-id">{profileData.uniqueId}</div>
            <div className="sidebar-membership">Free member</div>
          </div>

          <div className="sidebar-upgrade-banner">
            <p>Upgrade membership to call or message with matches</p>
            <Link to="/membership" className="upgrade-btn">Upgrade now</Link>
          </div>

          <div className="sidebar-menu">
            <div className="sidebar-menu-item" onClick={() => navigate('/profile')}>
              <Edit2 size={16} /> Edit profile
            </div>
            <div className="sidebar-menu-item" onClick={() => navigate('/profile', { state: { openPreferences: true } })}>
              <Settings size={16} /> Edit preferences
            </div>
          </div>

          <div className="sidebar-support">
            <h4>Support & feedback</h4>
            <div className="sidebar-menu-item">
              <HelpCircle size={16} /> Help & FAQ
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Complete Your Profile Section */}
          <section className="dashboard-card profile-completion-card">
            <h2>Complete Your Profile</h2>
            <div className="completion-bar-section">
              <span className="completion-label">Profile completeness score: {completionPercentage}%</span>
              <div className="completion-track">
                <div
                  className="completion-fill"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="quick-action-cards">
              <div className="quick-action-card" onClick={() => navigate('/profile')}>
                <div className="quick-action-icon" style={{ background: '#e8f5e9' }}>
                  <Camera size={24} color="#43a047" />
                </div>
                <span>Add Photo(s)</span>
              </div>
              <div className="quick-action-card" onClick={() => navigate('/profile')}>
                <div className="quick-action-icon" style={{ background: '#e3f2fd' }}>
                  <Star size={24} color="#1e88e5" />
                </div>
                <span>Add Horoscope</span>
              </div>
              <div className="quick-action-card" onClick={() => navigate('/profile')}>
                <div className="quick-action-icon" style={{ background: '#fff3e0' }}>
                  <Users size={24} color="#fb8c00" />
                </div>
                <span>Family Details</span>
              </div>
            </div>
          </section>

          {/* Become a Paid Member Section */}
          <section className="dashboard-card membership-promo-card">
            <div className="promo-content">
              <h2>Become a paid member</h2>
              <p className="promo-discount">Get up to <span className="discount-highlight">61% OFF</span> on paid membership!</p>

              <ul className="promo-features">
                <li>
                  <Phone size={16} color="#D4AF37" />
                  <span>Call/WhatsApp matches</span>
                </li>
                <li>
                  <MessageSquare size={16} color="#7c3aed" />
                  <span>Unlimited messages</span>
                </li>
                <li>
                  <TrendingUp size={16} color="#2563eb" />
                  <span>Higher chances of response</span>
                </li>
                <li>
                  <Eye size={16} color="#dc2626" />
                  <span>View and match horoscopes</span>
                </li>
              </ul>

              <Link to="/membership" className="promo-cta-btn">See membership plans</Link>
            </div>
            <div className="promo-image">
              <img
                src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Premium Member"
              />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
