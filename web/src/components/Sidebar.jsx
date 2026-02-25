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
    shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
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
            <aside className="rb-sidebar">
                <div className="rb-sidebar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                    <div className="logo-icon">RB</div>
                    <div className="logo-text">
                        ReadyBarangay
                        <span>{user?.role === 'OFFICIAL' ? 'Official Portal' : 'Resident Portal'}</span>
                    </div>
                </div>

                <nav className="rb-nav">
                    <div className="rb-nav-section">Main</div>
                    <a className={`rb-nav-item ${location.pathname === '/dashboard' && !location.search ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                        <Icon d={ICONS.home} />
                        Dashboard
                    </a>
                    {(user?.role === 'OFFICIAL' || user?.role === 'Super Admin') && (
                        <a className={`rb-nav-item ${location.pathname === '/admin/verifications' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); navigate('/admin/verifications'); }}>
                            <Icon d={ICONS.shield} />
                            Captain Verifications
                        </a>
                    )}
                    <a className={`rb-nav-item ${location.pathname === '/dashboard' && location.search === '?tab=report' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard?tab=report'); }}>
                        <Icon d={ICONS.reports} />
                        Emergency Reports
                    </a>
                    <a className={`rb-nav-item ${location.pathname === '/dashboard' && location.search === '?tab=evacuation' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard?tab=evacuation'); }}>
                        <Icon d={ICONS.map} />
                        Evacuation Centers
                    </a>
                    <a className={`rb-nav-item ${location.pathname === '/dashboard' && location.search === '?tab=announcements' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard?tab=announcements'); }}>
                        <Icon d={ICONS.cloud} />
                        Announcements
                    </a>

                    <div className="rb-nav-section">Community</div>
                    <a className={`rb-nav-item ${location.pathname === '/dashboard' && location.search === '?tab=directory' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard?tab=directory'); }}>
                        <Icon d={ICONS.users} />
                        Community Directory
                    </a>
                    <a className={`rb-nav-item ${location.pathname === '/dashboard' && location.search === '?tab=hotlines' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard?tab=hotlines'); }}>
                        <Icon d={ICONS.phone} />
                        Hotlines
                    </a>

                    <div className="rb-nav-section">Account</div>
                    <a className={`rb-nav-item ${location.pathname === '/profile' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); navigate('/profile'); }}>
                        <Icon d={ICONS.user} />
                        My Profile
                    </a>
                    <a className="rb-nav-item" href="#" onClick={(e) => { e.preventDefault(); setShowLogoutModal(true); }}>
                        <Icon d={ICONS.logout} />
                        Logout
                    </a>
                </nav>

                <div className="rb-sidebar-footer">
                    <div className="rb-user-pill" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                        <div className="rb-avatar">{user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}</div>
                        <div className="rb-user-info">
                            <div className="rb-user-name">{user?.fullName || user?.email || 'User'}</div>
                            <div className="rb-user-role">{user?.role === 'OFFICIAL' ? 'Barangay Official' : 'Resident'}</div>
                        </div>
                    </div>
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
