import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            const result = await login(email, password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                alert(result.message);
            }
        }
    };

    return (
        <div className="split-screen">
            <div className="left-panel">
                <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                    <h1 className="auth-title">Welcome back!</h1>
                    <p className="auth-subtitle">Enter your credentials to continue your academic journey</p>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email Address</label>
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
                        <button type="submit" className="submit-btn">Login</button>
                    </form>

                    <div className="auth-footer">
                        Don't have an account? <Link to="/register">Create here</Link>
                    </div>
                </div>
            </div>

            <div className="right-panel">
                <h1 className="brand-title">Web name</h1>
                <p className="brand-tagline">Simplify your shared living experience.</p>
            </div>
        </div>
    );
};

export default Login;