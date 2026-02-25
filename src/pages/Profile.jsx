import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { User, LogOut, Edit2, X, Save, Camera, Eye, MapPin, Briefcase, GraduationCap, Heart, Calendar, Ruler, Globe2, BadgeCheck, Users, Cigarette, Wine, ChevronRight, MoreVertical, ArrowLeft, Plus, Maximize2, Trash2, Image, Search, Settings, Utensils, Puzzle, Zap, Languages, Music, MessagesSquare, ChefHat, Shirt } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Profile.css';
import { getCountries, getStates, getCities, getCastes, getSects } from '../data/locationData';

const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('about');
    const [editingSection, setEditingSection] = useState(null);
    const [showPhotoManager, setShowPhotoManager] = useState(false);
    const [photoMenuIndex, setPhotoMenuIndex] = useState(null);
    const [fullViewPhoto, setFullViewPhoto] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [dropdownSearchTerm, setDropdownSearchTerm] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showIncomeModal, setShowIncomeModal] = useState(false);
    const [incomeSearchTerm, setIncomeSearchTerm] = useState('');

    useEffect(() => {
        if (location.state?.openPreferences) {
            setActiveTab('looking');
        }
    }, [location]);

    const uniqueId = localStorage.getItem('uniqueId') || 'MEM-12345';

    const [profileData, setProfileData] = useState({
        uniqueId: uniqueId,
        fullName: 'Member Name',
        gender: '',
        dob: '',
        mobile: '',
        email: '',
        alternateMobile: '',
        isdCode: '+91',
        altIsdCode: '+91',
        mobilePrivacy: 'Visible to all paid members',
        religion: '',
        caste: '',
        horoscope: '',
        motherTongue: '',
        country: 'India',
        state: '',
        city: '',
        education: '',
        occupation: '',
        employmentType: '',
        currency: 'INR',
        income: '',
        height: '',
        maritalStatus: 'Never Married',
        smoking: '',
        drinking: '',
        physicalStatus: 'Normal',
        partnerPreference: '',
        about: '',
        profileFor: 'Self',
        photo: '',
        additionalPhotos: ['', '', ''],
        fatherOccupation: '',
        motherOccupation: '',
        numberOfBrothers: '',
        marriedBrothers: '',
        numberOfSisters: '',
        marriedSisters: '',
        familyStatus: '',
        familyType: '',
        familyIncome: '',
        livingWithParents: '',
        familyCountry: 'India',
        familyState: '',
        familyCity: '',
        organizationName: '',
        settlingAbroad: '',
    });

    const [preferenceData, setPreferenceData] = useState({
        prefAgeFrom: '18',
        prefAgeTo: '30',
        prefHeightFrom: '',
        prefHeightTo: '',
        prefReligion: '',
        prefCaste: '',
        prefEducation: '',
        prefOccupation: '',
        prefMaritalStatus: '',
        prefCountry: '',
        prefState: '',
        prefCity: '',
        prefMotherTongue: '',
        prefPhysicalStatus: '',
        prefEmploymentType: '',
    });

    const [editForm, setEditForm] = useState({});
    const [prefForm, setPrefForm] = useState({});
    const [isEditingPreference, setIsEditingPreference] = useState(false);

    const occupations = ["Software Professional", "Manager", "Engineer", "Doctor", "Teacher", "Banker", "Civil Services", "Business Owner", "Actor/Model", "Other"];
    const currencies = ["INR", "USD", "EUR", "GBP", "AED", "SGD", "MYR", "LKR"];
    const languages = ["Tamil", "English", "Telugu", "Malayalam", "Kannada", "Hindi", "Marathi", "Bengali", "Gujarati", "Urdu", "Punjabi", "Odia"];
    const horoscopes = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = '/';
        } else {
            const savedProfile = localStorage.getItem('userProfile');
            if (savedProfile) {
                try {
                    const parsedProfile = JSON.parse(savedProfile);
                    setProfileData(prev => ({ ...prev, ...parsedProfile }));
                } catch (e) {
                    console.error("Error parsing user profile", e);
                }
                const savedPrefs = localStorage.getItem('userPreferences');
                if (savedPrefs) {
                    try { setPreferenceData(prev => ({ ...prev, ...JSON.parse(savedPrefs) })); } catch (e) { }
                }
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('uniqueId');
        localStorage.removeItem('userProfile');
        navigate('/');
    };

    const handleEditSection = (section) => {
        setEditForm({ ...profileData });
        setEditingSection(section);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name === 'religion') {
            setEditForm(prev => ({ ...prev, religion: value, caste: '', sect: '' }));
        } else if (name === 'country') {
            setEditForm(prev => ({ ...prev, country: value, state: '', city: '' }));
        } else if (name === 'state') {
            setEditForm(prev => ({ ...prev, state: value, city: '' }));
        } else {
            setEditForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddPhoto = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        try {
            for (const file of files) {
                const base64 = await convertFileToBase64(file);
                setProfileData(prev => {
                    const currentPhotos = prev.additionalPhotos ? prev.additionalPhotos.filter(p => p) : [];
                    const newPhoto = base64;
                    // If no main photo, set first upload as main
                    const updatedMain = prev.photo || newPhoto;
                    const updatedAdditional = prev.photo ? [...currentPhotos, newPhoto] : currentPhotos;
                    const updated = { ...prev, photo: updatedMain, additionalPhotos: updatedAdditional };
                    localStorage.setItem('userProfile', JSON.stringify(updated));
                    return updated;
                });
            }
        } catch (error) {
            console.error("Error converting file", error);
        }
        e.target.value = '';
    };

    const handleSetAsProfile = (photoSrc) => {
        setProfileData(prev => {
            // Swap: current profile photo goes back to additional, selected becomes profile
            let additionalPhotos = prev.additionalPhotos ? prev.additionalPhotos.filter(p => p && p !== photoSrc) : [];
            if (prev.photo) {
                additionalPhotos = [...additionalPhotos, prev.photo];
            }
            // Remove duplicates
            additionalPhotos = [...new Set(additionalPhotos)];
            const updated = { ...prev, photo: photoSrc, additionalPhotos };
            localStorage.setItem('userProfile', JSON.stringify(updated));
            return updated;
        });
        setPhotoMenuIndex(null);
    };

    const handleDeletePhoto = (photoSrc, isMain) => {
        setProfileData(prev => {
            let updated;
            if (isMain) {
                // If deleting main, promote first additional to main
                const additional = prev.additionalPhotos ? prev.additionalPhotos.filter(p => p) : [];
                updated = { ...prev, photo: additional[0] || '', additionalPhotos: additional.slice(1) };
            } else {
                const additional = prev.additionalPhotos ? prev.additionalPhotos.filter(p => p && p !== photoSrc) : [];
                updated = { ...prev, additionalPhotos: additional };
            }
            localStorage.setItem('userProfile', JSON.stringify(updated));
            return updated;
        });
        setPhotoMenuIndex(null);
    };

    const togglePhotoMenu = (index) => {
        setPhotoMenuIndex(photoMenuIndex === index ? null : index);
    };

    // Get all photos for display
    const getAllPhotos = () => {
        const photos = [];
        if (profileData.photo) photos.push({ src: profileData.photo, isMain: true });
        if (profileData.additionalPhotos) {
            profileData.additionalPhotos.filter(p => p).forEach(p => photos.push({ src: p, isMain: false }));
        }
        return photos;
    };

    const validateMobile = (isd, number) => {
        if (!number) return false;
        const cleaned = number.replace(/\D/g, '');
        if (isd === '+91' || isd === '+1') {
            return cleaned.length === 10;
        }
        if (isd === '+44') {
            return cleaned.length === 10 || cleaned.length === 11;
        }
        return cleaned.length >= 7 && cleaned.length <= 15;
    };

    const handleSaveSection = () => {
        if (editingSection === 'contact') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (editForm.email && !emailRegex.test(editForm.email)) {
                setEmailError('Please provide a valid email ID.');
                return;
            }
            if (!validateMobile(editForm.isdCode || '+91', editForm.mobile)) {
                setMobileError('Incorrect phone number. Please check the number.');
                return;
            }
        }
        setEmailError('');
        setMobileError('');
        setProfileData(editForm);
        localStorage.setItem('userProfile', JSON.stringify(editForm));
        setEditingSection(null);
    };

    const handleEditPreferenceClick = () => {
        setPrefForm({ ...preferenceData });
        setIsEditingPreference(true);
    };

    const handlePrefFormChange = (e) => {
        const { name, value } = e.target;
        if (name === 'prefReligion') {
            setPrefForm(prev => ({ ...prev, prefReligion: value, prefCaste: '' }));
        } else if (name === 'prefCountry') {
            setPrefForm(prev => ({ ...prev, prefCountry: value, prefState: '', prefCity: '' }));
        } else if (name === 'prefState') {
            setPrefForm(prev => ({ ...prev, prefState: value, prefCity: '' }));
        } else {
            setPrefForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePrefSave = () => {
        setPreferenceData(prefForm);
        localStorage.setItem('userPreferences', JSON.stringify(prefForm));
        setIsEditingPreference(false);
    };

    const calculateCompletion = () => {
        const fields = [
            'fullName', 'gender', 'dob', 'mobile', 'email',
            'religion', 'caste', 'country', 'state', 'city',
            'education', 'occupation', 'income', 'height', 'motherTongue',
            'photo', 'horoscope', 'about', 'employmentType'
        ];
        let completed = 0;
        fields.forEach(field => {
            const value = profileData[field];
            if (value && value !== 'Not Specified' && value !== '') {
                completed++;
            }
        });
        return Math.round((completed / fields.length) * 100);
    };

    const completionPercentage = calculateCompletion();

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Not specified';
        const date = new Date(dateStr);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const getLocationString = () => {
        const parts = [profileData.city, profileData.state, profileData.country].filter(Boolean);
        return parts.length > 0 ? parts.join(', ') : 'Not specified';
    };

    // Section edit modal renderer
    const renderSectionModal = () => {
        if (!editingSection) return null;

        // Full-page editor for basic section
        if (editingSection === 'basic') {
            const maritalOptions = ['Never Married', 'Awaiting Divorce', 'Divorced', 'Widowed', 'Annulled', 'Married'];
            const locationStr = [editForm.country, editForm.state, editForm.city].filter(Boolean).join(', ');
            const formatDob = (dob) => {
                if (!dob) return '';
                const d = new Date(dob);
                if (isNaN(d.getTime())) return dob;
                return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            };

            return (
                <div className="bd-overlay">
                    <div className="bd-container">
                        <div className="bd-header">
                            <button className="bd-back-btn" onClick={() => setEditingSection(null)}>
                                <ArrowLeft size={22} />
                            </button>
                            <div className="bd-header-text">
                                <h2 className="bd-title">Basic Details</h2>
                                <p className="bd-subtitle">Update these details to get suitable matches</p>
                            </div>
                        </div>

                        <div className="bd-fields">
                            {/* Name */}
                            <div className="bd-field">
                                <span className="bd-label">Name</span>
                                <input type="text" className="bd-value-input" name="fullName" value={editForm.fullName || ''} onChange={handleFormChange} />
                            </div>

                            <label className="bd-checkbox">
                                <input type="checkbox" defaultChecked />
                                <span className="bd-checkbox-mark"></span>
                                <div>
                                    <span className="bd-checkbox-text">Show my name to all</span>
                                    <p className="bd-checkbox-note">If you uncheck, you won't be able to see the name of other members</p>
                                </div>
                            </label>

                            {/* Gender */}
                            <div className="bd-field" style={{ cursor: 'pointer' }} onClick={() => setActiveDropdown({ title: 'Gender', field: 'gender', options: ['Male', 'Female'] })}>
                                <span className="bd-label">Gender</span>
                                <div className="bd-field-row">
                                    <span className="bd-value">{editForm.gender || 'Not specified'}</span>
                                    <ChevronRight size={18} color="#9ca3af" />
                                </div>
                            </div>

                            {/* Date of Birth */}
                            <div className="bd-field">
                                <span className="bd-label">Date of Birth</span>
                                <span className="bd-value">{formatDob(editForm.dob) || 'Not specified'}</span>
                            </div>

                            {/* Marital Status */}
                            <div className="bd-field bd-field-no-border">
                                <span className="bd-label">Marital Status</span>
                                <div className="bd-chips">
                                    {maritalOptions.map(opt => (
                                        <button
                                            key={opt}
                                            className={`bd-chip ${editForm.maritalStatus === opt ? 'active' : ''}`}
                                            onClick={() => setEditForm(prev => ({ ...prev, maritalStatus: opt }))}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Height */}
                            <div className="bd-field" style={{ cursor: 'pointer' }} onClick={() => setActiveDropdown({ title: 'Height', field: 'height', options: ["4ft 5in (134 cm)", "4ft 6in (137 cm)", "4ft 7in (139 cm)", "4ft 8in (142 cm)", "4ft 9in (144 cm)", "4ft 10in (147 cm)", "4ft 11in (149 cm)", "5ft (152 cm)", "5ft 1in (154 cm)", "5ft 2in (157 cm)", "5ft 3in (160 cm)", "5ft 4in (162 cm)", "5ft 5in (165 cm)", "5ft 6in (167 cm)", "5ft 7in (170 cm)", "5ft 8in (172 cm)", "5ft 9in (175 cm)", "5ft 10in (177 cm)", "5ft 11in (180 cm)", "6ft (182 cm)", "6ft 1in (185 cm)", "6ft 2in (187 cm)"] })}>
                                <span className="bd-label">Height</span>
                                <div className="bd-field-row">
                                    <span className="bd-value">{editForm.height || 'Select Height'}</span>
                                    <ChevronRight size={18} color="#9ca3af" />
                                </div>
                            </div>

                            {/* Religion */}
                            <div className="bd-field" style={{ cursor: 'pointer' }} onClick={() => setActiveDropdown({ title: 'Religion', field: 'religion', options: ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist"] })}>
                                <span className="bd-label">Religion</span>
                                <div className="bd-field-row">
                                    <span className="bd-value">{editForm.religion || 'Select Religion'}</span>
                                    <ChevronRight size={18} color="#9ca3af" />
                                </div>
                            </div>

                            {/* Sect */}
                            {editForm.religion && (
                                <div className="bd-field" style={{ cursor: 'pointer' }} onClick={() => setActiveDropdown({ title: 'Sect', field: 'sect', options: getSects(editForm.religion) })}>
                                    <span className="bd-label">Sect</span>
                                    <div className="bd-field-row">
                                        <span className="bd-value">{editForm.sect || 'Select Sect'}</span>
                                        <ChevronRight size={18} color="#9ca3af" />
                                    </div>
                                </div>
                            )}

                            {/* Caste */}
                            {editForm.religion && (
                                <div className="bd-field" style={{ cursor: 'pointer' }} onClick={() => setActiveDropdown({ title: 'Caste', field: 'caste', options: getCastes(editForm.religion) })}>
                                    <span className="bd-label">Caste</span>
                                    <div className="bd-field-row">
                                        <span className="bd-value">{editForm.caste || 'Select Caste'}</span>
                                        <ChevronRight size={18} color="#9ca3af" />
                                    </div>
                                </div>
                            )}

                            {/* Mother Tongue */}
                            <div className="bd-field" style={{ cursor: 'pointer' }} onClick={() => setActiveDropdown({ title: 'Mother Tongue', field: 'motherTongue', options: languages })}>
                                <span className="bd-label">Mother Tongue</span>
                                <div className="bd-field-row">
                                    <span className="bd-value">{editForm.motherTongue || 'Select Language'}</span>
                                    <ChevronRight size={18} color="#9ca3af" />
                                </div>
                            </div>

                            {/* Current Location */}
                            <div className="bd-field bd-field-no-border">
                                <span className="bd-label" style={{ marginBottom: '10px' }}>Current Location</span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div className="bd-field-row" onClick={() => setActiveDropdown({ title: 'Country', field: 'country', options: getCountries() })} style={{ padding: '14px', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>
                                        <span className="bd-value" style={{ flex: 1, color: editForm.country ? '#1a2a3a' : '#9ca3af' }}>{editForm.country || 'Country'}</span>
                                        <ChevronRight size={18} color="#9ca3af" />
                                    </div>
                                    <div className="bd-field-row" onClick={() => editForm.country && setActiveDropdown({ title: 'State', field: 'state', options: getStates(editForm.country) })} style={{ padding: '14px', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: editForm.country ? 'pointer' : 'not-allowed', opacity: editForm.country ? 1 : 0.6 }}>
                                        <span className="bd-value" style={{ flex: 1, color: editForm.state ? '#1a2a3a' : '#9ca3af' }}>{editForm.state || 'State'}</span>
                                        <ChevronRight size={18} color="#9ca3af" />
                                    </div>
                                    <div className="bd-field-row" onClick={() => editForm.state && setActiveDropdown({ title: 'City', field: 'city', options: getCities(editForm.country, editForm.state) })} style={{ padding: '14px', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: editForm.state ? 'pointer' : 'not-allowed', opacity: editForm.state ? 1 : 0.6 }}>
                                        <span className="bd-value" style={{ flex: 1, color: editForm.city ? '#1a2a3a' : '#9ca3af' }}>{editForm.city || 'City'}</span>
                                        <ChevronRight size={18} color="#9ca3af" />
                                    </div>
                                </div>
                            </div>

                            {/* Annual Income */}
                            <div className="bd-field">
                                <span className="bd-label">Annual Income</span>
                                <div className="bd-field-row" onClick={() => setShowIncomeModal(true)} style={{ cursor: 'pointer' }}>
                                    <span className="bd-value">{editForm.income || 'Select Income'}</span>
                                    <ChevronRight size={18} color="#9ca3af" />
                                </div>
                            </div>
                        </div>

                        <div className="bd-save-area">
                            <button className="bd-save-btn" onClick={handleSaveSection}>Save</button>
                        </div>
                    </div>

                    {showIncomeModal && (
                        <div className="bd-income-modal">
                            <div className="bd-income-modal-inner">
                                <h3 className="bd-income-modal-title">
                                    <button className="bd-income-modal-close" onClick={() => setShowIncomeModal(false)}>
                                        <ArrowLeft size={22} />
                                    </button>
                                    Annual Income
                                </h3>
                                <div className="bd-income-search">
                                    <input
                                        type="text"
                                        placeholder="Type to search"
                                        value={incomeSearchTerm}
                                        onChange={(e) => setIncomeSearchTerm(e.target.value)}
                                    />
                                    <Search size={20} />
                                </div>
                                <div className="bd-income-list">
                                    {[
                                        "No Income", "Rs. 0 - 1 Lakh", "Rs. 1 - 2 Lakh", "Rs. 2 - 3 Lakh",
                                        "Rs. 3 - 4 Lakh", "Rs. 4 - 5 Lakh", "Rs. 5 - 7.5 Lakh", "Rs. 7.5 - 10 Lakh",
                                        "Rs. 10 - 15 Lakh", "Rs. 15 - 20 Lakh", "Rs. 20 - 30 Lakh", "Rs. 30 - 50 Lakh",
                                        "Rs. 50 - 75 Lakh", "Rs. 75 - 1 Crore", "Rs. 1 Crore & Above"
                                    ].filter(inc => inc.toLowerCase().includes(incomeSearchTerm.toLowerCase())).map(incomeStr => (
                                        <label key={incomeStr} className={`bd-income-option ${editForm.income === incomeStr ? 'selected' : ''}`} onClick={() => {
                                            setEditForm(prev => ({ ...prev, income: incomeStr }));
                                            setShowIncomeModal(false);
                                            setIncomeSearchTerm('');
                                        }}>
                                            <div className="bd-income-radio"></div>
                                            <span>{incomeStr}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // Full-page editor for about section
        if (editingSection === 'about') {
            const profileManagedOptions = ['Self', 'Parent', 'Sibling', 'Relative/Friend', 'Marriage Bureau', 'Other'];
            const disabilityOptions = ['None', 'Physically disabled from birth', 'Physically disabled due to accident', 'Mentally disabled from birth', 'Mentally disabled due to accident'];
            const aboutText = editForm.about || '';

            return (
                <div className="bd-overlay">
                    <div className="bd-container">
                        <div className="bd-header">
                            <button className="bd-back-btn" onClick={() => setEditingSection(null)}>
                                <ArrowLeft size={22} />
                            </button>
                            <div className="bd-header-text">
                                <h2 className="bd-title">About Me</h2>
                                <p className="bd-subtitle">Mention details about yourself, your personality & more</p>
                            </div>
                        </div>

                        <div className="bd-fields">
                            {/* About Me Text */}
                            <div className="bd-field bd-field-no-border">
                                <span className="bd-label">About Me</span>
                                <textarea
                                    className="bd-textarea"
                                    name="about"
                                    value={editForm.about || ''}
                                    onChange={handleFormChange}
                                    placeholder="Write about yourself, your personality, interests, and what makes you unique..."
                                    rows={6}
                                    maxLength={1000}
                                />
                                <div className="bd-char-count">
                                    <span className={aboutText.length < 100 ? 'bd-count-warn' : 'bd-count-ok'}>
                                        {aboutText.length}/100
                                    </span>
                                </div>
                            </div>

                            {/* Profile Managed By */}
                            <div className="bd-field bd-field-no-border" style={{ paddingTop: '1.5rem' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>Profile Managed By</span>
                                <div className="bd-chips" style={{ marginTop: '10px' }}>
                                    {profileManagedOptions.map(opt => (
                                        <button
                                            key={opt}
                                            className={`bd-chip ${editForm.profileFor === opt ? 'active' : ''}`}
                                            onClick={() => setEditForm(prev => ({ ...prev, profileFor: opt }))}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Disability */}
                            <div className="bd-field bd-field-no-border" style={{ paddingTop: '1.5rem' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>Disability?</span>
                                <div className="bd-chips" style={{ marginTop: '10px' }}>
                                    {disabilityOptions.map(opt => (
                                        <button
                                            key={opt}
                                            className={`bd-chip ${(editForm.disability || 'None') === opt ? 'active' : ''}`}
                                            onClick={() => setEditForm(prev => ({ ...prev, disability: opt }))}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bd-save-area">
                            <button className="bd-save-btn" onClick={handleSaveSection}>Save</button>
                        </div>
                    </div>
                </div>
            );
        }

        // Full-page editor for education section
        if (editingSection === 'education') {
            const educationOptions = [
                { isHeader: true, label: 'Engineering/Technology/Design' },
                "B.E/B.Tech", "B.Pharma", "M.E/M.Tech", "M.Pharma", "M.S. (Engineering)", "B.Arch", "M.Arch", "B.Des", "M.Des",
                { isHeader: true, label: 'Management' },
                "MBA/PGDM", "BBA", "BHM", "BMS", "MMS", "Executive MBA",
                { isHeader: true, label: 'Medicine/Health' },
                "MBBS", "M.D.", "BAMS", "BHMS", "BDS", "M.S. (Medicine)", "BPT", "MPT", "DM",
                { isHeader: true, label: 'Computers' },
                "MCA", "BCA", "B.IT", "PGDCA",
                { isHeader: true, label: 'Finance/Commerce/Economics' },
                "B.Com", "CA", "CS", "ICWA", "M.Com", "CFA",
                { isHeader: true, label: 'Arts/Science' },
                "B.A", "B.Sc", "M.A", "M.Sc", "B.Ed", "M.Ed", "MSW", "BFA", "MFA",
                { isHeader: true, label: 'Doctorate' },
                "PhD", "M.Phil",
                { isHeader: true, label: 'Non-Graduate' },
                "Diploma/Certificate", "Class XII", "Trade School", "Class X or Below",
                { isHeader: true, label: 'Other' },
                "Other"
            ];

            return (
                <div className="bd-overlay">
                    <div className="bd-container">
                        <div className="bd-header">
                            <button className="bd-back-btn" onClick={() => setEditingSection(null)}>
                                <ArrowLeft size={22} />
                            </button>
                            <div className="bd-header-text">
                                <h2 className="bd-title">Education</h2>
                                <p className="bd-subtitle">Update details about your educational background</p>
                            </div>
                        </div>

                        <div className="bd-fields">
                            {/* Highest Education */}
                            <div className="bd-field" style={{ cursor: 'pointer' }} onClick={() => setActiveDropdown({ title: 'Highest Education', field: 'education', options: educationOptions })}>
                                <span className="bd-label">Highest Education</span>
                                <div className="bd-field-row">
                                    <span className="bd-value">{editForm.education || 'Select Education'}</span>
                                    <ChevronRight size={18} color="#9ca3af" />
                                </div>
                            </div>

                            {/* College */}
                            <div className="bd-field">
                                <span className="bd-label">College Name</span>
                                <input type="text" className="bd-value-input" name="ugCollege" value={editForm.ugCollege || ''} onChange={handleFormChange} placeholder="Enter your college name" />
                            </div>

                            {/* School Name */}
                            <div className="bd-field">
                                <span className="bd-label">School Name</span>
                                <input type="text" className="bd-value-input" name="schoolName" value={editForm.schoolName || ''} onChange={handleFormChange} placeholder="Enter your school name" />
                            </div>

                        </div>

                        <div className="bd-save-area">
                            <button className="bd-save-btn" onClick={handleSaveSection}>Save</button>
                        </div>
                    </div>
                </div>
            );
        }
        // Full-page editor for career section
        if (editingSection === 'career') {
            const employedInOptions = ["Private Sector", "Government/Public Sector", "Civil Services", "Defence", "Business/ Self Employed", "Not working currently"];
            const availableOccupations = ["Software Professional", "Manager", "Engineer", "Doctor", "Teacher", "Banker", "Civil Services", "Business Owner", "Accountant", "Administrator", "Architect", "Consultant", "Designer", "Lawyer", "Marketing Professional", "Pharmacist", "Sales Professional", "Writer/Editor", "Actor/Model", "Student", "Retired", "Other"];
            const settleOptions = ["Yes", "No", "Undecided"];

            return (
                <div className="bd-overlay">
                    <div className="bd-container">
                        <div className="bd-header">
                            <button className="bd-back-btn" onClick={() => setEditingSection(null)}>
                                <ArrowLeft size={22} />
                            </button>
                            <div className="bd-header-text">
                                <h2 className="bd-title">Career</h2>
                                <p className="bd-subtitle">Update details about your professional background</p>
                            </div>
                        </div>

                        <div className="bd-fields">
                            {/* Employed In */}
                            <div className="bd-field bd-field-no-border" style={{ paddingTop: '1.5rem' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>Employed In</span>
                                <div className="bd-chips" style={{ marginTop: '10px' }}>
                                    {employedInOptions.map(opt => (
                                        <button
                                            key={opt}
                                            className={`bd-chip ${editForm.employmentType === opt ? 'active' : ''}`}
                                            onClick={() => setEditForm(prev => ({ ...prev, employmentType: opt }))}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Occupation */}
                            <div className="bd-field" style={{ marginTop: '1.5rem' }}>
                                <span className="bd-label">Occupation</span>
                                <input
                                    type="text"
                                    list="occupation-list"
                                    className="bd-value-input"
                                    name="occupation"
                                    value={editForm.occupation || ''}
                                    onChange={handleFormChange}
                                    placeholder="Select or type occupation"
                                />
                                <datalist id="occupation-list">
                                    {availableOccupations.map(occ => (
                                        <option key={occ} value={occ}>{occ}</option>
                                    ))}
                                </datalist>
                            </div>

                            {/* Organization Name */}
                            <div className="bd-field">
                                <span className="bd-label">Organisation Name</span>
                                <input
                                    type="text"
                                    className="bd-value-input"
                                    name="organizationName"
                                    value={editForm.organizationName || ''}
                                    onChange={handleFormChange}
                                    placeholder="Enter organisation name"
                                />
                            </div>

                            {/* Interested in settling abroad */}
                            <div className="bd-field bd-field-no-border" style={{ paddingTop: '1.5rem' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>Interested in settling abroad?</span>
                                <div className="bd-chips" style={{ marginTop: '10px' }}>
                                    {settleOptions.map(opt => (
                                        <button
                                            key={opt}
                                            className={`bd-chip ${editForm.settlingAbroad === opt ? 'active' : ''}`}
                                            onClick={() => setEditForm(prev => ({ ...prev, settlingAbroad: opt }))}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bd-save-area">
                            <button className="bd-save-btn" onClick={handleSaveSection}>Save</button>
                        </div>
                    </div>
                </div>
            );
        }

        if (editingSection === 'family') {
            const familyOccupations = ["Businessman/Entrepreneur", "Private Employee", "Govt./ PSU Employee", "Armed Forces Employee", "Civil Servant", "Retired", "Not Employed", "Housewife", "Passed Away"];
            const familyIncomes = ["Below INR 1 Lakh", "INR 1 Lakh to 2 Lakh", "INR 2 Lakh to 4 Lakh", "INR 4 Lakh to 7 Lakh", "INR 7 Lakh to 10 Lakh", "INR 10 Lakh to 15 Lakh", "INR 15 Lakh to 20 Lakh", "INR 20 Lakh to 30 Lakh", "INR 30 Lakh to 50 Lakh", "INR 50 Lakh to 75 Lakh", "INR 75 Lakh to 1 Crore", "INR 1 Crore & above", "Not applicable"];
            const siblingCounts = ["0", "1", "2", "3", "3+"];

            const getMarriedCounts = (countStr) => {
                if (!countStr || countStr === "0") return [];
                if (countStr === "1") return ["0", "1"];
                if (countStr === "2") return ["0", "1", "2"];
                if (countStr === "3") return ["0", "1", "2", "3"];
                if (countStr === "3+") return ["0", "1", "2", "3", "3+"];
                return [];
            };

            const familyStatusOptions = ["Rich/Affluent", "Upper Middle Class", "Middle Class"];
            const familyTypeOptions = ["Joint Family", "Nuclear Family", "Others"];
            const livingWithParentsOptions = ["Yes", "No", "Not Applicable"];

            return (
                <div className="bd-overlay">
                    <div className="bd-container">
                        <div className="bd-header">
                            <button className="bd-back-btn" onClick={() => setEditingSection(null)}>
                                <ArrowLeft size={22} />
                            </button>
                            <div className="bd-header-text">
                                <h2 className="bd-title">About My Family</h2>
                                <p className="bd-subtitle" style={{ color: '#64748b' }}>Talk about your family members, values and background</p>
                            </div>
                        </div>

                        <div className="bd-fields">
                            {/* Family Status */}
                            <div className="bd-field bd-field-no-border" style={{ paddingTop: '1.5rem' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>Family Status</span>
                                <div className="bd-chips" style={{ marginTop: '10px' }}>
                                    {familyStatusOptions.map(opt => (
                                        <button
                                            key={opt}
                                            className={`bd-chip ${editForm.familyStatus === opt ? 'active' : ''}`}
                                            onClick={() => setEditForm(prev => ({ ...prev, familyStatus: opt }))}
                                            style={{ backgroundColor: editForm.familyStatus === opt ? '#fff0f3' : '#fff', color: editForm.familyStatus === opt ? '#1a2a3a' : '#64748b', borderColor: editForm.familyStatus === opt ? '#ff4b72' : '#e2e8f0', borderRadius: '30px', padding: '10px 20px', fontSize: '0.95rem' }}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Family Type */}
                            <div className="bd-field bd-field-no-border" style={{ paddingTop: '1.5rem' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>Family Type</span>
                                <div className="bd-chips" style={{ marginTop: '10px' }}>
                                    {familyTypeOptions.map(opt => (
                                        <button
                                            key={opt}
                                            className={`bd-chip ${editForm.familyType === opt ? 'active' : ''}`}
                                            onClick={() => setEditForm(prev => ({ ...prev, familyType: opt }))}
                                            style={{ backgroundColor: editForm.familyType === opt ? '#fff0f3' : '#fff', color: editForm.familyType === opt ? '#1a2a3a' : '#64748b', borderColor: editForm.familyType === opt ? '#ff4b72' : '#e2e8f0', borderRadius: '30px', padding: '10px 20px', fontSize: '0.95rem' }}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Living with parents */}
                            <div className="bd-field bd-field-no-border" style={{ paddingTop: '1.5rem' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>Living with parents</span>
                                <div className="bd-chips" style={{ marginTop: '10px' }}>
                                    {livingWithParentsOptions.map(opt => (
                                        <button
                                            key={opt}
                                            className={`bd-chip ${editForm.livingWithParents === opt ? 'active' : ''}`}
                                            onClick={() => setEditForm(prev => ({ ...prev, livingWithParents: opt }))}
                                            style={{ backgroundColor: editForm.livingWithParents === opt ? '#fff0f3' : '#fff', color: editForm.livingWithParents === opt ? '#1a2a3a' : '#64748b', borderColor: editForm.livingWithParents === opt ? '#ff4b72' : '#e2e8f0', borderRadius: '30px', padding: '10px 20px', fontSize: '0.95rem' }}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Family Income */}
                            <div className="bd-field" style={{ cursor: 'pointer', marginTop: '10px' }} onClick={() => setActiveDropdown({ title: "Family Income", field: 'familyIncome', options: familyIncomes })}>
                                <span className="bd-label">Family Income</span>
                                <div className="bd-field-row">
                                    <span className="bd-value">{editForm.familyIncome || 'Select Income'}</span>
                                    <ChevronRight size={18} color="#9ca3af" />
                                </div>
                            </div>

                            {/* Father's Occupation */}
                            <div className="bd-field" style={{ cursor: 'pointer' }} onClick={() => setActiveDropdown({ title: "Father's Occupation", field: 'fatherOccupation', options: familyOccupations })}>
                                <span className="bd-label">Father's Occupation</span>
                                <div className="bd-field-row">
                                    <span className="bd-value">{editForm.fatherOccupation || 'Select Occupation'}</span>
                                    <ChevronRight size={18} color="#9ca3af" />
                                </div>
                            </div>

                            {/* Mother's Occupation */}
                            <div className="bd-field" style={{ cursor: 'pointer' }} onClick={() => setActiveDropdown({ title: "Mother's Occupation", field: 'motherOccupation', options: familyOccupations })}>
                                <span className="bd-label">Mother's Occupation</span>
                                <div className="bd-field-row">
                                    <span className="bd-value">{editForm.motherOccupation || 'Select Occupation'}</span>
                                    <ChevronRight size={18} color="#9ca3af" />
                                </div>
                            </div>

                            {/* Number of Brothers */}
                            <div className="bd-field bd-field-no-border" style={{ paddingTop: '1.5rem' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>No. of Brother(s)</span>
                                <div className="bd-chips" style={{ marginTop: '10px' }}>
                                    {siblingCounts.map(opt => (
                                        <button
                                            key={opt}
                                            className={`bd-chip ${editForm.numberOfBrothers === opt ? 'active' : ''}`}
                                            onClick={() => setEditForm(prev => {
                                                const newForm = { ...prev, numberOfBrothers: opt };
                                                if (opt === "0") newForm.marriedBrothers = "";
                                                return newForm;
                                            })}
                                            style={{ backgroundColor: editForm.numberOfBrothers === opt ? '#fff0f3' : '#fff', color: editForm.numberOfBrothers === opt ? '#1a2a3a' : '#64748b', borderColor: editForm.numberOfBrothers === opt ? '#ff4b72' : '#e2e8f0', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', fontSize: '0.95rem' }}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Number of Married Brothers */}
                            {editForm.numberOfBrothers && editForm.numberOfBrothers !== "0" && (
                                <div className="bd-field bd-field-no-border" style={{ paddingTop: '1rem' }}>
                                    <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>No. of Married Brother(s)</span>
                                    <div className="bd-chips" style={{ marginTop: '10px' }}>
                                        {getMarriedCounts(editForm.numberOfBrothers).map(opt => (
                                            <button
                                                key={opt}
                                                className={`bd-chip ${editForm.marriedBrothers === opt ? 'active' : ''}`}
                                                onClick={() => setEditForm(prev => ({ ...prev, marriedBrothers: opt }))}
                                                style={{ backgroundColor: editForm.marriedBrothers === opt ? '#fff0f3' : '#fff', color: editForm.marriedBrothers === opt ? '#1a2a3a' : '#64748b', borderColor: editForm.marriedBrothers === opt ? '#ff4b72' : '#e2e8f0', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', fontSize: '0.95rem' }}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Number of Sisters */}
                            <div className="bd-field bd-field-no-border" style={{ paddingTop: '1.5rem' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>No. of Sister(s)</span>
                                <div className="bd-chips" style={{ marginTop: '10px' }}>
                                    {siblingCounts.map(opt => (
                                        <button
                                            key={opt}
                                            className={`bd-chip ${editForm.numberOfSisters === opt ? 'active' : ''}`}
                                            onClick={() => setEditForm(prev => {
                                                const newForm = { ...prev, numberOfSisters: opt };
                                                if (opt === "0") newForm.marriedSisters = "";
                                                return newForm;
                                            })}
                                            style={{ backgroundColor: editForm.numberOfSisters === opt ? '#fff0f3' : '#fff', color: editForm.numberOfSisters === opt ? '#1a2a3a' : '#64748b', borderColor: editForm.numberOfSisters === opt ? '#ff4b72' : '#e2e8f0', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', fontSize: '0.95rem' }}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Number of Married Sisters */}
                            {editForm.numberOfSisters && editForm.numberOfSisters !== "0" && (
                                <div className="bd-field bd-field-no-border" style={{ paddingTop: '1rem' }}>
                                    <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>No. of Married Sister(s)</span>
                                    <div className="bd-chips" style={{ marginTop: '10px' }}>
                                        {getMarriedCounts(editForm.numberOfSisters).map(opt => (
                                            <button
                                                key={opt}
                                                className={`bd-chip ${editForm.marriedSisters === opt ? 'active' : ''}`}
                                                onClick={() => setEditForm(prev => ({ ...prev, marriedSisters: opt }))}
                                                style={{ backgroundColor: editForm.marriedSisters === opt ? '#fff0f3' : '#fff', color: editForm.marriedSisters === opt ? '#1a2a3a' : '#64748b', borderColor: editForm.marriedSisters === opt ? '#ff4b72' : '#e2e8f0', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', fontSize: '0.95rem' }}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Family based out of */}
                            <div className="bd-field bd-field-no-border" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
                                <span className="bd-label" style={{ marginBottom: '10px', fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>Family based out of</span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div className="bd-field-row" onClick={() => setActiveDropdown({ title: 'Family Country', field: 'familyCountry', options: getCountries() })} style={{ padding: '14px', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>
                                        <span className="bd-value" style={{ flex: 1, color: editForm.familyCountry ? '#1a2a3a' : '#9ca3af' }}>{editForm.familyCountry || 'Country'}</span>
                                        <ChevronRight size={18} color="#9ca3af" />
                                    </div>
                                    <div className="bd-field-row" onClick={() => editForm.familyCountry && setActiveDropdown({ title: 'Family State', field: 'familyState', options: getStates(editForm.familyCountry) })} style={{ padding: '14px', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: editForm.familyCountry ? 'pointer' : 'not-allowed', opacity: editForm.familyCountry ? 1 : 0.6 }}>
                                        <span className="bd-value" style={{ flex: 1, color: editForm.familyState ? '#1a2a3a' : '#9ca3af' }}>{editForm.familyState || 'State'}</span>
                                        <ChevronRight size={18} color="#9ca3af" />
                                    </div>
                                    <div className="bd-field-row" onClick={() => editForm.familyState && setActiveDropdown({ title: 'Family City', field: 'familyCity', options: getCities(editForm.familyCountry, editForm.familyState) })} style={{ padding: '14px', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: editForm.familyState ? 'pointer' : 'not-allowed', opacity: editForm.familyState ? 1 : 0.6 }}>
                                        <span className="bd-value" style={{ flex: 1, color: editForm.familyCity ? '#1a2a3a' : '#9ca3af' }}>{editForm.familyCity || 'City'}</span>
                                        <ChevronRight size={18} color="#9ca3af" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bd-save-area">
                            <button className="bd-save-btn" onClick={handleSaveSection}>Save</button>
                        </div>
                    </div>
                </div>
            );
        }

        if (editingSection === 'contact') {
            return (
                <div className="bd-overlay">
                    <div className="bd-container">
                        <div className="bd-header">
                            <button className="bd-back-btn" onClick={() => setEditingSection(null)}>
                                <ArrowLeft size={22} />
                            </button>
                            <div className="bd-header-text">
                                <h2 className="bd-title">Contact Details</h2>
                                <p className="bd-subtitle" style={{ color: '#64748b' }}>Update details that would help profiles get in touch with you</p>
                            </div>
                        </div>

                        <div className="bd-fields">
                            <div className="bd-field" style={{ paddingTop: '10px' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#64748b' }}>Email Id</span>
                                <input type="email" className="bd-value-input" name="email" value={editForm.email || ''} onChange={(e) => { handleFormChange(e); setEmailError(''); }} placeholder="Enter your email" style={{ padding: '8px 0', borderBottom: emailError ? '1px solid #dc2626' : 'none' }} />
                                {emailError && <span style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{emailError}</span>}
                            </div>
                            <div className="bd-field">
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#64748b' }}>Phone Number</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '8px 0', borderBottom: mobileError ? '1px solid #dc2626' : 'none' }}>
                                    <input type="text" name="isdCode" value={editForm.isdCode || '+91'} onChange={(e) => { handleFormChange(e); setMobileError(''); }} style={{ width: '45px', border: 'none', outline: 'none', color: '#1a2a3a', fontWeight: '500', fontSize: '1rem', padding: 0, backgroundColor: 'transparent' }} />
                                    <div style={{ width: '1px', height: '20px', backgroundColor: '#e2e8f0' }}></div>
                                    <input type="tel" className="bd-value-input" name="mobile" value={editForm.mobile || ''} onChange={(e) => { handleFormChange(e); setMobileError(''); }} placeholder="Enter your mobile number" style={{ flex: 1 }} />
                                </div>
                                {mobileError && <span style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{mobileError}</span>}
                            </div>
                            <div className="bd-field" style={{ borderBottom: 'none' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#64748b' }}>Alternate Number</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '8px 0' }}>
                                    <input type="text" name="altIsdCode" value={editForm.altIsdCode || '+91'} onChange={handleFormChange} style={{ width: '45px', border: 'none', outline: 'none', color: '#1a2a3a', fontWeight: '500', fontSize: '1rem', padding: 0, backgroundColor: 'transparent' }} />
                                    <div style={{ width: '1px', height: '20px', backgroundColor: '#e2e8f0' }}></div>
                                    <input type="tel" className="bd-value-input" name="alternateMobile" value={editForm.alternateMobile || ''} onChange={handleFormChange} placeholder="Enter alternate number" style={{ flex: 1 }} />
                                </div>
                            </div>
                        </div>

                        <div className="bd-save-area">
                            <button className="bd-save-btn" onClick={handleSaveSection}>Save</button>
                        </div>

                    </div>
                </div>
            );
        }

        if (editingSection === 'lifestyle') {
            const dietaryOptions = ["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"];
            const drinkingSubOptions = ["Occasionally", "Regularly"];
            const smokingSubOptions = ["Occasionally", "Regularly"];

            return (
                <div className="bd-overlay">
                    <div className="bd-container">
                        <div className="bd-header">
                            <button className="bd-back-btn" onClick={() => setEditingSection(null)}>
                                <ArrowLeft size={22} />
                            </button>
                            <div className="bd-header-text">
                                <h2 className="bd-title">Lifestyle & Interests</h2>
                                <p className="bd-subtitle">Update your personal habits</p>
                            </div>
                        </div>

                        <div className="bd-fields">
                            <div className="bd-field bd-field-no-border" style={{ paddingTop: '1.5rem' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>Dietary Habit</span>
                                <div className="bd-chips" style={{ marginTop: '10px' }}>
                                    {dietaryOptions.map(opt => (
                                        <button
                                            key={opt}
                                            className={`bd-chip ${editForm.dietaryHabit === opt ? 'active' : ''}`}
                                            onClick={() => setEditForm(prev => ({ ...prev, dietaryHabit: opt }))}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bd-field bd-field-no-border" style={{ paddingTop: '1.5rem' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>Drinking Habit</span>
                                <div className="bd-chips" style={{ marginTop: '10px' }}>
                                    <button
                                        className={`bd-chip ${editForm.drinking === 'No' ? 'active' : ''}`}
                                        onClick={() => setEditForm(prev => ({ ...prev, drinking: 'No' }))}
                                    >
                                        No
                                    </button>
                                    <button
                                        className={`bd-chip ${editForm.drinking && editForm.drinking !== 'No' ? 'active' : ''}`}
                                        onClick={() => setEditForm(prev => ({ ...prev, drinking: 'Yes' }))}
                                    >
                                        Yes
                                    </button>
                                </div>
                                {editForm.drinking && editForm.drinking !== 'No' && (
                                    <div className="bd-chips" style={{ marginTop: '10px' }}>
                                        {drinkingSubOptions.map(opt => (
                                            <button
                                                key={opt}
                                                className={`bd-chip ${editForm.drinking === opt ? 'active' : ''}`}
                                                onClick={() => setEditForm(prev => ({ ...prev, drinking: opt }))}
                                                style={{ fontSize: '0.85rem', padding: '6px 14px', backgroundColor: editForm.drinking === opt ? '#fff3f5' : 'transparent', border: editForm.drinking === opt ? '1px solid #fecaca' : '1px solid #e5e7eb', color: editForm.drinking === opt ? '#e74c3c' : '#4a5568' }}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="bd-field bd-field-no-border" style={{ paddingTop: '1.5rem' }}>
                                <span className="bd-label" style={{ fontSize: '0.95rem', color: '#1a2a3a', fontWeight: 600 }}>Smoking Habit</span>
                                <div className="bd-chips" style={{ marginTop: '10px' }}>
                                    <button
                                        className={`bd-chip ${editForm.smoking === 'No' ? 'active' : ''}`}
                                        onClick={() => setEditForm(prev => ({ ...prev, smoking: 'No' }))}
                                    >
                                        No
                                    </button>
                                    <button
                                        className={`bd-chip ${editForm.smoking && editForm.smoking !== 'No' ? 'active' : ''}`}
                                        onClick={() => setEditForm(prev => ({ ...prev, smoking: 'Yes' }))}
                                    >
                                        Yes
                                    </button>
                                </div>
                                {editForm.smoking && editForm.smoking !== 'No' && (
                                    <div className="bd-chips" style={{ marginTop: '10px' }}>
                                        {smokingSubOptions.map(opt => (
                                            <button
                                                key={opt}
                                                className={`bd-chip ${editForm.smoking === opt ? 'active' : ''}`}
                                                onClick={() => setEditForm(prev => ({ ...prev, smoking: opt }))}
                                                style={{ fontSize: '0.85rem', padding: '6px 14px', backgroundColor: editForm.smoking === opt ? '#fff3f5' : 'transparent', border: editForm.smoking === opt ? '1px solid #fecaca' : '1px solid #e5e7eb', color: editForm.smoking === opt ? '#e74c3c' : '#4a5568' }}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="bd-field">
                                <span className="bd-label">Hobbies</span>
                                <input type="text" className="bd-value-input" name="hobbies" value={editForm.hobbies || ''} onChange={handleFormChange} placeholder="e.g. Reading, Traveling" />
                            </div>
                        </div>

                        <div className="bd-save-area">
                            <button className="bd-save-btn" onClick={handleSaveSection}>Save</button>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    // Circular progress component
    const CircularProgress = ({ percentage }) => {
        const radius = 32;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;
        return (
            <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle cx="40" cy="40" r={radius} fill="none" stroke="#e74c3c" strokeWidth="6"
                    strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 40 40)" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
                <text x="40" y="44" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1f2937">{percentage}%</text>
            </svg>
        );
    };

    const renderDropdownModal = () => {
        if (!activeDropdown) return null;
        const searchEnabled = activeDropdown.options.length > 8;
        const visibleOptions = activeDropdown.options.filter(opt => {
            if (!searchEnabled || !dropdownSearchTerm) return true;
            const optStr = typeof opt === 'string' ? opt : (opt.label || opt.toString());
            return optStr.toLowerCase().includes(dropdownSearchTerm.toLowerCase());
        });

        return (
            <div className="bd-income-modal" style={{ zIndex: 1400 }}>
                <div className="bd-income-modal-inner">
                    <h3 className="bd-income-modal-title">
                        <button className="bd-income-modal-close" onClick={() => { setActiveDropdown(null); setDropdownSearchTerm(''); }}>
                            <ArrowLeft size={22} />
                        </button>
                        {activeDropdown.title}
                    </h3>
                    {searchEnabled && (
                        <div className="bd-income-search">
                            <input
                                type="text"
                                placeholder={`Search ${activeDropdown.title}`}
                                value={dropdownSearchTerm}
                                onChange={(e) => setDropdownSearchTerm(e.target.value)}
                            />
                            <Search size={20} />
                        </div>
                    )}
                    <div className="bd-income-list">
                        {visibleOptions.map((opt, idx) => {
                            const isObj = typeof opt === 'object';
                            const optVal = isObj ? opt.value : opt;
                            const optLabel = isObj ? opt.label : opt;
                            if (isObj && opt.isHeader) return <div key={optLabel + idx} style={{ padding: '10px 0', fontSize: '1.1rem', fontWeight: 600, color: '#1a2a3a', background: '#f8f9fa', paddingLeft: '8px', marginTop: '10px' }}>{optLabel}</div>;
                            if (!optVal && !optLabel) return null;

                            return (
                                <label key={optVal + idx} className={`bd-income-option ${editForm[activeDropdown.field] === optVal ? 'selected' : ''}`} onClick={() => {
                                    if (activeDropdown.field === 'country') {
                                        setEditForm(prev => ({ ...prev, country: optVal, state: '', city: '' }));
                                    } else if (activeDropdown.field === 'state') {
                                        setEditForm(prev => ({ ...prev, state: optVal, city: '' }));
                                    } else if (activeDropdown.field === 'religion') {
                                        setEditForm(prev => ({ ...prev, religion: optVal, caste: '', sect: '' }));
                                    } else {
                                        setEditForm(prev => ({ ...prev, [activeDropdown.field]: optVal }));
                                    }
                                    setActiveDropdown(null);
                                    setDropdownSearchTerm('');
                                }}>
                                    <div className="bd-income-radio"></div>
                                    <span>{optLabel}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="profile-page">
            <Navbar />

            {/* Profile Hero Header */}
            <div className="ep-hero">
                <div className="ep-hero-inner">
                    <div className="ep-hero-photo">
                        {profileData.photo ? (
                            <img src={profileData.photo} alt={profileData.fullName} />
                        ) : (
                            <div className="ep-hero-photo-placeholder">
                                <User size={80} color="#9ca3af" />
                            </div>
                        )}
                    </div>
                    <div className="ep-hero-actions">
                        <button className="ep-add-photos-btn" onClick={() => setShowPhotoManager(true)}>
                            <Camera size={16} />
                            {getAllPhotos().length > 0 ? (
                                <span className="ep-photo-count">{getAllPhotos().length}</span>
                            ) : (
                                ' Add Photos'
                            )}
                        </button>
                        <button className="ep-eye-btn"><Eye size={18} /></button>
                    </div>
                    <div className="ep-hero-info">
                        <h1 className="ep-hero-name">{profileData.fullName}</h1>
                        <p className="ep-hero-id">ID - {profileData.uniqueId}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="ep-container">
                {/* Tabs */}
                <div className="ep-tabs">
                    <button className={`ep-tab ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About Me</button>
                    <button className={`ep-tab ${activeTab === 'looking' ? 'active' : ''}`} onClick={() => setActiveTab('looking')}>Looking For</button>
                </div>

                {activeTab === 'about' && (
                    <div className="ep-about-content">

                        {/* Basic Details */}
                        <div className="ep-section-card">
                            <div className="ep-section-header">
                                <div>
                                    <h3 className="ep-section-title">Basic Details</h3>
                                    <p className="ep-section-subtitle">Brief outline of personal information</p>
                                </div>
                                <button className="ep-edit-btn" onClick={() => handleEditSection('basic')}><Edit2 size={18} /></button>
                            </div>
                            <div className="ep-detail-list">
                                <div className="ep-detail-item">
                                    <Ruler size={18} className="ep-detail-icon" />
                                    <span>{profileData.height || 'Height not specified'}</span>
                                </div>
                                <div className="ep-detail-item">
                                    <Globe2 size={18} className="ep-detail-icon" />
                                    <span>{profileData.religion}{profileData.sect ? ` • ${profileData.sect}` : ''}{profileData.caste ? ` • ${profileData.caste}` : ''}{!profileData.religion && 'Religion not specified'}</span>
                                </div>
                                <div className="ep-detail-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ep-detail-icon"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                    <span>Mother Tongue is {profileData.motherTongue || 'not specified'}</span>
                                </div>
                                <div className="ep-detail-item">
                                    <MapPin size={18} className="ep-detail-icon" />
                                    <span>{getLocationString()}</span>
                                </div>
                                <div className="ep-detail-item">
                                    <Briefcase size={18} className="ep-detail-icon" />
                                    <span>{profileData.income || 'No Income'}</span>
                                </div>
                                <div className="ep-detail-item">
                                    <Calendar size={18} className="ep-detail-icon" />
                                    <span>{formatDate(profileData.dob)}</span>
                                </div>
                                <div className="ep-detail-item">
                                    <Heart size={18} className="ep-detail-icon" />
                                    <span>{profileData.maritalStatus || 'Never Married'}</span>
                                </div>
                            </div>
                            <div className="ep-detail-extra">
                                <div className="ep-detail-item">
                                    <Users size={18} className="ep-detail-icon" />
                                    <span>Profile managed by {profileData.profileFor || 'Self'}</span>
                                </div>
                            </div>
                            <div className="ep-add-row">
                                <span className="ep-add-label">Disability, Thalassemia, HIV+</span>
                                <span className="ep-add-link" onClick={() => handleEditSection('basic')}>Add</span>
                            </div>
                        </div>

                        {/* About Me */}
                        <div className="ep-section-card">
                            <div className="ep-section-header">
                                <div>
                                    <h3 className="ep-section-title">About Me</h3>
                                    <p className="ep-section-subtitle">Describe yourself in a few words</p>
                                </div>
                                <button className="ep-edit-btn" onClick={() => handleEditSection('about')}><Edit2 size={18} /></button>
                            </div>
                            <p className="ep-about-text">{profileData.about || 'Write something about yourself...'}</p>
                        </div>

                        {/* Education */}
                        <div className="ep-section-card">
                            <div className="ep-section-header">
                                <div>
                                    <h3 className="ep-section-title">Education</h3>
                                    <p className="ep-section-subtitle">Showcase your educational qualification</p>
                                </div>
                                <button className="ep-edit-btn" onClick={() => handleEditSection('education')}><Edit2 size={18} /></button>
                            </div>
                            {profileData.education ? (
                                <div className="ep-detail-item" style={{ marginBottom: '12px' }}>
                                    <div className="ep-icon-circle"><GraduationCap size={20} /></div>
                                    <div>
                                        <strong>{profileData.education}</strong>
                                        <p className="ep-sub-text">Undergraduate Degree</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="ep-empty-text">No education details added yet</p>
                            )}
                        </div>

                        {/* Career */}
                        <div className="ep-section-card">
                            <div className="ep-section-header">
                                <div>
                                    <h3 className="ep-section-title">Career</h3>
                                    <p className="ep-section-subtitle">Give a glimpse of your professional life</p>
                                </div>
                                <button className="ep-edit-btn" onClick={() => handleEditSection('career')}><Edit2 size={18} /></button>
                            </div>
                            {profileData.occupation ? (
                                <>
                                    <div className="ep-detail-item" style={{ marginBottom: '12px' }}>
                                        <div className="ep-icon-circle"><Briefcase size={20} /></div>
                                        <div>
                                            <strong>{profileData.occupation}</strong>
                                            <p className="ep-sub-text">{profileData.employmentType || 'Employment type not specified'}</p>
                                        </div>
                                    </div>
                                    {profileData.organizationName && (
                                        <div className="ep-detail-item" style={{ marginBottom: '12px' }}>
                                            <div className="ep-icon-circle"><BadgeCheck size={20} /></div>
                                            <div>
                                                <strong>{profileData.organizationName}</strong>
                                                <p className="ep-sub-text">Organisation</p>
                                            </div>
                                        </div>
                                    )}
                                    {profileData.settlingAbroad && (
                                        <div className="ep-detail-item" style={{ marginBottom: '12px' }}>
                                            <div className="ep-icon-circle"><Globe2 size={20} /></div>
                                            <div>
                                                <strong>Settling Abroad: {profileData.settlingAbroad}</strong>
                                                <p className="ep-sub-text">Preference</p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="ep-empty-text">No career details added yet</p>
                            )}
                            {(!profileData.organizationName || !profileData.settlingAbroad) && (
                                <div className="ep-add-row">
                                    <span className="ep-add-label">Organisation Name, Thoughts on settling abroad</span>
                                    <span className="ep-add-link" onClick={() => handleEditSection('career')}>Add</span>
                                </div>
                            )}
                        </div>

                        {/* Family */}
                        <div className="ep-section-card">
                            <div className="ep-section-header">
                                <div>
                                    <h3 className="ep-section-title">Family</h3>
                                    <p className="ep-section-subtitle">Introduce your family members, values and background</p>
                                </div>
                                <button className="ep-edit-btn" onClick={() => handleEditSection('family')}><Edit2 size={18} /></button>
                            </div>
                            <div className="ep-detail-list">
                                {profileData.fatherOccupation && (
                                    <div className="ep-detail-item"><Users size={18} className="ep-detail-icon" /><span>Father: {profileData.fatherOccupation}</span></div>
                                )}
                                {profileData.motherOccupation && (
                                    <div className="ep-detail-item"><Users size={18} className="ep-detail-icon" /><span>Mother: {profileData.motherOccupation}</span></div>
                                )}
                                {(profileData.numberOfBrothers || profileData.numberOfSisters) && (
                                    <div className="ep-detail-item"><Users size={18} className="ep-detail-icon" /><span>{profileData.numberOfBrothers || 0} Brothers, {profileData.numberOfSisters || 0} Sisters</span></div>
                                )}
                            </div>
                            {!profileData.fatherOccupation && !profileData.motherOccupation && (
                                <p className="ep-empty-text">No family details added yet</p>
                            )}
                        </div>

                        {/* Contact */}
                        <div className="ep-section-card">
                            <div className="ep-section-header">
                                <div>
                                    <h3 className="ep-section-title">Contact</h3>
                                    <p className="ep-section-subtitle">Details that would help profiles get in touch with you</p>
                                </div>
                                <button className="ep-edit-btn" onClick={() => handleEditSection('contact')}><Edit2 size={18} /></button>
                            </div>
                            <div className="ep-detail-list">
                                <div className="ep-detail-item ep-contact-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ep-detail-icon"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                        <span style={{ fontSize: '1rem', color: '#1f2937' }}>{profileData.email || 'Add email'}</span>
                                    </div>
                                </div>
                                <div className="ep-detail-item ep-contact-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ep-detail-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                        <span style={{ fontSize: '1rem', color: '#1f2937' }}>{profileData.mobile ? `${profileData.isdCode || '+91'} ${profileData.mobile}` : 'Add phone number'}</span>
                                    </div>
                                    <Settings size={20} color="#9ca3af" style={{ cursor: 'pointer' }} onClick={() => setShowPrivacyModal(true)} />
                                </div>
                            </div>
                            <div className="ep-add-row" style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="ep-add-label" style={{ color: '#9ca3af', fontSize: '1rem' }}>Alternate Email, Alternate Mobile No.</span>
                                <span className="ep-add-link" onClick={() => handleEditSection('contact')} style={{ color: '#c0756b', fontWeight: '500', cursor: 'pointer', fontSize: '1rem' }}>Add</span>
                            </div>
                        </div>

                        {/* My Lifestyle & Interests */}
                        <div className="ep-section-card">
                            <div className="ep-section-header">
                                <div>
                                    <h3 className="ep-section-title">My Lifestyle & Interests</h3>
                                    <p className="ep-section-subtitle">Give other profiles a glimpse of your favourite activities</p>
                                </div>
                                <button className="ep-edit-btn" onClick={() => handleEditSection('lifestyle')}><Edit2 size={18} /></button>
                            </div>

                            <h4 className="ep-subsection-title" style={{ marginTop: '24px' }}>Habits</h4>
                            <div className="ep-habits-grid">
                                <div className="ep-habit-card" onClick={() => handleEditSection('lifestyle')} style={{ borderRadius: '8px', padding: '24px 16px', alignItems: 'flex-start', textAlign: 'left', gap: '12px', border: profileData.drinking ? '1.5px solid #fecaca' : '1px solid #e5e7eb', backgroundColor: profileData.drinking ? '#fff3f5' : 'transparent' }}>
                                    <Wine size={24} color={profileData.drinking ? "#e74c3c" : "#9ca3af"} strokeWidth={profileData.drinking ? 2 : 1.5} />
                                    <span style={{ fontSize: '0.9rem', color: profileData.drinking ? '#e74c3c' : '#64748b', fontWeight: profileData.drinking ? '600' : '500' }}>{profileData.drinking ? `Drinking: ${profileData.drinking}` : 'Add Drinking Habits'}</span>
                                </div>
                                <div className="ep-habit-card" onClick={() => handleEditSection('lifestyle')} style={{ borderRadius: '8px', padding: '24px 16px', alignItems: 'flex-start', textAlign: 'left', gap: '12px', border: profileData.dietaryHabit ? '1.5px solid #fecaca' : '1px solid #e5e7eb', backgroundColor: profileData.dietaryHabit ? '#fff3f5' : 'transparent' }}>
                                    <Utensils size={24} color={profileData.dietaryHabit ? "#e74c3c" : "#9ca3af"} strokeWidth={profileData.dietaryHabit ? 2 : 1.5} />
                                    <span style={{ fontSize: '0.9rem', color: profileData.dietaryHabit ? '#e74c3c' : '#64748b', fontWeight: profileData.dietaryHabit ? '600' : '500' }}>{profileData.dietaryHabit ? `Diet: ${profileData.dietaryHabit}` : 'Add Dietary Habits'}</span>
                                </div>
                                <div className="ep-habit-card" onClick={() => handleEditSection('lifestyle')} style={{ borderRadius: '8px', padding: '24px 16px', alignItems: 'flex-start', textAlign: 'left', gap: '12px', border: profileData.smoking ? '1.5px solid #fecaca' : '1px solid #e5e7eb', backgroundColor: profileData.smoking ? '#fff3f5' : 'transparent' }}>
                                    <Cigarette size={24} color={profileData.smoking ? "#e74c3c" : "#9ca3af"} strokeWidth={profileData.smoking ? 2 : 1.5} />
                                    <span style={{ fontSize: '0.9rem', color: profileData.smoking ? '#e74c3c' : '#64748b', fontWeight: profileData.smoking ? '600' : '500' }}>{profileData.smoking ? `Smoking: ${profileData.smoking}` : 'Add Smoking Habits'}</span>
                                </div>
                            </div>

                            <h4 className="ep-subsection-title" style={{ marginTop: '32px' }}>My Favourites</h4>
                            <div style={{ backgroundColor: '#fff3f5', borderRadius: '8px', padding: '24px 16px', marginTop: '12px' }}>
                                <p style={{ color: '#1a2a3a', fontSize: '0.95rem', fontWeight: 600, margin: '0 0 16px 0' }}>Add more interests to attract profiles!</p>
                                <div className="ep-favourites-tags" style={{ gap: '10px' }}>
                                    {['Interests', 'Languages', 'Cuisine', 'Music', 'Dress'].map(tag => (
                                        <button key={tag} className="ep-fav-tag" onClick={() => handleEditSection('lifestyle')} style={{ backgroundColor: 'transparent', border: '1.5px solid #fecaca', color: '#e74c3c', padding: '8px 16px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {tag === 'Interests' && <Puzzle size={16} strokeWidth={2} />}
                                            {tag === 'Languages' && <MessagesSquare size={16} strokeWidth={2} />}
                                            {tag === 'Cuisine' && <ChefHat size={16} strokeWidth={2} />}
                                            {tag === 'Music' && <Music size={16} strokeWidth={2} />}
                                            {tag === 'Dress' && <Shirt size={16} strokeWidth={2} />}
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Logout */}
                        <div style={{ textAlign: 'center', padding: '1rem 0 2rem' }}>
                            <button className="btn btn-outline" onClick={handleLogout} style={{ color: '#e74c3c', borderColor: '#e74c3c' }}>
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'looking' && (
                    <div className="ep-about-content">
                        <div className="ep-section-card">
                            <div className="ep-section-header">
                                <div>
                                    <h3 className="ep-section-title">Partner Preferences</h3>
                                    <p className="ep-section-subtitle">What you're looking for in a partner</p>
                                </div>
                                <button className="ep-edit-btn" onClick={handleEditPreferenceClick}><Edit2 size={18} /></button>
                            </div>
                            <div className="ep-detail-list">
                                <div className="ep-detail-item"><Calendar size={18} className="ep-detail-icon" /><span>Age: {preferenceData.prefAgeFrom || '18'} - {preferenceData.prefAgeTo || '30'} years</span></div>
                                {preferenceData.prefHeightFrom && <div className="ep-detail-item"><Ruler size={18} className="ep-detail-icon" /><span>Height: {preferenceData.prefHeightFrom} - {preferenceData.prefHeightTo}</span></div>}
                                {preferenceData.prefReligion && <div className="ep-detail-item"><Globe2 size={18} className="ep-detail-icon" /><span>Religion: {preferenceData.prefReligion}{preferenceData.prefCaste ? ` - ${preferenceData.prefCaste}` : ''}</span></div>}
                                {preferenceData.prefMotherTongue && <div className="ep-detail-item"><Globe2 size={18} className="ep-detail-icon" /><span>Mother Tongue: {preferenceData.prefMotherTongue}</span></div>}
                                {preferenceData.prefMaritalStatus && <div className="ep-detail-item"><Heart size={18} className="ep-detail-icon" /><span>Marital Status: {preferenceData.prefMaritalStatus}</span></div>}
                                {preferenceData.prefEducation && <div className="ep-detail-item"><GraduationCap size={18} className="ep-detail-icon" /><span>Education: {preferenceData.prefEducation}</span></div>}
                                {preferenceData.prefOccupation && <div className="ep-detail-item"><Briefcase size={18} className="ep-detail-icon" /><span>Occupation: {preferenceData.prefOccupation}</span></div>}
                                {preferenceData.prefCountry && <div className="ep-detail-item"><MapPin size={18} className="ep-detail-icon" /><span>Location: {[preferenceData.prefCity, preferenceData.prefState, preferenceData.prefCountry].filter(Boolean).join(', ')}</span></div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {renderSectionModal()}
            {renderDropdownModal()}

            {/* Preference Modal */}
            {isEditingPreference && (
                <div className="modal-overlay" onClick={() => setIsEditingPreference(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Edit Partner Preference</h3>
                            <button className="modal-close" onClick={() => setIsEditingPreference(false)}><X size={24} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-grid">
                                <div className="form-group"><label>Age From</label>
                                    <select name="prefAgeFrom" value={prefForm.prefAgeFrom || ''} onChange={handlePrefFormChange}>
                                        <option value="">Select</option>
                                        {Array.from({ length: 43 }, (_, i) => 18 + i).map(a => <option key={a} value={a}>{a} years</option>)}
                                    </select>
                                </div>
                                <div className="form-group"><label>Age To</label>
                                    <select name="prefAgeTo" value={prefForm.prefAgeTo || ''} onChange={handlePrefFormChange}>
                                        <option value="">Select</option>
                                        {Array.from({ length: 43 }, (_, i) => 18 + i).map(a => <option key={a} value={a}>{a} years</option>)}
                                    </select>
                                </div>
                                <div className="form-group"><label>Religion</label>
                                    <select name="prefReligion" value={prefForm.prefReligion || ''} onChange={handlePrefFormChange}>
                                        <option value="">Any</option>
                                        <option value="Hindu">Hindu</option><option value="Muslim">Muslim</option><option value="Christian">Christian</option><option value="Sikh">Sikh</option>
                                    </select>
                                </div>
                                {prefForm.prefReligion && (
                                    <div className="form-group"><label>Caste</label>
                                        <select name="prefCaste" value={prefForm.prefCaste || ''} onChange={handlePrefFormChange}>
                                            <option value="">Any</option>
                                            {getCastes(prefForm.prefReligion).map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                )}
                                <div className="form-group"><label>Mother Tongue</label>
                                    <select name="prefMotherTongue" value={prefForm.prefMotherTongue || ''} onChange={handlePrefFormChange}>
                                        <option value="">Any</option>
                                        {languages.map(l => <option key={l} value={l}>{l}</option>)}
                                    </select>
                                </div>
                                <div className="form-group"><label>Marital Status</label>
                                    <select name="prefMaritalStatus" value={prefForm.prefMaritalStatus || ''} onChange={handlePrefFormChange}>
                                        <option value="">Any</option>
                                        <option value="Never Married">Never Married</option><option value="Divorced">Divorced</option><option value="Widowed">Widowed</option>
                                    </select>
                                </div>
                                <div className="form-group"><label>Education</label>
                                    <select name="prefEducation" value={prefForm.prefEducation || ''} onChange={handlePrefFormChange}>
                                        <option value="">Any</option>
                                        <option value="Doctorate">Doctorate</option><option value="Masters">Masters</option><option value="Bachelors">Bachelors</option><option value="Diploma">Diploma</option>
                                    </select>
                                </div>
                                <div className="form-group"><label>Occupation</label>
                                    <select name="prefOccupation" value={prefForm.prefOccupation || ''} onChange={handlePrefFormChange}>
                                        <option value="">Any</option>
                                        {occupations.map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                </div>
                                <div className="form-group"><label>Country</label>
                                    <select name="prefCountry" value={prefForm.prefCountry || ''} onChange={handlePrefFormChange}>
                                        <option value="">Any</option>
                                        {getCountries().map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-outline" onClick={() => setIsEditingPreference(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handlePrefSave}><Save size={16} /> Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Photo Manager Overlay */}
            {showPhotoManager && (
                <div className="pm-overlay">
                    <div className="pm-container">
                        <div className="pm-header">
                            <button className="pm-back-btn" onClick={() => { setShowPhotoManager(false); setPhotoMenuIndex(null); }}>
                                <ArrowLeft size={22} />
                            </button>
                            {getAllPhotos().length > 0 && (
                                <label className="pm-add-more-btn">
                                    <Camera size={16} /> Add Photos
                                    <input type="file" hidden accept="image/jpg,image/jpeg,image/png" multiple onChange={handleAddPhoto} />
                                </label>
                            )}
                        </div>

                        {getAllPhotos().length === 0 ? (
                            /* Upload Screen - No photos yet */
                            <div className="pm-upload-screen">
                                <h2 className="pm-upload-title">Impress them with your latest photo</h2>
                                <p className="pm-upload-subtitle">Profile photos ensure a 5% increase in matches</p>

                                <label className="pm-upload-btn">
                                    Upload Photo
                                    <input type="file" hidden accept="image/jpg,image/jpeg,image/png" multiple onChange={handleAddPhoto} />
                                </label>
                                <p className="pm-upload-format">Supported file format jpg, jpeg, png | upto 10 mb</p>

                                <div className="pm-tips">
                                    <div className="pm-tips-header">
                                        <span className="pm-tips-icon">💡</span>
                                        <h4>Here are a few tips</h4>
                                    </div>
                                    <p className="pm-tips-subtitle">Avoid the following photos to highlight your profile better</p>
                                    <div className="pm-tips-grid">
                                        <div className="pm-tip-item">
                                            <div className="pm-tip-avatar">
                                                <User size={32} color="#bbb" />
                                                <span className="pm-tip-x">✕</span>
                                            </div>
                                            <span>Blur photo</span>
                                        </div>
                                        <div className="pm-tip-item">
                                            <div className="pm-tip-avatar">
                                                <User size={32} color="#bbb" />
                                                <span className="pm-tip-x">✕</span>
                                            </div>
                                            <span>Side face</span>
                                        </div>
                                        <div className="pm-tip-item">
                                            <div className="pm-tip-avatar">
                                                <User size={32} color="#bbb" />
                                                <span className="pm-tip-x">✕</span>
                                            </div>
                                            <span>Watermark</span>
                                        </div>
                                        <div className="pm-tip-item">
                                            <div className="pm-tip-avatar">
                                                <User size={32} color="#bbb" />
                                                <span className="pm-tip-x">✕</span>
                                            </div>
                                            <span>Group profile pic</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Photo Grid - Has photos */
                            <div className="pm-photo-grid" onClick={() => setPhotoMenuIndex(null)}>
                                {getAllPhotos().map((photo, index) => (
                                    <div className="pm-photo-card" key={index} onClick={e => e.stopPropagation()}>
                                        <div className="pm-photo-wrapper" onClick={() => setFullViewPhoto(photo.src)}>
                                            <img src={photo.src} alt={`Photo ${index + 1}`} />
                                            {photo.isMain && (
                                                <div className="pm-profile-badge">Profile Photo</div>
                                            )}
                                        </div>
                                        <button className="pm-menu-btn" onClick={(e) => { e.stopPropagation(); togglePhotoMenu(index); }}>
                                            <MoreVertical size={18} />
                                        </button>
                                        {photoMenuIndex === index && (
                                            <div className="pm-dropdown">
                                                {!photo.isMain && (
                                                    <button className="pm-dropdown-item" onClick={() => handleSetAsProfile(photo.src)}>
                                                        <Image size={16} /> Set as Profile Picture
                                                    </button>
                                                )}
                                                <button className="pm-dropdown-item pm-dropdown-delete" onClick={() => handleDeletePhoto(photo.src, photo.isMain)}>
                                                    <Trash2 size={16} /> Delete Image
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Full Size Photo Viewer */}
            {fullViewPhoto && (
                <div className="pm-fullview-overlay" onClick={() => setFullViewPhoto(null)}>
                    <button className="pm-fullview-close" onClick={() => setFullViewPhoto(null)}><X size={28} /></button>
                    <img src={fullViewPhoto} alt="Full size" className="pm-fullview-img" onClick={e => e.stopPropagation()} />
                </div>
            )}

            {/* Mobile Privacy Modal */}
            {showPrivacyModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowPrivacyModal(false)}>
                    <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', width: '90%', maxWidth: '400px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: '1.25rem', color: '#1a2a3a', marginBottom: '20px', fontWeight: 600 }}>Mobile Privacy</h3>
                        {[
                            { val: 'Visible to all paid members', desc: 'Only premium members can view' },
                            { val: 'Only to Interest Sent/Accepted', desc: 'Showonly to members I accept/expressed interest in' },
                            { val: 'Hide from All', desc: 'No contact to be shown to anyone' }
                        ].map(opt => {
                            const currentPrivacy = editingSection === 'contact' ? editForm?.mobilePrivacy : profileData?.mobilePrivacy;
                            const isActive = currentPrivacy === opt.val || (opt.val === 'Visible to all paid members' && !currentPrivacy);
                            return (
                                <div key={opt.val} style={{ display: 'flex', gap: '15px', marginBottom: '20px', cursor: 'pointer' }} onClick={() => {
                                    if (editingSection === 'contact') {
                                        setEditForm(prev => ({ ...prev, mobilePrivacy: opt.val }));
                                    } else {
                                        setProfileData(prev => {
                                            const updated = { ...prev, mobilePrivacy: opt.val };
                                            localStorage.setItem('userProfile', JSON.stringify(updated));
                                            return updated;
                                        });
                                    }
                                    setTimeout(() => setShowPrivacyModal(false), 200);
                                }}>
                                    <div style={{ marginTop: '2px' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: isActive ? '6px solid #c0756b' : '2px solid #9ca3af', boxSizing: 'border-box' }}></div>
                                    </div>
                                    <div>
                                        <div style={{ color: isActive ? '#1a2a3a' : '#475569', fontWeight: 600, fontSize: '1rem', margin: '0 0 4px 0' }}>{opt.val}</div>
                                        <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{opt.desc}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {renderSectionModal()}

            <Footer />
        </div>
    );
};

export default Profile;
