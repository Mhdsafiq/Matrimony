import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Interests.css';

const Interests = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('received'); // 'received' or 'sent'
    const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'pending', 'accepted', 'declined'

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'pending', label: 'Pending' },
        { id: 'accepted', label: 'Accepted/Replied' },
        { id: 'declined', label: 'Declined' }
    ];

    // Dynamic title based on section + filter
    const getTitle = () => {
        if (activeSection === 'received') {
            if (activeFilter === 'all') return 'All interests received';
            if (activeFilter === 'pending') return 'Pending interests';
            if (activeFilter === 'accepted') return 'Matches who accepted/replied to your interest';
            if (activeFilter === 'declined') return 'Declined interests';
        } else {
            if (activeFilter === 'all') return 'Interests sent by you';
            if (activeFilter === 'pending') return 'Matches yet to respond';
            if (activeFilter === 'accepted') return 'Matches who accepted/replied to your interest';
            if (activeFilter === 'declined') return 'Declined interests sent';
        }
        return 'Interests';
    };

    // Dynamic subtitle based on section + filter
    const getSubtitle = () => {
        if (activeSection === 'received') {
            if (activeFilter === 'all') return 'Interests and responses from free members';
            if (activeFilter === 'pending') return 'Interests from free members awaiting your response';
            if (activeFilter === 'accepted') return '';
            if (activeFilter === 'declined') return '';
        } else {
            return '';
        }
        return '';
    };

    // Dynamic empty state message based on section + filter
    const getEmptyMessage = () => {
        if (activeSection === 'received') {
            if (activeFilter === 'all') return 'No conversation till now';
            if (activeFilter === 'pending') return 'You have no pending interests/messages.';
            if (activeFilter === 'accepted') return 'You have no accepted interests or replies yet.';
            if (activeFilter === 'declined') return 'You have no declined interests yet.';
        } else {
            if (activeFilter === 'all') return 'You have not sent any interests yet';
            if (activeFilter === 'pending') return 'You have no pending interests';
            if (activeFilter === 'accepted') return 'You have no interests that were accepted/responded to';
            if (activeFilter === 'declined') return 'You have no declined interests yet';
        }
        return 'No interests found';
    };

    const getEmptySubMessage = () => {
        if (activeSection === 'received' && activeFilter === 'all') {
            return 'All incoming interests and responses will be shown here';
        }
        return '';
    };

    // Show "Explore matches" button only for sent section
    const showExploreBtn = activeSection === 'sent';

    const subtitle = getSubtitle();

    return (
        <div className="interests-page">
            <Navbar />
            <div className="interests-container">

                <div className="interests-layout">
                    {/* Sidebar */}
                    <aside className="interests-sidebar">
                        <div className="sidebar-group">
                            <h3 className="sidebar-title">Interests Received</h3>
                            <ul className="sidebar-nav">
                                {tabs.map(tab => (
                                    <li key={`received-${tab.id}`}>
                                        <button
                                            className={`sidebar-link ${activeSection === 'received' && activeFilter === tab.id ? 'active' : ''}`}
                                            onClick={() => { setActiveSection('received'); setActiveFilter(tab.id); }}
                                        >
                                            {tab.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="sidebar-divider"></div>

                        <div className="sidebar-group">
                            <h3 className="sidebar-title">Interests Sent</h3>
                            <ul className="sidebar-nav">
                                {tabs.map(tab => (
                                    <li key={`sent-${tab.id}`}>
                                        <button
                                            className={`sidebar-link ${activeSection === 'sent' && activeFilter === tab.id ? 'active' : ''}`}
                                            onClick={() => { setActiveSection('sent'); setActiveFilter(tab.id); }}
                                        >
                                            {tab.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="interests-content">
                        <div className="content-header">
                            <h2>{getTitle()}</h2>
                            {subtitle && <p className="content-subtitle">{subtitle}</p>}
                        </div>

                        <div className="content-body empty-state">
                            <div className="illustration-wrapper">
                                <img
                                    src="/interests_illustration.png"
                                    alt="No interests illustration"
                                    className="interests-illustration-img"
                                />
                            </div>
                            <h3 className="empty-message">{getEmptyMessage()}</h3>
                            {getEmptySubMessage() && (
                                <p className="empty-sub-message">{getEmptySubMessage()}</p>
                            )}
                            {showExploreBtn && (
                                <button className="explore-btn" onClick={() => navigate('/matches')}>
                                    Explore matches
                                </button>
                            )}
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Interests;
