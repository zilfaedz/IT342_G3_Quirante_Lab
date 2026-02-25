import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    CheckCircle2, ArrowRight, ArrowLeft, Check, Lock,
    Mail, Smartphone, User, Eye, EyeOff, Building,
    MapPin, Building2, Radio
} from "lucide-react";
import logo from "../assets/ReadyBarangay_Logo.png";
import "./Register.css";
import PhilippineLocationSelector from "../components/PhilippineLocationSelector";

const steps = [
    { num: 1, label: "Your Details" },
    { num: 2, label: "Barangay Info" },
];

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        role: "RESIDENT",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        barangay: "",
        barangayCode: "",
        cityName: "",
        cityCode: "",
        provinceName: "",
        provinceCode: "",
        regionName: "",
        regionCode: "",
        street: "",
        lotBlockNumber: "",
        phone: "",
        agree: false,
    });
    const [showPass, setShowPass] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

    const handleNext = () => setStep((s) => Math.min(s + 1, 2));
    const handleBack = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        setError("");

        try {
            // Create a display-friendly address string
            const fullAddress = `${form.street || ""}, ${form.barangay}, ${form.cityName}, ${form.provinceName}`;

            // Prepare data for backend (matching Node backend schema)
            const registrationData = {
                firstName: form.firstName,
                lastName: form.lastName,
                fullName: `${form.firstName} ${form.lastName}`.trim(),
                email: form.email,
                password: form.password,
                role: 'Resident', // Default for this page
                barangayCode: form.barangayCode,
                barangay: form.barangay,
                cityName: form.cityName,
                cityCode: form.cityCode,
                provinceName: form.provinceName,
                provinceCode: form.provinceCode,
                regionName: form.regionName,
                regionCode: form.regionCode,
                street: form.street,
                lotBlockNumber: form.lotBlockNumber,
                contactNumber: form.phone
            };

            const result = await register(registrationData);

            if (result.success) {
                setSubmitted(true);
            } else {
                setError(result.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError("An error occurred during registration.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="auth-page reg-page">
                <div className="auth-orb auth-orb-1" />
                <div className="auth-orb auth-orb-2" />
                <div className="auth-ring auth-ring-1" />
                <div className="auth-ring auth-ring-2" />

                <nav className="auth-nav">
                    <a href="/" className="auth-nav-logo">
                        <div className="auth-nav-logo-icon">
                            <img src={logo} alt="Logo" className="auth-logo-img" />
                        </div>
                        <span className="auth-nav-logo-text">Ready<span>Barangay</span></span>
                    </a>
                </nav>

                <div className="reg-success-wrap">
                    <div className="reg-success-card">
                        <div className="reg-success-icon"><CheckCircle2 size={64} color="var(--green-600)" /></div>
                        <h2 className="reg-success-title">Account Created!</h2>
                        <p className="reg-success-sub">
                            Welcome to ReadyBarangay. Your account has been successfully created. You can now log in to the Resident Dashboard.
                        </p>
                        <button onClick={() => navigate("/login")} className="auth-submit-btn">
                            Go to Log In <ArrowRight size={18} style={{ marginLeft: 8 }} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page reg-page">
            <div className="auth-orb auth-orb-1" />
            <div className="auth-orb auth-orb-2" />
            <div className="auth-ring auth-ring-1" />
            <div className="auth-ring auth-ring-2" />
            <div className="auth-ring auth-ring-3" />

            {/* Nav */}
            <nav className="auth-nav">
                <a href="/" className="auth-nav-logo">
                    <div className="auth-nav-logo-icon">
                        <img src={logo} alt="Logo" className="auth-logo-img" />
                    </div>
                    <span className="auth-nav-logo-text">Ready<span>Barangay</span></span>
                </a>
            </nav>

            <div className="reg-layout">

                {/* Left */}
                <div className="auth-left reg-left">
                    <div className="auth-left-inner">
                        <div className="auth-eyebrow">Create Your Account</div>
                        <h1 className="auth-hero-title">
                            Join Your<br />Barangay's<br /><span className="t-amber">Response</span><br /><span className="t-red">Network.</span>
                        </h1>
                        <p className="auth-hero-sub">
                            Sign up in minutes. Connect with your community, receive life-saving alerts,
                            and help build a more prepared barangay.
                        </p>

                        {/* Step progress sidebar */}
                        <div className="reg-step-sidebar">
                            {steps.map((s, i) => (
                                <div key={s.num} className={`reg-step-item${step === s.num ? " active" : ""}${step > s.num ? " done" : ""}`}>
                                    <div className="reg-step-bubble">
                                        {step > s.num ? <Check size={16} /> : s.num}
                                    </div>
                                    <div className="reg-step-info">
                                        <div className="reg-step-label">{s.label}</div>
                                        <div className="reg-step-status">
                                            {step > s.num ? "Completed" : step === s.num ? "In Progress" : "Pending"}
                                        </div>
                                    </div>
                                    {i < steps.length - 1 && <div className="reg-step-line" />}
                                </div>
                            ))}
                        </div>

                        <div className="auth-badge-row">
                            <div className="auth-badge"><Lock size={14} style={{ marginRight: 6 }} /> Secure Sign-Up</div>
                            <div className="auth-badge">🇵🇭 PH Barangays</div>
                            <div className="auth-badge"><CheckCircle2 size={14} style={{ marginRight: 6 }} /> Free Forever</div>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="auth-right reg-right">
                    <div className="auth-card reg-card">
                        {/* Progress bar */}
                        <div className="reg-progress-bar">
                            <div
                                className="reg-progress-fill"
                                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                            />
                        </div>

                        <div className="auth-card-header">
                            <div className="auth-card-icon">
                                <img src={logo} alt="Logo" className="auth-logo-img" />
                            </div>
                            <h2 className="auth-card-title">
                                {step === 1 && "Your Details"}
                                {step === 2 && "Barangay Info"}
                            </h2>
                            <p className="auth-card-sub">
                                Step {step} of {steps.length} —{" "}
                                {step === 1 && "Tell us about yourself"}
                                {step === 2 && "Which barangay do you belong to?"}
                            </p>
                            {error && <div className="auth-error-message" style={{ color: 'var(--color-3)', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>{error}</div>}
                        </div>

                        {/* Step 1 — Details */}
                        {step === 1 && (
                            <div className="auth-form">
                                <div className="reg-name-row">
                                    <div className="auth-field-group">
                                        <label className="auth-label">First Name</label>
                                        <div className="auth-input-wrap">
                                            <span className="auth-input-icon"><User size={16} /></span>
                                            <input
                                                type="text"
                                                className="auth-input"
                                                placeholder="Juan"
                                                value={form.firstName}
                                                onChange={(e) => update("firstName", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="auth-field-group">
                                        <label className="auth-label">Last Name</label>
                                        <div className="auth-input-wrap">
                                            <span className="auth-input-icon"><User size={16} /></span>
                                            <input
                                                type="text"
                                                className="auth-input"
                                                placeholder="dela Cruz"
                                                value={form.lastName}
                                                onChange={(e) => update("lastName", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="auth-field-group">
                                    <label className="auth-label">Email Address</label>
                                    <div className="auth-input-wrap">
                                        <span className="auth-input-icon"><Mail size={16} /></span>
                                        <input
                                            type="email"
                                            className="auth-input"
                                            placeholder="juan@barangay.ph"
                                            value={form.email}
                                            onChange={(e) => update("email", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="auth-field-group">
                                    <label className="auth-label">Phone Number</label>
                                    <div className="auth-input-wrap">
                                        <span className="auth-input-icon"><Smartphone size={16} /></span>
                                        <input
                                            type="tel"
                                            className="auth-input"
                                            placeholder="+63 917 000 0000"
                                            value={form.phone}
                                            onChange={(e) => update("phone", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="auth-field-group">
                                    <label className="auth-label">Password</label>
                                    <div className="auth-input-wrap">
                                        <span className="auth-input-icon"><Lock size={16} /></span>
                                        <input
                                            type={showPass ? "text" : "password"}
                                            className="auth-input"
                                            placeholder="Create a strong password"
                                            value={form.password}
                                            onChange={(e) => update("password", e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="auth-eye-btn"
                                            onClick={() => setShowPass(!showPass)}
                                        >
                                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="auth-field-group">
                                    <label className="auth-label">Confirm Password</label>
                                    <div className="auth-input-wrap">
                                        <span className="auth-input-icon"><Lock size={16} /></span>
                                        <input
                                            type="password"
                                            className="auth-input"
                                            placeholder="Repeat your password"
                                            value={form.confirmPassword}
                                            onChange={(e) => update("confirmPassword", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2 — Barangay & Address */}
                        {step === 2 && (
                            <form onSubmit={handleSubmit} className="auth-form">
                                <div style={{ marginBottom: 20 }}>
                                    <PhilippineLocationSelector
                                        onLocationChange={(loc) => {
                                            setForm(f => ({
                                                ...f,
                                                regionName: loc.region.name,
                                                regionCode: loc.region.code,
                                                provinceName: loc.province.name,
                                                provinceCode: loc.province.code,
                                                cityName: loc.city.name,
                                                cityCode: loc.city.code,
                                                barangay: loc.barangay.name,
                                                barangayCode: loc.barangay.code
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="reg-name-row">
                                    <div className="auth-field-group">
                                        <label className="auth-label">Street / Village / Area</label>
                                        <div className="auth-input-wrap">
                                            <span className="auth-input-icon"><MapPin size={16} /></span>
                                            <input
                                                type="text"
                                                className="auth-input"
                                                placeholder="e.g. 123 Rizal St."
                                                value={form.street}
                                                onChange={(e) => update("street", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="auth-field-group">
                                        <label className="auth-label">Lot / Block / Apt / Suite</label>
                                        <div className="auth-input-wrap">
                                            <span className="auth-input-icon"><Building size={16} /></span>
                                            <input
                                                type="text"
                                                className="auth-input"
                                                placeholder="e.g. Blk 1 Lot 2"
                                                value={form.lotBlockNumber}
                                                onChange={(e) => update("lotBlockNumber", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <label className="reg-agree-row">
                                    <input
                                        type="checkbox"
                                        className="reg-checkbox"
                                        checked={form.agree}
                                        onChange={(e) => update("agree", e.target.checked)}
                                    />
                                    <span className="reg-agree-text">
                                        I agree to the{" "}
                                        <a href="#" className="auth-forgot">Terms of Service</a>{" "}
                                        and{" "}
                                        <a href="#" className="auth-forgot">Privacy Policy</a>
                                    </span>
                                </label>

                                <div className="reg-btn-row" style={{ marginTop: 24 }}>
                                    <button type="button" onClick={handleBack} className="reg-back-btn">
                                        <ArrowLeft size={16} style={{ marginRight: 6 }} /> Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="auth-submit-btn"
                                        style={{ margin: 0 }}
                                        disabled={!form.agree || !form.barangayCode || loading}
                                    >
                                        {loading ? "Creating..." : "Create My Account"} <ArrowRight size={18} style={{ marginLeft: 8 }} />
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Nav buttons */}
                        {step < 2 && (
                            <div className="reg-btn-row">
                                {step > 1 && (
                                    <button onClick={handleBack} className="reg-back-btn">
                                        <ArrowLeft size={16} style={{ marginRight: 6 }} /> Back
                                    </button>
                                )}
                                <button
                                    onClick={handleNext}
                                    className="auth-submit-btn reg-next-btn"
                                >
                                    Continue <ArrowRight size={18} style={{ marginLeft: 8 }} />
                                </button>
                            </div>
                        )}

                        <div className="auth-card-footer">
                            <span>Already have an account?</span>
                            <button onClick={() => navigate("/login")} className="auth-switch-link">
                                Log In
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}