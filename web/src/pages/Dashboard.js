import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutModal from '../components/LogoutModal';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Dynamic date and time
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="dashboard-wrapper">
            {/* ─── SIDEBAR ─── */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <a className="logo-mark" href="#">GroundWork</a>
                    <div className="logo-sub">Response Dashboard</div>
                </div>

                <nav className="sidebar-nav">
                    <div className="sidebar-section-label">Operations</div>
                    <a href="#" className="nav-item active">
                        <div className="nav-icon">🏠</div>
                        <span className="nav-label">Overview</span>
                    </a>
                    <a href="#" className="nav-item alert-item">
                        <div className="nav-icon">🚨</div>
                        <span className="nav-label">Active Alerts</span>
                        <span className="nav-badge nav-badge-red">3</span>
                    </a>
                    <a href="#" className="nav-item">
                        <div className="nav-icon">📍</div>
                        <span className="nav-label">Incidents</span>
                        <span className="nav-badge">7</span>
                    </a>
                    <a href="#" className="nav-item">
                        <div className="nav-icon">🏕️</div>
                        <span className="nav-label">Shelters</span>
                    </a>

                    <div className="sidebar-section-label">Community</div>
                    <a href="#" className="nav-item">
                        <div className="nav-icon">🤝</div>
                        <span className="nav-label">Volunteers</span>
                    </a>
                    <a href="#" className="nav-item">
                        <div className="nav-icon">📦</div>
                        <span className="nav-label">Supplies</span>
                    </a>
                    <a href="#" className="nav-item">
                        <div className="nav-icon">🗺️</div>
                        <span className="nav-label">Zone Map</span>
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
                    <div
                        className="user-row"
                        onClick={() => navigate('/profile')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="user-avatar">{user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}</div>
                        <div className="user-info">
                            <div className="user-name">{user?.firstName || 'User'} — Coord.</div>
                            <div className="user-role">Zone 4 Lead</div>
                        </div>
                        <div className="user-chevron">›</div>
                    </div>
                </div>
            </aside>

            {/* ─── MAIN ─── */}
            <div className="dashboard-main">

                {/* TOPBAR */}
                <header className="topbar">
                    <div>
                        <div className="topbar-title">Response Overview</div>
                        <div className="topbar-date">{formattedDate}</div>
                    </div>
                    <div className="topbar-spacer"></div>
                    <div className="topbar-alert">
                        <span className="alert-blink"></span>
                        3 Active Incidents
                    </div>
                    <div className="topbar-icon-btn">
                        🔔
                        <span className="notif-dot"></span>
                    </div>
                    <button className="topbar-btn">＋ Report Incident</button>
                </header>

                {/* CONTENT */}
                <div className="dashboard-content">

                    {/* ACTIVE ALERT BANNER */}
                    <div className="alert-banner">
                        <div className="alert-banner-icon">🔥</div>
                        <div className="alert-banner-text">
                            <div className="alert-banner-title">⚠ ACTIVE — Wildfire Advisory: Cedar County</div>
                            <div className="alert-banner-sub">Evacuation orders in effect for <strong>Zones 3, 4 & 5</strong>. 847 residents affected. Last updated 12 min ago.</div>
                        </div>
                        <button className="alert-banner-action">View Full Alert</button>
                    </div>

                    {/* STATS */}
                    <div className="stats-row">
                        <div className="stat-card c1">
                            <div className="stat-top">
                                <span className="stat-label">Active Incidents</span>
                                <div className="stat-icon">🚨</div>
                            </div>
                            <div className="stat-value">3</div>
                            <div className="stat-delta urgent">↑ 2 since yesterday</div>
                        </div>
                        <div className="stat-card c2">
                            <div className="stat-top">
                                <span className="stat-label">Displaced Residents</span>
                                <div className="stat-icon">👥</div>
                            </div>
                            <div className="stat-value">847</div>
                            <div className="stat-delta urgent">↑ 212 in last 2 hrs</div>
                        </div>
                        <div className="stat-card c3">
                            <div className="stat-top">
                                <span className="stat-label">Active Volunteers</span>
                                <div className="stat-icon">🤝</div>
                            </div>
                            <div className="stat-value">134</div>
                            <div className="stat-delta up">↑ 41 mobilized today</div>
                        </div>
                        <div className="stat-card c4">
                            <div className="stat-top">
                                <span className="stat-label">Shelter Capacity</span>
                                <div className="stat-icon">🏕️</div>
                            </div>
                            <div className="stat-value">68%</div>
                            <div className="stat-delta neutral">across 5 open sites</div>
                        </div>
                    </div>

                    {/* GRID ROW */}
                    <div className="grid-row">

                        {/* INCIDENTS TABLE */}
                        <div className="panel">
                            <div className="panel-header">
                                <span className="panel-title">Active Incidents</span>
                                <a href="#" className="panel-action">Full incident log →</a>
                            </div>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Incident</th>
                                            <th>Type</th>
                                            <th>Location</th>
                                            <th>Priority</th>
                                            <th>Reported</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="incident-name">
                                                    <div className="incident-dot id-red"></div>
                                                    <div>
                                                        <div className="incident-name-text">Cedar Ridge Wildfire</div>
                                                        <div className="incident-sub">Zones 3–5 evacuated</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="type-pill tp-fire">Wildfire</span></td>
                                            <td>Cedar County, N</td>
                                            <td><span className="priority-tag pr-critical">Critical</span></td>
                                            <td>6h ago</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="incident-name">
                                                    <div className="incident-dot id-amber"></div>
                                                    <div>
                                                        <div className="incident-name-text">River Rd Flash Flood</div>
                                                        <div className="incident-sub">Road closures active</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="type-pill tp-flood">Flood</span></td>
                                            <td>River Rd, SE</td>
                                            <td><span className="priority-tag pr-high">High</span></td>
                                            <td>3h ago</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="incident-name">
                                                    <div className="incident-dot id-amber"></div>
                                                    <div>
                                                        <div className="incident-name-text">Maple St Power Outage</div>
                                                        <div className="incident-sub">~340 homes affected</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="type-pill tp-medical">Utility</span></td>
                                            <td>Maple St, W</td>
                                            <td><span className="priority-tag pr-high">High</span></td>
                                            <td>5h ago</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="incident-name">
                                                    <div className="incident-dot id-green"></div>
                                                    <div>
                                                        <div className="incident-name-text">Hillside Shelter Request</div>
                                                        <div className="incident-sub">12 families need housing</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="type-pill tp-shelter">Shelter</span></td>
                                            <td>Hillside, Zone 4</td>
                                            <td><span className="priority-tag pr-medium">Medium</span></td>
                                            <td>1h ago</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="incident-name">
                                                    <div className="incident-dot id-green"></div>
                                                    <div>
                                                        <div className="incident-name-text">Senior Center Med Check</div>
                                                        <div className="incident-sub">Wellness rounds needed</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="type-pill tp-medical">Medical</span></td>
                                            <td>Oak Ave, Central</td>
                                            <td><span className="priority-tag pr-medium">Medium</span></td>
                                            <td>2h ago</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ACTIVITY FEED */}
                        <div className="panel">
                            <div className="panel-header">
                                <span className="panel-title">Live Updates</span>
                                <a href="#" className="panel-action">Clear</a>
                            </div>
                            <div className="activity-list">
                                <div className="activity-item">
                                    <div className="activity-dot-col">
                                        <div className="a-dot a-dot-alert"></div>
                                        <div className="a-line"></div>
                                    </div>
                                    <div className="activity-body">
                                        <div className="activity-text"><strong>Zones 3–5</strong> evacuation order upgraded to mandatory</div>
                                        <div className="activity-time">12 minutes ago</div>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-dot-col">
                                        <div className="a-dot a-dot-volunteer"></div>
                                        <div className="a-line"></div>
                                    </div>
                                    <div className="activity-body">
                                        <div className="activity-text"><strong>41 volunteers</strong> checked in at Central Command</div>
                                        <div className="activity-time">28 minutes ago</div>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-dot-col">
                                        <div className="a-dot a-dot-resolve"></div>
                                        <div className="a-line"></div>
                                    </div>
                                    <div className="activity-body">
                                        <div className="activity-text"><strong>Eastside High School</strong> shelter is now open (cap. 200)</div>
                                        <div className="activity-time">45 minutes ago</div>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-dot-col">
                                        <div className="a-dot a-dot-resource"></div>
                                        <div className="a-line"></div>
                                    </div>
                                    <div className="activity-body">
                                        <div className="activity-text"><strong>Water supply</strong> — 500 cases dispatched to Zone 4</div>
                                        <div className="activity-time">1 hour ago</div>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-dot-col">
                                        <div className="a-dot a-dot-alert"></div>
                                        <div className="a-line"></div>
                                    </div>
                                    <div className="activity-body">
                                        <div className="activity-text"><strong>River Rd Flash Flood</strong> incident opened by Zone 2 coord.</div>
                                        <div className="activity-time">3 hours ago</div>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-dot-col">
                                        <div className="a-dot a-dot-resolve"></div>
                                        <div className="a-line"></div>
                                    </div>
                                    <div className="activity-body">
                                        <div className="activity-text"><strong>North Park shelter</strong> reached capacity — overflow rerouted</div>
                                        <div className="activity-time">4 hours ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM ROW */}
                    <div className="bottom-row">

                        {/* SHELTER STATUS */}
                        <div className="panel">
                            <div className="panel-header">
                                <span className="panel-title">Shelter Status</span>
                                <a href="#" className="panel-action">Manage all →</a>
                            </div>
                            <div className="shelter-list">
                                <div className="shelter-item">
                                    <div className="shelter-icon-wrap si-open">🏫</div>
                                    <div className="shelter-info">
                                        <div className="shelter-name">Eastside High School</div>
                                        <div className="shelter-meta">Zone 4 · Opens 6:00 AM</div>
                                    </div>
                                    <div className="shelter-cap cap-ok">112 / 200</div>
                                </div>
                                <div className="shelter-item">
                                    <div className="shelter-icon-wrap si-full">🏛️</div>
                                    <div className="shelter-info">
                                        <div className="shelter-name">North Park Rec Center</div>
                                        <div className="shelter-meta">Zone 3 · Overflow active</div>
                                    </div>
                                    <div className="shelter-cap cap-full">150 / 150</div>
                                </div>
                                <div className="shelter-item">
                                    <div className="shelter-icon-wrap si-standby">⛪</div>
                                    <div className="shelter-info">
                                        <div className="shelter-name">St. Andrew's Church</div>
                                        <div className="shelter-meta">Zone 5 · On standby</div>
                                    </div>
                                    <div className="shelter-cap cap-warning">80 / 100</div>
                                </div>
                                <div className="shelter-item">
                                    <div className="shelter-icon-wrap si-open">🏢</div>
                                    <div className="shelter-info">
                                        <div className="shelter-name">Community Center A</div>
                                        <div className="shelter-meta">Zone 2 · 24h staffed</div>
                                    </div>
                                    <div className="shelter-cap cap-ok">45 / 180</div>
                                </div>
                                <div className="shelter-item">
                                    <div className="shelter-icon-wrap si-open">🏪</div>
                                    <div className="shelter-info">
                                        <div className="shelter-name">Westfield Convention Hall</div>
                                        <div className="shelter-meta">Zone 6 · Just opened</div>
                                    </div>
                                    <div className="shelter-cap cap-ok">22 / 350</div>
                                </div>
                            </div>
                        </div>

                        {/* VOLUNTEER DEPLOYMENT CHART */}
                        <div className="panel">
                            <div className="panel-header">
                                <span className="panel-title">Volunteer Deployment</span>
                            </div>
                            <div className="chart-area">
                                <div className="chart-summary">
                                    <div className="chart-metric">
                                        <div className="chart-metric-val">134</div>
                                        <div className="chart-metric-label">Active today</div>
                                    </div>
                                    <div className="chart-metric">
                                        <div className="chart-metric-val" style={{ color: 'var(--text-light)' }}>93</div>
                                        <div className="chart-metric-label">Yesterday</div>
                                    </div>
                                </div>
                                <div className="bar-chart">
                                    <div className="bar-group">
                                        <div className="bar bar-prev" style={{ height: '38px' }}></div>
                                        <div className="bar-label">MON</div>
                                    </div>
                                    <div className="bar-group">
                                        <div className="bar bar-prev" style={{ height: '52px' }}></div>
                                        <div className="bar-label">TUE</div>
                                    </div>
                                    <div className="bar-group">
                                        <div className="bar bar-prev" style={{ height: '44px' }}></div>
                                        <div className="bar-label">WED</div>
                                    </div>
                                    <div className="bar-group">
                                        <div className="bar bar-prev" style={{ height: '60px' }}></div>
                                        <div className="bar-label">THU</div>
                                    </div>
                                    <div className="bar-group">
                                        <div className="bar bar-prev" style={{ height: '50px' }}></div>
                                        <div className="bar-label">FRI</div>
                                    </div>
                                    <div className="bar-group">
                                        <div className="bar bar-prev" style={{ height: '42px' }}></div>
                                        <div className="bar-label">SAT</div>
                                    </div>
                                    <div className="bar-group">
                                        <div className="bar bar-current" style={{ height: '82px' }}></div>
                                        <div className="bar-label">NOW</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', marginTop: '14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-light)' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--color-4)' }}></div>
                                        Today
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-light)' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(164,180,101,0.4)' }}></div>
                                        Prior days
                                    </div>
                                </div>
                                <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '10px' }}>Deployed by role</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                                            <span style={{ width: '80px', color: 'var(--text-light)' }}>Search & Rescue</span>
                                            <div style={{ flex: 1, height: '6px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: '62%', height: '100%', background: 'var(--color-4)', borderRadius: '4px' }}></div></div>
                                            <span style={{ fontWeight: 700, color: 'var(--text-dark)', width: '26px', textAlign: 'right' }}>52</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                                            <span style={{ width: '80px', color: 'var(--text-light)' }}>Shelter Staff</span>
                                            <div style={{ flex: 1, height: '6px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: '38%', height: '100%', background: 'var(--color-3)', borderRadius: '4px' }}></div></div>
                                            <span style={{ fontWeight: 700, color: 'var(--text-dark)', width: '26px', textAlign: 'right' }}>38</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                                            <span style={{ width: '80px', color: 'var(--text-light)' }}>Supply Chain</span>
                                            <div style={{ flex: 1, height: '6px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: '24%', height: '100%', background: 'var(--color-2)', borderRadius: '4px' }}></div></div>
                                            <span style={{ fontWeight: 700, color: 'var(--text-dark)', width: '26px', textAlign: 'right' }}>26</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                                            <span style={{ width: '80px', color: 'var(--text-light)' }}>Medical</span>
                                            <div style={{ flex: 1, height: '6px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: '18%', height: '100%', background: '#c0392b', borderRadius: '4px' }}></div></div>
                                            <span style={{ fontWeight: 700, color: 'var(--text-dark)', width: '26px', textAlign: 'right' }}>18</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>{/* /content */}
            </div>
            {/* /main */}
            <LogoutModal
                show={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
};

export default Dashboard;
