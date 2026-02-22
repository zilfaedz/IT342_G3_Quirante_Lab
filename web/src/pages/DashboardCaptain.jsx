import { useState } from "react";
import {
    LayoutDashboard, AlertTriangle, FileText, Users, Megaphone,
    User, Lock, Siren, Crown, Coins, Package, BarChart3, Bell,
    Plus, Search, X, Check, Trash2, Edit2
} from "lucide-react";
import "./DashboardCaptain.css";
import "./DashboardOfficial.css";
import "../global.css";
import LogoutModal from "../components/LogoutModal";
import { getReports } from "../services/api";
import { useEffect } from "react";

// ---- ICONS (using Lucide) ----
// Replacing the custom Icon helper with direct Lucide components for consistency

// ---- SIDEBAR NAV ----
const CAPTAIN_NAV = [
    { icon: <LayoutDashboard size={18} />, label: "Command Overview", id: "overview" },
    { icon: <AlertTriangle size={18} />, label: "All Incidents", id: "incidents" },
    { icon: <FileText size={18} />, label: "Budget & Resources", id: "resources" },
    { icon: <Users size={18} />, label: "Personnel Management", id: "personnel" },
    { icon: <Megaphone size={18} />, label: "Official Announcements", id: "announcements" },
    { icon: <User size={18} />, label: "Profile", id: "profile" },
    { icon: <Lock size={18} />, label: "Logout", id: "logout" },
];

const Sidebar = ({ active, setActive, user, onLogoutClick }) => (
    <aside className="rb-sidebar captain">
        <div className="rb-sidebar-logo">
            <div className="logo-icon captain">RB</div>
            <div className="logo-text">
                ReadyBarangay
                <span>Captain Portal</span>
            </div>
        </div>
        <nav className="rb-nav">
            <div className="rb-nav-section">Executive Command</div>
            {CAPTAIN_NAV.map(n => (
                <div
                    key={n.id}
                    className={`rb-nav-item${active === n.id ? " active" : ""}`}
                    onClick={() => {
                        if (n.id === "logout") {
                            onLogoutClick();
                        } else {
                            setActive(n.id);
                        }
                    }}
                >
                    {n.icon}
                    {n.label}
                </div>
            ))}
        </nav>
        <div className="rb-sidebar-footer">
            <div className="rb-user-pill">
                <div className="rb-avatar captain">{user?.firstName?.charAt(0) || 'C'}</div>
                <div className="rb-user-info">
                    <div className="rb-user-name">{user?.firstName} {user?.lastName || "Captain"}</div>
                    <div className="rb-user-role">Barangay Captain</div>
                </div>
            </div>
        </div>
    </aside>
);

// ---- SCREEN: COMMAND OVERVIEW ----
const CommandOverview = ({ incidents }) => {
    const unresolved = incidents.filter(i => i.status !== "RESOLVED").length;
    const criticalCount = incidents.filter(i => i.urgency === "Critical" || i.urgency === "High").length;

    return (
        <div className="captain-overview">
            <div className="rb-stat-grid">
                <div className="rb-stat-card gold">
                    <div className="rb-stat-icon gold"><Crown size={24} /></div>
                    <div className="rb-stat-label">Barangay Status</div>
                    <div className="rb-stat-value">E-STATE</div>
                    <div className="rb-stat-sub">Emergency Mode Active</div>
                </div>
                <div className="rb-stat-card">
                    <div className="rb-stat-icon red"><Siren size={24} /></div>
                    <div className="rb-stat-label">Total Unresolved</div>
                    <div className="rb-stat-value">{unresolved}</div>
                    <div className="rb-stat-sub">{criticalCount} critical needs priority</div>
                </div>
                <div className="rb-stat-card green">
                    <div className="rb-stat-icon green"><Coins size={24} /></div>
                    <div className="rb-stat-label">Relief Funds</div>
                    <div className="rb-stat-value">₱450k</div>
                    <div className="rb-stat-sub">72% of disaster budget</div>
                </div>
                <div className="rb-stat-card blue">
                    <div className="rb-stat-icon blue"><Package size={24} /></div>
                    <div className="rb-stat-label">Resource Level</div>
                    <div className="rb-stat-value">Good</div>
                    <div className="rb-stat-sub">Stocks for approx. 5 days</div>
                </div>
            </div>

            <div className="rb-grid-sidebar">
                <div>
                    <div className="rb-section-header">
                        <div className="rb-section-title">Critical Approvals Required</div>
                        <span className="rb-badge emergency">6 Pending</span>
                    </div>
                    <div className="rb-card">
                        <div className="rb-card-body" style={{ padding: 0 }}>
                            {[
                                { title: "Zone 4 Flood Relief Distribution", requester: "Officer Garcia", type: "Budget", cost: "₱12,500" },
                                { title: "Mass Evacuation Deployment (Zone 1)", requester: "Dispatcher Santos", type: "Operation", cost: "—" },
                                { title: "Emergency Medical Supply Replenishment", requester: "Official Reyes", type: "Purchase", cost: "₱5,400" },
                            ].map((a, i) => (
                                <div key={i} className="approval-item">
                                    <div className="app-info">
                                        <div className="app-title">{a.title}</div>
                                        <div className="app-meta">Requested by: <strong>{a.requester}</strong> · Type: {a.type} {a.cost !== "—" && `· Cost: ${a.cost}`}</div>
                                    </div>
                                    <div className="app-actions">
                                        <button className="rb-btn rb-btn-ghost rb-btn-sm" style={{ color: "var(--red-600)" }}>Decline</button>
                                        <button className="rb-btn rb-btn-primary rb-btn-sm" style={{ background: "var(--green-600)" }}>Approve</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="rb-card-footer" style={{ padding: 12, textAlign: "center", borderTop: "1px solid var(--gray-100)" }}>
                            <button className="rb-btn rb-btn-ghost rb-btn-sm">View All Pending Approvals</button>
                        </div>
                    </div>

                    <div className="rb-section-title" style={{ marginTop: 24, marginBottom: 16 }}>Response Team Efficiency</div>
                    <div className="rb-card">
                        <div className="rb-card-body">
                            <div className="rb-chart-placeholder">Response Time Statistics Chart</div>
                        </div>
                    </div>
                </div>

                <div className="right-sidebar">
                    <div className="rb-card" style={{ marginBottom: 20 }}>
                        <div className="rb-card-header"><div className="rb-card-title">Captain's Broadcast</div></div>
                        <div className="rb-card-body">
                            <textarea className="rb-textarea" placeholder="Broadcast message to all residents..."></textarea>
                            <div className="rb-divider"></div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                                <Siren size={14} style={{ marginRight: 8 }} />
                                <span style={{ fontSize: 11, fontWeight: 600 }}>High Priority Alert</span>
                                <input type="checkbox" className="rb-toggle-input" style={{ marginLeft: "auto" }} />
                            </div>
                            <button className="rb-btn rb-btn-primary" style={{ width: "100%" }}><Megaphone size={16} style={{ marginRight: 8 }} /> Send Broadcast</button>
                        </div>
                    </div>

                    <div className="rb-card">
                        <div className="rb-card-header"><div className="rb-card-title">Council Activity</div></div>
                        <div className="rb-card-body" style={{ padding: "10px 0" }}>
                            {[
                                { name: "Official Santos", action: "Updated Resources", time: "10m ago" },
                                { name: "Officer Garcia", action: "Resolved INC-042", time: "22m ago" },
                                { name: "Official Reyes", action: "Posted Announcement", time: "1h ago" },
                            ].map((l, i) => (
                                <div key={i} className="mini-log-item">
                                    <div className="rb-avatar" style={{ width: 24, height: 24, fontSize: 10 }}>{l.name[0]}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 12 }}><strong>{l.name}</strong> {l.action}</div>
                                        <div style={{ fontSize: 10, color: "var(--gray-400)" }}>{l.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ---- SCREEN: PERSONNEL MANAGEMENT ----
const PersonnelManagement = () => {
    const [users, setUsers] = useState([
        { id: 101, name: "Ricardo Santos", role: "OFFICIAL", email: "ricardo@brgy.ph", status: "Active" },
        { id: 102, name: "Elena Reyes", role: "OFFICIAL", email: "elena@brgy.ph", status: "Active" },
        { id: 201, name: "Mario Gomez", role: "RESPONDER", email: "mario@brgy.ph", status: "onDuty" },
        { id: 202, name: "Sarah Lim", role: "RESPONDER", email: "sarah@brgy.ph", status: "offDuty" },
        { id: 301, name: "Juan dela Cruz", role: "RESIDENT", email: "juan@gmail.com", status: "Verified" },
        { id: 302, name: "Maria Clara", role: "RESIDENT", email: "maria@yahoo.com", status: "Verified" },
        { id: 303, name: "Pedro Penduko", role: "RESIDENT", email: "pedro@outlook.com", status: "Pending" },
    ]);

    const handleRoleChange = (userId, newRole) => {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    };

    const officials = users.filter(u => u.role === "OFFICIAL");
    const responders = users.filter(u => u.role === "RESPONDER");
    const residents = users.filter(u => u.role === "RESIDENT");

    const UserTable = ({ title, data, badgeClass }) => (
        <div className="rb-card" style={{ marginBottom: 24 }}>
            <div className="rb-card-header">
                <div className="rb-card-title">{title}</div>
                <span className={`rb-badge ${badgeClass}`}>{data.length} Members</span>
            </div>
            <div className="rb-card-body" style={{ padding: 0 }}>
                <table className="rb-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th style={{ textAlign: "right" }}>Management</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(u => (
                            <tr key={u.id}>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div className="rb-avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{u.name[0]}</div>
                                        <strong>{u.name}</strong>
                                    </div>
                                </td>
                                <td style={{ fontSize: 12, color: "var(--gray-500)" }}>{u.email}</td>
                                <td>
                                    <span className={`rb-status-pill ${u.status === 'Active' || u.status === 'onDuty' || u.status === 'Verified' ? 'active' : 'pending'}`}>
                                        {u.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    <select
                                        className="rb-select-sm"
                                        value={u.role}
                                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                    >
                                        <option value="RESIDENT">Resident</option>
                                        <option value="OFFICIAL">Official</option>
                                        <option value="RESPONDER">Responder</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="captain-personnel">
            <div className="rb-section-header">
                <div>
                    <div className="rb-section-title">Personnel & Residents Directory</div>
                    <div className="rb-section-sub">Manage roles and permissions for all barangay members</div>
                </div>
                <div className="rb-header-actions">
                    <button className="rb-btn rb-btn-ghost">
                        <Search size={16} style={{ marginRight: 6 }} /> Search
                    </button>
                    <button className="rb-btn rb-btn-primary">
                        <Plus size={16} style={{ marginRight: 6 }} /> Add Personnel
                    </button>
                </div>
            </div>

            <UserTable title="Barangay Officials" data={officials} badgeClass="warn" />
            <UserTable title="Emergency Responders" data={responders} badgeClass="emergency" />
            <UserTable title="Registered Residents" data={residents} badgeClass="info" />
        </div>
    );
};

// ---- MAIN EXPORT ----
export default function DashboardCaptain({ user }) {
    const [active, setActive] = useState("overview");
    const [showLogout, setShowLogout] = useState(false);
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const res = await getReports();
                setIncidents(res.data);
            } catch (err) {
                console.error("Fetch incidents error:", err);
            }
        };
        fetchIncidents();
        const interval = setInterval(fetchIncidents, 30000); // 30s polling
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
    };

    const screens = {
        overview: <CommandOverview incidents={incidents} />,
        incidents: <div className="rb-card">
            <div className="rb-table-wrap">
                <table className="rb-table">
                    <thead><tr><th>ID</th><th>Type</th><th>Priority</th><th>Resident</th><th>Time</th><th>Status</th></tr></thead>
                    <tbody>
                        {incidents.map(i => (
                            <tr key={i.id}>
                                <td><code>INC-{i.id}</code></td>
                                <td>{i.incidentType}</td>
                                <td><span className={`rb-badge ${i.urgency?.toLowerCase() || 'medium'}`}>{i.urgency || 'Medium'}</span></td>
                                <td>{i.user?.firstName} {i.user?.lastName}</td>
                                <td>{new Date(i.createdAt).toLocaleTimeString()}</td>
                                <td><span className={`rb-badge ${i.status.toLowerCase()}`}>{i.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>,
        resources: <div className="rb-empty"><div className="rb-empty-icon"><FileText size={48} /></div><div className="rb-empty-text">Budget & Resource Tracking Module</div></div>,
        personnel: <PersonnelManagement />,
        announcements: <div className="rb-empty"><div className="rb-empty-icon"><Megaphone size={48} /></div><div className="rb-empty-text">Executive Announcement Panel</div></div>,
        profile: <div className="rb-empty"><div className="rb-empty-icon"><User size={48} /></div><div className="rb-empty-text">Captain's Settings</div></div>,
    };

    return (
        <div className="rb-layout">
            <Sidebar
                active={active}
                setActive={setActive}
                user={user}
                onLogoutClick={() => setShowLogout(true)}
            />
            <div className="rb-main">
                <header className="rb-header">
                    <div className="rb-header-title">Executive Command Center</div>
                    <div className="rb-header-actions">
                        <span className="captain-badge">COMMAND ACTIVE</span>
                        <div className="rb-notif-bell">
                            <Bell size={20} />
                            <div className="rb-notif-count">{incidents.filter(i => i.status === 'PENDING').length}</div>
                        </div>
                    </div>
                </header>
                <div className="rb-content">
                    {screens[active]}
                </div>
            </div>

            <LogoutModal
                show={showLogout}
                onClose={() => setShowLogout(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
}
