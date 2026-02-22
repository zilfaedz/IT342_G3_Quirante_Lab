import { useState } from "react";
import {
    LayoutDashboard, AlertTriangle, Users, Megaphone,
    Package, ClipboardList, User, Lock, Siren, Activity,
    Building2, Home, MapPin, Bell, Download, Plus, Search, X
} from "lucide-react";
import "./DashboardOfficial.css";
import "../global.css";
import LogoutModal from "../components/LogoutModal";
import { getReports } from "../services/api";
import { useEffect } from "react";

// ---- ICONS (using Lucide) ----
// Replacing the custom Icon helper with direct Lucide components for consistency

// ---- SIDEBAR NAV ----
const OFFICIAL_NAV = [
    { icon: <LayoutDashboard size={18} />, label: "Overview", id: "overview" },
    { icon: <AlertTriangle size={18} />, label: "Incident Management", id: "incidents" },
    { icon: <Users size={18} />, label: "Resident Directory", id: "directory" },
    { icon: <Megaphone size={18} />, label: "Announcements", id: "announcements" },
    { icon: <Package size={18} />, label: "Resources", id: "resources" },
    { icon: <ClipboardList size={18} />, label: "Reports & Logs", id: "logs" },
    { icon: <User size={18} />, label: "Profile", id: "profile" },
    { icon: <Lock size={18} />, label: "Logout", id: "logout" },
];

const Sidebar = ({ active, setActive, user, onLogoutClick }) => (
    <aside className="rb-sidebar official">
        <div className="rb-sidebar-logo">
            <div className="logo-icon official">RB</div>
            <div className="logo-text">
                ReadyBarangay
                <span>Official Portal</span>
            </div>
        </div>
        <nav className="rb-nav">
            <div className="rb-nav-section">Operation Center</div>
            {OFFICIAL_NAV.map(n => (
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
                <div className="rb-avatar">{user?.firstName?.charAt(0) || 'O'}</div>
                <div className="rb-user-info">
                    <div className="rb-user-name">{user?.firstName} {user?.lastName || "Official"}</div>
                    <div className="rb-user-role">Barangay Official</div>
                </div>
            </div>
        </div>
    </aside>
);

// ---- SCREENS ----
const Overview = ({ incidents }) => {
    const activeIncidents = incidents.filter(i => i.status !== "RESOLVED" && i.status !== "RESOLVED"); // Backend uses PENDING, RESOLVED?
    // Let's assume PENDING and others are active.
    const pendingCount = incidents.filter(i => i.status === "PENDING").length;

    return (
        <div className="official-overview">
            <div className="rb-stat-grid">
                <div className="rb-stat-card">
                    <div className="rb-stat-icon red"><Siren size={24} /></div>
                    <div className="rb-stat-label">Active Incidents</div>
                    <div className="rb-stat-value">{incidents.filter(i => i.status !== "RESOLVED").length}</div>
                    <div className="rb-stat-sub">{pendingCount} pending review</div>
                </div>
                <div className="rb-stat-card amber">
                    <div className="rb-stat-icon amber"><Activity size={24} /></div>
                    <div className="rb-stat-label">On-field Responders</div>
                    <div className="rb-stat-value">8 / 15</div>
                    <div className="rb-stat-sub">3 teams active, 2 on standby</div>
                </div>
                <div className="rb-stat-card green">
                    <div className="rb-stat-icon green"><Building2 size={24} /></div>
                    <div className="rb-stat-label">Evacuation Centers</div>
                    <div className="rb-stat-value">3</div>
                    <div className="rb-stat-sub">620 / 1000 total capacity</div>
                </div>
                <div className="rb-stat-card blue">
                    <div className="rb-stat-icon blue"><Home size={24} /></div>
                    <div className="rb-stat-label">Registered Residents</div>
                    <div className="rb-stat-value">2,450</div>
                    <div className="rb-stat-sub">12 new this week</div>
                </div>
            </div>

            <div className="rb-grid-sidebar">
                <div className="rb-card">
                    <div className="rb-card-header">
                        <div className="rb-card-title">Live Response Map</div>
                        <div className="rb-filters">
                            <span className="rb-badge responding">Active Items Only</span>
                        </div>
                    </div>
                    <div className="rb-card-body">
                        <div className="rb-map-placeholder" style={{ height: 400 }}><MapPin size={24} style={{ marginRight: 8 }} /> Live Map View</div>
                    </div>
                </div>
                <div className="overview-sidebar">
                    <div className="rb-card" style={{ marginBottom: 20 }}>
                        <div className="rb-card-header"><div className="rb-card-title">Barangay Status</div></div>
                        <div className="rb-card-body">
                            <div className="status-toggle-item">
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 13 }}>Emergency Alert Mode</div>
                                    <div style={{ fontSize: 11, color: "var(--gray-500)" }}>Brgy-wide notification</div>
                                </div>
                                <input type="checkbox" className="rb-toggle-input" />
                            </div>
                            <div className="rb-divider"></div>
                            <div className="status-toggle-item">
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 13 }}>Evacuation Mandatory</div>
                                    <div style={{ fontSize: 11, color: "var(--gray-500)" }}>Active for Zone 1 & 4</div>
                                </div>
                                <input type="checkbox" className="rb-toggle-input" defaultChecked />
                            </div>
                        </div>
                    </div>

                    <div className="rb-card">
                        <div className="rb-card-header"><div className="rb-card-title">Recent Logs</div></div>
                        <div className="rb-card-body" style={{ padding: "10px 0" }}>
                            {incidents.slice(0, 4).map((l, i) => (
                                <div key={i} className="mini-log-item">
                                    <div className={`log-dot ${l.incidentType.toLowerCase()}`}></div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 12, fontWeight: 500 }}>{l.user?.firstName || 'Resident'} reported {l.incidentType}</div>
                                        <div style={{ fontSize: 10, color: "var(--gray-400)" }}>{new Date(l.createdAt).toLocaleTimeString()}</div>
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

const IncidentManagement = ({ incidents }) => (
    <div>
        <div className="rb-section-header">
            <div className="rb-section-title">Active Incidents</div>
            <div className="rb-header-actions">
                <button className="rb-btn rb-btn-secondary rb-btn-sm"><Download size={14} style={{ marginRight: 6 }} /> Export List</button>
                <button className="rb-btn rb-btn-primary rb-btn-sm"><Siren size={14} style={{ marginRight: 6 }} /> Create Incident</button>
            </div>
        </div>
        <div className="rb-filters">
            <input className="rb-search-input" placeholder="Search by ID, Resident, or Type..." />
            <select className="rb-filter-select"><option>Priority: All</option><option>High</option><option>Medium</option></select>
            <select className="rb-filter-select"><option>Status: All</option><option>Pending</option><option>Responding</option><option>Resolved</option></select>
            <select className="rb-filter-select"><option>Zone: All</option><option>Zone 1</option><option>Zone 2</option></select>
        </div>
        <div className="rb-card">
            <div className="rb-table-wrap">
                <table className="rb-table">
                    <thead>
                        <tr>
                            <th>ID</th><th>Incident Type</th><th>Resident</th><th>Priority</th><th>Status</th><th>Response Team</th><th>Time</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidents.map(i => (
                            <tr key={i.id}>
                                <td><code>INC-{i.id}</code></td>
                                <td>{i.incidentType}</td>
                                <td>{i.user?.firstName} {i.user?.lastName}</td>
                                <td><span className={`rb-badge ${i.urgency?.toLowerCase() || 'medium'}`}>{i.urgency || 'Medium'}</span></td>
                                <td><span className={`rb-badge ${i.status.toLowerCase()}`}>{i.status}</span></td>
                                <td style={{ fontWeight: 600 }}>{i.assignedTeam || "—"}</td>
                                <td style={{ color: "var(--gray-500)" }}>{new Date(i.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div style={{ display: "flex", gap: 5 }}>
                                        <button className="rb-btn rb-btn-secondary rb-btn-sm">Details</button>
                                        <button className="rb-btn rb-btn-primary rb-btn-sm">Assign</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const ResidentDirectory = () => (
    <div>
        <div className="rb-section-header">
            <div className="rb-section-title">Resident Directory</div>
            <button className="rb-btn rb-btn-primary rb-btn-sm"><Plus size={14} style={{ marginRight: 6 }} /> Register Resident</button>
        </div>
        <div className="rb-filters">
            <input className="rb-search-input" style={{ width: 300 }} placeholder="Search by Name, Address, or Contact..." />
            <select className="rb-filter-select"><option>Filter Zone</option></select>
            <select className="rb-filter-select"><option>Vulnerability Status</option><option>Elderly</option><option>PWD</option></select>
        </div>
        <div className="rb-card">
            <div className="rb-table-wrap">
                <table className="rb-table">
                    <thead>
                        <tr><th>Profile</th><th>Name</th><th>Contact</th><th>Address</th><th>Zone</th><th>Vulnerability</th><th>History</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {[
                            { name: "Juan Dela Cruz", contact: "09171234567", address: "123 Mabini St.", zone: "4", Tag: "Elderly" },
                            { name: "Maria Clara Santos", contact: "09187654321", address: "45 P. Burgos.", zone: "1", Tag: "—" },
                            { name: "Crisostomo Ibarra", contact: "09228889999", address: "88 Rizal Ave.", zone: "2", Tag: "PWD" },
                        ].map((r, i) => (
                            <tr key={i}>
                                <td><div className="rb-avatar" style={{ width: 30, height: 30, fontSize: 11 }}>{r.name[0]}</div></td>
                                <td><div style={{ fontWeight: 600 }}>{r.name}</div></td>
                                <td>{r.contact}</td>
                                <td>{r.address}</td>
                                <td>Zone {r.zone}</td>
                                <td>{r.Tag !== "—" ? <span className="rb-badge pending" style={{ background: "var(--gray-900)", color: "white" }}>{r.Tag}</span> : "—"}</td>
                                <td><button className="rb-btn rb-btn-ghost rb-btn-sm">View Logs</button></td>
                                <td><button className="rb-btn rb-btn-secondary rb-btn-sm">Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// ---- MAIN EXPORT ----
export default function DashboardOfficial({ user }) {
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
        const interval = setInterval(fetchIncidents, 30000); // Polling every 30s
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
    };

    const screens = {
        overview: <Overview incidents={incidents} />,
        incidents: <IncidentManagement incidents={incidents} />,
        residents: <ResidentDirectory />,
        announcements: <div className="rb-empty"><div className="rb-empty-icon"><Megaphone size={48} /></div><div className="rb-empty-text">Announcement Creation Panel</div></div>,
        resources: <div className="rb-empty"><div className="rb-empty-icon"><Package size={48} /></div><div className="rb-empty-text">Inventory & Resource Module</div></div>,
        logs: <div className="rb-empty"><div className="rb-empty-icon"><ClipboardList size={48} /></div><div className="rb-empty-text">System Performance & Logs</div></div>,
        profile: <div className="rb-empty"><div className="rb-empty-icon"><User size={48} /></div><div className="rb-empty-text">Official Settings</div></div>,
    };

    const titles = {
        overview: "Command Center Overview",
        incidents: "Incident Management",
        residents: "Resident Directory",
        announcements: "Manage Announcements",
        resources: "Resource Inventory",
        logs: "Audit Logs",
        profile: "My Settings",
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
                    <div className="rb-header-title">{titles[active]}</div>
                    <div className="rb-header-actions">
                        <div className="rb-notif-bell">
                            <Bell size={20} />
                            <div className="rb-notif-count">5</div>
                        </div>
                    </div>
                </header>
                <div className="rb-content">
                    {screens[active]}
                </div>
            </div>
        </div>
    );
}
