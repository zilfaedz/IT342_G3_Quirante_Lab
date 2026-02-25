import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./DashboardOfficial.css";
import "./AdminDashboard.css"; // Keep previous inner table styles
import LogoutModal from "../components/LogoutModal";
import {
    LayoutDashboard, ShieldCheck, Lock, Bell, Search,
    Users, UserCheck, UserX, MapPin, Eye, CheckCircle,
    XCircle, FileText, X, AlertCircle, Activity
} from "lucide-react";
import AdminTransfersScreen from "../components/AdminTransfersScreen";

// Local Sidebar component removed. Using global Layout sidebar + internal tabs.

// Inner Application Preview logic
function DocumentPreview({ title, url, onImageClick }) {
    if (!url) return null;
    const isPdf = url.toLowerCase().endsWith('.pdf');

    return (
        <div className="document-card">
            <span className="document-title">{title}</span>
            <div className="document-preview">
                {isPdf ? (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <FileText size={48} />
                        <br />View PDF
                    </a>
                ) : (
                    <div className="image-preview-container" onClick={() => onImageClick(url, title)}>
                        <img src={url} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
                        <div className="image-overlay">
                            <Eye size={24} color="white" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ImageModal({ url, title, onClose }) {
    if (!url) return null;

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = url;
        a.download = title.replace(/\s+/g, '_') + '_Document';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="image-modal-overlay" onClick={onClose} style={{ zIndex: 10001 }}>
            <div className="image-modal-content" onClick={e => e.stopPropagation()}>
                <div className="image-modal-header">
                    <h3>{title}</h3>
                    <div className="image-modal-actions">
                        <button className="download-btn" onClick={handleDownload}>
                            Download
                        </button>
                        <button className="close-btn" onClick={onClose}>
                            <X size={24} />
                        </button>
                    </div>
                </div>
                <div className="image-modal-body">
                    <img src={url} alt={title} className="full-size-image" />
                </div>
            </div>
        </div>
    );
}

const CaptainVerificationsScreen = ({ applications, stats, loading, handleAction, selectedApp, setSelectedApp, promptType, setPromptType, promptMessage, setPromptMessage, actionLoading }) => {
    const [modalImage, setModalImage] = useState(null);

    const getFullUrl = (path) => path ? `http://localhost:8080${path}` : null;

    if (loading) return <div className="loader">Loading Verifications...</div>;

    return (
        <div className="rb-dashboard" style={{ padding: 0, minHeight: 'auto', background: 'transparent' }}>
            <div className="admin-stats-container">
                <div className="stat-card">
                    <div className="stat-icon pending"><Users size={24} /></div>
                    <div className="stat-content">
                        <h3>Pending Applications</h3>
                        <p>{stats.pending || 0}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon approved"><UserCheck size={24} /></div>
                    <div className="stat-content">
                        <h3>Approved Captains</h3>
                        <p>{stats.approved || 0}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon rejected"><UserX size={24} /></div>
                    <div className="stat-content">
                        <h3>Rejected Applications</h3>
                        <p>{stats.rejected || 0}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon barangays"><MapPin size={24} /></div>
                    <div className="stat-content">
                        <h3>Registered Barangays</h3>
                        <p>{stats.registeredBarangays || 0}</p>
                    </div>
                </div>
            </div>

            <div className="admin-content-section rb-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Application ID</th>
                            <th>Name</th>
                            <th>Barangay</th>
                            <th>Municipality</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(app => (
                            <tr key={app.id}>
                                <td>#{app.id}</td>
                                <td>{app.fullName}</td>
                                <td>{app.barangay}</td>
                                <td>{app.cityName}</td>
                                <td>
                                    <span className={`status-badge ${app.accountStatus?.toLowerCase()}`}>
                                        <div className={`status-indicator ${app.accountStatus?.toLowerCase()}`} />
                                        {app.accountStatus === 'PENDING_VERIFICATION' ? 'Pending' :
                                            app.accountStatus === 'REQUEST_DOCS' ? 'Docs Reqd' :
                                                app.accountStatus || 'Pending'}
                                    </span>
                                </td>
                                <td>
                                    <button className="action-btn" onClick={() => setSelectedApp(app)}>
                                        <Eye size={16} /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {applications.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '24px' }}>No pending applications found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedApp && (
                <div className="modal-overlay" style={{ zIndex: 9999 }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Application Details: {selectedApp.fullName}</h2>
                            <button className="close-btn" onClick={() => setSelectedApp(null)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="info-grid">
                                <div className="info-section">
                                    <h3><Users size={18} /> Personal Info</h3>
                                    <div className="info-row"><span className="info-label">Full Name</span><span className="info-value">{selectedApp.fullName}</span></div>
                                    <div className="info-row"><span className="info-label">Date of Birth</span><span className="info-value">{selectedApp.captainDetails?.dateOfBirth || "N/A"}</span></div>
                                    <div className="info-row"><span className="info-label">Contact Number</span><span className="info-value">{selectedApp.contactNumber || "N/A"}</span></div>
                                    <div className="info-row"><span className="info-label">Email</span><span className="info-value">{selectedApp.email}</span></div>
                                </div>
                                <div className="info-section">
                                    <h3><MapPin size={18} /> Barangay Info</h3>
                                    <div className="info-row"><span className="info-label">Barangay Name</span><span className="info-value">{selectedApp.barangay}</span></div>
                                    <div className="info-row"><span className="info-label">Municipality</span><span className="info-value">{selectedApp.cityName}</span></div>
                                    <div className="info-row"><span className="info-label">Province</span><span className="info-value">{selectedApp.provinceName}</span></div>
                                    <div className="info-row"><span className="info-label">Barangay Code</span><span className="info-value">{selectedApp.barangayCode}</span></div>
                                </div>
                            </div>
                            <div className="documents-section">
                                <h3><FileText size={18} /> Uploaded Documents</h3>
                                <div className="documents-grid">
                                    <DocumentPreview title="Government ID" url={getFullUrl(selectedApp.captainDetails?.governmentIdUrl)} onImageClick={(url, title) => setModalImage({ url, title })} />
                                    <DocumentPreview title="Certificate of Appt." url={getFullUrl(selectedApp.captainDetails?.certificateOfAppointmentUrl)} onImageClick={(url, title) => setModalImage({ url, title })} />
                                    {selectedApp.captainDetails?.barangayResolutionUrl && (
                                        <DocumentPreview title="Barangay Resolution" url={getFullUrl(selectedApp.captainDetails?.barangayResolutionUrl)} onImageClick={(url, title) => setModalImage({ url, title })} />
                                    )}
                                    <DocumentPreview title="Selfie with ID" url={getFullUrl(selectedApp.captainDetails?.selfieUrl)} onImageClick={(url, title) => setModalImage({ url, title })} />
                                </div>
                            </div>
                        </div>

                        {selectedApp.accountStatus !== 'APPROVED' && selectedApp.accountStatus !== 'REJECTED' && (
                            <div className="modal-footer">
                                <button className="action-btn btn-reject" onClick={() => setPromptType('reject')}>
                                    <XCircle size={16} /> Reject
                                </button>
                                <button className="action-btn btn-request" onClick={() => setPromptType('request')}>
                                    <AlertCircle size={16} /> Request Docs
                                </button>
                                <button className="action-btn btn-approve" onClick={() => handleAction('approve')} disabled={actionLoading}>
                                    <CheckCircle size={16} /> Approve
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {promptType && (
                <div className="prompt-modal-overlay" style={{ zIndex: 10000 }}>
                    <div className="prompt-modal">
                        <h3>{promptType === 'reject' ? 'Reason for Rejection' : 'Additional Documents Required'}</h3>
                        <textarea
                            value={promptMessage}
                            onChange={(e) => setPromptMessage(e.target.value)}
                            placeholder={promptType === 'reject' ? 'Enter reason...' : 'Specify what documents are needed...'}
                            autoFocus
                        />
                        <div className="prompt-actions">
                            <button className="action-btn" onClick={() => setPromptType(null)}>Cancel</button>
                            <button
                                className="action-btn btn-approve"
                                onClick={() => handleAction(promptType)}
                                disabled={!promptMessage.trim() || actionLoading}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modalImage && (
                <ImageModal
                    url={modalImage.url}
                    title={modalImage.title}
                    onClose={() => setModalImage(null)}
                />
            )}
        </div>
    );
};

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [active, setActive] = useState("verifications");
    const [showLogout, setShowLogout] = useState(false);

    // Verification data
    const [stats, setStats] = useState({});
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedApp, setSelectedApp] = useState(null);
    const [promptType, setPromptType] = useState(null);
    const [promptMessage, setPromptMessage] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        if (!user || (user.role !== 'OFFICIAL' && user.role !== 'Super Admin')) {
            navigate('/dashboard');
            return;
        }
        fetchData();
    }, [user, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsRes, appsRes] = await Promise.all([
                api.get('/admin/verifications/stats'),
                api.get('/admin/verifications')
            ]);
            setStats(statsRes.data);
            setApplications(appsRes.data);
        } catch (err) {
            console.error("Failed to fetch admin data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (action) => {
        if (!selectedApp) return;
        setActionLoading(true);
        try {
            if (action === 'approve') {
                await api.post(`/admin/verifications/${selectedApp.id}/approve`);
            } else if (action === 'reject') {
                await api.post(`/admin/verifications/${selectedApp.id}/reject`, { reason: promptMessage });
                setPromptType(null);
            } else if (action === 'request') {
                await api.post(`/admin/verifications/${selectedApp.id}/request-docs`, { message: promptMessage });
                setPromptType(null);
            }
            setPromptMessage('');
            setSelectedApp(null);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to process action');
        } finally {
            setActionLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const screens = {
        verifications: (
            <CaptainVerificationsScreen
                applications={applications}
                stats={stats}
                loading={loading}
                handleAction={handleAction}
                selectedApp={selectedApp}
                setSelectedApp={setSelectedApp}
                promptType={promptType}
                setPromptType={setPromptType}
                promptMessage={promptMessage}
                setPromptMessage={setPromptMessage}
                actionLoading={actionLoading}
            />
        ),
        transfers: <AdminTransfersScreen />,
        overview: <div className="rb-empty"><div className="rb-empty-icon"><LayoutDashboard size={48} /></div><div className="rb-empty-text">System Overview Panel</div></div>
    };

    const titles = {
        verifications: "Captain Verifications",
        transfers: "Captain Transfers",
        overview: "System Administration"
    };

    return (
        <div className="rb-dashboard">
            <div className="rb-section-header" style={{ marginBottom: 24 }}>
                <div>
                    <div className="rb-section-title">System Administration</div>
                    <div className="rb-section-sub">Manage captain registrations, ownership transfers, and system health</div>
                </div>
            </div>

            <div className="rb-tabs" style={{
                display: 'flex',
                gap: '24px',
                borderBottom: '1px solid var(--gray-200)',
                marginBottom: '28px',
                padding: '0 4px'
            }}>
                <button
                    className={`rb-tab ${active === 'verifications' ? 'active' : ''}`}
                    onClick={() => setActive('verifications')}
                    style={{
                        padding: '12px 0',
                        borderBottom: active === 'verifications' ? '2px solid var(--blue-600)' : '2px solid transparent',
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        fontWeight: active === 'verifications' ? '700' : '500',
                        color: active === 'verifications' ? 'var(--blue-600)' : 'var(--gray-500)',
                        fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    <ShieldCheck size={18} /> Captain Verifications
                </button>
                <button
                    className={`rb-tab ${active === 'transfers' ? 'active' : ''}`}
                    onClick={() => setActive('transfers')}
                    style={{
                        padding: '12px 0',
                        borderBottom: active === 'transfers' ? '2px solid var(--blue-600)' : '2px solid transparent',
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        fontWeight: active === 'transfers' ? '700' : '500',
                        color: active === 'transfers' ? 'var(--blue-600)' : 'var(--gray-500)',
                        fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    <Activity size={18} /> Captain Transfers
                </button>
                <button
                    className={`rb-tab ${active === 'overview' ? 'active' : ''}`}
                    onClick={() => setActive('overview')}
                    style={{
                        padding: '12px 0',
                        borderBottom: active === 'overview' ? '2px solid var(--blue-600)' : '2px solid transparent',
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        fontWeight: active === 'overview' ? '700' : '500',
                        color: active === 'overview' ? 'var(--blue-600)' : 'var(--gray-500)',
                        fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    <LayoutDashboard size={18} /> System Overview
                </button>
            </div>

            <div className="admin-content-body">
                {screens[active]}
            </div>

            <LogoutModal
                show={showLogout}
                onClose={() => setShowLogout(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
}
