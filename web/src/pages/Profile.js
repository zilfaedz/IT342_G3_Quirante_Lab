import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LogoutModal from '../components/LogoutModal';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
    };

    const userName = user?.firstName ? `${user.firstName} ${user.lastName}` : (user?.name || 'Responder');
    const userInitials = user?.firstName ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : (user?.name?.substring(0, 2).toUpperCase() || 'RES');

    return (
        <div className="profile-wrapper">
            {/* ─── SIDEBAR ─── */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <a className="logo-mark" href="/">GroundWork</a>
                    <div className="logo-sub">Response Coordination</div>
                </div>
                <nav className="sidebar-nav">
                    <div className="sidebar-section-label">Main</div>
                    <a href="/dashboard" className="nav-item">
                        <div className="nav-icon">🏠</div>
                        <span className="nav-label">Overview</span>
                    </a>
                    <a href="#" className="nav-item">
                        <div className="nav-icon">📅</div>
                        <span className="nav-label">Missions</span>
                        <span className="nav-badge">2</span>
                    </a>
                    <a href="#" className="nav-item">
                        <div className="nav-icon">🎒</div>
                        <span className="nav-label">Resources</span>
                    </a>
                    <a href="#" className="nav-item">
                        <div className="nav-icon">🗺️</div>
                        <span className="nav-label">Map</span>
                    </a>
                    <div className="sidebar-section-label">Unit</div>
                    <a href="#" className="nav-item active">
                        <div className="nav-icon">👷</div>
                        <span className="nav-label">Personnel</span>
                    </a>
                    <a href="#" className="nav-item">
                        <div className="nav-icon">📡</div>
                        <span className="nav-label">Comms</span>
                    </a>
                    <a href="#" className="nav-item">
                        <div className="nav-icon">⚙️</div>
                        <span className="nav-label">Settings</span>
                    </a>
                    <div className="nav-item" onClick={() => setShowLogoutModal(true)} style={{ marginTop: 'auto' }}>
                        <div className="nav-icon">🚪</div>
                        <span className="nav-label">Log Out</span>
                    </div>
                </nav>
                <div className="sidebar-bottom">
                    <div className="user-row">
                        <div className="user-avatar-sm">GW</div>
                        <div className="user-info">
                            <div className="user-name">GroundWork HQ</div>
                            <div className="user-role">Admin</div>
                        </div>
                        <div className="user-chevron">›</div>
                    </div>
                </div>
            </aside>

            {/* ─── MAIN ─── */}
            <div className="main">

                {/* TOPBAR */}
                <header className="topbar">
                    <a href="/dashboard" className="topbar-back">← Dashboard</a>
                    <div className="topbar-divider"></div>
                    <span className="topbar-breadcrumb">{userName}</span>
                    <div className="topbar-spacer"></div>
                    <div className="topbar-icon-btn">🔔<span className="notif-dot"></span></div>
                    <button className="topbar-btn topbar-btn-outline">✉ Send Order</button>
                    <button className="topbar-btn">＋ Assign Unit</button>
                </header>

                {/* SCROLLABLE CONTENT */}
                <div className="content">

                    {/* ─── PROFILE HERO ─── */}
                    <div className="profile-hero">
                        <div className="profile-hero-inner">
                            <div className="profile-avatar-wrap">
                                <div className="profile-avatar">{userInitials}</div>
                                <div className="online-badge"></div>
                            </div>
                            <div className="profile-hero-info">
                                <div className="profile-name">{userName}</div>
                                <div className="profile-handle">Deployed since January 2025 · Sector 4</div>
                                <div className="profile-tags">
                                    <span className="profile-tag gold">★ Squad Leader</span>
                                    <span className="profile-tag">EMT-B</span>
                                    <span className="profile-tag">Active</span>
                                    <span className="profile-tag">Search & Rescue</span>
                                </div>
                            </div>
                        </div>

                        {/* TAB NAV */}
                        <div className="profile-tabs">
                            <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => switchTab('overview')}>Overview</button>
                            <button className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => switchTab('bookings')}>Missions</button>
                            <button className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => switchTab('payments')}>Certifications</button>
                            <button className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => switchTab('notes')}>Logs</button>
                        </div>
                    </div>

                    {/* ─── PAGE BODY ─── */}
                    <div className="page-body">

                        {/* ══ OVERVIEW TAB ══ */}
                        {activeTab === 'overview' && (
                            <div id="tab-overview">
                                <div className="profile-grid">

                                    {/* LEFT COLUMN */}
                                    <div>
                                        {/* CONTACT INFO */}
                                        <div className="panel">
                                            <div className="panel-header">
                                                <span className="panel-title">Contact Info</span>
                                                <button className="panel-action">Edit</button>
                                            </div>
                                            <div className="info-list">
                                                <div className="info-row">
                                                    <div className="info-icon">📧</div>
                                                    <div className="info-content">
                                                        <div className="info-label">Email</div>
                                                        <div className="info-value link">{user?.email || 'N/A'}</div>
                                                    </div>
                                                </div>
                                                <div className="info-row">
                                                    <div className="info-icon">📱</div>
                                                    <div className="info-content">
                                                        <div className="info-label">Radio Channel</div>
                                                        <div className="info-value">Ch 4 (Emergency)</div>
                                                    </div>
                                                </div>
                                                <div className="info-row">
                                                    <div className="info-icon">📍</div>
                                                    <div className="info-content">
                                                        <div className="info-label">Base Location</div>
                                                        <div className="info-value">North Outpost</div>
                                                    </div>
                                                </div>
                                                <div className="info-row">
                                                    <div className="info-icon">🆔</div>
                                                    <div className="info-content">
                                                        <div className="info-label">Unit ID</div>
                                                        <div className="info-value">RES-991</div>
                                                    </div>
                                                </div>
                                                <div className="info-row">
                                                    <div className="info-icon">🩸</div>
                                                    <div className="info-content">
                                                        <div className="info-label">Blood Type</div>
                                                        <div className="info-value">O+</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* MEMBERSHIP CARD -> UNIT ASSIGNMENT */}
                                        <div className="panel">
                                            <div className="panel-header">
                                                <span className="panel-title">Unit Assignment</span>
                                                <button className="panel-action">Manage</button>
                                            </div>
                                            <div className="membership-card">
                                                <div className="mc-label">Current Unit</div>
                                                <div className="mc-plan">Alpha Response Team</div>
                                                <div className="mc-row">
                                                    <div>
                                                        <div className="mc-item-label">Role</div>
                                                        <div className="mc-item-value">Field Medic</div>
                                                    </div>
                                                    <div>
                                                        <div className="mc-item-label">Next Drill</div>
                                                        <div className="mc-item-value">Mar 1</div>
                                                    </div>
                                                    <div>
                                                        <div className="mc-item-label">Status</div>
                                                        <div className="mc-item-value" style={{ color: 'var(--color-3)' }}>Deployed ✓</div>
                                                    </div>
                                                </div>
                                                <div className="credit-bar-wrap">
                                                    <div className="credit-bar-top">
                                                        <span className="credit-bar-label">Supplies used</span>
                                                        <span className="credit-bar-value">5 / 8 kits</span>
                                                    </div>
                                                    <div className="credit-bar-track">
                                                        <div className="credit-bar-fill"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* KIDS -> SQUAD MEMBERS */}
                                        <div className="panel">
                                            <div className="panel-header">
                                                <span className="panel-title">Squad Members</span>
                                                <button className="panel-action">＋ Add</button>
                                            </div>
                                            <div className="kids-list">
                                                <div className="kid-card">
                                                    <div className="kid-avatar ka-1">👩‍🚒</div>
                                                    <div className="kid-info">
                                                        <div className="kid-name">Officer Chen</div>
                                                        <div className="kid-meta">Logistics · Unit 4</div>
                                                    </div>
                                                    <span className="kid-badge">Support</span>
                                                </div>
                                                <div className="kid-card">
                                                    <div className="kid-avatar ka-2">👮</div>
                                                    <div className="kid-info">
                                                        <div className="kid-name">Sgt. Miller</div>
                                                        <div className="kid-meta">Security · Unit 4</div>
                                                    </div>
                                                    <span className="kid-badge">Lead</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT COLUMN */}
                                    <div>
                                        {/* QUICK STATS */}
                                        <div className="mini-stats">
                                            <div className="mini-stat">
                                                <div className="mini-stat-val">34</div>
                                                <div className="mini-stat-label">Missions</div>
                                            </div>
                                            <div className="mini-stat">
                                                <div className="mini-stat-val">140h</div>
                                                <div className="mini-stat-label">Field Time</div>
                                            </div>
                                            <div className="mini-stat">
                                                <div className="mini-stat-val">12</div>
                                                <div className="mini-stat-label">Rescues</div>
                                            </div>
                                        </div>

                                        {/* UPCOMING BOOKINGS -> MISSIONS */}
                                        <div className="panel">
                                            <div className="panel-header">
                                                <span className="panel-title">Upcoming Missions</span>
                                                <a href="#" className="panel-action">View all →</a>
                                            </div>
                                            <div className="booking-list">
                                                <div className="booking-row">
                                                    <div className="booking-date-box">
                                                        <div className="booking-month">FEB</div>
                                                        <div className="booking-day">17</div>
                                                    </div>
                                                    <div className="booking-info">
                                                        <div className="booking-title">Flood Control</div>
                                                        <div className="booking-meta">0900 · Sector 7 · Alpha Team</div>
                                                    </div>
                                                    <span className="booking-status bs-confirmed">Active</span>
                                                    <span className="booking-price">P1</span>
                                                </div>
                                                <div className="booking-row">
                                                    <div className="booking-date-box">
                                                        <div className="booking-month">FEB</div>
                                                        <div className="booking-day">19</div>
                                                    </div>
                                                    <div className="booking-info">
                                                        <div className="booking-title">Supply Drop</div>
                                                        <div className="booking-meta">1300 · Base Camp · Logistics</div>
                                                    </div>
                                                    <span className="booking-status bs-confirmed">Scheduled</span>
                                                    <span className="booking-price">P2</span>
                                                </div>
                                                <div className="booking-row">
                                                    <div className="booking-date-box">
                                                        <div className="booking-month">FEB</div>
                                                        <div className="booking-day">24</div>
                                                    </div>
                                                    <div className="booking-info">
                                                        <div className="booking-title">Training Drill</div>
                                                        <div className="booking-meta">1030 · Training Grounds</div>
                                                    </div>
                                                    <span className="booking-status bs-pending">Pending</span>
                                                    <span className="booking-price">TR</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* RECENT ACTIVITY */}
                                        <div className="panel">
                                            <div className="panel-header">
                                                <span className="panel-title">Recent Logs</span>
                                            </div>
                                            <div style={{ padding: '8px 0' }}>
                                                <div style={{ display: 'flex', gap: '12px', padding: '13px 20px', borderBottom: '1px solid var(--border)' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '3px' }}>
                                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-3)', flexShrink: 0 }}></div>
                                                        <div style={{ width: '1px', flex: 1, minHeight: '20px', background: 'var(--border)', marginTop: '4px' }}></div>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '12.5px', color: 'var(--text-dark)', lineHeight: 1.5, marginBottom: '2px' }}>Deployed to <strong>Flood Control</strong></div>
                                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: "'Raleway', serif" }}>Today, 0900</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '12px', padding: '13px 20px', borderBottom: '1px solid var(--border)' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '3px' }}>
                                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-2)', flexShrink: 0 }}></div>
                                                        <div style={{ width: '1px', flex: 1, minHeight: '20px', background: 'var(--border)', marginTop: '4px' }}></div>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '12.5px', color: 'var(--text-dark)', lineHeight: 1.5, marginBottom: '2px' }}>Certification renewed — <strong>EMT-B</strong></div>
                                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: "'Raleway', serif" }}>Feb 1, 2026</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '12px', padding: '13px 20px', borderBottom: '1px solid var(--border)' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '3px' }}>
                                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-4)', flexShrink: 0 }}></div>
                                                        <div style={{ width: '1px', flex: 1, minHeight: '20px', background: 'var(--border)', marginTop: '4px' }}></div>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '12.5px', color: 'var(--text-dark)', lineHeight: 1.5, marginBottom: '2px' }}>Submitted <strong>Incident Report #402</strong></div>
                                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: "'Raleway', serif" }}>Jan 28, 2026</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '12px', padding: '13px 20px' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '3px' }}>
                                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-3)', flexShrink: 0 }}></div>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '12.5px', color: 'var(--text-dark)', lineHeight: 1.5, marginBottom: '2px' }}>Assigned <strong>Officer Chen</strong> to unit</div>
                                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: "'Raleway', serif" }}>Jan 15, 2026</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* ══ MISSIONS TAB ══ */}
                        {activeTab === 'bookings' && (
                            <div id="tab-bookings">
                                <div className="mini-stats" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: '20px' }}>
                                    <div className="mini-stat">
                                        <div className="mini-stat-val">34</div>
                                        <div className="mini-stat-label">All time</div>
                                    </div>
                                    <div className="mini-stat">
                                        <div className="mini-stat-val">5</div>
                                        <div className="mini-stat-label">This month</div>
                                    </div>
                                    <div className="mini-stat">
                                        <div className="mini-stat-val">3</div>
                                        <div className="mini-stat-label">Upcoming</div>
                                    </div>
                                </div>
                                <div className="panel">
                                    <div className="panel-header">
                                        <span className="panel-title">Mission History</span>
                                    </div>
                                    <div className="table-wrap">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Mission Type</th>
                                                    <th>Date</th>
                                                    <th>Squad</th>
                                                    <th>Status</th>
                                                    <th>Priority</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><span className="class-pill cp-yoga">Flood Control</span></td>
                                                    <td>Feb 17, 2026</td>
                                                    <td>Alpha</td>
                                                    <td><span className="attended-dot ad-yes">Completed</span></td>
                                                    <td>P1</td>
                                                </tr>
                                                <tr>
                                                    <td><span className="class-pill cp-music">Supply Drop</span></td>
                                                    <td>Feb 10, 2026</td>
                                                    <td>Logistics</td>
                                                    <td><span className="attended-dot ad-yes">Completed</span></td>
                                                    <td>P2</td>
                                                </tr>
                                                <tr>
                                                    <td><span className="class-pill cp-play">Comms Check</span></td>
                                                    <td>Feb 5, 2026</td>
                                                    <td>Bravo</td>
                                                    <td><span className="attended-dot ad-yes">Completed</span></td>
                                                    <td>P3</td>
                                                </tr>
                                                <tr>
                                                    <td><span className="class-pill cp-yoga">Search & Rescue</span></td>
                                                    <td>Jan 27, 2026</td>
                                                    <td>Alpha</td>
                                                    <td><span className="attended-dot ad-no">Aborted</span></td>
                                                    <td>P1</td>
                                                </tr>
                                                <tr>
                                                    <td><span className="class-pill cp-party">Training</span></td>
                                                    <td>Jan 20, 2026</td>
                                                    <td>All Units</td>
                                                    <td><span className="attended-dot ad-yes">Completed</span></td>
                                                    <td>TR</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ══ PAYMENTS -> CERTIFICATIONS TAB ══ */}
                        {activeTab === 'payments' && (
                            <div id="tab-payments">
                                <div className="mini-stats" style={{ marginBottom: '20px' }}>
                                    <div className="mini-stat">
                                        <div className="mini-stat-val">4</div>
                                        <div className="mini-stat-label">Active Certs</div>
                                    </div>
                                    <div className="mini-stat">
                                        <div className="mini-stat-val">Mar 1</div>
                                        <div className="mini-stat-label">Next Renewal</div>
                                    </div>
                                    <div className="mini-stat">
                                        <div className="mini-stat-val">0</div>
                                        <div className="mini-stat-label">Expired</div>
                                    </div>
                                </div>
                                <div className="panel">
                                    <div className="panel-header">
                                        <span className="panel-title">Certification History</span>
                                        <button className="panel-action">Export PDF</button>
                                    </div>
                                    <div>
                                        <div className="payment-row">
                                            <div className="payment-icon pi-charge">🎓</div>
                                            <div className="payment-info">
                                                <div className="payment-title">EMT-B Renewal</div>
                                                <div className="payment-date">Feb 1, 2026 · Valid until 2028</div>
                                            </div>
                                            <span className="payment-amount pa-credit">Active</span>
                                        </div>
                                        <div className="payment-row">
                                            <div className="payment-icon pi-charge">🚒</div>
                                            <div className="payment-info">
                                                <div className="payment-title">Fire Safety Level 2</div>
                                                <div className="payment-date">Jan 28, 2026 · Valid until 2027</div>
                                            </div>
                                            <span className="payment-amount pa-credit">Active</span>
                                        </div>
                                        <div className="payment-row">
                                            <div className="payment-icon pi-party" style={{ background: 'rgba(212,160,90,0.18)' }}>🏊</div>
                                            <div className="payment-info">
                                                <div className="payment-title">Water Rescue</div>
                                                <div className="payment-date">Jan 20, 2026 · Valid until 2027</div>
                                            </div>
                                            <span className="payment-amount pa-credit">Active</span>
                                        </div>
                                        <div className="payment-row">
                                            <div className="payment-icon pi-refund">⚠️</div>
                                            <div className="payment-info">
                                                <div className="payment-title">Hazmat Awareness</div>
                                                <div className="payment-date">Jan 18, 2026 · Expiring soon</div>
                                            </div>
                                            <span className="payment-amount pa-debit">Renew</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ══ NOTES TAB ══ */}
                        {activeTab === 'notes' && (
                            <div id="tab-notes">
                                <div className="profile-grid">
                                    <div style={{ gridColumn: '1/-1' }}>
                                        <div className="panel">
                                            <div className="panel-header">
                                                <span className="panel-title">Duty Logs</span>
                                                <button className="panel-action">＋ Add Entry</button>
                                            </div>
                                            <div style={{ padding: 0 }}>
                                                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>Cmdr. Hayes <span style={{ fontWeight: 400, color: 'var(--text-light)' }}>— Field Commander</span></div>
                                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: "'Raleway', serif" }}>Feb 10, 2026</div>
                                                    </div>
                                                    <div className="notes-text">"Responder showed excellent leadership during the flood evacuation. Managed to coordinate civilian transport effectively despite comms issues. Recommend for Squad Leader training."</div>
                                                </div>
                                                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>Lt. Vance <span style={{ fontWeight: 400, color: 'var(--text-light)' }}>— Logistics</span></div>
                                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: "'Raleway', serif" }}>Jan 28, 2026</div>
                                                    </div>
                                                    <div className="notes-text">"Equipment check passed. Radio kit issued. Needs replacement battery pack for long-range missions."</div>
                                                </div>
                                                <div style={{ padding: '20px 24px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>System <span style={{ fontWeight: 400, color: 'var(--text-light)' }}>— Onboarding</span></div>
                                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: "'Raleway', serif" }}>Jan 3, 2025</div>
                                                    </div>
                                                    <div className="notes-text">"Transferred from District 9. Qualifications verified. Assigned to Alpha Team."</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>{/* /page-body */}
                </div>{/* /content */}
            </div>{/* /main */}
            <LogoutModal
                show={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
};

export default Profile;
