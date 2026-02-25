import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    Users, Star, Eye, UserPlus, MapPin, Sparkles,
    Camera, GraduationCap, Briefcase, Map, ChevronRight, User
} from 'lucide-react';
import './Matches.css';

const Matches = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('your-matches');

    // Grouping the sidebar items as shown in the user's images
    const matchGroups = [
        {
            title: "All Matches",
            items: [
                { id: 'your-matches', label: 'Your Matches', desc: 'View all the profiles that match your preferences', icon: <Users size={20} /> }
            ]
        },
        {
            title: "",
            items: [
                { id: 'nearby-matches', label: 'Nearby matches', desc: 'Matches near your location', icon: <MapPin size={20} /> }
            ]
        },
        {
            title: "Based on profile details",
            items: [
                { id: 'matches-with-horoscope', label: 'Matches with horoscope', desc: 'Matches that have added horoscope', icon: <Sparkles size={20} /> }
            ]
        },
        {
            title: "Based on activity",
            items: [
                { id: 'shortlisted-by-you', label: 'Shortlisted by you', desc: 'Matches you have shortlisted', icon: <Star size={20} /> },
                { id: 'viewed-you', label: 'Viewed you', desc: 'Matches who have viewed your profile', icon: <Eye size={20} /> },
                { id: 'shortlisted-you', label: 'Shortlisted you', desc: 'Matches who have shortlisted your profile', icon: <UserPlus size={20} /> },
                { id: 'viewed-by-you', label: 'Viewed by you', desc: 'Matches you have viewed', icon: <Eye size={20} /> }
            ]
        }
    ];

    const getActiveItem = () => {
        for (const group of matchGroups) {
            const item = group.items.find(i => i.id === activeCategory);
            if (item) return item;
        }
        return matchGroups[0].items[0];
    };

    const activeItem = getActiveItem();

    return (
        <div className="matches-page">
            <Navbar />
            <div className="matches-container">
                <div className="matches-layout glass-panel">

                    {/* Sidebar */}
                    <aside className="matches-sidebar">
                        {matchGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="match-group">
                                {group.title && <h4 className="group-title">{group.title}</h4>}
                                <ul className="group-list">
                                    {group.items.map(item => (
                                        <li key={item.id}>
                                            <button
                                                className={`match-link ${activeCategory === item.id ? 'active' : ''}`}
                                                onClick={() => setActiveCategory(item.id)}
                                            >
                                                <div className="link-icon">{item.icon}</div>
                                                <div className="link-content">
                                                    <span className="link-label">{item.label}</span>
                                                    <span className="link-desc">{item.desc}</span>
                                                </div>
                                                <ChevronRight size={16} className="chevron" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                {groupIndex < matchGroups.length - 1 && <div className="group-divider"></div>}
                            </div>
                        ))}
                    </aside>

                    {/* Main Content */}
                    <main className="matches-content">
                        <div className="content-header">
                            <h2>{activeItem.label}</h2>
                            <p>{activeItem.desc}</p>
                        </div>

                        <div className="matches-body empty-state">
                            <div className="illustration-container">
                                <Users size={64} className="empty-icon" />
                                <div className="search-overlay">
                                    <div className="magnifier"></div>
                                </div>
                            </div>
                            <h3>You have no matches left</h3>
                            {activeCategory === 'your-matches' && (
                                <button className="btn btn-outline change-pref-btn" onClick={() => navigate('/profile', { state: { openPreferences: true } })}>Change Preferences</button>
                            )}
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Matches;
