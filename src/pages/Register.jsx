import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserPlus, ArrowRight, ArrowLeft, Check, Camera, Upload, X, RefreshCw, Smartphone, Mail, ShieldCheck, Send, Lock, Headphones, HeartHandshake, Users, HelpCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Register.css';
import SearchableSelect from '../components/SearchableSelect';
import { getCountries, getStates, getCities, getCastes, getSects } from '../data/locationData';

const StepIndicator = ({ step, title, currentStep }) => (
    <div className={`step-indicator ${step === currentStep ? 'active' : step < currentStep ? 'completed' : ''}`}>
        {step < currentStep ? <Check size={20} /> : step}
    </div>
);

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [jvStep, setJvStep] = useState(0);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [loginOtpMode, setLoginOtpMode] = useState(false);
    const [loginOtp, setLoginOtp] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleLogin = () => {
        if (!loginForm.username || !loginForm.password) {
            setLoginError('Please enter your mobile/email and password.');
            return;
        }
        // Mock login - accept any non-empty credentials
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userProfile', JSON.stringify({ email: loginForm.username }));
        navigate('/home');
    };

    const handleLoginWithOtp = () => {
        if (!loginForm.username) {
            setLoginError('Please enter your mobile number or email first.');
            return;
        }
        setLoginError('');
        setLoginOtpMode(true);
    };

    const handleVerifyLoginOtp = () => {
        if (!loginOtp || loginOtp.length < 4) {
            setLoginError('Please enter a valid OTP.');
            return;
        }
        // Mock OTP verification - accept any 4+ digit OTP
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userProfile', JSON.stringify({ email: loginForm.username }));
        navigate('/home');
    };
    // Check for existing session
    React.useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            window.location.href = '/home';
        }
    }, []);

    React.useEffect(() => {
        if (location.pathname === '/login') {
            setShowRegistrationForm(false);
            setShowLoginModal(true);
        }
    }, [location.pathname]);

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        dob: '',
        dobDay: '',
        dobMonth: '',
        dobYear: '',
        motherTongue: '',
        email: '',
        mobile: '',
        password: '',
        height: '',
        physicalStatus: 'Normal',
        maritalStatus: 'Never Married',
        religion: '',
        sect: '',
        caste: '',
        country: '',
        state: '',
        city: '',
        education: '',
        employmentType: '',
        occupation: '',
        currency: 'INR',
        income: '',
        photo: null,
        profileFor: '',
        partnerPreference: '',
        uniqueId: '',
        smoking: '',
        drinking: '',
        horoscope: '',
        timeOfBirth: '',
        placeOfBirth: '',
        diet: '',
        familyType: '',
        fatherOccupation: '',
        motherOccupation: '',
        brothers: '',
        brothersMarried: '',
        sisters: '',
        sistersMarried: '',
        familyLivingIn: '',
        contactAddress: '',
        havingChildren: '',
        numberOfChildren: '',
        residentialStatus: ''
    });

    const [registerMethod, setRegisterMethod] = useState('mobile'); // 'mobile' or 'email'
    const [verification, setVerification] = useState({
        mobile: { sent: false, verified: false, otp: '', enteredOtp: '' },
        email: { sent: false, verified: false, otp: '', enteredOtp: '' }
    });

    const [errors, setErrors] = useState({});
    const [jvErrors, setJvErrors] = useState({});
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [highestCompletedStep, setHighestCompletedStep] = useState(0);
    const [verificationOtp, setVerificationOtp] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    const [isdCode, setIsdCode] = useState('+91');
    const [verificationError, setVerificationError] = useState('');
    const [verificationSuccess, setVerificationSuccess] = useState(false);

    // Validation for Step 0 (Registration)
    const validateJvStep0 = () => {
        const errs = {};
        if (!formData.email) {
            errs.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            errs.email = 'Please enter a valid email.';
        } else if (['test@example.com', 'admin@example.com'].includes(formData.email.toLowerCase())) {
            errs.email = 'This email is already registered';
        }

        if (!formData.mobile) {
            errs.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            errs.mobile = 'Phone number is invalid.';
        }

        if (!formData.password || formData.password.length < 8) errs.password = 'Password must be at least 8 characters';
        if (!formData.profileFor) errs.profileFor = 'Please select who this profile is for';
        if (formData.profileFor && formData.profileFor !== 'Son' && formData.profileFor !== 'Daughter' && !formData.gender) {
            errs.gender = 'Gender is required';
        }
        setJvErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // Validation for Step 1 (Profile Details)
    const validateJvStep1 = () => {
        const errs = {};
        if (!formData.fullName) errs.fullName = 'Name is required';
        if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) {
            errs.dob = 'Date of Birth is required';
        } else {
            // Check if user is at least 18 years old
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthIndex = months.indexOf(formData.dobMonth);
            const birthDate = new Date(parseInt(formData.dobYear), monthIndex, parseInt(formData.dobDay));
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                errs.dob = 'Age should be above 18.';
            }
        }
        if (!formData.motherTongue) errs.motherTongue = 'Mother tongue is required';
        if (!formData.religion) errs.religion = 'Religion is required';
        if (!formData.caste) errs.caste = 'Caste is required';
        if (!formData.height) errs.height = 'Height is required';
        if (formData.religion === 'Hindu') {
            if (!formData.horoscope) errs.horoscope = 'Horoscope is required';
            if (!formData.placeOfBirth) errs.placeOfBirth = 'Place of birth is required';
            if (!formData.timeOfBirth) errs.timeOfBirth = 'Time of birth is required';
        }
        setJvErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // Validation for Step 2 (Career Details)
    const validateJvStep2 = () => {
        const errs = {};
        if (!formData.country) errs.country = 'Country is required';
        if (formData.country === 'India') {
            if (!formData.state) errs.state = 'State is required';
            if (!formData.city) errs.city = 'City is required';
        } else if (formData.country) {
            if (!formData.residentialStatus) errs.residentialStatus = 'Residential Status is required';
        }
        if (!formData.education) errs.education = 'Highest Degree is required';
        if (!formData.employmentType) errs.employmentType = 'Employment is required';
        if (!formData.occupation) errs.occupation = 'Occupation is required';
        if (!formData.income) errs.income = 'Annual Income is required';
        setJvErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // Handle step navigation with validation
    const handleJvNext = (targetStep) => {
        let isValid = false;
        if (jvStep === 0) isValid = validateJvStep0();
        else if (jvStep === 1) isValid = validateJvStep1();
        else if (jvStep === 2) isValid = validateJvStep2();
        else isValid = true;

        if (isValid) {
            setJvErrors({});
            if (targetStep > highestCompletedStep) {
                setHighestCompletedStep(targetStep);
            }
            setJvStep(targetStep);
        }
    };

    // Handle tab click - only allow going to completed steps or current
    const handleTabClick = (targetStep) => {
        if (targetStep <= highestCompletedStep) {
            setJvErrors({});
            setJvStep(targetStep);
        }
    };
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const handleSendOtp = (type) => {
        const val = formData[type];
        if (!val) {
            setErrors(prev => ({ ...prev, [type]: `Please enter ${type} to verify` }));
            return;
        }

        // Simulate sending OTP
        const generatedOtp = '1234'; // Mock OTP
        setVerification(prev => ({
            ...prev,
            [type]: { ...prev[type], sent: true, otp: generatedOtp }
        }));
        alert(`OTP sent to ${val}: ${generatedOtp}`);
        setErrors(prev => ({ ...prev, [type]: '' }));
    };

    const handleVerifyOtp = (type) => {
        const { otp, enteredOtp } = verification[type];
        if (enteredOtp === otp) {
            setVerification(prev => ({
                ...prev,
                [type]: { ...prev[type], verified: true, sent: false }
            }));
            setErrors(prev => ({ ...prev, [type]: '' }));
        } else {
            setErrors(prev => ({ ...prev, [type]: 'Invalid OTP. Please try again.' }));
        }
    };

    const handleOtpChange = (type, value) => {
        setVerification(prev => ({
            ...prev,
            [type]: { ...prev[type], enteredOtp: value }
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // If changing email or mobile, reset verification
        if (name === 'email' || name === 'mobile') {
            if (verification[name].verified) {
                // Check if value is actually different to avoid reset on re-render or trivial updates
                // But for simplicity, if verified, we discourage editing without reset. 
                // Here, if user types, we reset verification.
                setVerification(prev => ({
                    ...prev,
                    [name]: { sent: false, verified: false, otp: '', enteredOtp: '' }
                }));
            }
        }

        if (name === 'religion') {
            setFormData(prev => ({ ...prev, religion: value, caste: '', sect: '' }));
        } else if (name === 'country') {
            setFormData(prev => ({ ...prev, country: value, state: '', city: '', residentialStatus: value === 'India' ? '' : prev.residentialStatus }));
        } else if (name === 'state') {
            setFormData(prev => ({ ...prev, state: value, city: '' }));
        } else if (name === 'profileFor') {
            if (value === 'Son') {
                setFormData(prev => ({ ...prev, profileFor: value, gender: 'Male' }));
            } else if (value === 'Daughter') {
                setFormData(prev => ({ ...prev, profileFor: value, gender: 'Female' }));
            } else {
                setFormData(prev => ({ ...prev, profileFor: value, gender: '' }));
            }
        } else if (name === 'maritalStatus') {
            setFormData(prev => {
                const newData = { ...prev, maritalStatus: value };
                if (value === 'Never Married') {
                    newData.havingChildren = '';
                    newData.numberOfChildren = '';
                }
                return newData;
            });
        } else if (name === 'havingChildren') {
            setFormData(prev => {
                const newData = { ...prev, havingChildren: value };
                if (value !== 'Yes') {
                    newData.numberOfChildren = '';
                }
                return newData;
            });
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
        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.dob) {
            newErrors.dob = "Date of Birth is required";
        } else {
            const age = calculateAge(formData.dob);
            if (age < 18) {
                newErrors.dob = "Age should be above 18.";
            }
        }

        if (!formData.motherTongue) newErrors.motherTongue = "Mother Tongue is required";

        if (registerMethod === 'mobile') {
            if (!formData.mobile) newErrors.mobile = "Mobile Number is required";
            else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Phone number is invalid.";
            else if (!verification.mobile.verified) newErrors.mobile = "Please verify your mobile number";
        }

        if (registerMethod === 'email') {
            if (!formData.email) {
                newErrors.email = "Email is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
                newErrors.email = "Please enter a valid email.";
            } else if (['test@example.com', 'admin@example.com'].includes(formData.email.toLowerCase())) {
                newErrors.email = 'This email is already registered';
            } else if (!verification.email.verified) {
                newErrors.email = "Please verify your email address";
            }
        }

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
        if (formData.religion === 'Hindu' && !formData.horoscope) {
            newErrors.horoscope = "Horoscope is required";
        }
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
        // partnerPreference is now optional

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

    const submitRegistration = (data) => {
        console.log("Registration Full Data:", data);
        // Simulate API call
        setTimeout(() => {
            // Set auth state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('uniqueId', data.uniqueId);
            localStorage.setItem('userProfile', JSON.stringify(data));

            // Redirect to dashboard
            window.location.href = '/home';
        }, 1000);
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
            submitRegistration(formData);
        }
    };

    const handleSkip = (e) => {
        e.preventDefault();
        setErrors({}); // Clear errors

        if (currentStep < 5) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Final step skip - generate ID if missing
            let finalData = { ...formData };
            if (!finalData.uniqueId) {
                // Generate simple unique ID based on name or random
                const baseId = formData.fullName ? formData.fullName.toLowerCase().replace(/\s+/g, '_') : 'user';
                const randomSuffix = Math.floor(Math.random() * 10000);
                finalData.uniqueId = `${baseId}_${randomSuffix}`;
                setFormData(prev => ({ ...prev, uniqueId: finalData.uniqueId }));
            }
            submitRegistration(finalData);
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

    const horoscopes = [
        "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];

    const countries = getCountries();
    const availableStates = getStates(formData.country);
    const availableCities = getCities(formData.country, formData.state);
    const availableCastes = getCastes(formData.religion);
    const availableSects = getSects(formData.religion);

    const educations = [
        { isHeader: true, label: 'Engineering/Technology/Design' },
        "B.E/B.Tech", "B.Pharma", "M.E/M.Tech", "M.Pharma", "M.S. (Engineering)", "B.Arch", "M.Arch", "B.Des", "M.Des", "B.FAD", "B.FTech", "BID", "B.Tech LL.B.", "M.FTech", "MID", "MIB", "M.Plan", "MPH", "A.M.E.", "CISE", "ITIL",
        { isHeader: true, label: 'Management' },
        "MBA/PGDM", "BBA", "BHM", "BAM", "BBM", "BFM", "BFT", "B.H.A.", "BHMCT", "BHMTT", "BMS", "MAM", "MHA", "MMS", "MMM", "MTM", "MTA", "MHRM", "MBM", "Executive MBA", "CWM",
        { isHeader: true, label: 'Medicine/Health' },
        "MBBS", "M.D.", "BAMS", "BHMS", "BDS", "M.S. (Medicine)", "MVSc.", "BVSc.", "MDS", "BPT", "MPT", "DM", "MCh", "BCVT", "BMLT", "BMRIT", "BMRT", "BNYS", "BOT", "B.O.Th", "BOPTM", "BPMT", "B.P.Ed", "B.P.E.S",
        { isHeader: true, label: 'Computers' },
        "MCA", "BCA", "B.IT", "MCM", "PGDCA", "DCA", "ADCA",
        { isHeader: true, label: 'Finance/Commerce/Economics' },
        "B.Com", "CA", "CS", "ICWA", "M.Com", "CFA", "BBI", "BBE", "B.Com (Hons)", "MBE", "MBF", "MFC",
        { isHeader: true, label: 'Arts/Science' },
        "B.A", "B.Sc", "M.A", "M.Sc", "B.Ed", "M.Ed", "MSW", "BFA", "MFA", "BJMC", "MJMC", "B.Agri", "B.A. (Hons)", "BCT & CA", "B.El.Ed", "B.F.Sc.", "B.J", "B.Lib.I.Sc.", "B.Lib.Sc", "B.Litt", "ETT", "TTC", "P.P.T.T.C",
        { isHeader: true, label: 'Doctorate' },
        "PhD", "M.Phil", "LL.D.", "D.Litt", "Pharm.D", "FPM",
        { isHeader: true, label: 'Non-Graduate' },
        "Diploma/Certificate", "Class XII", "Trade School", "Class X or Below",
        { isHeader: true, label: 'Other' },
        "Other"
    ];
    const employmentTypes = ["Private Sector", "Government/Public Sector", "Civil Service", "Defense", "Business/Self Employed", "Not Working", "Student", "Retired", "Other"];
    const occupations = ["Software Professional", "Manager", "Engineer", "Doctor", "Teacher", "Banker", "Civil Services", "Business Owner", "Accountant", "Administrator", "Architect", "Consultant", "Designer", "Lawyer", "Marketing Professional", "Pharmacist", "Sales Professional", "Writer/Editor", "Other"];
    const currencies = ["INR", "USD", "EUR", "GBP", "AED", "SGD", "MYR", "LKR"];

    return (
        <div className="register-page">
            <div className="new-landing-wrapper">
                {/* Landing Navbar */}
                <nav className="landing-navbar">
                    <div className="landing-navbar-inner">
                        <div className="landing-navbar-logo">
                            <img src="/logo.png" alt="Sri Mayan" />
                        </div>
                        <div className="landing-navbar-actions">
                            <button className="landing-nav-login" onClick={() => setShowLoginModal(true)}>Login</button>
                            <button className="landing-nav-register" onClick={() => setShowRegistrationForm(true)}>Register</button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="new-hero-section">
                    <div className="new-hero-content">
                        <h2 className="new-hero-title">
                            <span className="title-white">Find Your Perfect Match</span><br />
                            <span className="title-white">with </span><span className="title-gold">Sri Mayan</span>
                        </h2>

                        <div className="new-search-bar">
                            <div className="new-search-field">
                                <select>
                                    <option value="">Looking for a</option>
                                    <option value="Bride">Bride</option>
                                    <option value="Groom">Groom</option>
                                </select>
                            </div>
                            <div className="new-search-field new-search-field-age">
                                <select>
                                    <option value="">Age From</option>
                                    {Array.from({ length: 53 }, (_, i) => 18 + i).map(age => <option key={`from-${age}`} value={age}>{age}</option>)}
                                </select>
                                <span className="age-divider">to</span>
                                <select>
                                    <option value="">Age To</option>
                                    {Array.from({ length: 53 }, (_, i) => 18 + i).map(age => <option key={`to-${age}`} value={age}>{age}</option>)}
                                </select>
                            </div>
                            <div className="new-search-field">
                                <select>
                                    <option value="">Religion</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Muslim">Muslim</option>
                                    <option value="Christian">Christian</option>
                                    <option value="Sikh">Sikh</option>
                                    <option value="Jain">Jain</option>
                                    <option value="Parsi">Parsi</option>
                                    <option value="Buddhist">Buddhist</option>
                                    <option value="No Religion">No Religion</option>
                                </select>
                            </div>
                            <button className="new-search-btn">SEARCH</button>
                        </div>
                    </div>

                    <div className="new-hero-bottom-bar">
                        <div className="stat-item">
                            <h3>50+</h3>
                            <p>Communities</p>
                        </div>
                        <div className="stat-item">
                            <h3>200+</h3>
                            <p>Cities</p>
                        </div>
                        <div className="stat-item">
                            <h3>10,000+</h3>
                            <p>Success Stories</p>
                        </div>
                    </div>
                </div>

                {/* Membership Benefits Section */}
                <div className="new-benefits-section">
                    <div className="benefits-header-container">
                        <div className="gold-ribbon">Sri Mayan</div>
                        <div className="blue-ribbon">Membership Benefits</div>
                    </div>
                    <div className="benefits-cards">
                        <div className="benefit-card">
                            <div className="benefit-icon-wrapper"><ShieldCheck size={28} /></div>
                            <h4>Verified Profiles</h4>
                            <p>Sri Mayan match through Sri Mayan, and become relined in match through Sri Mayan.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon-wrapper"><Lock size={28} /></div>
                            <h4>Secure & Private</h4>
                            <p>Sri Mayan commitment becomes advancements we results.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon-wrapper"><HeartHandshake size={28} /></div>
                            <h4>Personalized Matches</h4>
                            <p>Unlimited Messages Personalized Matchmaking Profiles Presences</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon-wrapper"><Headphones size={28} /></div>
                            <h4>Dedicated Support</h4>
                            <p>Dedicated Support messaging and matchmaking support retail to slim-rooed-entities</p>
                        </div>
                    </div>
                </div>

                {/* Success Stories Section */}
                <div className="new-success-section">
                    <div className="success-header-wrapper">
                        <h2 className="success-title">Be inspired by Real Weddings</h2>
                        <p className="success-subtitle">Find inspiration for your Special Day. Yours could be the next Success Story.</p>
                    </div>
                    <div className="success-cards">
                        <div className="success-card">
                            <div className="success-img-wrapper">
                                <img src="/couple1.png" alt="Anjush & Pahuja" />
                            </div>
                            <div className="success-card-inner">
                                <h4>Anjush & Pahuja</h4>
                                <p>Marriage leads to the life of sharing, caring and endless love for each other. Thanks to Sri Mayan...</p>
                            </div>
                            <button className="success-read-more">Read More</button>
                        </div>
                        <div className="success-card">
                            <div className="success-img-wrapper">
                                <img src="/couple2.png" alt="Shobhit & Gaurangi" />
                            </div>
                            <div className="success-card-inner">
                                <h4>Shobhit & Gaurangi</h4>
                                <p>We enrolled with Sri Mayan last year in December for 3 months personalized service for my son Shobhi...</p>
                            </div>
                            <button className="success-read-more">Read More</button>
                        </div>
                        <div className="success-card">
                            <div className="success-img-wrapper">
                                <img src="/couple3.png" alt="Kanika and Siddharth" />
                            </div>
                            <div className="success-card-inner">
                                <h4>Kanika and Siddharth</h4>
                                <p>I am happy to share that I am proud of my decision to register my daughter's profile on Sri Mayan. S...</p>
                            </div>
                            <button className="success-read-more">Read More</button>
                        </div>
                    </div>
                </div>

                {/* Three Simple Steps Section */}
                <div className="new-steps-section">
                    <div className="steps-header">
                        <h5 className="steps-subtitle">THREE SIMPLE STEPS TO</h5>
                        <h2 className="steps-title">Find the <span className="steps-highlight">One for You</span></h2>
                    </div>
                    <div className="steps-container">
                        <div className="step-item">
                            <div className="step-illustration">
                                <svg viewBox="0 0 200 120" width="100%" height="120" fill="none">
                                    <rect x="25" y="30" width="15" height="15" rx="3" fill="#E1C174" />
                                    <path d="M29 37 L32 40 L37 34" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <rect x="50" y="33" width="90" height="8" rx="4" fill="#E2E8F0" />

                                    <rect x="25" y="60" width="15" height="15" rx="3" fill="#E2E8F0" />
                                    <rect x="50" y="63" width="60" height="8" rx="4" fill="#E2E8F0" />

                                    <rect x="25" y="90" width="15" height="15" rx="3" fill="#E1C174" />
                                    <path d="M29 97 L32 100 L37 94" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <rect x="50" y="93" width="70" height="8" rx="4" fill="#E2E8F0" />

                                    <rect x="65" y="45" width="120" height="40" rx="20" fill="#ffffff" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.08))" />
                                    <rect x="85" y="55" width="80" height="2" fill="#E2E8F0" />
                                    <rect x="85" y="55" width="40" height="2" fill="#E1C174" />
                                    <circle cx="85" cy="56" r="3" fill="#fff" stroke="#E1C174" strokeWidth="2" />
                                    <circle cx="125" cy="56" r="3" fill="#fff" stroke="#E1C174" strokeWidth="2" />

                                    <rect x="85" y="75" width="80" height="2" fill="#E2E8F0" />
                                    <rect x="105" y="75" width="40" height="2" fill="#E1C174" />
                                    <circle cx="105" cy="76" r="3" fill="#fff" stroke="#E1C174" strokeWidth="2" />
                                    <circle cx="145" cy="76" r="3" fill="#fff" stroke="#E1C174" strokeWidth="2" />
                                </svg>
                            </div>
                            <h4 className="step-title"><span className="step-number">01.</span> Define Your Partner Preferences</h4>
                        </div>

                        <div className="step-item">
                            <div className="step-illustration">
                                <svg viewBox="0 0 200 120" width="100%" height="120" fill="none">
                                    <rect x="90" y="15" width="90" height="24" rx="12" fill="#fff" stroke="#E2E8F0" strokeWidth="1" />
                                    <text x="105" y="31" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Search</text>
                                    <circle cx="165" cy="27" r="3" stroke="#E1C174" strokeWidth="1.5" />
                                    <path d="M167 29 L171 33" stroke="#E1C174" strokeWidth="1.5" strokeLinecap="round" />

                                    <rect x="30" y="15" width="50" height="24" rx="12" fill="#F8FAFC" />
                                    <circle cx="42" cy="27" r="6" stroke="#94A3B8" strokeWidth="1.5" />
                                    <circle cx="42" cy="24" r="2.5" stroke="#94A3B8" strokeWidth="1.5" />
                                    <path d="M37 31 C37 29, 47 29, 47 31" stroke="#94A3B8" strokeWidth="1.5" />
                                    <rect x="55" y="25" width="20" height="4" rx="2" fill="#E2E8F0" />

                                    <rect x="25" y="50" width="120" height="40" rx="4" fill="#fff" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.08))" />
                                    <circle cx="45" cy="70" r="10" stroke="#1E293B" strokeWidth="1.5" />
                                    <circle cx="45" cy="66" r="4" fill="#FDF5E6" />
                                    <circle cx="45" cy="66" r="4" stroke="#1E293B" strokeWidth="1.5" />
                                    <path d="M37 76 C37 72, 53 72, 53 76" stroke="#1E293B" strokeWidth="1.5" />
                                    <rect x="65" y="60" width="65" height="6" rx="3" fill="#94A3B8" />
                                    <rect x="65" y="73" width="40" height="4" rx="2" fill="#E2E8F0" />

                                    <circle cx="45" cy="110" r="8" stroke="#E2E8F0" strokeWidth="1.5" />
                                    <circle cx="45" cy="107" r="3" stroke="#E2E8F0" strokeWidth="1.5" />
                                    <path d="M39 115 C39 112, 51 112, 51 115" stroke="#E2E8F0" strokeWidth="1.5" />
                                    <rect x="65" y="105" width="50" height="4" rx="2" fill="#F1F5F9" />
                                    <rect x="65" y="113" width="30" height="4" rx="2" fill="#F1F5F9" />
                                </svg>
                            </div>
                            <h4 className="step-title"><span className="step-number">02.</span> Browse Profiles</h4>
                        </div>

                        <div className="step-item">
                            <div className="step-illustration">
                                <svg viewBox="0 0 200 120" width="100%" height="120" fill="none">
                                    <g transform="translate(15, 30) rotate(-10)">
                                        <rect x="0" y="0" width="80" height="90" rx="4" fill="#fff" stroke="#E2E8F0" strokeWidth="1" />
                                        <circle cx="40" cy="35" r="12" stroke="#E2E8F0" strokeWidth="1.5" />
                                        <circle cx="40" cy="30" r="5" stroke="#E2E8F0" strokeWidth="1.5" />
                                        <path d="M30 43 C30 38, 50 38, 50 43" stroke="#E2E8F0" strokeWidth="1.5" />
                                        <rect x="25" y="60" width="30" height="4" rx="2" fill="#F1F5F9" />
                                        <rect x="20" y="70" width="40" height="4" rx="2" fill="#F1F5F9" />
                                    </g>

                                    <g transform="translate(105, 15) rotate(10)">
                                        <rect x="0" y="0" width="80" height="90" rx="4" fill="#fff" stroke="#E2E8F0" strokeWidth="1" />
                                        <circle cx="40" cy="35" r="12" stroke="#E2E8F0" strokeWidth="1.5" />
                                        <circle cx="40" cy="30" r="5" stroke="#E2E8F0" strokeWidth="1.5" />
                                        <path d="M30 43 C30 38, 50 38, 50 43" stroke="#E2E8F0" strokeWidth="1.5" />
                                        <rect x="25" y="60" width="30" height="4" rx="2" fill="#F1F5F9" />
                                        <rect x="20" y="70" width="40" height="4" rx="2" fill="#F1F5F9" />
                                    </g>

                                    <g transform="translate(60, 20)">
                                        <rect x="0" y="0" width="80" height="95" rx="6" fill="#fff" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.1))" />
                                        <path d="M10 0 L20 0 L20 15 L15 10 L10 15 Z" fill="#E1C174" />
                                        <circle cx="40" cy="40" r="14" stroke="#1E293B" strokeWidth="1.5" />
                                        <circle cx="40" cy="35" r="6" fill="#FDF5E6" />
                                        <circle cx="40" cy="35" r="6" stroke="#1E293B" strokeWidth="1.5" />
                                        <path d="M28 50 C28 44, 52 44, 52 50" stroke="#1E293B" strokeWidth="1.5" />
                                        <rect x="25" y="65" width="30" height="5" rx="2.5" fill="#94A3B8" />
                                        <rect x="20" y="78" width="40" height="4" rx="2" fill="#E2E8F0" />

                                        <circle cx="15" cy="85" r="12" fill="#E1C174" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
                                        <path d="M11.5 81.5 c.5 0 .5 .5 1 1 s.5 1 1 1 s0 1 -1 1 c-1.5 0 -3 -1.5 -3 -3 c0 -1 0 -1 1 -1 s1 .5 1 1 Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </div>
                            <h4 className="step-title"><span className="step-number">03.</span> Send Interests & Connect</h4>
                        </div>
                    </div>
                    <button className="steps-btn-started">Get Started</button>
                </div>

                {/* Trust / About Section */}
                <div className="new-trust-section">
                    <div className="trust-content">
                        <div className="trust-img">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60" alt="Team" />
                        </div>
                        <div className="trust-text">
                            <span className="trust-label">Trust</span>
                            <h3>Sri Mayan's Commitment to Trusted Matchmaking</h3>
                            <p>Sri Mayan's Commitment to Trusted Matchmaking ensures secure matches. We consistently assess profiles with teams and strict criteria to maintain our highly trusted platform.</p>

                            <h4>About Us</h4>
                            <p>Our commitment to trusted matchmaking ensures secure and lifelong results for all our happy couples. We help millions of South Asians find their meaningful connection.</p>
                        </div>
                    </div>
                </div>

                {/* Custom Footer inside Landing Layout */}
                <div className="new-footer">
                    <div className="footer-columns">
                        <div className="footer-col">
                            <h4>Browse Profiles by Religion</h4>
                            <ul>
                                <li>Hindu</li>
                                <li>Muslim</li>
                                <li>Christian</li>
                                <li>Parsi</li>
                                <li>Jain</li>
                                <li>Buddhist</li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Browse by Caste</h4>
                            <ul>
                                <li>Caste</li>
                                <li>Mudaliyar</li>
                                <li>Brahmin</li>
                                <li>Rajput</li>
                                <li>Nadar</li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul>
                                <li>About Us</li>
                                <li>Contact</li>
                                <li>Blog</li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Help & Support</h4>
                            <div className="social-icons">
                                <span className="social-icon">f</span>
                                <span className="social-icon">igt</span>
                                <span className="social-icon">tw</span>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2024 Sri Mayan Matrimony. All Rights Reserved.</p>
                    </div>
                </div>
            </div>

            {showLoginModal && (
                <div className="custom-login-modal-overlay">
                    <div className="custom-login-modal">
                        <button className="custom-login-close" onClick={() => { setShowLoginModal(false); setLoginOtpMode(false); setLoginError(''); setLoginOtp(''); }}>
                            <X size={20} color="#b1b1b1" />
                        </button>
                        <h2 className="custom-login-title">Welcome back! Please Login</h2>

                        {loginError && (
                            <div style={{ color: '#e74c3c', fontSize: '0.85rem', marginBottom: '10px', padding: '8px 12px', background: '#fdf2f2', borderRadius: '6px', border: '1px solid #fecaca' }}>
                                {loginError}
                            </div>
                        )}

                        <div className="custom-login-field">
                            <label>Mobile No. / Email ID</label>
                            <input
                                type="text"
                                placeholder="Enter Mobile no. / Email ID"
                                value={loginForm.username}
                                onChange={(e) => { setLoginForm(prev => ({ ...prev, username: e.target.value })); setLoginError(''); }}
                            />
                        </div>

                        {!loginOtpMode ? (
                            <>
                                <div className="custom-login-field">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        value={loginForm.password}
                                        onChange={(e) => { setLoginForm(prev => ({ ...prev, password: e.target.value })); setLoginError(''); }}
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
                                    />
                                </div>

                                <div className="custom-login-options">
                                    <label className="custom-login-stay">
                                        <input type="checkbox" defaultChecked />
                                        <span>Stay Logged in</span>
                                        <HelpCircle size={15} color="#999" style={{ marginLeft: '4px', cursor: 'help' }} />
                                    </label>
                                    <a href="#forgot" className="custom-login-forgot">Forgot Password?</a>
                                </div>

                                <button className="custom-login-btn primary" onClick={handleLogin}>Login</button>

                                <div className="custom-login-divider">
                                    <span>OR</span>
                                </div>

                                <button className="custom-login-btn primary-outline" onClick={handleLoginWithOtp}>Login with OTP</button>
                            </>
                        ) : (
                            <>
                                <div className="custom-login-field">
                                    <label>Enter OTP sent to {loginForm.username}</label>
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={loginOtp}
                                        onChange={(e) => { setLoginOtp(e.target.value); setLoginError(''); }}
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleVerifyLoginOtp(); }}
                                        maxLength={6}
                                    />
                                </div>

                                <button className="custom-login-btn primary" onClick={handleVerifyLoginOtp}>Verify OTP & Login</button>

                                <button
                                    className="custom-login-btn primary-outline"
                                    onClick={() => { setLoginOtpMode(false); setLoginOtp(''); setLoginError(''); }}
                                >
                                    Back to Password Login
                                </button>
                            </>
                        )}

                        <p className="custom-login-footer">
                            New to Sri Mayan? <a href="#register" onClick={(e) => { e.preventDefault(); setShowLoginModal(false); setLoginOtpMode(false); setLoginError(''); setShowRegistrationForm(true); }}>Register Free &gt;</a>
                        </p>
                    </div>
                </div>
            )}

            {showRegistrationForm && (
                <div className="jv-register-overlay">
                    <div className="jv-register-header">
                        <div className="jv-register-header-top">
                            {jvStep > 0 && jvStep < 4 && (
                                <button
                                    onClick={() => setJvStep(jvStep - 1)}
                                    className="jv-nav-back-btn"
                                    title="Go Back"
                                >
                                    <ArrowLeft size={20} color="#333" />
                                </button>
                            )}
                            <div className="jv-logo-box">
                                <img src="/logo.png" alt="Sri Mayan" style={{ width: '120px', height: 'auto' }} />
                            </div>
                            <button className="jv-close-btn" onClick={() => setShowRegistrationForm(false)}>
                                <X size={20} color="#333" />
                            </button>
                        </div>
                        {jvStep > 0 && jvStep <= 3 && (
                            <div className="jv-register-tabs">
                                <div className={`jv-tab ${jvStep === 1 ? 'active' : ''} ${highestCompletedStep >= 1 ? '' : 'disabled'}`} onClick={() => handleTabClick(1)}>Profile Details</div>
                                <div className={`jv-tab ${jvStep === 2 ? 'active' : ''} ${highestCompletedStep >= 2 ? '' : 'disabled'}`} onClick={() => handleTabClick(2)}>Career Details</div>
                                <div className={`jv-tab ${jvStep === 3 ? 'active' : ''} ${highestCompletedStep >= 3 ? '' : 'disabled'}`} onClick={() => handleTabClick(3)}>Lifestyle & Family</div>
                            </div>
                        )}
                        {jvStep === 4 && (
                            <div className="jv-register-tabs">
                                <div className="jv-tab active" style={{ cursor: 'default' }}>Phone Verification</div>
                            </div>
                        )}
                    </div>

                    <div className="jv-register-body">
                        {jvStep < 4 && (
                            <h2 className="jv-main-title" style={{ fontSize: jvStep > 1 ? '1.5rem' : '1.3rem', color: '#666', fontWeight: 300 }}>
                                {jvStep === 0 && "Welcome! Your journey to finding the right match begins now"}
                                {jvStep === 1 && "Complete your profile now to contact members you like and to receive interests"}
                                {jvStep === 2 && "Great! You are about to complete your Sri Mayan profile."}
                                {jvStep === 3 && "Great! You are about to complete your Sri Mayan profile."}
                            </h2>
                        )}

                        {jvStep === 0 && (
                            <div className="jv-step0-container">
                                <div className="jv-mandatory-note" style={{ textAlign: 'right', marginBottom: '10px' }}>
                                    mandatory <span className="jv-asterisk">*</span>
                                </div>

                                <div className="jv-step0-input-row">
                                    <input type="email" name="email" className="jv-step0-input" placeholder="Your Email *" value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div className="jv-step0-input-row" style={{ display: 'flex' }}>
                                    <select
                                        style={{ width: '80px', padding: '10px', border: '1px solid #d1d5db', borderRight: 'none', borderRadius: '4px 0 0 4px', outline: 'none', background: '#f3f4f6', fontSize: '1rem', color: '#1f2937' }}
                                        value={isdCode}
                                        onChange={(e) => setIsdCode(e.target.value)}
                                    >
                                        <option value="+91">+91</option>
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                        <option value="+971">+971</option>
                                        <option value="+61">+61</option>
                                    </select>
                                    <input type="tel" name="mobile" className="jv-step0-input" style={{ borderRadius: '0 4px 4px 0', borderLeft: '1px solid #d1d5db' }} placeholder="Mobile No. *" value={formData.mobile} onChange={handleInputChange} />
                                </div>
                                <div className="jv-step0-input-row">
                                    <input type="password" name="password" className="jv-step0-input" placeholder="Create New Password *" value={formData.password} onChange={handleInputChange} />
                                    <span className="jv-step0-hint">Hint: Use 8 or more characters with a mix of letters(a-z) & numbers(0-9)</span>
                                </div>
                                <div className="jv-step0-input-row">
                                    <SearchableSelect
                                        name="profileFor"
                                        value={formData.profileFor}
                                        onChange={handleInputChange}
                                        placeholder="Create profile for *"
                                        options={['Self', 'Son', 'Daughter', 'Relative/Friend', 'Other']}
                                    />
                                </div>

                                {formData.profileFor && formData.profileFor !== 'Son' && formData.profileFor !== 'Daughter' && (
                                    <div className="jv-step0-input-row">
                                        <SearchableSelect
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            placeholder="Gender *"
                                            options={['Male', 'Female']}
                                        />
                                    </div>
                                )}

                                {Object.keys(jvErrors).length > 0 && (
                                    <div style={{ background: '#fdf2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 15px', marginBottom: '15px' }}>
                                        {Object.values(jvErrors).map((err, i) => (
                                            <p key={i} style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '3px 0' }}>• {err}</p>
                                        ))}
                                    </div>
                                )}

                                <div style={{ textAlign: 'center' }}>
                                    <button className="jv-register-me-btn gold-theme" onClick={() => handleJvNext(1)}>Register me</button>
                                </div>
                            </div>
                        )}

                        {jvStep > 0 && (
                            <div className="jv-content-split">
                                {jvStep === 1 && (
                                    <div className="jv-form-section">
                                        <div className="jv-mandatory-note">mandatory <span className="jv-asterisk">*</span></div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Name <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group column">
                                                <div className="jv-input-with-action">
                                                    <input type="text" name="fullName" placeholder="Full Name" className="jv-input" value={formData.fullName} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Date of Birth <span className="jv-asterisk">*</span></label>
                                            <div className="jv-date-group">
                                                <SearchableSelect
                                                    name="dobDay"
                                                    value={formData.dobDay}
                                                    onChange={handleInputChange}
                                                    placeholder="Day"
                                                    options={Array.from({ length: 31 }, (_, i) => String(i + 1))}
                                                />
                                                <SearchableSelect
                                                    name="dobMonth"
                                                    value={formData.dobMonth}
                                                    onChange={handleInputChange}
                                                    placeholder="Month"
                                                    options={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                                                />
                                                <SearchableSelect
                                                    name="dobYear"
                                                    value={formData.dobYear}
                                                    onChange={handleInputChange}
                                                    placeholder="Year"
                                                    options={Array.from({ length: 50 }, (_, i) => String(new Date().getFullYear() - 18 - i))}
                                                />
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Mother tongue <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="motherTongue"
                                                    value={formData.motherTongue}
                                                    onChange={handleInputChange}
                                                    placeholder="Select language"
                                                    options={languages}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Religion <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="religion"
                                                    value={formData.religion}
                                                    onChange={handleInputChange}
                                                    placeholder="Select religion"
                                                    options={religions}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Sect</label>
                                            <div className="jv-input-group">
                                                <input
                                                    type="text"
                                                    list="sect-options"
                                                    name="sect"
                                                    value={formData.sect}
                                                    onChange={handleInputChange}
                                                    placeholder="Type or select sect"
                                                    disabled={!formData.religion}
                                                    className="full"
                                                    style={{ padding: '10px 14px', width: '100%', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', background: !formData.religion ? '#f3f4f6' : '#fff' }}
                                                />
                                                <datalist id="sect-options">
                                                    {availableSects.map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </datalist>
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Caste <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="caste"
                                                    value={formData.caste}
                                                    onChange={handleInputChange}
                                                    placeholder="Select caste"
                                                    options={availableCastes}
                                                    disabled={!formData.religion}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Marital Status <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="maritalStatus"
                                                    value={formData.maritalStatus}
                                                    onChange={handleInputChange}
                                                    placeholder="Select Marital Status"
                                                    options={['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce']}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        {formData.maritalStatus && formData.maritalStatus !== 'Never Married' && (
                                            <div className="jv-form-row">
                                                <label className="jv-label">Having Children?</label>
                                                <div className="jv-input-group">
                                                    <SearchableSelect
                                                        name="havingChildren"
                                                        value={formData.havingChildren}
                                                        onChange={handleInputChange}
                                                        placeholder="Select"
                                                        options={['Yes', 'No']}
                                                        className="full"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {formData.maritalStatus && formData.maritalStatus !== 'Never Married' && formData.havingChildren === 'Yes' && (
                                            <div className="jv-form-row">
                                                <label className="jv-label">Number of Children</label>
                                                <div className="jv-input-group">
                                                    <SearchableSelect
                                                        name="numberOfChildren"
                                                        value={formData.numberOfChildren}
                                                        onChange={handleInputChange}
                                                        placeholder="Select"
                                                        options={['1', '2', '3', '4+']}
                                                        className="full"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="jv-form-row">
                                            <label className="jv-label">Height <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="height"
                                                    value={formData.height}
                                                    onChange={handleInputChange}
                                                    placeholder="Select Height"
                                                    options={heights}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        {formData.religion === 'Hindu' && (
                                            <>
                                                <div className="jv-subheading">Horoscope Details</div>

                                                <div className="jv-form-row">
                                                    <label className="jv-label">Horoscope (Rasi)</label>
                                                    <div className="jv-input-group">
                                                        <SearchableSelect
                                                            name="horoscope"
                                                            value={formData.horoscope}
                                                            onChange={handleInputChange}
                                                            placeholder="Select Horoscope"
                                                            options={["Mesham (Aries)", "Rishabam (Taurus)", "Midhunam (Gemini)", "Kadagam (Cancer)", "Simmam (Leo)", "Kanni (Virgo)", "Thulam (Libra)", "Viruchigam (Scorpio)", "Dhanusu (Sagittarius)", "Magaram (Capricorn)", "Kumbam (Aquarius)", "Meenam (Pisces)", "Don't know"]}
                                                            className="full"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="jv-form-row">
                                                    <label className="jv-label">Time of Birth</label>
                                                    <div className="jv-input-group">
                                                        <input
                                                            type="time"
                                                            name="timeOfBirth"
                                                            value={formData.timeOfBirth || ''}
                                                            onChange={handleInputChange}
                                                            className="jv-input"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="jv-form-row">
                                                    <label className="jv-label">Place of Birth</label>
                                                    <div className="jv-input-group">
                                                        <input
                                                            type="text"
                                                            name="placeOfBirth"
                                                            value={formData.placeOfBirth || ''}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter city of birth"
                                                            className="jv-input"
                                                        />
                                                    </div>
                                                </div>

                                            </>
                                        )}

                                        <div className="jv-form-row jv-submit-row">
                                            {Object.keys(jvErrors).length > 0 && (
                                                <div style={{ background: '#fdf2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 15px', marginBottom: '15px', width: '100%' }}>
                                                    {Object.values(jvErrors).map((err, i) => (
                                                        <p key={i} style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '3px 0' }}>• {err}</p>
                                                    ))}
                                                </div>
                                            )}
                                            <button className="jv-submit-btn" onClick={() => handleJvNext(2)}>Continue to Career Details</button>
                                        </div>
                                    </div>
                                )}

                                {jvStep === 2 && (
                                    <div className="jv-form-section">
                                        <div className="jv-mandatory-note">mandatory <span className="jv-asterisk">*</span></div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Country <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    placeholder="Select Country"
                                                    options={countries}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        {formData.country === 'India' ? (
                                            <>
                                                <div className="jv-form-row">
                                                    <label className="jv-label">State <span className="jv-asterisk">*</span></label>
                                                    <div className="jv-input-group">
                                                        <SearchableSelect
                                                            name="state"
                                                            value={formData.state}
                                                            onChange={handleInputChange}
                                                            placeholder="Select State"
                                                            options={availableStates}
                                                            disabled={!formData.country}
                                                            className="full"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="jv-form-row">
                                                    <label className="jv-label">City living in <span className="jv-asterisk">*</span></label>
                                                    <div className="jv-input-group">
                                                        <SearchableSelect
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleInputChange}
                                                            placeholder="Select City"
                                                            options={availableCities}
                                                            disabled={!formData.state}
                                                            className="full"
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        ) : formData.country ? (
                                            <div className="jv-form-row">
                                                <label className="jv-label">Residential Status <span className="jv-asterisk">*</span></label>
                                                <div className="jv-input-group">
                                                    <SearchableSelect
                                                        name="residentialStatus"
                                                        value={formData.residentialStatus}
                                                        onChange={handleInputChange}
                                                        placeholder="Select Residential Status"
                                                        options={['Citizen', 'Permanent Resident', 'Work Permit', 'Student Visa', 'Temporary Visa', 'Other']}
                                                        className="full"
                                                    />
                                                </div>
                                            </div>
                                        ) : null}

                                        <div className="jv-form-row">
                                            <label className="jv-label">Highest Degree <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="education"
                                                    value={formData.education}
                                                    onChange={handleInputChange}
                                                    placeholder="Select Degree"
                                                    options={educations}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Employed In <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="employmentType"
                                                    value={formData.employmentType}
                                                    onChange={handleInputChange}
                                                    placeholder="Select Employment"
                                                    options={employmentTypes}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Occupation <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="occupation"
                                                    value={formData.occupation}
                                                    onChange={handleInputChange}
                                                    placeholder="Select Occupation"
                                                    options={occupations}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Annual Income <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group column">
                                                <SearchableSelect
                                                    name="income"
                                                    value={formData.income}
                                                    onChange={handleInputChange}
                                                    placeholder="Select Income"
                                                    options={['No Income', '0 - 1 Lakh', '1 - 3 Lakhs', '3 - 5 Lakhs', '5 - 7 Lakhs', '7 - 10 Lakhs', '10 - 15 Lakhs', '15 - 20 Lakhs', '20 - 30 Lakhs', '30 Lakhs and above']}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        <div className="jv-form-row jv-submit-row">
                                            {Object.keys(jvErrors).length > 0 && (
                                                <div style={{ background: '#fdf2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 15px', marginBottom: '15px', width: '100%' }}>
                                                    {Object.values(jvErrors).map((err, i) => (
                                                        <p key={i} style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '3px 0' }}>• {err}</p>
                                                    ))}
                                                </div>
                                            )}
                                            <button className="jv-submit-btn" onClick={() => handleJvNext(3)}>Continue to Lifestyle Details</button>
                                        </div>
                                    </div>
                                )}

                                {jvStep === 3 && (
                                    <div className="jv-form-section">
                                        <div className="jv-mandatory-note">mandatory <span className="jv-asterisk">*</span></div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Diet <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="diet"
                                                    value={formData.diet || ''}
                                                    onChange={handleInputChange}
                                                    placeholder="Select Diet"
                                                    options={['Veg', 'Non-Veg', 'Eggetarian', 'Jain', 'Vegan']}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Smoking <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="smoking"
                                                    value={formData.smoking}
                                                    onChange={handleInputChange}
                                                    placeholder="Select Smoking habit"
                                                    options={['No', 'Occasionally', 'Yes']}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Drinking <span className="jv-asterisk">*</span></label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="drinking"
                                                    value={formData.drinking}
                                                    onChange={handleInputChange}
                                                    placeholder="Select Drinking habit"
                                                    options={['No', 'Drinks Socially', 'Yes']}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        <h3 style={{ fontSize: '1.3rem', color: '#666', fontWeight: 300, marginTop: '2rem', marginBottom: '0.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>We would love to know about your family.</h3>

                                        <div className="jv-form-row" style={{ paddingTop: '10px' }}>
                                            <label className="jv-label">Family type</label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="familyType"
                                                    value={formData.familyType}
                                                    onChange={handleInputChange}
                                                    placeholder="Select Family Type"
                                                    options={['Joint Family', 'Nuclear Family', 'Others']}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Father's Occupation</label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="fatherOccupation"
                                                    value={formData.fatherOccupation}
                                                    onChange={handleInputChange}
                                                    placeholder="Select Father's Occupation"
                                                    options={['Business', 'Government Service', 'Private Service', 'Professional', 'Retired', 'Farmer', 'Not Employed', 'Passed Away']}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Mother's Occupation</label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="motherOccupation"
                                                    value={formData.motherOccupation}
                                                    onChange={handleInputChange}
                                                    placeholder="Select Mother's Occupation"
                                                    options={['Homemaker', 'Business', 'Government Service', 'Private Service', 'Professional', 'Retired', 'Not Employed', 'Passed Away']}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        <div className="jv-form-row">
                                            <label className="jv-label">Brothers</label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="brothers"
                                                    value={formData.brothers}
                                                    onChange={handleInputChange}
                                                    placeholder="Select"
                                                    options={['None', '1', '2', '3', '3+']}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        {formData.brothers && formData.brothers !== 'None' && (
                                            <div className="jv-form-row">
                                                <label className="jv-label">Brothers Married</label>
                                                <div className="jv-input-group">
                                                    <SearchableSelect
                                                        name="brothersMarried"
                                                        value={formData.brothersMarried}
                                                        onChange={handleInputChange}
                                                        placeholder="Select"
                                                        options={['1', '2', '3', '3+']}
                                                        className="full"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="jv-form-row">
                                            <label className="jv-label">Sisters</label>
                                            <div className="jv-input-group">
                                                <SearchableSelect
                                                    name="sisters"
                                                    value={formData.sisters}
                                                    onChange={handleInputChange}
                                                    placeholder="Select"
                                                    options={['None', '1', '2', '3', '3+']}
                                                    className="full"
                                                />
                                            </div>
                                        </div>

                                        {formData.sisters && formData.sisters !== 'None' && (
                                            <div className="jv-form-row">
                                                <label className="jv-label">Sisters Married</label>
                                                <div className="jv-input-group">
                                                    <SearchableSelect
                                                        name="sistersMarried"
                                                        value={formData.sistersMarried}
                                                        onChange={handleInputChange}
                                                        placeholder="Select"
                                                        options={['1', '2', '3', '3+']}
                                                        className="full"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="jv-form-row">
                                            <label className="jv-label">Contact Address</label>
                                            <div className="jv-input-group">
                                                <input type="text" className="jv-input" name="contactAddress" placeholder="Enter contact address" value={formData.contactAddress} onChange={handleInputChange} />
                                            </div>
                                        </div>

                                        <div className="jv-form-row jv-submit-row">
                                            <button
                                                className="jv-submit-btn"
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setJvStep(4);
                                                }}
                                            >
                                                Complete Registration
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {jvStep === 4 && (
                                    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px 0' }}>
                                        <h2 style={{ fontSize: '1.6rem', color: '#444', fontWeight: 400, textAlign: 'center', marginBottom: '15px' }}>We are almost done!</h2>
                                        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.9rem', maxWidth: '550px', margin: '0 auto 35px', lineHeight: '1.7' }}>
                                            To let you connect with other members or for you to get contacted by them, we need to verify that this number belongs to you.
                                            Just click the button below and follow the instructions - it will just take a few seconds
                                        </p>

                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
                                            <label style={{ color: '#555', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Mobile number</label>
                                            <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                                                <select
                                                    value={isdCode}
                                                    onChange={(e) => setIsdCode(e.target.value)}
                                                    style={{ background: '#f7f7f7', padding: '10px 8px', borderRight: '1px solid #ccc', border: 'none', color: '#333', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', outline: 'none' }}
                                                >
                                                    <option value="+91">🇮🇳 +91</option>
                                                    <option value="+1">🇺🇸 +1</option>
                                                    <option value="+44">🇬🇧 +44</option>
                                                    <option value="+971">🇦🇪 +971</option>
                                                    <option value="+65">🇸🇬 +65</option>
                                                    <option value="+60">🇲🇾 +60</option>
                                                    <option value="+61">🇦🇺 +61</option>
                                                    <option value="+64">🇳🇿 +64</option>
                                                    <option value="+94">🇱🇰 +94</option>
                                                    <option value="+49">🇩🇪 +49</option>
                                                    <option value="+33">🇫🇷 +33</option>
                                                    <option value="+966">🇸🇦 +966</option>
                                                    <option value="+974">🇶🇦 +974</option>
                                                    <option value="+968">🇴🇲 +968</option>
                                                    <option value="+977">🇳🇵 +977</option>
                                                </select>
                                                <input
                                                    type="tel"
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter mobile number"
                                                    maxLength={10}
                                                    style={{ border: 'none', outline: 'none', padding: '10px 15px', fontSize: '0.95rem', color: '#333', width: '220px', background: '#fff' }}
                                                />
                                            </div>
                                        </div>

                                        {!verificationSent ? (
                                            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
                                                <button
                                                    className="jv-submit-btn"
                                                    style={{ background: '#D4AF37', maxWidth: '260px', fontSize: '1rem', padding: '12px 30px' }}
                                                    onClick={() => {
                                                        if (!formData.mobile || formData.mobile.length < 10) {
                                                            setVerificationError('Please enter a valid 10-digit mobile number');
                                                            return;
                                                        }
                                                        setVerificationError('');
                                                        setVerificationSent(true);
                                                    }}
                                                >
                                                    Verify this number
                                                </button>
                                                {verificationError && (
                                                    <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '10px' }}>{verificationError}</p>
                                                )}
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
                                                <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '15px' }}>Enter the OTP sent to {isdCode} {formData.mobile}</p>
                                                <div style={{ marginBottom: '15px' }}>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter OTP"
                                                        value={verificationOtp}
                                                        onChange={(e) => { setVerificationOtp(e.target.value); setVerificationError(''); }}
                                                        maxLength={6}
                                                        style={{ border: '1px solid #ccc', borderRadius: '6px', padding: '12px 15px', fontSize: '1.1rem', width: '220px', textAlign: 'center', letterSpacing: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                                                    />
                                                </div>
                                                {verificationError && (
                                                    <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginBottom: '10px' }}>{verificationError}</p>
                                                )}
                                                <button
                                                    className="jv-submit-btn"
                                                    style={{ background: '#D4AF37', maxWidth: '260px', fontSize: '1rem', padding: '12px 30px' }}
                                                    onClick={() => {
                                                        if (!verificationOtp || verificationOtp.length < 4) {
                                                            setVerificationError('Please enter a valid OTP');
                                                            return;
                                                        }
                                                        // Generate unique ID: SM-XXXXXX
                                                        const uniqueId = 'SM-' + Math.random().toString(36).substring(2, 8).toUpperCase();
                                                        const profileWithId = { ...formData, uniqueId, isdCode };

                                                        // Save to localStorage
                                                        localStorage.setItem('isLoggedIn', 'true');
                                                        localStorage.setItem('uniqueId', uniqueId);
                                                        localStorage.setItem('userProfile', JSON.stringify(profileWithId));

                                                        // Add to registered profiles list (for search)
                                                        const existingProfiles = JSON.parse(localStorage.getItem('registeredProfiles') || '[]');
                                                        existingProfiles.push(profileWithId);
                                                        localStorage.setItem('registeredProfiles', JSON.stringify(existingProfiles));

                                                        setVerificationSuccess(true);
                                                    }}
                                                >
                                                    Verify & Continue
                                                </button>
                                            </div>
                                        )}

                                        <div style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.82rem', color: '#777', lineHeight: '1.8', textAlign: 'left', padding: '0 10px' }}>
                                            <p style={{ marginBottom: '14px' }}>
                                                By verifying the number <strong style={{ color: '#333' }}>{formData.mobile}</strong> against this profile, I acknowledge that the other profile(s) which I have created and verified on Sri Mayan with the same number are of person(s) different from the person represented in this profile.
                                            </p>
                                            <p style={{ marginBottom: '14px' }}>
                                                We would like to inform you that by verifying the above number you are agreeing to receive calls from the customer support team of Sri Mayan, even though your number is registered with the NCPR.
                                            </p>
                                            <p style={{ color: '#D4AF37' }}>
                                                Please note that you can change your preference from the 'Alert Manager Settings' page on the Desktop site any time.
                                            </p>
                                        </div>

                                        {verificationSuccess && (
                                            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                                                <div style={{ background: '#fff', borderRadius: '12px', padding: '35px 40px', maxWidth: '420px', width: '90%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                                                    <h3 style={{ color: '#2d3748', fontSize: '1.1rem', fontWeight: 500, marginBottom: '25px', borderBottom: '2px solid #D4AF37', paddingBottom: '12px' }}>Phone Verification</h3>

                                                    <div style={{ margin: '0 auto 20px', width: '70px', height: '70px', position: 'relative' }}>
                                                        <svg viewBox="0 0 70 70" width="70" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="18" y="5" width="34" height="55" rx="5" stroke="#D4AF37" strokeWidth="2.5" fill="none" />
                                                            <line x1="28" y1="10" x2="42" y2="10" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
                                                            <circle cx="35" cy="52" r="3" stroke="#D4AF37" strokeWidth="1.5" />
                                                            <circle cx="48" cy="48" r="11" fill="#D4AF37" />
                                                            <path d="M43 48 L46.5 51.5 L53 45" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>

                                                    <h2 style={{ color: '#D4AF37', fontSize: '1.4rem', fontWeight: 600, marginBottom: '10px' }}>Congratulations !</h2>
                                                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '8px', lineHeight: '1.5' }}>
                                                        Your number {isdCode} {formData.mobile} is verified successfully.
                                                    </p>
                                                    <p style={{ color: '#333', fontSize: '0.95rem', fontWeight: 600, marginBottom: '25px', lineHeight: '1.5' }}>
                                                        Your Profile ID: <span style={{ color: '#D4AF37', fontSize: '1.1rem' }}>{localStorage.getItem('uniqueId')}</span>
                                                    </p>

                                                    <button
                                                        onClick={() => navigate('/home')}
                                                        style={{ background: 'none', border: 'none', color: '#333', fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', padding: '10px 40px', borderTop: '1px solid #eee', width: '100%', marginTop: '5px' }}
                                                    >
                                                        Okay
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {jvStep === 1 && (
                                    <div className="jv-sidebar-section">
                                        <div className="jv-sidebar-title">
                                            <span>WHY REGISTER</span>
                                        </div>

                                        <div className="jv-sidebar-items">
                                            <div className="jv-sidebar-item">
                                                <div className="jv-sidebar-icon jv-icon-profiles"><Users size={30} strokeWidth={1.5} color="#888" /></div>
                                                <div className="jv-sidebar-text">Lakhs of Genuine<br />Profiles</div>
                                            </div>
                                            <div className="jv-sidebar-item">
                                                <div className="jv-sidebar-icon jv-icon-verified"><ShieldCheck size={30} strokeWidth={1.5} color="#888" /></div>
                                                <div className="jv-sidebar-text">Many Verified by<br />Personal Visit</div>
                                            </div>
                                            <div className="jv-sidebar-item">
                                                <div className="jv-sidebar-icon jv-icon-secure"><Lock size={30} strokeWidth={1.5} color="#888" /></div>
                                                <div className="jv-sidebar-text">Secure &<br />Family Friendly</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div >
            )
            }
        </div >
    );
};

export default Register;
