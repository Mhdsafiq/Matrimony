import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    Users, Star, Eye, UserPlus, MapPin, Sparkles, ChevronRight, User
} from 'lucide-react';
import './Matches.css';

const Matches = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('your-matches');
    const [viewEvents, setViewEvents] = useState([]);

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
    const currentUserId = localStorage.getItem('uniqueId') || '';

    useEffect(() => {
        const events = JSON.parse(localStorage.getItem('profileViewEvents') || '[]');
        setViewEvents(Array.isArray(events) ? events : []);
    }, []);

    const getLatestUniqueBy = (items, keyGetter) => {
        const seen = new Set();
        const latest = [];
        items.forEach(item => {
            const key = keyGetter(item);
            if (!key || seen.has(key)) return;
            seen.add(key);
            latest.push(item);
        });
        return latest;
    };

    const viewedYouList = useMemo(() => {
        if (!currentUserId) return [];
        const filtered = viewEvents
            .filter((event) => event?.type === 'profile_view' && event?.viewed?.uniqueId === currentUserId && event?.viewer?.uniqueId !== currentUserId)
            .sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt));
        return getLatestUniqueBy(filtered, (event) => event.viewer?.uniqueId);
    }, [viewEvents, currentUserId]);

    const viewedByYouList = useMemo(() => {
        if (!currentUserId) return [];
        const filtered = viewEvents
            .filter((event) => event?.type === 'profile_view' && event?.viewer?.uniqueId === currentUserId && event?.viewed?.uniqueId !== currentUserId)
            .sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt));
        return getLatestUniqueBy(filtered, (event) => event.viewed?.uniqueId);
    }, [viewEvents, currentUserId]);

    const formatViewedTime = (iso) => {
        if (!iso) return '';
        const date = new Date(iso);
        if (Number.isNaN(date.getTime())) return '';
        return date.toLocaleString();
    };

    const renderProfileList = (records, mode) => (
        <div className="viewed-list">
            {records.map((event) => {
                const person = mode === 'viewed-you' ? event.viewer : event.viewed;
                const location = [person?.city, person?.state, person?.country].filter(Boolean).join(', ') || 'Location not specified';
                return (
                    <article className="viewed-card" key={event.id}>
                        <div className="viewed-avatar">
                            {person?.photo ? <img src={person.photo} alt={person.fullName || 'Member'} /> : <User size={22} />}
                        </div>
                        <div className="viewed-content">
                            <h4>{person?.fullName || 'Member'}</h4>
                            <p className="viewed-meta">ID - {person?.uniqueId || 'N/A'}</p>
                            <p className="viewed-meta">{location}</p>
                            <p className="viewed-time">Viewed on {formatViewedTime(event.viewedAt)}</p>
                        </div>
                    </article>
                );
            })}
        </div>
    );

    const showViewedYou = activeCategory === 'viewed-you' && viewedYouList.length > 0;
    const showViewedByYou = activeCategory === 'viewed-by-you' && viewedByYouList.length > 0;
    const showEmpty = !(showViewedYou || showViewedByYou);

    const emptyTitle = activeCategory === 'viewed-you'
        ? 'No one has viewed your profile yet'
        : activeCategory === 'viewed-by-you'
            ? 'You have not viewed any profiles yet'
            : 'You have no matches left';

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

                        <div className={`matches-body ${showEmpty ? 'empty-state' : ''}`}>
                            {showViewedYou && renderProfileList(viewedYouList, 'viewed-you')}
                            {showViewedByYou && renderProfileList(viewedByYouList, 'viewed-by-you')}

                            {showEmpty && (
                                <>
                                    <div className="illustration-container">
                                        <Users size={64} className="empty-icon" />
                                        <div className="search-overlay">
                                            <div className="magnifier"></div>
                                        </div>
                                    </div>
                                    <h3>{emptyTitle}</h3>
                                    {activeCategory === 'your-matches' && (
                                        <button className="btn btn-outline change-pref-btn" onClick={() => navigate('/profile', { state: { openPreferences: true } })}>Change Preferences</button>
                                    )}
                                </>
                            )}
                            {activeCategory === 'viewed-you' && viewedYouList.length === 0 && (
                                <p className="viewed-empty-note">Search and open profiles from another account to see activity here.</p>
                            )}
                            {activeCategory === 'viewed-by-you' && viewedByYouList.length === 0 && (
                                <p className="viewed-empty-note">Search and open profiles to see your viewed list here.</p>
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
