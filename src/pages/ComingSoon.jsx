import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ComingSoon = ({ title }) => {
    return (
        <div className="coming-soon">
            <Navbar />
            <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '100px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}>{title}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>
                    We are currently working on this feature. Please check back later!
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default ComingSoon;
