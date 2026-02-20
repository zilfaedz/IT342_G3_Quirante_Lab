import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutModal from './LogoutModal';
import logo from '../assets/ReadyBarangay_Logo.png';

const ICONS = {
    home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    reports: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    map: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
    cloud: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    users: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0",
    phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
};

const Icon = ({ d, size = 18 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
    </svg>
);

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showLogoutModal, setShowLogoutModal] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <div className="brand-container">
                        <img src={logo} alt="ReadyBarangay Logo" className="brand-logo" />
                        <h1 className="brand-title">
                            <span className="brand-ready">Ready</span>
                            <span className="brand-barangay">Barangay</span>
                        </h1>
                    </div>
                </div>
                <div className="sidebar-user" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                    <div className="user-avatar">{user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}</div>
                    <div className="user-info">
                        <div className="user-name">{user?.fullName || user?.email || 'User'}</div>
                        <div className="user-role">● {user?.role === 'OFFICIAL' ? 'Barangay Official' : 'Resident'}</div>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <div className="nav-label">Main</div>
                    <a className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                        <Icon d={ICONS.home} />
                        Dashboard
                    </a>
                    <a className="nav-item" href="#">
                        <Icon d={ICONS.reports} />
                        Emergency Reports
                    </a>
                    <a className="nav-item" href="#">
                        <Icon d={ICONS.map} />
                        Evacuation Centers
                    </a>
                    <a className="nav-item" href="#">
                        <Icon d={ICONS.cloud} />
                        Weather Alerts
                    </a>
                    <div className="nav-label" style={{ marginTop: '8px' }}>Community</div>
                    <a className="nav-item" href="#">
                        <Icon d={ICONS.users} />
                        Residents
                    </a>
                    <a className="nav-item" href="#">
                        <Icon d={ICONS.phone} />
                        Hotlines
                    </a>
                    <div className="nav-label" style={{ marginTop: '8px' }}>Account</div>
                    <a className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); navigate('/profile'); }}>
                        <Icon d={ICONS.user} />
                        My Profile
                    </a>
                </nav>
                <div className="sidebar-footer">
                    <button className="btn-logout" onClick={() => setShowLogoutModal(true)}>
                        <Icon d={ICONS.logout} size={15} />
                        Logout
                    </button>
                </div>
            </aside>

            <LogoutModal
                show={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
            />
        </>
    );
};

export default Sidebar;
