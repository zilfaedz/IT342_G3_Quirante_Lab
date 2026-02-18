import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            const result = await login(email, password, rememberMe);
            if (result.success) {
                navigate('/dashboard');
            } else {
                alert(result.message);
            }
        }
    };

    return (
        <>
            <div class="circle circle-2"></div>
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
                    <button type="submit" className="submit-btn">Log in</button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/register">Create here</Link>
                </div>
            </div>
        </>
    );
};

export default Login;