import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import Notification from "../components/Notification";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setNotification({ show: true, message: "All fields are required.", type: 'error' });
            return;
        }

        if (password.length < 6) {
            setNotification({ show: true, message: "Password must be at least 6 characters.", type: 'error' });
            return;
        }

        if (password !== confirmPassword) {
            setNotification({ show: true, message: "Passwords don't match", type: 'error' });
            return;
        }

        setIsLoading(true);
        const result = await register(firstName, lastName, email, password);
        setIsLoading(false);
        if (result.success) {
            setNotification({ show: true, message: "Success! Your account is ready. Please log in.", type: 'success' });
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } else {
            setNotification({ show: true, message: result.message, type: 'error' });
        }
    };

    return (
        <>
            <Notification
                message={notification.message}
                type={notification.type}
                show={notification.show}
                onClose={() => setNotification({ ...notification, show: false })}
            />

            <div className="circle circle-2"></div>
            <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                <a href="/" style={{ color: '#388E3C', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '2rem', display: 'inline-block' }}>
                    ← Home Page
                </a>
                <h1 className="auth-title">Sign Up</h1>
                <p className="auth-subtitle">Create your account to get started</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>

                    <div className="auth-divider">
                        <span>OR</span>
                    </div>

                    <button type="button" className="social-btn google-btn" onClick={() => alert("Google Sign-In coming soon!")}>
                        <span className="social-icon">G</span>
                        Sign up with Google
                    </button>

                    <button type="button" className="social-btn apple-btn" onClick={() => alert("Apple Sign-In coming soon!")}>
                        <span className="social-icon"></span>
                        Sign up with Apple
                    </button>

                    <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '1rem', textAlign: 'center', lineHeight: '1.4' }}>
                        By continuing, you agree to the <a href="#" style={{ color: '#388E3C', textDecoration: 'none' }}>Terms of Sale</a>, <a href="#" style={{ color: '#388E3C', textDecoration: 'none' }}>Terms of Service</a>, and <a href="#" style={{ color: '#388E3C', textDecoration: 'none' }}>Privacy Policy</a>.
                    </p>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </div>
            </div>
        </>
    );
};

export default Register;
