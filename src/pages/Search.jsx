import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search as SearchIcon, MapPin, Briefcase, GraduationCap, Heart, Filter, User } from 'lucide-react';
import './Search.css';

const Search = () => {
    const [activeTab, setActiveTab] = useState('criteria'); // 'criteria' or 'id'

    // Search Criteria State
    const [criteria, setCriteria] = useState({
        ageFrom: 21,
        ageTo: 35,
        heightFrom: "4ft 5in (134 cm)",
        heightTo: "7ft (213 cm)",
        maritalStatus: "",
        motherTongue: "",
        physicalStatus: "Normal",
        religion: "",
        caste: "",
        occupation: "",
        income: "Any",
        employmentType: "",
        education: "",
        smoking: "Doesn't Matter",
        drinking: "Doesn't Matter"
    });

    // Profile ID State
    const [searchId, setSearchId] = useState('');

    const handleCriteriaChange = (e) => {
        const { name, value } = e.target;
        setCriteria(prev => ({ ...prev, [name]: value }));
    };

    // Dummy data for profiles
    const profiles = [
        {
            id: 1,
            name: "Priya Sharma",
            age: 26,
            height: "5'4\"",
            religion: "Hindu",
            caste: "Brahmin",
            location: "Mumbai, India",
            education: "MBA",
            profession: "Marketing Manager",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            name: "Anjali Gupta",
            age: 24,
            height: "5'6\"",
            religion: "Hindu",
            caste: "Baniya",
            location: "Delhi, India",
            education: "B.Tech",
            profession: "Software Engineer",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            name: "Sneha Reddy",
            age: 28,
            height: "5'5\"",
            religion: "Hindu",
            caste: "Reddy",
            location: "Hyderabad, India",
            education: "MBBS",
            profession: "Doctor",
            image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            name: "Meera Iyer",
            age: 27,
            height: "5'3\"",
            religion: "Hindu",
            caste: "Brahmin",
            location: "Chennai, India",
            education: "M.Com",
            profession: "Accountant",
            image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 5,
            name: "Kavya Singh",
            age: 25,
            height: "5'7\"",
            religion: "Sikh",
            caste: "Jat",
            location: "Chandigarh, India",
            education: "PhD",
            profession: "Professor",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 6,
            name: "Riya Patel",
            age: 29,
            height: "5'5\"",
            religion: "Hindu",
            caste: "Patel",
            location: "Ahmedabad, India",
            education: "M.Arch",
            profession: "Architect",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
    ];

    const heights = [
        "4ft 5in (134 cm)", "4ft 6in (137 cm)", "4ft 7in (139 cm)", "4ft 8in (142 cm)", "4ft 9in (144 cm)",
        "4ft 10in (147 cm)", "4ft 11in (149 cm)", "5ft (152 cm)", "5ft 1in (154 cm)", "5ft 2in (157 cm)",
        "5ft 3in (160 cm)", "5ft 4in (162 cm)", "5ft 5in (165 cm)", "5ft 6in (167 cm)", "5ft 7in (170 cm)",
        "5ft 8in (172 cm)", "5ft 9in (175 cm)", "5ft 10in (177 cm)", "5ft 11in (180 cm)", "6ft (182 cm)",
        "6ft 1in (185 cm)", "6ft 2in (187 cm)", "6ft 3in (190 cm)", "6ft 4in (193 cm)", "6ft 5in (195 cm)",
        "6ft 6in (198 cm)", "6ft 7in (200 cm)", "6ft 8in (203 cm)", "6ft 9in (205 cm)", "7ft (213 cm)"
    ];

    const religionCasteMap = {
        "Hindu": ["Brahmin", "Gounder", "Vanniyar", "Thevar", "Nadar", "Chettiar", "Yadav", "Mudaliar", "Naidu", "Pillai", "Reddy", "Viswakarma", "SC/ST", "Caste No Bar"],
        "Muslim": ["Sunni", "Shia", "Pathan", "Syed", "Sheikh", "Lebbai", "Maraicar", "Rowther", "Mapila", "Caste No Bar"],
        "Christian": ["Roman Catholic", "Protestant", "Pentecost", "CSI", "Latin Catholic", "Syrian Catholic", "Caste No Bar"],
        "Sikh": ["Jat", "Ramgarhia", "Ramdasia", "Arora", "Khatri", "Caste No Bar"],
        "Jain": ["Shwetamber", "Digamber", "Caste No Bar"],
        "Buddhist": ["Neo Buddhist", "Caste No Bar"],
        "Inter-Religion": ["Caste No Bar"],
        "No Religion": ["Caste No Bar"]
    };

    const availableCastes = criteria.religion ? (religionCasteMap[criteria.religion] || []) : [];

    return (
        <div className="search-page">
            <Navbar />
            <div className="search-container">

                {/* Search Panel */}
                <div className="search-panel glass-panel animate-fade-in-up">
                    <div className="search-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'criteria' ? 'active' : ''}`}
                            onClick={() => setActiveTab('criteria')}
                        >
                            <Filter size={18} /> Search by Criteria
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'id' ? 'active' : ''}`}
                            onClick={() => setActiveTab('id')}
                        >
                            <User size={18} /> Search by Profile ID
                        </button>
                    </div>

                    <div className="search-content">
                        {activeTab === 'criteria' ? (
                            <div className="criteria-form">
                                {/* Basic Details */}
                                <div className="form-section">
                                    <h4 className="section-heading">Basic Details</h4>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Age Limit</label>
                                            <div className="range-inputs">
                                                <input type="number" name="ageFrom" value={criteria.ageFrom} onChange={handleCriteriaChange} min="18" max="70" className="search-input" />
                                                <span className="range-separator">to</span>
                                                <input type="number" name="ageTo" value={criteria.ageTo} onChange={handleCriteriaChange} min="18" max="70" className="search-input" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Height</label>
                                            <div className="range-inputs">
                                                <select name="heightFrom" value={criteria.heightFrom} onChange={handleCriteriaChange} className="search-select">
                                                    {heights.map(h => <option key={`from-${h}`} value={h}>{h}</option>)}
                                                </select>
                                                <span className="range-separator">to</span>
                                                <select name="heightTo" value={criteria.heightTo} onChange={handleCriteriaChange} className="search-select">
                                                    {heights.map(h => <option key={`to-${h}`} value={h}>{h}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Marital Status</label>
                                            <select name="maritalStatus" value={criteria.maritalStatus} onChange={handleCriteriaChange} className="search-select">
                                                <option value="">Any</option>
                                                <option value="Never Married">Never Married</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Widowed">Widowed</option>
                                                <option value="Awaiting Divorce">Awaiting Divorce</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Mother Tongue</label>
                                            <select name="motherTongue" value={criteria.motherTongue} onChange={handleCriteriaChange} className="search-select">
                                                <option value="">Any</option>
                                                <option value="Tamil">Tamil</option>
                                                <option value="English">English</option>
                                                <option value="Telugu">Telugu</option>
                                                <option value="Hindi">Hindi</option>
                                                <option value="Malayalam">Malayalam</option>
                                                <option value="Kannada">Kannada</option>
                                                <option value="Marathi">Marathi</option>
                                                <option value="Bengali">Bengali</option>
                                                <option value="Gujarati">Gujarati</option>
                                                <option value="Urdu">Urdu</option>
                                                <option value="Punjabi">Punjabi</option>
                                                <option value="Odia">Odia</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Physical Status</label>
                                            <select name="physicalStatus" value={criteria.physicalStatus} onChange={handleCriteriaChange} className="search-select">
                                                <option value="Normal">Normal</option>
                                                <option value="Physically Challenged">Physically Challenged</option>
                                                <option value="Doesnt Matter">Doesn't Matter</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Religious Details */}
                                <div className="form-section">
                                    <h4 className="section-heading">Religious Details</h4>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Religion</label>
                                            <select name="religion" value={criteria.religion} onChange={handleCriteriaChange} className="search-select">
                                                <option value="">Select Religion</option>
                                                <option value="Hindu">Hindu</option>
                                                <option value="Muslim">Muslim</option>
                                                <option value="Christian">Christian</option>
                                                <option value="Sikh">Sikh</option>
                                                <option value="Jain">Jain</option>
                                                <option value="Buddhist">Buddhist</option>
                                                <option value="Inter-Religion">Inter-Religion</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Caste</label>
                                            <select name="caste" value={criteria.caste} onChange={handleCriteriaChange} disabled={!criteria.religion} className="search-select">
                                                <option value="">Select Caste</option>
                                                {availableCastes.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Professional Details */}
                                <div className="form-section">
                                    <h4 className="section-heading">Professional Details</h4>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Occupation</label>
                                            <select name="occupation" value={criteria.occupation} onChange={handleCriteriaChange} className="search-select">
                                                <option value="">Any</option>
                                                <option value="Software Professional">Software Professional</option>
                                                <option value="Engineer">Engineer</option>
                                                <option value="Doctor">Doctor</option>
                                                <option value="Manager">Manager</option>
                                                <option value="Teacher">Teacher</option>
                                                <option value="Banker">Banker</option>
                                                <option value="Civil Services">Civil Services</option>
                                                <option value="Business Owner">Business Owner</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Employment Type</label>
                                            <select name="employmentType" value={criteria.employmentType} onChange={handleCriteriaChange} className="search-select">
                                                <option value="">Any</option>
                                                <option value="Private Sector">Private Sector</option>
                                                <option value="Government/Public Sector">Government/Public Sector</option>
                                                <option value="Civil Service">Civil Service</option>
                                                <option value="Business/Self Employed">Business/Self Employed</option>
                                                <option value="Not Working">Not Working</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Annual Income</label>
                                            <select name="income" value={criteria.income} onChange={handleCriteriaChange} className="search-select">
                                                <option value="Any">Any</option>
                                                <option value="0-5L">0 - 5 Lakhs</option>
                                                <option value="5L-10L">5 - 10 Lakhs</option>
                                                <option value="10L-20L">10 - 20 Lakhs</option>
                                                <option value="20L-50L">20 - 50 Lakhs</option>
                                                <option value="50L+">50 Lakhs+</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Education</label>
                                            <select name="education" value={criteria.education} onChange={handleCriteriaChange} className="search-select">
                                                <option value="">Any</option>
                                                <option value="Doctorate">Doctorate</option>
                                                <option value="Masters">Masters</option>
                                                <option value="Bachelors">Bachelors</option>
                                                <option value="Diploma">Diploma</option>
                                                <option value="High School">High School</option>
                                                <option value="Trade School">Trade School</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Lifestyle */}
                                <div className="form-section">
                                    <h4 className="section-heading">Lifestyle</h4>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Smoking Habits</label>
                                            <select name="smoking" value={criteria.smoking} onChange={handleCriteriaChange} className="search-select">
                                                <option value="Doesn't Matter">Doesn't Matter</option>
                                                <option value="Never Smokes">Never Smokes</option>
                                                <option value="Smokes Occasionally">Smokes Occasionally</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Drinking Habits</label>
                                            <select name="drinking" value={criteria.drinking} onChange={handleCriteriaChange} className="search-select">
                                                <option value="Doesn't Matter">Doesn't Matter</option>
                                                <option value="Never Drinks">Never Drinks</option>
                                                <option value="Drinks Occasionally">Drinks Occasionally</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button className="btn btn-primary search-btn"><SearchIcon size={18} /> Search Profiles</button>
                                </div>
                            </div>
                        ) : (
                            <div className="id-search-form">
                                <h3>Search by Profile ID</h3>
                                <p className="text-muted">Enter the unique Matrimony ID to view a specific member.</p>

                                <div className="id-input-group">
                                    <input
                                        type="text"
                                        placeholder="Enter Matrimony ID (e.g. MAYAN123)"
                                        value={searchId}
                                        onChange={(e) => setSearchId(e.target.value)}
                                        className="id-input"
                                    />
                                    <button className="btn btn-primary view-profile-btn"><User size={18} /> View Profile</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Results Section (Optional view below) */}
                <div className="results-divider">
                    <span className="divider-text">Latest Profiles</span>
                </div>

                <div className="profiles-grid">
                    {profiles.map(profile => (
                        <div key={profile.id} className="profile-card glass-panel animate-fade-in-up">
                            <div className="profile-image-container">
                                <img src={profile.image} alt={profile.name} className="profile-image" />
                                <button className="shortlist-btn"><Heart size={18} /></button>
                            </div>
                            <div className="profile-details">
                                <h3>{profile.name}</h3>
                                <div className="profile-stat-row">
                                    <span className="profile-stat">{profile.age} yrs</span>
                                    <span className="separator">•</span>
                                    <span className="profile-stat">{profile.height}</span>
                                </div>

                                <div className="profile-info-grid">
                                    <div className="info-item">
                                        <GraduationCap size={16} />
                                        <span>{profile.education}</span>
                                    </div>
                                    <div className="info-item">
                                        <Briefcase size={16} />
                                        <span>{profile.profession}</span>
                                    </div>
                                    <div className="info-item">
                                        <MapPin size={16} />
                                        <span>{profile.location}</span>
                                    </div>
                                </div>

                                <div className="profile-meta">
                                    <span className="religion-badge">{profile.religion}, {profile.caste}</span>
                                </div>

                                <button className="btn btn-primary connect-btn">Send Interest</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Search;
