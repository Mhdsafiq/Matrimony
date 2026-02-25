import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Shield, Heart, Award, ArrowRight } from 'lucide-react';
import './About.css';

const About = () => {
    const stats = [
        { label: "Happy Couples", value: "10,000+" },
        { label: "Verified Profiles", value: "50,000+" },
        { label: "Years of Trust", value: "15+" },
        { label: "Cities Covered", value: "100+" }
    ];

    const values = [
        {
            icon: <Shield size={32} />,
            title: "Trust & Safety",
            desc: "We prioritize your privacy and safety with strict verification processes and secure data handling."
        },
        {
            icon: <Heart size={32} />,
            title: "Genuine Connections",
            desc: "Our platform is designed to foster meaningful relationships based on shared values and compatibility."
        },
        {
            icon: <Users size={32} />,
            title: "Community Focused",
            desc: "We understand the importance of community and tradition in finding the perfect life partner."
        },
        {
            icon: <Award size={32} />,
            title: "Excellence",
            desc: "Committed to providing the best matchmaking experience with cutting-edge technology and support."
        }
    ];

    return (
        <div className="about-page">
            <Navbar />

            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-content animate-fade-in-up">
                    <h1>Connecting Hearts, <br />Creating Stories</h1>
                    <p>Sri Mayan Matrimony is the most trusted platform for finding your soulmate. We believe in the sanctity of marriage and are dedicated to helping you find your perfect match.</p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="container">
                    <div className="mission-content">
                        <div className="mission-text">
                            <h2>Our Mission</h2>
                            <p>To provide a superior matchmaking experience by expanding the opportunities available to meet potential life partners and build fulfilling relationships.</p>
                            <p>We strive to do this through superior technology, in-depth research, valuable matrimonial content & services, and above all the highest quality of customer service delivered with a sense of warmth, understanding, respect, and company spirit.</p>
                        </div>
                        <div className="mission-stats glass-panel">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-item">
                                    <span className="stat-value">{stat.value}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="values-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Why Choose Sri Mayan Matrimony?</h2>
                        <p>We are dedicated to making your search for a life partner safe, easy, and successful.</p>
                    </div>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card glass-panel">
                                <div className="value-icon">{value.icon}</div>
                                <h3>{value.title}</h3>
                                <p>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder/Story Section (Optional) */}
            <section className="story-section">
                <div className="container story-container">
                    <div className="story-text">
                        <h2>Our Journey</h2>
                        <p>Started with a simple idea to bring people together, Sri Mayan Matrimony has grown into a trusted household name. We have helped thousands of people navigate the journey of finding love.</p>
                        <p>Our commitment remains the same: to help you write your own happily ever after.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
