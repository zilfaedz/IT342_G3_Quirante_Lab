import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Notification from "../components/Notification";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            setIsLoading(true);
            const result = await login(email, password, rememberMe);
            setIsLoading(false);
            if (result.success) {
                setNotification({ show: true, message: "Login successful!", type: 'success' });
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                setNotification({ show: true, message: "Invalid credentials. Please try again.", type: 'error' });
            }
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
                <h1 className="auth-title">Log in</h1>
                <p className="auth-subtitle">Please enter your credentials to continue</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
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
                    <div className="remember-me">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember">Remember me</label>
                        <button type="button" className="forgot-password" onClick={() => alert('Password reset not implemented yet')}>forgot password?</button>
                    </div>
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Log in'}
                    </button>

                    <div className="auth-divider">
                        <span>OR</span>
                    </div>

                    <button type="button" className="social-btn google-btn" onClick={() => alert("Google Sign-In coming soon!")}>
                        <span className="social-icon">G</span>
                        Sign in with Google
                    </button>

                    <button type="button" className="social-btn apple-btn" onClick={() => alert("Apple Sign-In coming soon!")}>
                        <span className="social-icon"></span>
                        Sign in with Apple
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/register">Create here</Link>
                </div>
            </div>
        </>
    );
};

export default Login;
