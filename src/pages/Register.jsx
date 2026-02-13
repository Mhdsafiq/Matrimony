import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserPlus, ArrowRight, Check, Camera, Upload, X, RefreshCw } from 'lucide-react';
import './Register.css';

const StepIndicator = ({ step, title, currentStep }) => (
    <div className={`step-indicator ${step === currentStep ? 'active' : step < currentStep ? 'completed' : ''}`}>
        {step < currentStep ? <Check size={20} /> : step}
    </div>
);

const Register = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        dob: '',
        motherTongue: '',
        email: '',
        password: '',
        height: '',
        physicalStatus: 'Normal',
        maritalStatus: 'Never Married',
        religion: '',
        caste: '',
        country: '',
        education: '',
        employmentType: '',
        occupation: '',
        currency: 'INR',
        income: '',
        photo: null,
        partnerPreference: '',
        uniqueId: '',
        smoking: '',
        drinking: ''
    });

    const [errors, setErrors] = useState({});
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'religion') {
            setFormData(prev => ({ ...prev, religion: value, caste: '' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, photo: file }));
            setPhotoPreview(URL.createObjectURL(file));
            setErrors(prev => ({ ...prev, photo: '' }));
        }
    };

    const startCamera = async () => {
        try {
            setIsCameraOpen(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please check permissions.");
            setIsCameraOpen(false);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraOpen(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

            const dataUrl = canvasRef.current.toDataURL('image/jpeg');
            setPhotoPreview(dataUrl);

            // Convert dataURL to Blob/File for formData
            fetch(dataUrl)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
                    setFormData(prev => ({ ...prev, photo: file }));
                    setErrors(prev => ({ ...prev, photo: '' }));
                });

            stopCamera();
        }
    };

    const retakePhoto = () => {
        setPhotoPreview(null);
        setFormData(prev => ({ ...prev, photo: null }));
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.dob) {
            newErrors.dob = "Date of Birth is required";
        } else {
            const age = calculateAge(formData.dob);
            if (age < 21) {
                newErrors.dob = "You must be at least 21 years old to register";
            }
        }

        if (!formData.motherTongue) newErrors.motherTongue = "Mother Tongue is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 8 || formData.password.length > 20) {
            newErrors.password = "Password must be 8-20 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.height) newErrors.height = "Height is required";
        if (!formData.religion) newErrors.religion = "Religion is required";
        if (!formData.caste) newErrors.caste = "Caste is required";
        if (!formData.smoking) newErrors.smoking = "Smoking habit is required";
        if (!formData.drinking) newErrors.drinking = "Drinking habit is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors = {};
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.education) newErrors.education = "Education is required";
        if (!formData.employmentType) newErrors.employmentType = "Employment Type is required";
        if (!formData.occupation) newErrors.occupation = "Occupation is required";
        if (!formData.income) newErrors.income = "Income is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep4 = () => {
        const newErrors = {};
        if (!formData.photo) newErrors.photo = "Profile photo is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Mock function to check if ID exists (replace with API call later)
    const checkIdAvailability = (id) => {
        const takenIds = ['user123', 'admin', 'test'];
        return !takenIds.includes(id);
    };

    const validateStep5 = () => {
        const newErrors = {};
        if (!formData.partnerPreference) {
            newErrors.partnerPreference = "Please select a partner preference";
        }
        if (!formData.uniqueId) {
            newErrors.uniqueId = "Unique ID is required";
        } else if (formData.uniqueId.length < 4) {
            newErrors.uniqueId = "ID must be at least 4 characters";
        } else if (!checkIdAvailability(formData.uniqueId)) {
            newErrors.uniqueId = "This ID is already taken. Please choose another.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBack = (e) => {
        e.preventDefault();
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
        } else if (currentStep === 2 && validateStep2()) {
            setCurrentStep(3);
        } else if (currentStep === 3 && validateStep3()) {
            setCurrentStep(4);
        } else if (currentStep === 4 && validateStep4()) {
            setCurrentStep(5);
        } else if (currentStep === 5 && validateStep5()) {
            console.log("Registration Full Data:", formData);
            // Simulate API call
            setTimeout(() => {
                setIsRegistered(true);
            }, 1000);
        }
    };

    if (isRegistered) {
        return (
            <div className="register-page">
                <Navbar />
                <div className="register-container">
                    <div className="register-card glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
                        <div className="success-icon-container" style={{ marginBottom: '1.5rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)'
                            }}>
                                <Check size={40} color="white" strokeWidth={3} />
                            </div>
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>Registration Successful!</h2>
                        <p style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '2rem' }}>
                            Welcome to Sri Mayan Matrimony. Your profile has been created successfully.
                        </p>

                        <div style={{
                            background: '#f3f4f6',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            display: 'inline-block',
                            border: '1px dashed #9ca3af',
                            marginBottom: '2rem'
                        }}>
                            <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.5rem' }}>Your Unique Member ID</p>
                            <h3 style={{ fontSize: '1.8rem', color: '#D4AF37', margin: 0, fontFamily: 'monospace', letterSpacing: '1px' }}>
                                {formData.uniqueId}
                            </h3>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button className="btn btn-primary" onClick={() => window.location.href = '/login'}>
                                Login directly
                            </button>
                            <button className="btn btn-secondary" onClick={() => window.location.href = '/'}>
                                Go to Home
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }


    const languages = [
        "Tamil", "English", "Telugu", "Malayalam", "Kannada", "Hindi", "Marathi", "Bengali", "Gujarati", "Urdu", "Punjabi", "Odia"
    ];

    const heights = [
        "4ft 5in (134 cm)", "4ft 6in (137 cm)", "4ft 7in (139 cm)", "4ft 8in (142 cm)", "4ft 9in (144 cm)",
        "4ft 10in (147 cm)", "4ft 11in (149 cm)", "5ft (152 cm)", "5ft 1in (154 cm)", "5ft 2in (157 cm)",
        "5ft 3in (160 cm)", "5ft 4in (162 cm)", "5ft 5in (165 cm)", "5ft 6in (167 cm)", "5ft 7in (170 cm)",
        "5ft 8in (172 cm)", "5ft 9in (175 cm)", "5ft 10in (177 cm)", "5ft 11in (180 cm)", "6ft (182 cm)",
        "6ft 1in (185 cm)", "6ft 2in (187 cm)", "6ft 3in (190 cm)", "6ft 4in (193 cm)", "6ft 5in (195 cm)",
        "6ft 6in (198 cm)", "6ft 7in (200 cm)", "6ft 8in (203 cm)", "6ft 9in (205 cm)", "7ft (213 cm)"
    ];

    const religions = [
        "Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Inter-Religion", "No Religion"
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

    const countries = ["India", "USA", "UK", "Canada", "Australia", "UAE", "Singapore", "Malaysia", "Sri Lanka"];
    const educations = ["Doctorate", "Masters", "Bachelors", "Diploma", "High School", "Trade School", "Other"];
    const employmentTypes = ["Private Sector", "Government/Public Sector", "Civil Service", "Business/Self Employed", "Not Working", "Student"];
    const occupations = ["Software Professional", "Manager", "Engineer", "Doctor", "Teacher", "Banker", "Civil Services", "Business Owner", "Other"];
    const currencies = ["INR", "USD", "EUR", "GBP", "AED", "SGD", "MYR", "LKR"];

    const availableCastes = formData.religion ? (religionCasteMap[formData.religion] || []) : [];

    return (
        <div className="register-page">
            <Navbar />
            <div className="register-container">
                <div className="register-card glass-panel">
                    <div className="register-header">
                        <UserPlus size={40} className="register-icon" />
                        <h2>Create Your Profile</h2>
                        <p className="text-muted">Join Sri Mayan Matrimony to find your perfect match</p>
                    </div>

                    <div className="progress-bar">
                        <StepIndicator step={1} currentStep={currentStep} />
                        <StepIndicator step={2} currentStep={currentStep} />
                        <StepIndicator step={3} currentStep={currentStep} />
                        <StepIndicator step={4} currentStep={currentStep} />
                        <StepIndicator step={5} currentStep={currentStep} />
                    </div>

                    <form className="register-form">
                        {currentStep === 1 && (
                            <div className="form-step animate-fade-in-up">
                                <h3 className="section-title">Basic Details</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="input-label">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            className="register-input"
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                        />
                                        {errors.dob && <span className="validation-error">{errors.dob}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Mother Tongue</label>
                                        <select
                                            name="motherTongue"
                                            className="register-select"
                                            value={formData.motherTongue}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Language</option>
                                            {languages.map(lang => (
                                                <option key={lang} value={lang}>{lang}</option>
                                            ))}
                                        </select>
                                        {errors.motherTongue && <span className="validation-error">{errors.motherTongue}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="example@email.com"
                                            className="register-input"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        {errors.email && <span className="validation-error">{errors.email}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Create Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="8-20 characters"
                                            className="register-input"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                        {errors.password && <span className="validation-error">{errors.password}</span>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="form-step animate-fade-in-up">
                                <h3 className="section-title">Personal & Religious Details</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="input-label">Height</label>
                                        <select
                                            name="height"
                                            className="register-select"
                                            value={formData.height}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Height</option>
                                            {heights.map(h => (
                                                <option key={h} value={h}>{h}</option>
                                            ))}
                                        </select>
                                        {errors.height && <span className="validation-error">{errors.height}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Physical Status</label>
                                        <div className="radio-group">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="physicalStatus"
                                                    value="Normal"
                                                    checked={formData.physicalStatus === 'Normal'}
                                                    onChange={handleInputChange}
                                                /> Normal
                                            </label>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="physicalStatus"
                                                    value="Physically Challenged"
                                                    checked={formData.physicalStatus === 'Physically Challenged'}
                                                    onChange={handleInputChange}
                                                /> Physically Challenged
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Marital Status</label>
                                        <div className="radio-group" style={{ flexWrap: 'wrap' }}>
                                            {['Never Married', 'Widower', 'Divorced', 'Awaiting Divorce'].map(status => (
                                                <label key={status} className="radio-label">
                                                    <input
                                                        type="radio"
                                                        name="maritalStatus"
                                                        value={status}
                                                        checked={formData.maritalStatus === status}
                                                        onChange={handleInputChange}
                                                    /> {status}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Religion</label>
                                        <select
                                            name="religion"
                                            className="register-select"
                                            value={formData.religion}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Religion</option>
                                            {religions.map(r => (
                                                <option key={r} value={r}>{r}</option>
                                            ))}
                                        </select>
                                        {errors.religion && <span className="validation-error">{errors.religion}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Caste</label>
                                        <select
                                            name="caste"
                                            className="register-select"
                                            value={formData.caste}
                                            onChange={handleInputChange}
                                            disabled={!formData.religion}
                                        >
                                            <option value="">{formData.religion ? "Select Caste" : "Select Religion First"}</option>
                                            {availableCastes.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        {errors.caste && <span className="validation-error">{errors.caste}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Smoking Habit</label>
                                        <div className="radio-group">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="smoking"
                                                    value="Yes"
                                                    checked={formData.smoking === 'Yes'}
                                                    onChange={handleInputChange}
                                                /> Yes
                                            </label>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="smoking"
                                                    value="No"
                                                    checked={formData.smoking === 'No'}
                                                    onChange={handleInputChange}
                                                /> No
                                            </label>
                                        </div>
                                        {errors.smoking && <span className="validation-error">{errors.smoking}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Drinking Habit</label>
                                        <div className="radio-group">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="drinking"
                                                    value="Yes"
                                                    checked={formData.drinking === 'Yes'}
                                                    onChange={handleInputChange}
                                                /> Yes
                                            </label>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="drinking"
                                                    value="No"
                                                    checked={formData.drinking === 'No'}
                                                    onChange={handleInputChange}
                                                /> No
                                            </label>
                                        </div>
                                        {errors.drinking && <span className="validation-error">{errors.drinking}</span>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="form-step animate-fade-in-up">
                                <h3 className="section-title">Location & Professional Details</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="input-label">Resident Country</label>
                                        <select
                                            name="country"
                                            className="register-select"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        {errors.country && <span className="validation-error">{errors.country}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Education</label>
                                        <select
                                            name="education"
                                            className="register-select"
                                            value={formData.education}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Education</option>
                                            {educations.map(e => (
                                                <option key={e} value={e}>{e}</option>
                                            ))}
                                        </select>
                                        {errors.education && <span className="validation-error">{errors.education}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Employment Type</label>
                                        <select
                                            name="employmentType"
                                            className="register-select"
                                            value={formData.employmentType}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Employment Type</option>
                                            {employmentTypes.map(e => (
                                                <option key={e} value={e}>{e}</option>
                                            ))}
                                        </select>
                                        {errors.employmentType && <span className="validation-error">{errors.employmentType}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Occupation</label>
                                        <select
                                            name="occupation"
                                            className="register-select"
                                            value={formData.occupation}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Occupation</option>
                                            {occupations.map(o => (
                                                <option key={o} value={o}>{o}</option>
                                            ))}
                                        </select>
                                        {errors.occupation && <span className="validation-error">{errors.occupation}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Annual Income</label>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <select
                                                name="currency"
                                                className="register-select"
                                                style={{ width: '100px' }}
                                                value={formData.currency}
                                                onChange={handleInputChange}
                                            >
                                                {currencies.map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                name="income"
                                                placeholder="Enter Amount"
                                                className="register-input"
                                                value={formData.income}
                                                onChange={handleInputChange}
                                                style={{ flex: 1 }}
                                            />
                                        </div>
                                        {errors.income && <span className="validation-error">{errors.income}</span>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="form-step animate-fade-in-up">
                                <h3 className="section-title">Upload Profile Photo</h3>
                                <p className="text-muted" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                    Adding a photo helps you get more responses.
                                </p>

                                <div className="photo-upload-container">
                                    {isCameraOpen ? (
                                        <div className="camera-preview">
                                            <video ref={videoRef} autoPlay playsInline className="video-feed" />
                                            <div className="camera-controls">
                                                <button type="button" className="btn btn-secondary" onClick={stopCamera}>
                                                    <X size={20} /> Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary" onClick={capturePhoto}>
                                                    <Camera size={20} /> Capture
                                                </button>
                                            </div>
                                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                                        </div>
                                    ) : (
                                        <div className="upload-options">
                                            {photoPreview ? (
                                                <div className="preview-container">
                                                    <img src={photoPreview} alt="Profile Preview" className="photo-preview" />
                                                    <button type="button" className="btn btn-secondary retake-btn" onClick={retakePhoto}>
                                                        <RefreshCw size={16} /> Change Photo
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="upload-option" onClick={() => document.getElementById('fileInput').click()}>
                                                        <Upload size={48} className="upload-icon" />
                                                        <span>Upload from Device</span>
                                                        <input
                                                            type="file"
                                                            id="fileInput"
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                            style={{ display: 'none' }}
                                                        />
                                                    </div>
                                                    <div className="divider">OR</div>
                                                    <div className="upload-option" onClick={startCamera}>
                                                        <Camera size={48} className="upload-icon" />
                                                        <span>Take a Photo</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                    {errors.photo && <div className="validation-error" style={{ textAlign: 'center', marginTop: '1rem' }}>{errors.photo}</div>}
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className="form-step animate-fade-in-up">
                                <h3 className="section-title">Final Details</h3>

                                <div className="form-group" style={{ marginBottom: '2rem' }}>
                                    <label className="input-label">Create a Unique ID (Username)</label>
                                    <p className="text-muted text-sm" style={{ marginBottom: '0.5rem' }}>This ID will be used for others to search for your profile.</p>
                                    <input
                                        type="text"
                                        name="uniqueId"
                                        placeholder="e.g., john_doe_123"
                                        className="register-input"
                                        value={formData.uniqueId}
                                        onChange={handleInputChange}
                                    />
                                    {errors.uniqueId && <span className="validation-error">{errors.uniqueId}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="input-label">Partner Preference</label>
                                    <div className="preference-options">
                                        {[
                                            { value: 'No Preference', label: 'No Preference (Caste & Religion)' },
                                            { value: 'Religion Must Match', label: 'Religion Must Match (Caste Open)' },
                                            { value: 'Strict', label: 'Caste & Religion Must Match' }
                                        ].map(option => (
                                            <div key={option.value} className="preference-option-card">
                                                <label className="radio-label">
                                                    <input
                                                        type="radio"
                                                        name="partnerPreference"
                                                        value={option.value}
                                                        checked={formData.partnerPreference === option.value}
                                                        onChange={handleInputChange}
                                                    />
                                                    <span style={{ marginLeft: '10px' }}>{option.label}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.partnerPreference && <span className="validation-error">{errors.partnerPreference}</span>}
                                </div>
                            </div>
                        )}

                        <div className="form-navigation" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            {currentStep > 1 && (
                                <button className="btn btn-secondary back-btn" onClick={handleBack} style={{ flex: 1 }}>
                                    Back
                                </button>
                            )}
                            <button className="btn btn-primary next-btn" onClick={handleNext} style={{ flex: 1 }}>
                                {currentStep === 5 ? 'Register Now' : 'Next'} <ArrowRight size={18} />
                            </button>
                        </div>

                        <div className="login-link">
                            Already have an account? <a href="/login">Login</a>
                        </div>

                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
