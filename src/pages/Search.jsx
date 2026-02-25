import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search as SearchIcon, MapPin, Briefcase, GraduationCap, Heart, Filter, User } from 'lucide-react';
import './Search.css';

const Search = () => {
    const [activeTab, setActiveTab] = useState('criteria');

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

    const [searchId, setSearchId] = useState('');
    const [foundProfile, setFoundProfile] = useState(null);
    const [searchAttempted, setSearchAttempted] = useState(false);

    const handleCriteriaChange = (e) => {
        const { name, value } = e.target;
        setCriteria(prev => ({ ...prev, [name]: value }));
    };

    const dummyProfiles = [
        {
            id: 1,
            uniqueId: "SM-A1B2C3",
            fullName: "Priya Sharma",
            age: 26,
            height: "5'4\"",
            religion: "Hindu",
            caste: "Brahmin",
            country: "India", state: "Maharashtra", city: "Mumbai",
            education: "MBA",
            occupation: "Marketing Manager",
            income: "10 - 15 Lakhs",
            motherTongue: "Hindi",
            mobile: "9876543210",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            uniqueId: "SM-D4E5F6",
            fullName: "Anjali Gupta",
            age: 24,
            height: "5'6\"",
            religion: "Hindu",
            caste: "Baniya",
            country: "India", state: "Delhi", city: "New Delhi",
            education: "B.Tech",
            occupation: "Software Engineer",
            income: "15 - 20 Lakhs",
            motherTongue: "Hindi",
            mobile: "9876543211",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            uniqueId: "SM-G7H8I9",
            fullName: "Sneha Reddy",
            age: 28,
            height: "5'5\"",
            religion: "Hindu",
            caste: "Reddy",
            country: "India", state: "Telangana", city: "Hyderabad",
            education: "MBBS",
            occupation: "Doctor",
            income: "20 - 30 Lakhs",
            motherTongue: "Telugu",
            mobile: "9876543212",
            image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            uniqueId: "SM-J1K2L3",
            fullName: "Meera Iyer",
            age: 27,
            height: "5'3\"",
            religion: "Hindu",
            caste: "Brahmin",
            country: "India", state: "Tamil Nadu", city: "Chennai",
            education: "M.Com",
            occupation: "Accountant",
            income: "5 - 7 Lakhs",
            motherTongue: "Tamil",
            mobile: "9876543213",
            image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 5,
            uniqueId: "SM-M4N5O6",
            fullName: "Kavya Singh",
            age: 25,
            height: "5'7\"",
            religion: "Sikh",
            caste: "Jat",
            country: "India", state: "Punjab", city: "Chandigarh",
            education: "PhD",
            occupation: "Professor",
            income: "10 - 15 Lakhs",
            motherTongue: "Punjabi",
            mobile: "9876543214",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 6,
            uniqueId: "SM-P7Q8R9",
            fullName: "Riya Patel",
            age: 29,
            height: "5'5\"",
            religion: "Hindu",
            caste: "Patel",
            country: "India", state: "Gujarat", city: "Ahmedabad",
            education: "M.Arch",
            occupation: "Architect",
            income: "7 - 10 Lakhs",
            motherTongue: "Gujarati",
            mobile: "9876543215",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
    ];

    const getAllProfiles = () => {
        const registered = JSON.parse(localStorage.getItem('registeredProfiles') || '[]');
        return [...dummyProfiles, ...registered];
    };

    const handleIdSearch = () => {
        setSearchAttempted(true);
        if (!searchId.trim()) {
            setFoundProfile(null);
            return;
        }
        const allProfiles = getAllProfiles();
        const found = allProfiles.find(p =>
            p.uniqueId && p.uniqueId.toLowerCase() === searchId.trim().toLowerCase()
        );
        setFoundProfile(found || null);
    };

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
                            onClick={() => { setActiveTab('id'); setFoundProfile(null); setSearchAttempted(false); }}
                        >
                            <User size={18} /> Search by Profile ID
                        </button>
                    </div>

                    <div className="search-content">
                        {activeTab === 'criteria' ? (
                            <div className="criteria-form">
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
                                <p className="text-muted">Enter the unique Matrimony ID to view a specific member's profile.</p>

                                <div className="id-input-group">
                                    <input
                                        type="text"
                                        placeholder="Enter Matrimony ID (e.g. SM-A1B2C3)"
                                        value={searchId}
                                        onChange={(e) => { setSearchId(e.target.value.toUpperCase()); setSearchAttempted(false); }}
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleIdSearch(); }}
                                        className="id-input"
                                    />
                                    <button className="btn btn-primary view-profile-btn" onClick={handleIdSearch}><SearchIcon size={18} /> Search Profile</button>
                                </div>

                                {searchAttempted && foundProfile && (
                                    <div className="id-search-result" style={{ marginTop: '25px', padding: '25px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                                        <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                            <div style={{ width: '120px', height: '120px', borderRadius: '12px', overflow: 'hidden', background: '#e5e7eb', flexShrink: 0 }}>
                                                {foundProfile.image || foundProfile.photo ? (
                                                    <img src={foundProfile.image || foundProfile.photo} alt={foundProfile.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <User size={50} color="#9ca3af" />
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ flex: 1, minWidth: '200px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px', flexWrap: 'wrap' }}>
                                                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1f2937' }}>{foundProfile.fullName}</h3>
                                                    <span style={{ background: '#D4AF37', color: '#fff', padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>{foundProfile.uniqueId}</span>
                                                </div>
                                                {foundProfile.age && <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '3px 0' }}>{foundProfile.age} years • {foundProfile.height || 'Height not specified'}</p>}

                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px', fontSize: '0.85rem' }}>
                                                    <div style={{ color: '#374151' }}><strong>Religion:</strong> {foundProfile.religion || 'Not specified'}</div>
                                                    <div style={{ color: '#374151' }}><strong>Caste:</strong> {foundProfile.caste || 'Not specified'}</div>
                                                    <div style={{ color: '#374151' }}><strong>Education:</strong> {foundProfile.education || 'Not specified'}</div>
                                                    <div style={{ color: '#374151' }}><strong>Occupation:</strong> {foundProfile.occupation || 'Not specified'}</div>
                                                    <div style={{ color: '#374151' }}><strong>Location:</strong> {foundProfile.city ? `${foundProfile.city}, ${foundProfile.state || foundProfile.country}` : 'Not specified'}</div>
                                                    <div style={{ color: '#374151' }}><strong>Income:</strong> {foundProfile.income || 'Not specified'}</div>
                                                    <div style={{ color: '#374151' }}><strong>Mother Tongue:</strong> {foundProfile.motherTongue || 'Not specified'}</div>
                                                    <div style={{ color: '#374151' }}><strong>Mobile:</strong> {foundProfile.mobile || 'Not specified'}</div>
                                                </div>

                                                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                                    <button className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '8px 20px' }}>Send Interest</button>
                                                    <button className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '8px 20px' }}><Heart size={16} /> Shortlist</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {searchAttempted && !foundProfile && searchId.trim() && (
                                    <div style={{ marginTop: '25px', textAlign: 'center', padding: '30px', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fecaca' }}>
                                        <User size={40} color="#ef4444" style={{ marginBottom: '10px' }} />
                                        <h4 style={{ color: '#991b1b', marginBottom: '5px' }}>Profile Not Found</h4>
                                        <p style={{ color: '#b91c1c', fontSize: '0.9rem' }}>No profile found with ID "{searchId}". Please check the ID and try again.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="results-divider">
                    <span className="divider-text">Latest Profiles</span>
                </div>

                <div className="profiles-grid">
                    {dummyProfiles.map(profile => (
                        <div key={profile.id} className="profile-card glass-panel animate-fade-in-up">
                            <div className="profile-image-container">
                                <img src={profile.image} alt={profile.fullName} className="profile-image" />
                                <button className="shortlist-btn"><Heart size={18} /></button>
                            </div>
                            <div className="profile-details">
                                <h3>{profile.fullName}</h3>
                                <span className="profile-id-badge" style={{ display: 'inline-block', background: '#fffbeb', border: '1px solid #fcd34d', color: '#b45309', padding: '2px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600, marginBottom: '6px' }}>{profile.uniqueId}</span>
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
                                        <span>{profile.occupation}</span>
                                    </div>
                                    <div className="info-item">
                                        <MapPin size={16} />
                                        <span>{profile.city}, {profile.country}</span>
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
