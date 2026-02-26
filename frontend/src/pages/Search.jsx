import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search as SearchIcon, User, Heart, Bookmark } from 'lucide-react';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import { countryStateCityMap } from '../data/locationData';
import './Search.css';

const Search = () => {
    const [activeTab, setActiveTab] = useState('criteria');

    // Multi-select state (arrays) — empty = "Doesn't Matter"
    const [criteria, setCriteria] = useState({
        ageFrom: '18',
        ageTo: '21',
        heightFrom: "5'0\"",
        heightTo: "6'0\"",
        profileCreatedBy: [],
        maritalStatus: [],
        havingChildren: [],
        motherTongue: [],
        physicalStatus: [],
        religion: '',
        section: [],
        caste: [],
        dosham: [],
        star: [],
        raasi: [],
        education: [],
        occupation: [],
        employmentType: [],
        income: [],
        country: [],
        state: [],
        city: [],
        residentialStatus: [],
        smoking: [],
        drinking: [],
        foodHabits: []
    });

    const handleMultiChange = (name, selected) => {
        setCriteria(prev => ({ ...prev, [name]: selected }));
    };

    const handleSingleChange = (e) => {
        const { name, value } = e.target;
        setCriteria(prev => ({ ...prev, [name]: value }));
    };

    // When religion changes, reset section/caste
    const handleReligionChange = (e) => {
        const value = e.target.value;
        setCriteria(prev => ({ ...prev, religion: value, section: [], caste: [] }));
    };

    const religionCasteMap = {
        'Hindu': ['Brahmin', 'Gounder', 'Vanniyar', 'Thevar', 'Nadar', 'Chettiar', 'Yadav', 'Mudaliar', 'Naidu', 'Pillai', 'Reddy', 'Viswakarma', 'SC/ST', 'Caste No Bar'],
        'Muslim': ['Sunni', 'Shia', 'Pathan', 'Syed', 'Sheikh', 'Lebbai', 'Maraicar', 'Rowther', 'Mapila', 'Caste No Bar'],
        'Christian': ['Roman Catholic', 'Protestant', 'Pentecost', 'CSI', 'Latin Catholic', 'Syrian Catholic', 'Caste No Bar'],
        'Sikh': ['Jat', 'Ramgarhia', 'Ramdasia', 'Arora', 'Khatri', 'Caste No Bar'],
        'Jain': ['Shwetamber', 'Digamber', 'Caste No Bar'],
        'Buddhist': ['Neo Buddhist', 'Caste No Bar'],
        'Inter-Religion': ['Caste No Bar']
    };

    const religionSectionMap = {
        'Hindu': ['Saiva', 'Vaishnava', 'Smartha', 'Srivaishnava', 'Others'],
        'Muslim': ['Sunni', 'Shia', 'Others'],
        'Christian': ['Catholic', 'Protestant', 'Orthodox', 'Others'],
        'Sikh': ['Others'],
        'Jain': ['Others'],
        'Buddhist': ['Others'],
        'Inter-Religion': ['Others']
    };

    const casteOptionsForReligion = criteria.religion ? (religionCasteMap[criteria.religion] || []) : [];
    const sectionOptionsForReligion = criteria.religion ? (religionSectionMap[criteria.religion] || []) : [];

    const allCountries = Object.keys(countryStateCityMap);

    // States based on selected countries (or all if none selected)
    const activeCountries = criteria.country.length > 0 ? criteria.country : allCountries;
    let availableStates = [];
    activeCountries.forEach(c => {
        if (countryStateCityMap[c]) {
            availableStates.push(...Object.keys(countryStateCityMap[c]));
        }
    });
    availableStates = [...new Set(availableStates)];

    // Cities based on selected states
    let availableCities = [];
    if (criteria.state.length > 0) {
        criteria.state.forEach(s => {
            activeCountries.forEach(c => {
                if (countryStateCityMap[c] && countryStateCityMap[c][s]) {
                    availableCities.push(...countryStateCityMap[c][s]);
                }
            });
        });
    } else if (criteria.country.length > 0) {
        // If country selected but no state, show all cities for selected countries
        criteria.country.forEach(c => {
            if (countryStateCityMap[c]) {
                Object.values(countryStateCityMap[c]).forEach(cities => {
                    availableCities.push(...cities);
                });
            }
        });
    }
    availableCities = [...new Set(availableCities)];

    const isIndiaSelected = criteria.country.includes('India');
    const isOtherSelected = criteria.country.some(c => c !== 'India');
    const isNoCountrySelected = criteria.country.length === 0;

    const showStateCity = isIndiaSelected;
    const showResidentialStatus = isOtherSelected || isNoCountrySelected;

    // Option lists for each dropdown (no "Any" / "Doesn't Matter" — that's the default display when nothing selected)
    const optionLists = {
        profileCreatedBy: ['Self', 'Parents', 'Sibling', 'Friend', 'Relative', 'Others'],
        maritalStatus: ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'],
        havingChildren: ['No', 'Yes'],
        motherTongue: ['Tamil', 'English', 'Telugu', 'Hindi', 'Malayalam', 'Kannada', 'Marathi', 'Bengali', 'Gujarati', 'Urdu', 'Punjabi', 'Odia'],
        physicalStatus: ['Normal', 'Physically Challenged'],
        religion: ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist', 'Inter-Religion'],
        caste: ['Brahmin', 'Gounder', 'Vanniyar', 'Thevar', 'Nadar', 'Chettiar', 'Yadav', 'Mudaliar', 'Naidu', 'Pillai', 'Reddy', 'Viswakarma', 'SC/ST', 'Caste No Bar'],
        subCaste: [],
        dosham: ['Yes', 'No'],
        star: ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'],
        raasi: ['Mesham (Aries)', 'Rishabam (Taurus)', 'Mithunam (Gemini)', 'Kadagam (Cancer)', 'Simmam (Leo)', 'Kanni (Virgo)', 'Thulam (Libra)', 'Viruchigam (Scorpio)', 'Dhanusu (Sagittarius)', 'Magaram (Capricorn)', 'Kumbam (Aquarius)', 'Meenam (Pisces)'],
        education: [
            "B.E/B.Tech", "B.Pharma", "M.E/M.Tech", "M.Pharma", "M.S. (Engineering)", "B.Arch", "M.Arch", "B.Des", "M.Des", "B.FAD", "B.FTech", "BID", "B.Tech LL.B.", "M.FTech", "MID", "MIB", "M.Plan", "MPH", "A.M.E.", "CISE", "ITIL",
            "MBA/PGDM", "BBA", "BHM", "BAM", "BBM", "BFM", "BFT", "B.H.A.", "BHMCT", "BHMTT", "BMS", "MAM", "MHA", "MMS", "MMM", "MTM", "MTA", "MHRM", "MBM", "Executive MBA", "CWM",
            "MBBS", "M.D.", "BAMS", "BHMS", "BDS", "M.S. (Medicine)", "MVSc.", "BVSc.", "MDS", "BPT", "MPT", "DM", "MCh", "BCVT", "BMLT", "BMRIT", "BMRT", "BNYS", "BOT", "B.O.Th", "BOPTM", "BPMT", "B.P.Ed", "B.P.E.S",
            "MCA", "BCA", "B.IT", "MCM", "PGDCA", "DCA", "ADCA",
            "B.Com", "CA", "CS", "ICWA", "M.Com", "CFA", "BBI", "BBE", "B.Com (Hons)", "MBE", "MBF", "MFC",
            "B.A", "B.Sc", "M.A", "M.Sc", "B.Ed", "M.Ed", "MSW", "BFA", "MFA", "BJMC", "MJMC", "B.Agri", "B.A. (Hons)", "BCT & CA", "B.El.Ed", "B.F.Sc.", "B.J", "B.Lib.I.Sc.", "B.Lib.Sc", "B.Litt", "ETT", "TTC", "P.P.T.T.C",
            "PhD", "M.Phil", "LL.D.", "D.Litt", "Pharm.D", "FPM",
            "Diploma/Certificate", "Class XII", "Trade School", "Class X or Below",
            "Other"
        ],
        occupation: ["Software Professional", "Manager", "Engineer", "Doctor", "Teacher", "Banker", "Civil Services", "Business Owner", "Accountant", "Administrator", "Architect", "Consultant", "Designer", "Lawyer", "Marketing Professional", "Pharmacist", "Sales Professional", "Writer/Editor", "Other"],
        employmentType: ["Private Sector", "Government/Public Sector", "Civil Service", "Defense", "Business/Self Employed", "Not Working", "Student", "Retired", "Other"],
        income: ['No Income', '0 - 1 Lakh', '1 - 3 Lakhs', '3 - 5 Lakhs', '5 - 7 Lakhs', '7 - 10 Lakhs', '10 - 15 Lakhs', '15 - 20 Lakhs', '20 - 30 Lakhs', '30 Lakhs and above'],
        country: allCountries,
        state: availableStates,
        city: availableCities,
        residentialStatus: ['Citizenship', 'Permanent Resident', 'Work Permit', 'Student Visa', 'Temporary Visa'],
        smoking: ['No', 'Occasionally', 'Regularly'],
        drinking: ['No', 'Occasionally', 'Regularly'],
        foodHabits: ['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan']
    };

    const placeholderMap = {
        profileCreatedBy: 'Search Profile created by',
        maritalStatus: 'Search Marital status',
        havingChildren: 'Search',
        motherTongue: 'Search Mother tongue',
        physicalStatus: 'Search Physical status',
        religion: 'Search Religion',
        section: 'Search Section',
        caste: 'Search Caste',
        dosham: 'Search Dosham',
        star: 'Search Star',
        raasi: 'Search Raasi',
        education: 'Search Higher education',
        occupation: 'Search Occupation',
        employmentType: 'Search Employment type',
        income: 'Search Annual income',
        country: 'Search Country',
        state: 'Search State',
        city: 'Search City',
        residentialStatus: 'Search Residential status',
        smoking: 'Search Smoking habits',
        drinking: 'Search Drinking habits',
        foodHabits: 'Search Food habits'
    };

    const [searchId, setSearchId] = useState('');
    const [foundProfile, setFoundProfile] = useState(null);
    const [searchAttempted, setSearchAttempted] = useState(false);

    const getCurrentUserSnapshot = () => {
        const uniqueId = localStorage.getItem('uniqueId') || '';
        const saved = JSON.parse(localStorage.getItem('userProfile') || '{}');
        return {
            uniqueId,
            fullName: saved.fullName || 'Member',
            photo: saved.photo || saved.image || '',
            city: saved.city || '',
            state: saved.state || '',
            country: saved.country || '',
        };
    };

    const trackProfileView = (viewedProfile) => {
        if (!viewedProfile?.uniqueId) return;
        const viewer = getCurrentUserSnapshot();
        if (!viewer.uniqueId || viewer.uniqueId === viewedProfile.uniqueId) return;

        const viewed = {
            uniqueId: viewedProfile.uniqueId,
            fullName: viewedProfile.fullName || 'Member',
            photo: viewedProfile.photo || viewedProfile.image || '',
            city: viewedProfile.city || '',
            state: viewedProfile.state || '',
            country: viewedProfile.country || '',
        };

        const events = JSON.parse(localStorage.getItem('profileViewEvents') || '[]');
        const newEvent = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            type: 'profile_view',
            viewedAt: new Date().toISOString(),
            viewer,
            viewed,
        };
        localStorage.setItem('profileViewEvents', JSON.stringify([newEvent, ...events].slice(0, 500)));
    };

    const dummyProfiles = [
        {
            id: 1, uniqueId: "SM-A1B2C3", fullName: "Priya Sharma", age: 26, height: "5'4\"",
            religion: "Hindu", caste: "Brahmin", country: "India", state: "Maharashtra", city: "Mumbai",
            education: "MBA", occupation: "Marketing Manager", income: "10 - 15 Lakhs",
            motherTongue: "Hindi", mobile: "9876543210",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2, uniqueId: "SM-D4E5F6", fullName: "Anjali Gupta", age: 24, height: "5'6\"",
            religion: "Hindu", caste: "Baniya", country: "India", state: "Delhi", city: "New Delhi",
            education: "B.Tech", occupation: "Software Engineer", income: "15 - 20 Lakhs",
            motherTongue: "Hindi", mobile: "9876543211",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
    ];

    const getAllProfiles = () => {
        const registered = JSON.parse(localStorage.getItem('registeredProfiles') || '[]');
        return [...dummyProfiles, ...registered];
    };

    const handleIdSearch = () => {
        setSearchAttempted(true);
        if (!searchId.trim()) { setFoundProfile(null); return; }
        const allProfiles = getAllProfiles();
        const found = allProfiles.find(p => p.uniqueId && p.uniqueId.toLowerCase() === searchId.trim().toLowerCase());
        setFoundProfile(found || null);
        if (found) {
            trackProfileView(found);
        }
    };

    const ageOptions = [];
    for (let i = 18; i <= 70; i++) ageOptions.push(i);

    const heightOptions = [
        "4'5\"", "4'6\"", "4'7\"", "4'8\"", "4'9\"", "4'10\"", "4'11\"",
        "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"",
        "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\"", "6'7\"", "6'8\"", "6'9\"",
        "7'0\""
    ];

    // Helper to render a multi-select row
    const renderMultiRow = (label, name) => (
        <div className="criteria-row">
            <label className="criteria-label">{label}</label>
            <div className="criteria-value">
                <MultiSelectDropdown
                    options={optionLists[name]}
                    selected={criteria[name]}
                    onChange={(sel) => handleMultiChange(name, sel)}
                    placeholder={placeholderMap[name]}
                />
            </div>
        </div>
    );

    return (
        <div className="search-page">
            <Navbar />
            <div className="search-container">
                <div className="search-panel">
                    {/* Tabs */}
                    <div className="search-tabs">
                        <button className={`search-tab ${activeTab === 'criteria' ? 'active' : ''}`} onClick={() => setActiveTab('criteria')}>By Criteria</button>
                        <button className={`search-tab ${activeTab === 'id' ? 'active' : ''}`} onClick={() => { setActiveTab('id'); setFoundProfile(null); setSearchAttempted(false); }}>By Profile ID</button>
                        <button className={`search-tab ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>Saved Search <span className="saved-count">0</span></button>
                    </div>

                    {/* Content */}
                    <div className="search-content">
                        {activeTab === 'criteria' && (
                            <div className="criteria-search">
                                <h2 className="criteria-title">Search profiles using the below criteria</h2>

                                {/* Basic Details */}
                                <div className="criteria-section">
                                    <div className="section-header"><h3>Basic Details</h3></div>
                                    <div className="criteria-table">
                                        <div className="criteria-row">
                                            <label className="criteria-label">Age</label>
                                            <div className="criteria-value">
                                                <select name="ageFrom" value={criteria.ageFrom} onChange={handleSingleChange} className="criteria-select criteria-select-sm">
                                                    {ageOptions.map(a => <option key={`af-${a}`} value={a}>{a}</option>)}
                                                </select>
                                                <span className="criteria-to">to</span>
                                                <select name="ageTo" value={criteria.ageTo} onChange={handleSingleChange} className="criteria-select criteria-select-sm">
                                                    {ageOptions.map(a => <option key={`at-${a}`} value={a}>{a}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criteria-row">
                                            <label className="criteria-label">Height</label>
                                            <div className="criteria-value">
                                                <select name="heightFrom" value={criteria.heightFrom} onChange={handleSingleChange} className="criteria-select criteria-select-sm">
                                                    {heightOptions.map(h => <option key={`hf-${h}`} value={h}>{h}</option>)}
                                                </select>
                                                <span className="criteria-to">to</span>
                                                <select name="heightTo" value={criteria.heightTo} onChange={handleSingleChange} className="criteria-select criteria-select-sm">
                                                    {heightOptions.map(h => <option key={`ht-${h}`} value={h}>{h}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        {renderMultiRow('Profile Created By', 'profileCreatedBy')}
                                        {renderMultiRow('Marital Status', 'maritalStatus')}
                                        {!(criteria.maritalStatus.length === 1 && criteria.maritalStatus.includes('Never Married')) && renderMultiRow('Having Children', 'havingChildren')}
                                        {renderMultiRow('Mother Tongue', 'motherTongue')}
                                        {renderMultiRow('Physical Status', 'physicalStatus')}
                                    </div>
                                </div>

                                {/* Religious Details */}
                                <div className="criteria-section">
                                    <div className="section-header"><h3>Religious Details</h3></div>
                                    <div className="criteria-table">
                                        <div className="criteria-row">
                                            <label className="criteria-label">Religion</label>
                                            <div className="criteria-value">
                                                <select name="religion" value={criteria.religion} onChange={handleReligionChange} className="criteria-select">
                                                    <option value="">Doesn't Matter</option>
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
                                        {criteria.religion && (
                                            <div className="criteria-row">
                                                <label className="criteria-label">Section</label>
                                                <div className="criteria-value">
                                                    <MultiSelectDropdown
                                                        options={sectionOptionsForReligion}
                                                        selected={criteria.section}
                                                        onChange={(sel) => handleMultiChange('section', sel)}
                                                        placeholder="Search Section"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {criteria.religion && (
                                            <div className="criteria-row">
                                                <label className="criteria-label">Caste</label>
                                                <div className="criteria-value">
                                                    <MultiSelectDropdown
                                                        options={casteOptionsForReligion}
                                                        selected={criteria.caste}
                                                        onChange={(sel) => handleMultiChange('caste', sel)}
                                                        placeholder="Search Caste"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Horoscope Details */}
                                <div className="criteria-section">
                                    <div className="section-header"><h3>Horoscope Details</h3></div>
                                    <div className="criteria-table">
                                        {renderMultiRow('Horoscope', 'raasi')}
                                    </div>
                                </div>

                                {/* Professional Details */}
                                <div className="criteria-section">
                                    <div className="section-header"><h3>Professional Details</h3></div>
                                    <div className="criteria-table">
                                        {renderMultiRow('Higher Education', 'education')}
                                        {renderMultiRow('Occupation', 'occupation')}
                                        {renderMultiRow('Employment Type', 'employmentType')}
                                        {renderMultiRow('Annual Income', 'income')}
                                    </div>
                                </div>

                                {/* Location Details */}
                                <div className="criteria-section">
                                    <div className="section-header"><h3>Location Details</h3></div>
                                    <div className="criteria-table">
                                        {renderMultiRow('Country', 'country')}
                                        {showStateCity && renderMultiRow('State', 'state')}
                                        {showStateCity && renderMultiRow('City', 'city')}
                                        {showResidentialStatus && renderMultiRow('Residential Status', 'residentialStatus')}
                                    </div>
                                </div>

                                {/* Lifestyle */}
                                <div className="criteria-section">
                                    <div className="section-header"><h3>Lifestyle</h3></div>
                                    <div className="criteria-table">
                                        {renderMultiRow('Smoking Habits', 'smoking')}
                                        {renderMultiRow('Drinking Habits', 'drinking')}
                                        {renderMultiRow('Food Habits', 'foodHabits')}
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
                                    <input type="text" placeholder="Enter Matrimony ID (e.g. SM-A1B2C3)" value={searchId}
                                        onChange={(e) => { setSearchId(e.target.value.toUpperCase()); setSearchAttempted(false); }}
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleIdSearch(); }}
                                        className="id-search-input" />
                                    <button className="criteria-search-btn" onClick={handleIdSearch}><SearchIcon size={16} /> Search</button>
                                </div>

                                {searchAttempted && foundProfile && (
                                    <div className="id-result-card">
                                        <div className="id-result-inner">
                                            <div className="id-result-photo">
                                                {foundProfile.image || foundProfile.photo ? (
                                                    <img src={foundProfile.image || foundProfile.photo} alt={foundProfile.fullName} />
                                                ) : (
                                                    <div className="id-result-placeholder"><User size={50} color="#9ca3af" /></div>
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
