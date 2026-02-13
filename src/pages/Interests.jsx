import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Inbox, Send, Hash, Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import './Interests.css';

const Interests = () => {
    const [activeSection, setActiveSection] = useState('received'); // 'received' or 'sent'
    const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'pending', 'accepted', 'declined'

    // Dummy data structure (empty for now as per design)
    const interests = [];

    const tabs = [
        { id: 'all', label: 'All', icon: <Hash size={16} /> },
        { id: 'pending', label: 'Pending', icon: <Clock size={16} /> },
        { id: 'accepted', label: 'Accepted/Replied', icon: <CheckCircle size={16} /> },
        { id: 'declined', label: 'Declined', icon: <XCircle size={16} /> }
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
            ? "Interests and responses from members"
            : "Interests and responses you have sent";
    };

    return (
        <div className="interests-page">
            <Navbar />
            <div className="interests-container">
                <div className="interests-layout glass-panel">

                    {/* Sidebar */}
                    <aside className="interests-sidebar">
                        <div className="sidebar-group">
                            <h3 className={`sidebar-title ${activeSection === 'received' ? 'active' : ''}`}
                                onClick={() => setActiveSection('received')}>
                                <Inbox size={18} /> Interests Received
                            </h3>
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
                            <h3 className={`sidebar-title ${activeSection === 'sent' ? 'active' : ''}`}
                                onClick={() => setActiveSection('sent')}>
                                <Send size={18} /> Interests Sent
                            </h3>
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
                            <div className="illustration-container">
                                <MessageSquare size={64} className="empty-icon" />
                            </div>
                            <h3>No conversation till now</h3>
                            <p>All {activeSection === 'received' ? 'incoming' : 'outgoing'} interests and responses will be shown here</p>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Interests;
