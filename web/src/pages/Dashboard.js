import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Notification from '../components/Notification';
import api from '../services/api';
import Layout from '../components/Layout';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const [dashboardData, setDashboardData] = useState({
        weatherAlerts: [],
        evacuationCenters: [],
        hotlines: []
    });

    const [reports, setReports] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Report form state
    const [reportForm, setReportForm] = useState({
        description: '',
        location: '',
        incidentType: 'flood',
        photo: null
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await api.get('/dashboard/data');
                setDashboardData(res.data);
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            }
        };

        const fetchReports = async () => {
            try {
                const res = await api.get('/reports');
                setReports(res.data);
            } catch (err) {
                console.error("Failed to fetch reports", err);
            }
        };

        fetchDashboardData();
        fetchReports();
    }, []);

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        if (!reportForm.description || !reportForm.location) {
            setNotification({ show: true, message: 'Description and location are required.', type: 'error' });
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('description', reportForm.description);
        formData.append('location', reportForm.location);
        formData.append('incidentType', reportForm.incidentType);
        if (reportForm.photo) {
            formData.append('photo', reportForm.photo);
        }

        try {
            // We use standard fetch or axios with multipart form data
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/reports', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const savedReport = await response.json();
                setNotification({ show: true, message: 'Report submitted successfully!', type: 'success' });
                setReports([savedReport.report, ...reports]);
                setReportForm({ description: '', location: '', incidentType: 'flood', photo: null });
            } else {
                setNotification({ show: true, message: 'Failed to submit report.', type: 'error' });
            }
        } catch (error) {
            console.error("Error submitting report", error);
            setNotification({ show: true, message: 'An error occurred.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Modal control
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Reset modal when component mounts
        setIsModalOpen(false);
        setReportForm({ description: '', location: '', incidentType: 'flood', photo: null });
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
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
        <Layout>
            {/* TOPBAR */}
            <header className="topbar">
                <div className="topbar-left">
                    <h1>Dashboard</h1>
                    <p>{user?.barangay ? `Barangay ${user.barangay}` : 'Barangay San Miguel'} · {formattedDate}</p>
                </div>
                <div className="topbar-right">
                    {dashboardData.weatherAlerts.length > 0 && (
                        <div className="alert-status">
                            <div className="pulse-dot"></div>
                            ACTIVE ALERTS ({dashboardData.weatherAlerts.length})
                        </div>
                    )}
                    <button className="icon-btn" title="Notifications">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="notif-dot"></span>
                    </button>
                </div>
            </header>

            <div className="content">
                {/* ALERT BANNER */}
                {dashboardData.weatherAlerts.map((alert, index) => (
                    <div key={index} className="alert-banner">
                        <div className="alert-icon-wrap">
                            <svg width="22" height="22" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <div>
                            <h3>⚠ {alert.type}</h3>
                            <p>{alert.message}</p>
                        </div>
                        <button className="btn-sm">View Advisory</button>
                    </div>
                ))}

                {/* STATS */}
                <div className="stats-grid">
                    <div className="stat-card green">
                        <div className="stat-icon">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                        </div>
                        <div className="stat-value">{dashboardData.evacuationCenters.filter(c => c.status !== 'Full').length}</div>
                        <div className="stat-label">Evacuation Centers Open</div>
                        <div className="stat-delta delta-neutral">of {dashboardData.evacuationCenters.length} total</div>
                    </div>
                    <div className="stat-card red">
                        <div className="stat-icon">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                        </div>
                        <div className="stat-value">{reports.filter(r => r.status === 'PENDING').length}</div>
                        <div className="stat-label">Pending Incident Reports</div>
                        <div className="stat-delta delta-down">↑ updates live</div>
                    </div>
                    <div className="stat-card amber">
                        <div className="stat-icon">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" /></svg>
                        </div>
                        <div className="stat-value">98%</div>
                        <div className="stat-label">Response Readiness</div>
                        <div className="stat-delta delta-up">↑ 2% vs last week</div>
                    </div>
                    <div className="stat-card blue">
                        <div className="stat-icon">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        </div>
                        <div className="stat-value">{dashboardData.hotlines.length}</div>
                        <div className="stat-label">Active Hotlines</div>
                        <div className="stat-delta delta-neutral">Available 24/7</div>
                    </div>
                </div>

                <div className="two-col">
                    {/* WEATHER */}
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">
                                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                                Local Weather
                            </div>
                            <span className="panel-action">Details →</span>
                        </div>
                        <div className="panel-body">
                            <div className="weather-main">
                                <div className="weather-icon-big">⛅</div>
                                <div>
                                    <div className="weather-temp">29°C</div>
                                    <div className="weather-desc">Partly Cloudy · San Miguel</div>
                                </div>
                            </div>
                            <div className="weather-details">
                                <div className="w-detail">
                                    <span className="w-detail-label">Humidity</span>
                                    <span className="w-detail-value">72%</span>
                                </div>
                                <div className="w-detail">
                                    <span className="w-detail-label">Wind Speed</span>
                                    <span className="w-detail-value">14 km/h</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DISASTER ALERTS TRAY */}
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">
                                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                NDRRMC Updates
                            </div>
                            <span className="panel-action">View All →</span>
                        </div>
                        <div className="panel-body">
                            <div className="alert-list">
                                {dashboardData.weatherAlerts.length > 0 ? (
                                    dashboardData.weatherAlerts.slice(0, 3).map((alert, idx) => (
                                        <div key={idx} className={`alert-item level-${alert.severity.toLowerCase()}`}>
                                            <div className="alert-level-dot"></div>
                                            <div>
                                                <div className="alert-item-title">{alert.type}</div>
                                                <div className="alert-item-desc">{alert.message}</div>
                                            </div>
                                            <span className="alert-time">Active</span>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '20px' }}>
                                        No active disaster alerts.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="three-col">
                    {/* RECENT INCIDENT REPORTS */}
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">
                                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                Community Incident Reports
                            </div>
                        </div>
                        <div className="panel-body" style={{ padding: '12px' }}>
                            <div className="report-list">
                                {reports.length > 0 ? (
                                    reports.slice(0, 4).map((r) => {
                                        let icon = '📢';
                                        let badgeColor = 'tag-pending';
                                        let typeClass = 'type-flood';
                                        if (r.status === 'RESPONDING') badgeColor = 'tag-responding';
                                        if (r.status === 'RESOLVED') badgeColor = 'tag-resolved';

                                        if (r.incidentType?.toLowerCase() === 'fire') { icon = '🔥'; typeClass = 'type-power'; }
                                        else if (r.incidentType?.toLowerCase() === 'accident') { icon = '💥'; typeClass = 'type-trapped'; }
                                        else if (r.incidentType?.toLowerCase() === 'medical') { icon = '🚑'; typeClass = 'type-flood'; }

                                        return (
                                            <div key={r.id} className="report-item">
                                                <div className={`report-type-icon ${typeClass}`}>{icon}</div>
                                                <div className="report-info">
                                                    <div className="report-title">{r.incidentType.toUpperCase()} INCIDENT</div>
                                                    <div className="report-location">
                                                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                        {r.location}
                                                    </div>
                                                    <div className="report-desc">{r.description}</div>
                                                    <div className="report-meta">
                                                        <span className={`report-tag ${badgeColor}`}>{r.status}</span>
                                                        <div className="report-actions">
                                                            <button className="btn-xs btn-respond">Respond</button>
                                                            <button className="btn-xs btn-view">Details</button>
                                                        </div>
                                                        <span className="report-time">
                                                            {new Date(r.timestamp).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '30px', paddingBottom: '30px' }}>
                                        No recent reports.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* EVACUATION CENTERS */}
                        <div className="panel" style={{ marginBottom: '20px' }}>
                            <div className="panel-header">
                                <div className="panel-title">
                                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    Evacuation Centers
                                </div>
                                <span className="panel-action">Map View</span>
                            </div>
                            <div className="panel-body">
                                <div className="evac-list">
                                    {dashboardData.evacuationCenters.slice(0, 3).map((c, i) => (
                                        <div key={i} className="evac-item">
                                            <div className="evac-icon">
                                                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                            </div>
                                            <div>
                                                <div className="evac-name">{c.name}</div>
                                                <div className="evac-meta">Capacity: {c.capacity}</div>
                                            </div>
                                            <span className={`evac-status status-${c.status.toLowerCase()}`}>{c.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* HOTLINES */}
                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">
                                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    Emergency Hotlines
                                </div>
                            </div>
                            <div className="panel-body" style={{ padding: '16px 20px' }}>
                                <div className="hotline-grid">
                                    {dashboardData.hotlines.map((h, i) => (
                                        <div key={i} className="hotline-card">
                                            <div className="hotline-org">{h.organization}</div>
                                            <div className="hotline-number">{h.number}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FLOATING ACTION BUTTON */}
            <button className="fab" onClick={openModal}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                REPORT INCIDENT
            </button>

            {/* REPORT INCIDENT MODAL (Controlled by React State) */}
            <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={handleBackdropClick}>
                <div className="modal">
                    <div className="modal-header">
                        <div>
                            <h2>Submit Emergency Report</h2>
                            <p>Alert barangay officials of incidents near you</p>
                        </div>
                        <button className="close-btn" onClick={closeModal}>×</button>
                    </div>
                    {notification.show && (
                        <Notification
                            message={notification.message}
                            type={notification.type}
                            onClose={() => setNotification({ show: false, message: '', type: '' })}
                        />
                    )}
                    <div className="modal-body">
                        <form onSubmit={handleReportSubmit}>
                            <div className="form-group">
                                <label>Incident Type <span className="required">*</span></label>
                                <select
                                    name="incidentType"
                                    className="form-control"
                                    value={reportForm.incidentType}
                                    onChange={(e) => setReportForm({ ...reportForm, incidentType: e.target.value })}
                                >
                                    <option value="flood">Flood</option>
                                    <option value="fire">Fire</option>
                                    <option value="medical">Medical Emergency</option>
                                    <option value="accident">Accident</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Location <span className="required">*</span></label>
                                <div className="input-with-icon">
                                    <svg className="input-icon" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <input
                                        type="text"
                                        name="location"
                                        className="form-control"
                                        placeholder="Enter landmark or street name..."
                                        value={reportForm.location}
                                        onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                                        required
                                    />
                                    <button type="button" className="btn-location" title="Use Current Location">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description <span className="required">*</span></label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="3"
                                    placeholder="Provide details about the incident..."
                                    value={reportForm.description}
                                    onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Photo Evidence (Optional)</label>
                                <div className="file-upload-box">
                                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    <span>Click to upload photo</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => setReportForm({ ...reportForm, photo: e.target.files[0] })}
                                    />
                                </div>
                                {reportForm.photo && <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '4px' }}>Selected: {reportForm.photo.name}</p>}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-outline" onClick={closeModal} disabled={isSubmitting}>Cancel</button>
                        <button type="submit" className="btn-primary" onClick={handleReportSubmit} disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
