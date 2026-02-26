import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Interests.css';

const Interests = () => {
    const [activeSection, setActiveSection] = useState('received'); // 'received' or 'sent'
    const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'pending', 'accepted', 'declined'

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'pending', label: 'Pending' },
        { id: 'accepted', label: 'Accepted/Replied' },
        { id: 'declined', label: 'Declined' }
    ];

    const getTitle = () => {
        const section = activeSection === 'received' ? 'interests received' : 'interests sent';
        const filter = activeFilter === 'all' ? 'All' :
            activeFilter === 'pending' ? 'Pending' :
                activeFilter === 'accepted' ? 'Accepted' : 'Declined';
        return `${filter} ${section}`;
    };

    const getSubtitle = () => {
        return activeSection === 'received'
            ? "Interests and responses from free members"
            : "Interests and responses you have sent";
    };

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
                            <p>{getSubtitle()}</p>
                        </div>

                        <div className="content-body empty-state">
                            <div className="illustration-wrapper">
                                <svg width="240" height="200" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="150" y="50" width="80" height="150" rx="10" fill="#f0f0f0" stroke="#1f2937" strokeWidth="3" />
                                    <line x1="160" y1="70" x2="220" y2="70" stroke="#d1d5db" strokeWidth="4" strokeLinecap="round" />
                                    <line x1="160" y1="90" x2="220" y2="90" stroke="#d1d5db" strokeWidth="4" strokeLinecap="round" />
                                    <line x1="160" y1="110" x2="200" y2="110" stroke="#d1d5db" strokeWidth="4" strokeLinecap="round" />
                                    <circle cx="190" cy="180" r="10" fill="#e5e7eb" />
                                    {/* Person 1 (Standing) */}
                                    <path d="M140 130 C150 120, 160 120, 150 160 C140 200, 130 200, 140 200 L160 200 C155 170, 165 140, 160 130 Z" fill="#1f2937" />
                                    <path d="M140 90 C155 90, 160 110, 150 130 L130 130 C120 110, 125 90, 140 90 Z" fill="#22c55e" />
                                    <circle cx="145" cy="80" r="12" fill="#fbcfe8" />
                                    <path d="M145 95 L165 110" stroke="#fbcfe8" strokeWidth="5" strokeLinecap="round" />

                                    {/* Person 2 (Sitting) */}
                                    <path d="M220 170 C210 160, 200 170, 210 190 C220 200, 270 210, 270 200 L260 190 C230 190, 220 180, 230 170 Z" fill="#1f2937" />
                                    <path d="M230 135 C220 135, 215 155, 225 170 L245 170 C255 155, 250 135, 230 135 Z" fill="#1f2937" />
                                    <circle cx="225" cy="125" r="12" fill="#fbcfe8" />
                                    <path d="M225 140 L210 155" stroke="#fbcfe8" strokeWidth="5" strokeLinecap="round" />

                                    {/* Shadows/ground */}
                                    <ellipse cx="200" cy="205" rx="80" ry="5" fill="#e5e7eb" />
                                </svg>
                            </div>
                            <h3>No conversation till now</h3>
                            <p>All incoming interests and responses will be shown here</p>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Interests;
