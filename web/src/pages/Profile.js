import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ICONS = {
    bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    export: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
};

const Icon = ({ d, size = 16 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
    </svg>
);

const Profile = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editForm, setEditForm] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        address: user?.address || '',
        contactNumber: user?.contactNumber || '',
        barangay: user?.barangay || '',
    });

    const handleEditChange = e => setEditForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            const res = await api.put('/user/profile', editForm);
            if (res.status === 200) { updateUser(res.data.user); setIsEditing(false); }
        } catch (err) {
            console.error('Failed to update profile', err);
            alert('Failed to update profile');
        } finally { setIsSaving(false); }
    };

    const userName = user?.firstName ? `${user.firstName} ${user.lastName}` : (user?.name || 'Responder');
    const userInitials = user?.firstName
        ? `${user.firstName.charAt(0)}${user.lastName?.charAt(0) || ''}`
        : (user?.name?.substring(0, 2).toUpperCase() || 'RES');

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'missions', label: 'Missions' },
        { id: 'certifications', label: 'Certifications' },
        { id: 'logs', label: 'Duty Logs' },
    ];

    return (
        <Layout>
            {/* TOPBAR */}
            <header className="topbar">
                <div className="topbar-left">
                    <h1>My Profile</h1>
                    <p>{user?.barangay ? `Barangay ${user.barangay}` : 'Barangay San Miguel'}</p>
                </div>
                <div className="topbar-right">
                    <button className="icon-btn" title="Notifications" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
                        <Icon d={ICONS.bell} size={18} />
                        <span className="notif-dot" style={{ position: 'absolute', top: '6px', right: '6px', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-2)', border: '1.5px solid var(--white)' }}></span>
                    </button>
                </div>
            </header>

            <div className="content profile-content">
                {/* ── HERO ── */}
                <div className="new-profile-hero">
                    <div className="hero-inner">
                        <div className="hero-avatar-wrap">
                            <div className="hero-avatar">{userInitials}</div>
                            <div className="hero-online" />
                        </div>
                        <div className="hero-info">
                            <div className="hero-name">{userName}</div>
                            <div className="hero-meta">Deployed since January 2025 · Sector 4 · {user?.role === 'OFFICIAL' ? 'Barangay Official' : 'Resident'}</div>
                            <div className="hero-tags">
                                <span className="hero-tag gold">★ Squad Leader</span>
                                <span className="hero-tag blue">EMT-B</span>
                                <span className="hero-tag green">Active</span>
                                <span className="hero-tag">Search &amp; Rescue</span>
                            </div>
                        </div>
                        <div className="hero-actions">
                            {isEditing ? (
                                <>
                                    <button className="btn-edit" onClick={() => setIsEditing(false)}>Cancel</button>
                                    <button className="btn-primary-sm" onClick={handleSaveProfile} disabled={isSaving}>
                                        {isSaving ? 'Saving…' : 'Save Changes'}
                                    </button>
                                </>
                            ) : (
                                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                                    <Icon d={ICONS.edit} size={13} /> Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="tab-nav">
                        {tabs.map(t => (
                            <button key={t.id} className={`tab-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── PAGE BODY ── */}
                <div className="page-body">

                    {/* ══ OVERVIEW ══ */}
                    {activeTab === 'overview' && (
                        <div className="new-profile-grid">
                            {/* LEFT */}
                            <div>
                                {/* Contact Info */}
                                <div className="new-panel">
                                    <div className="new-panel-header">
                                        <span className="new-panel-title">Contact Info</span>
                                        {isEditing ? (
                                            <div className="panel-action-group">
                                                <button className="btn-cancel-sm" onClick={() => setIsEditing(false)}>Cancel</button>
                                                <button className="btn-save" onClick={handleSaveProfile} disabled={isSaving}>{isSaving ? '…' : 'Save'}</button>
                                            </div>
                                        ) : (
                                            <button className="new-panel-action" onClick={() => setIsEditing(true)}>Edit →</button>
                                        )}
                                    </div>
                                    {isEditing ? (
                                        <div className="edit-form">
                                            <div className="form-row">
                                                <div className="form-group-sm"><label>First Name</label><input className="form-input" name="firstName" value={editForm.firstName} onChange={handleEditChange} /></div>
                                                <div className="form-group-sm"><label>Last Name</label><input className="form-input" name="lastName" value={editForm.lastName} onChange={handleEditChange} /></div>
                                            </div>
                                            <div className="form-group-sm"><label>Address</label><input className="form-input" name="address" value={editForm.address} onChange={handleEditChange} /></div>
                                            <div className="form-group-sm"><label>Contact Number</label><input className="form-input" name="contactNumber" value={editForm.contactNumber} onChange={handleEditChange} /></div>
                                            <div className="form-group-sm"><label>Barangay</label><input className="form-input" name="barangay" value={editForm.barangay} onChange={handleEditChange} /></div>
                                        </div>
                                    ) : (
                                        <div className="new-info-list">
                                            {[
                                                { icon: '📧', label: 'Email', value: user?.email || 'N/A', cls: 'link' },
                                                { icon: '📱', label: 'Contact Number', value: user?.contactNumber || 'N/A' },
                                                { icon: '📍', label: 'Address', value: user?.address || 'N/A' },
                                                { icon: '🏘️', label: 'Barangay', value: user?.barangay || 'N/A' },
                                                { icon: '👤', label: 'Role', value: user?.role || 'RESIDENT' },
                                            ].map(({ icon, label, value, cls }) => (
                                                <div key={label} className="new-info-row">
                                                    <div className="new-info-icon">{icon}</div>
                                                    <div>
                                                        <div className="new-info-label">{label}</div>
                                                        <div className={`new-info-value ${cls || ''}`}>{value}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Unit Assignment */}
                                <div className="new-panel">
                                    <div className="new-panel-header">
                                        <span className="new-panel-title">Unit Assignment</span>
                                        <button className="new-panel-action">Manage →</button>
                                    </div>
                                    <div className="unit-card">
                                        <div className="unit-label">Current Unit</div>
                                        <div className="unit-name">Alpha Response Team</div>
                                        <div className="unit-meta-grid">
                                            <div className="unit-meta-item"><label>Role</label><div className="unit-value">Field Medic</div></div>
                                            <div className="unit-meta-item"><label>Next Drill</label><div className="unit-value">Mar 1</div></div>
                                            <div className="unit-meta-item"><label>Status</label><div className="unit-value green">Deployed ✓</div></div>
                                        </div>
                                        <div className="supply-bar-label">
                                            <span>Supplies used</span>
                                            <strong>5 / 8 kits</strong>
                                        </div>
                                        <div className="supply-track"><div className="supply-fill" /></div>
                                    </div>
                                </div>

                                {/* Squad Members */}
                                <div className="new-panel">
                                    <div className="new-panel-header">
                                        <span className="new-panel-title">Squad Members</span>
                                        <button className="new-panel-action">＋ Add</button>
                                    </div>
                                    <div className="squad-list">
                                        {[
                                            { emoji: '👩‍🚒', cls: 'c1', name: 'Officer Chen', sub: 'Logistics · Unit 4', role: 'Support' },
                                            { emoji: '👮', cls: 'c2', name: 'Sgt. Miller', sub: 'Security · Unit 4', role: 'Lead' },
                                            { emoji: '🧑‍⚕️', cls: 'c3', name: 'Medic Santos', sub: 'Medical · Unit 4', role: 'Medic' },
                                        ].map(({ emoji, cls, name, sub, role }) => (
                                            <div key={name} className="squad-member">
                                                <div className={`squad-ava ${cls}`}>{emoji}</div>
                                                <div><div className="squad-name">{name}</div><div className="squad-sub">{sub}</div></div>
                                                <span className="squad-role">{role}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div>
                                <div className="new-mini-stats">
                                    <div className="new-mini-stat"><div className="new-mini-stat-val">34</div><div className="new-mini-stat-label">Missions</div></div>
                                    <div className="new-mini-stat"><div className="new-mini-stat-val">140h</div><div className="new-mini-stat-label">Field Time</div></div>
                                    <div className="new-mini-stat"><div className="new-mini-stat-val">12</div><div className="new-mini-stat-label">Rescues</div></div>
                                </div>

                                {/* Upcoming Missions */}
                                <div className="new-panel">
                                    <div className="new-panel-header">
                                        <span className="new-panel-title">Upcoming Missions</span>
                                        <button className="new-panel-action" onClick={() => setActiveTab('missions')}>View all →</button>
                                    </div>
                                    <div className="mission-list">
                                        {[
                                            { month: 'FEB', day: 17, title: 'Flood Control', meta: '0900 · Sector 7 · Alpha Team', badge: 'active', badgeLabel: 'Active', p: 'P1' },
                                            { month: 'FEB', day: 19, title: 'Supply Drop', meta: '1300 · Base Camp · Logistics', badge: 'scheduled', badgeLabel: 'Scheduled', p: 'P2' },
                                            { month: 'FEB', day: 24, title: 'Training Drill', meta: '1030 · Training Grounds', badge: 'pending', badgeLabel: 'Pending', p: 'TR' },
                                        ].map(({ month, day, title, meta, badge, badgeLabel, p }) => (
                                            <div key={day + title} className="mission-row">
                                                <div className="mission-date-box">
                                                    <div className="mission-month">{month}</div>
                                                    <div className="mission-day">{day}</div>
                                                </div>
                                                <div>
                                                    <div className="mission-title">{title}</div>
                                                    <div className="mission-meta">{meta}</div>
                                                </div>
                                                <span className={`mission-badge badge-${badge}`}>{badgeLabel}</span>
                                                <div className="badge-p">{p}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Activity */}
                                <div className="new-panel">
                                    <div className="new-panel-header">
                                        <span className="new-panel-title">Recent Activity</span>
                                    </div>
                                    <div className="activity-list">
                                        {[
                                            { dot: 'red', text: <>Deployed to <strong>Flood Control</strong></>, time: 'Today, 0900' },
                                            { dot: 'green', text: <>Certification renewed — <strong>EMT-B</strong></>, time: 'Feb 1, 2026' },
                                            { dot: 'blue', text: <>Submitted <strong>Incident Report #402</strong></>, time: 'Jan 28, 2026' },
                                            { dot: 'amber', text: <>Assigned <strong>Officer Chen</strong> to unit</>, time: 'Jan 15, 2026' },
                                        ].map(({ dot, text, time }, i) => (
                                            <div key={i} className="activity-item">
                                                <div className={`activity-dot ${dot}`} />
                                                <div>
                                                    <div className="activity-text">{text}</div>
                                                    <div className="activity-time">{time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══ MISSIONS ══ */}
                    {activeTab === 'missions' && (
                        <div>
                            <div className="new-mini-stats" style={{ marginBottom: 20 }}>
                                <div className="new-mini-stat"><div className="new-mini-stat-val">34</div><div className="new-mini-stat-label">All Time</div></div>
                                <div className="new-mini-stat"><div className="new-mini-stat-val">5</div><div className="new-mini-stat-label">This Month</div></div>
                                <div className="new-mini-stat"><div className="new-mini-stat-val">3</div><div className="new-mini-stat-label">Upcoming</div></div>
                            </div>
                            <div className="new-panel">
                                <div className="new-panel-header">
                                    <span className="new-panel-title">Mission History</span>
                                    <button className="new-panel-action">Export →</button>
                                </div>
                                <div className="table-wrap">
                                    <table className="new-table">
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
                                            {[
                                                { label: 'Flood Control', cls: 'pill-flood', date: 'Feb 17, 2026', squad: 'Alpha', status: 'Completed', statusCls: 'status-done', p: 'P1' },
                                                { label: 'Supply Drop', cls: 'pill-supply', date: 'Feb 10, 2026', squad: 'Logistics', status: 'Completed', statusCls: 'status-done', p: 'P2' },
                                                { label: 'Comms Check', cls: 'pill-comms', date: 'Feb 5, 2026', squad: 'Bravo', status: 'Completed', statusCls: 'status-done', p: 'P3' },
                                                { label: 'Search & Rescue', cls: 'pill-rescue', date: 'Jan 27, 2026', squad: 'Alpha', status: 'Aborted', statusCls: 'status-abort', p: 'P1' },
                                                { label: 'Training', cls: 'pill-training', date: 'Jan 20, 2026', squad: 'All Units', status: 'Completed', statusCls: 'status-done', p: 'TR' },
                                            ].map(({ label, cls, date, squad, status, statusCls, p }) => (
                                                <tr key={label + date}>
                                                    <td><span className={`type-pill ${cls}`}>{label}</span></td>
                                                    <td>{date}</td>
                                                    <td>{squad}</td>
                                                    <td><span className={`status-dot ${statusCls}`}>{status}</span></td>
                                                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{p}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══ CERTIFICATIONS ══ */}
                    {activeTab === 'certifications' && (
                        <div>
                            <div className="new-mini-stats" style={{ marginBottom: 20 }}>
                                <div className="new-mini-stat"><div className="new-mini-stat-val">4</div><div className="new-mini-stat-label">Active</div></div>
                                <div className="new-mini-stat"><div className="new-mini-stat-val">Mar 1</div><div className="new-mini-stat-label">Next Renewal</div></div>
                                <div className="new-mini-stat"><div className="new-mini-stat-val">0</div><div className="new-mini-stat-label">Expired</div></div>
                            </div>
                            <div className="new-panel">
                                <div className="new-panel-header">
                                    <span className="new-panel-title">Certification History</span>
                                    <button className="new-panel-action"><Icon d={ICONS.export} size={12} /> Export PDF</button>
                                </div>
                                <div className="cert-list">
                                    {[
                                        { icon: '🎓', cls: 'gold', title: 'EMT-B Renewal', date: 'Feb 1, 2026 · Valid until 2028', badge: 'cert-active', label: 'Active' },
                                        { icon: '🚒', cls: 'blue', title: 'Fire Safety Level 2', date: 'Jan 28, 2026 · Valid until 2027', badge: 'cert-active', label: 'Active' },
                                        { icon: '🏊', cls: 'teal', title: 'Water Rescue', date: 'Jan 20, 2026 · Valid until 2027', badge: 'cert-active', label: 'Active' },
                                        { icon: '⚠️', cls: 'red', title: 'Hazmat Awareness', date: 'Jan 18, 2026 · Expiring soon', badge: 'cert-warning', label: 'Renew' },
                                    ].map(({ icon, cls, title, date, badge, label }) => (
                                        <div key={title} className="cert-row">
                                            <div className={`cert-icon ${cls}`}>{icon}</div>
                                            <div><div className="cert-title">{title}</div><div className="cert-date">{date}</div></div>
                                            <span className={`cert-badge ${badge}`}>{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══ DUTY LOGS ══ */}
                    {activeTab === 'logs' && (
                        <div className="new-panel">
                            <div className="new-panel-header">
                                <span className="new-panel-title">Duty Logs</span>
                                <button className="new-panel-action">＋ Add Entry</button>
                            </div>
                            <div className="log-list">
                                {[
                                    { author: 'Cmdr. Hayes', role: 'Field Commander', date: 'Feb 10, 2026', text: 'Responder showed excellent leadership during the flood evacuation. Managed to coordinate civilian transport effectively despite comms issues. Recommend for Squad Leader training.' },
                                    { author: 'Lt. Vance', role: 'Logistics', date: 'Jan 28, 2026', text: 'Equipment check passed. Radio kit issued. Needs replacement battery pack for long-range missions.' },
                                    { author: 'System', role: 'Onboarding', date: 'Jan 3, 2025', text: 'Transferred from District 9. Qualifications verified. Assigned to Alpha Team.' },
                                ].map(({ author, role, date, text }) => (
                                    <div key={date} className="log-entry">
                                        <div className="log-header">
                                            <div className="log-author">{author} <span>— {role}</span></div>
                                            <div className="log-date">{date}</div>
                                        </div>
                                        <div className="log-text">{text}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>{/* /page-body */}
            </div>{/* /profile-content */}
        </Layout>
    );
};

export default Profile;
