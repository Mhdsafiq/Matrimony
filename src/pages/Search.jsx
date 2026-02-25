import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search as SearchIcon, User, Heart, Bookmark } from 'lucide-react';
import './Search.css';

const Search = () => {
    const [activeTab, setActiveTab] = useState('criteria');

    const [criteria, setCriteria] = useState({
        ageFrom: '18',
        ageTo: '21',
        heightFrom: "5'0\"",
        heightTo: "6'0\"",
        profileCreatedBy: '',
        maritalStatus: '',
        havingChildren: "Doesn't Matter",
        motherTongue: 'Tamil',
        physicalStatus: 'Normal',
        religion: '',
        caste: '',
        subCaste: '',
        dosham: "Doesn't Matter",
        star: '',
        raasi: '',
        occupation: '',
        employmentType: '',
        income: 'Any',
        education: '',
        country: '',
        state: '',
        city: '',
        smoking: "Doesn't Matter",
        drinking: "Doesn't Matter",
        foodHabits: "Doesn't Matter"
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

    const ageOptions = [];
    for (let i = 18; i <= 70; i++) {
        ageOptions.push(i);
    }

    const heightOptions = [
        "4'5\"", "4'6\"", "4'7\"", "4'8\"", "4'9\"", "4'10\"", "4'11\"",
        "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"",
        "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\"", "6'7\"", "6'8\"", "6'9\"",
        "7'0\""
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
                <div className="search-panel">
                    {/* Tabs */}
                    <div className="search-tabs">
                        <button
                            className={`search-tab ${activeTab === 'criteria' ? 'active' : ''}`}
                            onClick={() => setActiveTab('criteria')}
                        >
                            By Criteria
                        </button>
                        <button
                            className={`search-tab ${activeTab === 'id' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('id'); setFoundProfile(null); setSearchAttempted(false); }}
                        >
                            By Profile ID
                        </button>
                        <button
                            className={`search-tab ${activeTab === 'saved' ? 'active' : ''}`}
                            onClick={() => setActiveTab('saved')}
                        >
                            Saved Search <span className="saved-count">0</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="search-content">
                        {activeTab === 'criteria' && (
                            <div className="criteria-search">
                                <h2 className="criteria-title">Search profiles using the below criteria</h2>

                                {/* Basic Details */}
                                <div className="criteria-section">
                                    <div className="section-header">
                                        <h3>Basic Details</h3>
                                    </div>
                                    <div className="criteria-table">
                                        <div className="criteria-row">
                                            <label className="criteria-label">Age</label>
                                            <div className="criteria-value">
                                                <select name="ageFrom" value={criteria.ageFrom} onChange={handleCriteriaChange} className="criteria-select criteria-select-sm">
                                                    {ageOptions.map(a => <option key={`af-${a}`} value={a}>{a}</option>)}
                                                </select>
                                                <span className="criteria-to">to</span>
                                                <select name="ageTo" value={criteria.ageTo} onChange={handleCriteriaChange} className="criteria-select criteria-select-sm">
                                                    {ageOptions.map(a => <option key={`at-${a}`} value={a}>{a}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Height</label>
                                            <div className="criteria-value">
                                                <select name="heightFrom" value={criteria.heightFrom} onChange={handleCriteriaChange} className="criteria-select criteria-select-sm">
                                                    {heightOptions.map(h => <option key={`hf-${h}`} value={h}>{h}</option>)}
                                                </select>
                                                <span className="criteria-to">to</span>
                                                <select name="heightTo" value={criteria.heightTo} onChange={handleCriteriaChange} className="criteria-select criteria-select-sm">
                                                    {heightOptions.map(h => <option key={`ht-${h}`} value={h}>{h}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Profile Created By</label>
                                            <div className="criteria-value">
                                                <select name="profileCreatedBy" value={criteria.profileCreatedBy} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="">Any</option>
                                                    <option value="Self">Self</option>
                                                    <option value="Parent">Parent / Guardian</option>
                                                    <option value="Sibling">Sibling</option>
                                                    <option value="Friend">Friend</option>
                                                    <option value="Relative">Relative</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Marital Status</label>
                                            <div className="criteria-value">
                                                <select name="maritalStatus" value={criteria.maritalStatus} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="">Any</option>
                                                    <option value="Never Married">Never Married</option>
                                                    <option value="Divorced">Divorced</option>
                                                    <option value="Widowed">Widowed</option>
                                                    <option value="Awaiting Divorce">Awaiting Divorce</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Having Children</label>
                                            <div className="criteria-value">
                                                <select name="havingChildren" value={criteria.havingChildren} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="Doesn't Matter">Doesn't Matter</option>
                                                    <option value="No">No</option>
                                                    <option value="Yes">Yes</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Mother Tongue</label>
                                            <div className="criteria-value">
                                                <select name="motherTongue" value={criteria.motherTongue} onChange={handleCriteriaChange} className="criteria-select">
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
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Physical Status</label>
                                            <div className="criteria-value">
                                                <select name="physicalStatus" value={criteria.physicalStatus} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="Normal">Normal</option>
                                                    <option value="Physically Challenged">Physically Challenged</option>
                                                    <option value="Doesnt Matter">Doesn't Matter</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Religious Details */}
                                <div className="criteria-section">
                                    <div className="section-header">
                                        <h3>Religious Details</h3>
                                    </div>
                                    <div className="criteria-table">
                                        <div className="criteria-row">
                                            <label className="criteria-label">Religion</label>
                                            <div className="criteria-value">
                                                <select name="religion" value={criteria.religion} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="">Any</option>
                                                    <option value="Hindu">Hindu</option>
                                                    <option value="Muslim">Muslim</option>
                                                    <option value="Christian">Christian</option>
                                                    <option value="Sikh">Sikh</option>
                                                    <option value="Jain">Jain</option>
                                                    <option value="Buddhist">Buddhist</option>
                                                    <option value="Inter-Religion">Inter-Religion</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Caste</label>
                                            <div className="criteria-value">
                                                <select name="caste" value={criteria.caste} onChange={handleCriteriaChange} disabled={!criteria.religion} className="criteria-select">
                                                    <option value="">Any</option>
                                                    {availableCastes.map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Sub Caste</label>
                                            <div className="criteria-value">
                                                <select name="subCaste" value={criteria.subCaste} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="">Any</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Dosham</label>
                                            <div className="criteria-value">
                                                <select name="dosham" value={criteria.dosham} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="Doesn't Matter">Doesn't Matter</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Star</label>
                                            <div className="criteria-value">
                                                <select name="star" value={criteria.star} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="">Any</option>
                                                    <option value="Ashwini">Ashwini</option>
                                                    <option value="Bharani">Bharani</option>
                                                    <option value="Krittika">Krittika</option>
                                                    <option value="Rohini">Rohini</option>
                                                    <option value="Mrigashira">Mrigashira</option>
                                                    <option value="Ardra">Ardra</option>
                                                    <option value="Punarvasu">Punarvasu</option>
                                                    <option value="Pushya">Pushya</option>
                                                    <option value="Ashlesha">Ashlesha</option>
                                                    <option value="Magha">Magha</option>
                                                    <option value="Purva Phalguni">Purva Phalguni</option>
                                                    <option value="Uttara Phalguni">Uttara Phalguni</option>
                                                    <option value="Hasta">Hasta</option>
                                                    <option value="Chitra">Chitra</option>
                                                    <option value="Swati">Swati</option>
                                                    <option value="Vishakha">Vishakha</option>
                                                    <option value="Anuradha">Anuradha</option>
                                                    <option value="Jyeshtha">Jyeshtha</option>
                                                    <option value="Mula">Mula</option>
                                                    <option value="Purva Ashadha">Purva Ashadha</option>
                                                    <option value="Uttara Ashadha">Uttara Ashadha</option>
                                                    <option value="Shravana">Shravana</option>
                                                    <option value="Dhanishta">Dhanishta</option>
                                                    <option value="Shatabhisha">Shatabhisha</option>
                                                    <option value="Purva Bhadrapada">Purva Bhadrapada</option>
                                                    <option value="Uttara Bhadrapada">Uttara Bhadrapada</option>
                                                    <option value="Revati">Revati</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Raasi</label>
                                            <div className="criteria-value">
                                                <select name="raasi" value={criteria.raasi} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="">Any</option>
                                                    <option value="Mesham">Mesham (Aries)</option>
                                                    <option value="Rishabam">Rishabam (Taurus)</option>
                                                    <option value="Mithunam">Mithunam (Gemini)</option>
                                                    <option value="Kadagam">Kadagam (Cancer)</option>
                                                    <option value="Simmam">Simmam (Leo)</option>
                                                    <option value="Kanni">Kanni (Virgo)</option>
                                                    <option value="Thulam">Thulam (Libra)</option>
                                                    <option value="Viruchigam">Viruchigam (Scorpio)</option>
                                                    <option value="Dhanusu">Dhanusu (Sagittarius)</option>
                                                    <option value="Magaram">Magaram (Capricorn)</option>
                                                    <option value="Kumbam">Kumbam (Aquarius)</option>
                                                    <option value="Meenam">Meenam (Pisces)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Professional Details */}
                                <div className="criteria-section">
                                    <div className="section-header">
                                        <h3>Professional Details</h3>
                                    </div>
                                    <div className="criteria-table">
                                        <div className="criteria-row">
                                            <label className="criteria-label">Education</label>
                                            <div className="criteria-value">
                                                <select name="education" value={criteria.education} onChange={handleCriteriaChange} className="criteria-select">
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
                                        <div className="criteria-row">
                                            <label className="criteria-label">Occupation</label>
                                            <div className="criteria-value">
                                                <select name="occupation" value={criteria.occupation} onChange={handleCriteriaChange} className="criteria-select">
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
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Employment Type</label>
                                            <div className="criteria-value">
                                                <select name="employmentType" value={criteria.employmentType} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="">Any</option>
                                                    <option value="Private Sector">Private Sector</option>
                                                    <option value="Government/Public Sector">Government/Public Sector</option>
                                                    <option value="Civil Service">Civil Service</option>
                                                    <option value="Business/Self Employed">Business/Self Employed</option>
                                                    <option value="Not Working">Not Working</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Annual Income</label>
                                            <div className="criteria-value">
                                                <select name="income" value={criteria.income} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="Any">Any</option>
                                                    <option value="0-5L">0 - 5 Lakhs</option>
                                                    <option value="5L-10L">5 - 10 Lakhs</option>
                                                    <option value="10L-20L">10 - 20 Lakhs</option>
                                                    <option value="20L-50L">20 - 50 Lakhs</option>
                                                    <option value="50L+">50 Lakhs+</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location Details */}
                                <div className="criteria-section">
                                    <div className="section-header">
                                        <h3>Location Details</h3>
                                    </div>
                                    <div className="criteria-table">
                                        <div className="criteria-row">
                                            <label className="criteria-label">Country</label>
                                            <div className="criteria-value">
                                                <select name="country" value={criteria.country} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="">Any</option>
                                                    <option value="India">India</option>
                                                    <option value="USA">USA</option>
                                                    <option value="UK">UK</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="Australia">Australia</option>
                                                    <option value="UAE">UAE</option>
                                                    <option value="Singapore">Singapore</option>
                                                    <option value="Malaysia">Malaysia</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">State</label>
                                            <div className="criteria-value">
                                                <select name="state" value={criteria.state} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="">Any</option>
                                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                                    <option value="Kerala">Kerala</option>
                                                    <option value="Karnataka">Karnataka</option>
                                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                    <option value="Maharashtra">Maharashtra</option>
                                                    <option value="Delhi">Delhi</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">City</label>
                                            <div className="criteria-value">
                                                <select name="city" value={criteria.city} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="">Any</option>
                                                    <option value="Chennai">Chennai</option>
                                                    <option value="Coimbatore">Coimbatore</option>
                                                    <option value="Madurai">Madurai</option>
                                                    <option value="Trichy">Trichy</option>
                                                    <option value="Salem">Salem</option>
                                                    <option value="Bangalore">Bangalore</option>
                                                    <option value="Mumbai">Mumbai</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Lifestyle */}
                                <div className="criteria-section">
                                    <div className="section-header">
                                        <h3>Lifestyle</h3>
                                    </div>
                                    <div className="criteria-table">
                                        <div className="criteria-row">
                                            <label className="criteria-label">Smoking Habits</label>
                                            <div className="criteria-value">
                                                <select name="smoking" value={criteria.smoking} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="Doesn't Matter">Doesn't Matter</option>
                                                    <option value="Never Smokes">Never Smokes</option>
                                                    <option value="Smokes Occasionally">Smokes Occasionally</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Drinking Habits</label>
                                            <div className="criteria-value">
                                                <select name="drinking" value={criteria.drinking} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="Doesn't Matter">Doesn't Matter</option>
                                                    <option value="Never Drinks">Never Drinks</option>
                                                    <option value="Drinks Occasionally">Drinks Occasionally</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Food Habits</label>
                                            <div className="criteria-value">
                                                <select name="foodHabits" value={criteria.foodHabits} onChange={handleCriteriaChange} className="criteria-select">
                                                    <option value="Doesn't Matter">Doesn't Matter</option>
                                                    <option value="Vegetarian">Vegetarian</option>
                                                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                                                    <option value="Eggetarian">Eggetarian</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom bar */}
                                <div className="criteria-bottom-bar">
                                    <span className="match-count">
                                        <strong>0 match</strong> based on your preferences
                                    </span>
                                    <button className="criteria-search-btn">Search</button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'id' && (
                            <div className="id-search-section">
                                <h2 className="criteria-title">Search by Profile ID</h2>
                                <p className="id-search-desc">Enter the unique Matrimony ID to view a specific member's profile.</p>

                                <div className="id-search-input-wrap">
                                    <input
                                        type="text"
                                        placeholder="Enter Matrimony ID (e.g. SM-A1B2C3)"
                                        value={searchId}
                                        onChange={(e) => { setSearchId(e.target.value.toUpperCase()); setSearchAttempted(false); }}
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleIdSearch(); }}
                                        className="id-search-input"
                                    />
                                    <button className="criteria-search-btn" onClick={handleIdSearch}>
                                        <SearchIcon size={16} /> Search
                                    </button>
                                </div>

                                {searchAttempted && foundProfile && (
                                    <div className="id-result-card">
                                        <div className="id-result-inner">
                                            <div className="id-result-photo">
                                                {foundProfile.image || foundProfile.photo ? (
                                                    <img src={foundProfile.image || foundProfile.photo} alt={foundProfile.fullName} />
                                                ) : (
                                                    <div className="id-result-placeholder">
                                                        <User size={50} color="#9ca3af" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="id-result-info">
                                                <div className="id-result-header">
                                                    <h3>{foundProfile.fullName}</h3>
                                                    <span className="id-badge">{foundProfile.uniqueId}</span>
                                                </div>
                                                {foundProfile.age && <p className="id-result-age">{foundProfile.age} years • {foundProfile.height || 'Height not specified'}</p>}
                                                <div className="id-result-details">
                                                    <div><strong>Religion:</strong> {foundProfile.religion || 'N/A'}</div>
                                                    <div><strong>Caste:</strong> {foundProfile.caste || 'N/A'}</div>
                                                    <div><strong>Education:</strong> {foundProfile.education || 'N/A'}</div>
                                                    <div><strong>Occupation:</strong> {foundProfile.occupation || 'N/A'}</div>
                                                    <div><strong>Location:</strong> {foundProfile.city ? `${foundProfile.city}, ${foundProfile.state || foundProfile.country}` : 'N/A'}</div>
                                                    <div><strong>Income:</strong> {foundProfile.income || 'N/A'}</div>
                                                    <div><strong>Mother Tongue:</strong> {foundProfile.motherTongue || 'N/A'}</div>
                                                    <div><strong>Mobile:</strong> {foundProfile.mobile || 'N/A'}</div>
                                                </div>
                                                <div className="id-result-actions">
                                                    <button className="criteria-search-btn">Send Interest</button>
                                                    <button className="id-shortlist-btn"><Heart size={16} /> Shortlist</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {searchAttempted && !foundProfile && searchId.trim() && (
                                    <div className="id-not-found">
                                        <User size={40} color="#ef4444" />
                                        <h4>Profile Not Found</h4>
                                        <p>No profile found with ID "{searchId}". Please check the ID and try again.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'saved' && (
                            <div className="saved-search-section">
                                <div className="saved-empty">
                                    <Bookmark size={48} color="#9ca3af" />
                                    <h3>No Saved Searches</h3>
                                    <p>Save your search criteria for quick access later.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Search;
