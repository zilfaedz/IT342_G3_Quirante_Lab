import { useState, useEffect } from "react";
import {
    MapPin, Sun, CloudSun, CloudFog, CloudRain, CloudRainWind, CloudLightning,
    Droplets, Wind, Globe, AlertTriangle, Siren, Waves, TreeDeciduous,
    Flame, Mountain, LifeBuoy, Zap, FileText, Camera, CheckCircle2,
    Building2, Megaphone, ClipboardList, Bell, Map, Phone, Clock,
    Edit2, Trash2, Lock, Navigation, Info, Search, X
} from "lucide-react";
import "./DashboardResident.css";
import "../global.css";
import LogoutModal from "../components/LogoutModal";
import { submitReport, getReports, getDashboardData } from "../services/api";

// ---- ICONS (using Lucide) ----
// Replacing the custom Icon helper with direct Lucide components for consistency

// ---- SIDEBAR NAV ----
const RESIDENT_NAV = [
    { icon: <MapPin size={18} />, label: "Dashboard", id: "dashboard" },
    { icon: <AlertTriangle size={18} />, label: "Emergency Report", id: "report" },
    { icon: <Building2 size={18} />, label: "Evacuation Centers", id: "evacuation" },
    { icon: <ClipboardList size={18} />, label: "My Reports", id: "myreports" },
    { icon: <Bell size={18} />, label: "Announcements", id: "announcements" },
    { icon: <Navigation size={18} />, label: "Profile", id: "profile" },
    { icon: <Lock size={18} />, label: "Logout", id: "logout" },
];

const Sidebar = ({ active, setActive, user, onLogoutClick }) => (
    <aside className="rb-sidebar">
        <div className="rb-sidebar-logo">
            <div className="logo-icon">RB</div>
            <div className="logo-text">
                ReadyBarangay
                <span>Resident Portal</span>
            </div>
        </div>
        <nav className="rb-nav">
            <div className="rb-nav-section">Navigation</div>
            {RESIDENT_NAV.map(n => (
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
                <div className="rb-avatar">{user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}{(user?.lastName?.charAt(0) || '')}</div>
                <div className="rb-user-info">
                    <div className="rb-user-name">{user?.firstName} {user?.lastName}</div>
                    <div className="rb-user-role">Resident</div>
                </div>
            </div>
        </div>
    </aside>
);

// ---- WEATHER WIDGET ----
const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Using Open-Meteo (No key required)
                const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=10.3157&longitude=123.8854&current_weather=true&hourly=relative_humidity_2m");
                const data = await res.json();

                if (data.current_weather) {
                    const code = data.current_weather.weathercode;
                    let condition = "Clear";
                    let icon = <Sun size={44} color="#FFA000" />;

                    if (code >= 1 && code <= 3) { condition = "Partly Cloudy"; icon = <CloudSun size={44} color="#757575" />; }
                    else if (code >= 45 && code <= 48) { condition = "Foggy"; icon = <CloudFog size={44} color="#9E9E9E" />; }
                    else if (code >= 51 && code <= 67) { condition = "Rainy"; icon = <CloudRain size={44} color="#2563eb" />; }
                    else if (code >= 80 && code <= 82) { condition = "Showers"; icon = <CloudRainWind size={44} color="#2563eb" />; }
                    else if (code >= 95) { condition = "Thunderstorm"; icon = <CloudLightning size={44} color="#D32F2F" />; }

                    setWeather({
                        temp: Math.round(data.current_weather.temperature),
                        condition: condition,
                        humidity: data.hourly?.relative_humidity_2m?.[0] || 75,
                        wind: data.current_weather.windspeed,
                        icon: icon
                    });
                }
            } catch (err) {
                console.error("Weather fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    if (loading) return <div className="rb-weather loading">Loading weather...</div>;
    if (!weather) return <div className="rb-weather error">Weather unavailable</div>;

    return (
        <div className="rb-weather">
            <div className="rb-weather-icon">
                {weather.icon}
            </div>
            <div>
                <div className="rb-weather-info">
                    <div className="location"><MapPin size={14} style={{ marginRight: 4 }} /> Cebu City, PH</div>
                    <div className="condition">{weather.condition}</div>
                </div>
                <div className="rb-weather-temp">{weather.temp}°C</div>
                <div className="rb-weather-details">
                    <span><Droplets size={14} style={{ marginRight: 4 }} /> {weather.humidity}% Humidity</span>
                    <span><Wind size={14} style={{ marginRight: 4 }} /> {weather.wind} m/s Wind</span>
                </div>
            </div>
            <div className="weather-forecast">
                {[
                    { day: "Mon", Icon: CloudSun },
                    { day: "Tue", Icon: CloudRain },
                    { day: "Wed", Icon: CloudLightning },
                    { day: "Thu", Icon: CloudSun },
                    { day: "Fri", Icon: Sun }
                ].map((d, i) => (
                    <div key={d.day} className="forecast-day">
                        <div className="forecast-label">{d.day}</div>
                        <div className="forecast-icon"><d.Icon size={18} /></div>
                        <div className="forecast-temp">{[weather.temp, weather.temp - 2, weather.temp - 3, weather.temp + 1, weather.temp + 2][i]}°</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ---- EARTHQUAKE WIDGET ----
const EarthquakeWidget = () => {
    const [quakes, setQuakes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const fetchQuakes = async () => {
            try {
                const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
                const res = await fetch(url);
                const data = await res.json();

                const filtered = data.features.filter(f =>
                    f.properties.place.toLowerCase().includes("philippines") &&
                    f.properties.mag >= 4.0
                );

                const processed = filtered.slice(0, 3).map(f => ({
                    mag: f.properties.mag.toFixed(1),
                    location: f.properties.place.replace(", Philippines", ""),
                    time: new Date(f.properties.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    level: f.properties.mag >= 6 ? "severe" : f.properties.mag >= 5 ? "moderate" : "light",
                    timestamp: f.properties.time
                }));

                // Auto-trigger alert: If any quake > 6.0 within last 6 hours
                const critical = processed.find(q => q.mag >= 6.0 && (Date.now() - q.timestamp) < 21600000);
                if (critical) setAlert(critical);

                setQuakes(processed);
            } catch (err) {
                console.error("Quake fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuakes();
    }, []);

    return (
        <div className="rb-quake-widget">
            <div className="rb-quake-header">
                <Globe size={18} style={{ marginRight: 8, color: "var(--color-3)" }} /> Recent Earthquakes (Phils)
                <span className="philvocs-tag">USGS MAG 4+</span>
            </div>
            {alert && (
                <div className="rb-alert-urgent" style={{ marginBottom: 12 }}>
                    <Siren size={18} style={{ marginRight: 8 }} />
                    <strong>CRITICAL ALERT:</strong> Magnitude {alert.mag} Earthquake in {alert.location}. Seek safety if near.
                </div>
            )}
            {loading ? (
                <div className="rb-loading-spin">Loading seismic data...</div>
            ) : quakes.length > 0 ? (
                quakes.map((q, i) => (
                    <div key={i} className="rb-quake-item">
                        <div className={`rb-mag ${q.level}`}>{q.mag}</div>
                        <div className="rb-quake-info">
                            <div className="rb-quake-location">{q.location}</div>
                            <div className="rb-quake-meta">{q.time} · Magnitude {q.mag}</div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="rb-empty-small">No significant seismic activity (&gt;4.0)</div>
            )}
            <div className="rb-quake-powered">Data: USGS Earthquake Hazards Program</div>
        </div>
    );
};

// ---- REPORT MODAL ----

const ReportModal = ({ onClose, onSuccess }) => {
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        incidentType: "Flood",
        urgency: "Medium",
        description: "",
        location: "Barangay 76, Cebu City",
        photo: null
    });

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setForm({ ...form, photo: e.target.files[0] });
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("incidentType", form.incidentType);
            formData.append("description", form.description);
            formData.append("location", form.location);
            formData.append("urgency", form.urgency);
            if (form.photo) {
                formData.append("photo", form.photo);
            }

            await submitReport(formData);
            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            console.error("Submission error:", err);
            alert("Failed to submit report. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="rb-modal-overlay" onClick={onClose}>
            <div className="rb-modal" onClick={e => e.stopPropagation()}>
                <div className="rb-modal-header">
                    <div className="rb-modal-title"><Siren size={20} style={{ marginRight: 8 }} /> Submit Emergency Report</div>
                    <button className="rb-btn rb-btn-ghost rb-btn-icon" onClick={onClose}><X size={20} /></button>
                </div>
                <div className="rb-modal-body">
                    <div className="modal-steps">
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`modal-step${step >= s ? " done" : ""}${step === s ? " active" : ""}`}>
                                <div className="step-dot">{s}</div>
                                <div className="step-label">{["Incident", "Details", "Submit"][s - 1]}</div>
                            </div>
                        ))}
                    </div>
                    {step === 1 && (
                        <>
                            <div className="rb-form-group">
                                <label className="rb-label">Incident Type</label>
                                <div className="incident-type-grid">
                                    {[
                                        { icon: <Waves size={24} />, label: "Flood" },
                                        { icon: <TreeDeciduous size={24} />, label: "Fallen Tree" },
                                        { icon: <Flame size={24} />, label: "Fire" },
                                        { icon: <Mountain size={24} />, label: "Landslide" },
                                        { icon: <LifeBuoy size={24} />, label: "Trapped Person" },
                                        { icon: <Zap size={24} />, label: "Power Outage" },
                                    ].map(t => (
                                        <div
                                            key={t.label}
                                            className={`incident-type-card${form.incidentType === t.label ? " active" : ""}`}
                                            onClick={() => setForm({ ...form, incidentType: t.label })}
                                        >
                                            <span>{t.icon}</span>
                                            <span>{t.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="rb-form-group">
                                <label className="rb-label">Urgency Level</label>
                                <div className="rb-radio-group">
                                    {["Low", "Medium", "High"].map(u => (
                                        <div className="rb-radio-pill" key={u}>
                                            <input
                                                type="radio"
                                                name="urgency"
                                                id={`u-${u}`}
                                                checked={form.urgency === u}
                                                onChange={() => setForm({ ...form, urgency: u })}
                                            />
                                            <label htmlFor={`u-${u}`}>{u}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className="rb-form-group">
                                <label className="rb-label">Description</label>
                                <textarea
                                    className="rb-textarea"
                                    placeholder="Describe the situation in detail..."
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="rb-form-group">
                                <label className="rb-label">Upload Photo</label>
                                <label className="photo-upload-zone">
                                    <input type="file" hidden onChange={handlePhotoChange} accept="image/*" />
                                    <div className="photo-icon">{form.photo ? <FileText size={40} /> : <Camera size={40} />}</div>
                                    <div>{form.photo ? form.photo.name : "Click to upload or drag & drop"}</div>
                                    <div style={{ fontSize: 11, color: "var(--gray-400)" }}>PNG, JPG up to 10MB</div>
                                </label>
                            </div>
                            <div className="rb-form-group">
                                <label className="rb-label">Location</label>
                                <div className="location-detect">
                                    <input
                                        className="rb-input"
                                        placeholder="Location details..."
                                        value={form.location}
                                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    />
                                    <button className="rb-btn rb-btn-secondary"><MapPin size={16} style={{ marginRight: 6 }} /> Detect GPS</button>
                                </div>
                            </div>
                        </>
                    )}
                    {step === 3 && (
                        <div className="confirm-panel">
                            <div className="confirm-icon"><CheckCircle2 size={64} color="var(--green-600)" /></div>
                            <h3>Ready to Submit</h3>
                            <p>Your emergency report will be sent immediately to Barangay Officials.</p>
                            <div className="confirm-details">
                                <div><span>Type:</span> {form.incidentType}</div>
                                <div><span>Urgency:</span> <span className={`rb-badge ${form.urgency.toLowerCase()}`}>{form.urgency}</span></div>
                                <div><span>Location:</span> {form.location}</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="rb-modal-footer">
                    {step > 1 && <button className="rb-btn rb-btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>}
                    {step < 3 && <button className="rb-btn rb-btn-primary" onClick={() => setStep(s => s + 1)}>Next →</button>}
                    {step === 3 && (
                        <button
                            className="rb-btn rb-btn-primary"
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? "Sending..." : <><Siren size={18} style={{ marginRight: 8 }} /> Submit Report</>}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// ---- SCREENS ----
const DashboardHome = ({ onReport, stats }) => (
    <div>
        <div className="rb-alert-banner">
            <div className="alert-dot"></div>
            ACTIVE ALERT: Monitoring Barangay 76 Safety Status · Official Updates every 15m
        </div>

        <div className="rb-grid-sidebar" style={{ marginBottom: 20 }}>
            <WeatherWidget />
            <EarthquakeWidget />
        </div>

        <div className="rb-quick-actions">
            <div className="rb-quick-action emergency" onClick={onReport}>
                <div className="qa-icon"><LifeBuoy size={32} /></div>
                <div className="qa-label">Report Emergency</div>
            </div>
            <div className="rb-quick-action">
                <div className="qa-icon"><Building2 size={32} /></div>
                <div className="qa-label">Evacuation Centers</div>
            </div>
            <div className="rb-quick-action">
                <div className="qa-icon"><Megaphone size={32} /></div>
                <div className="qa-label">View Alerts</div>
            </div>
            <div className="rb-quick-action">
                <div className="qa-icon"><ClipboardList size={32} /></div>
                <div className="qa-label">My Reports</div>
            </div>
        </div>

        <div className="rb-stat-grid">
            <div className="rb-stat-card">
                <div className="rb-stat-icon red"><ClipboardList size={24} /></div>
                <div className="rb-stat-label">My Active Reports</div>
                <div className="rb-stat-value">{stats.activeReports}</div>
                <div className="rb-stat-sub">Recent submmisions</div>
            </div>
            <div className="rb-stat-card amber">
                <div className="rb-stat-icon amber"><Megaphone size={24} /></div>
                <div className="rb-stat-label">System Alerts</div>
                <div className="rb-stat-value">{stats.alerts}</div>
                <div className="rb-stat-sub">Emergency broadcasts</div>
            </div>
            <div className="rb-stat-card green">
                <div className="rb-stat-icon green"><Building2 size={24} /></div>
                <div className="rb-stat-label">Nearest Center</div>
                <div className="rb-stat-value" style={{ fontSize: 18, marginTop: 4 }}>{stats.nearestCenter}</div>
                <div className="rb-stat-sub">Safe zones available</div>
            </div>
        </div>

        <div className="rb-grid-2">
            <div className="rb-card">
                <div className="rb-card-header">
                    <div className="rb-card-title">My Safety Status</div>
                </div>
                <div className="rb-card-body">
                    <div className="safety-status-grid">
                        <div className="rb-safety-btn safe"><CheckCircle2 size={18} style={{ marginRight: 8 }} /> I'm Safe</div>
                        <div className="rb-safety-btn help"><LifeBuoy size={18} style={{ marginRight: 8 }} /> Need Help</div>
                    </div>
                    <div className="safety-last">Last updated: Today, 8:12 AM · <strong>Safe</strong></div>
                </div>
            </div>
            <div className="rb-card">
                <div className="rb-card-header">
                    <div className="rb-card-title">Recent Announcements</div>
                    <button className="rb-btn rb-btn-ghost rb-btn-sm">View All</button>
                </div>
                <div className="rb-card-body" style={{ padding: "12px 20px" }}>
                    {[
                        { title: "Flood Preparedness Advisory", time: "1 hr ago", emergency: true, unread: true },
                        { title: "Community Clean Drive — Sat 8AM", time: "Yesterday", emergency: false, unread: true },
                        { title: "Barangay Meeting Schedule", time: "2 days ago", emergency: false, unread: false },
                    ].map((a, i) => (
                        <div key={i} className={`rb-announcement${a.emergency ? " emergency-alert" : ""}${a.unread ? " unread" : ""}`}>
                            {a.unread && <div className="rb-unread-dot"></div>}
                            <div className="rb-announcement-title">{a.emergency ? <Siren size={16} style={{ marginRight: 6, display: "inline" }} /> : ""}{a.title}</div>
                            <div className="rb-announcement-meta">
                                {a.emergency && <span className="rb-badge emergency">Emergency</span>}
                                <span>{a.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const MyReports = ({ reports }) => {
    return (
        <div>
            <div className="rb-section-header">
                <div className="rb-section-title">My Reports</div>
            </div>
            <div className="rb-card">
                {reports.length === 0 ? (
                    <div className="rb-empty" style={{ padding: 40 }}>
                        <div className="rb-empty-icon"><ClipboardList size={48} /></div>
                        <div className="rb-empty-text">No reports submitted yet.</div>
                    </div>
                ) : (
                    <div className="rb-table-wrap">
                        <table className="rb-table">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Type</th><th>Urgency</th><th>Location</th><th>Status</th><th>Date</th><th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map(r => (
                                    <tr key={r.id}>
                                        <td><code style={{ fontSize: 11 }}>#{r.id}</code></td>
                                        <td>{r.incidentType}</td>
                                        <td><span className={`rb-badge ${r.urgency?.toLowerCase() || 'medium'}`}>{r.urgency || 'Medium'}</span></td>
                                        <td>{r.location}</td>
                                        <td><span className={`rb-badge pending`}>Active</span></td>
                                        <td style={{ color: "var(--gray-500)" }}>{new Date(r.createdAt).toLocaleDateString()}</td>
                                        <td><button className="rb-btn rb-btn-secondary rb-btn-sm">View Details</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const EvacuationCenters = () => {
    const centers = [
        { name: "Barangay Hall Gymnasium", address: "P. Burgos St., Brgy 76", capacity: 300, occupancy: 85, contact: "032-254-xxxx" },
        { name: "Cebu City National Science", address: "Mango Ave., Cebu City", capacity: 500, occupancy: 210, contact: "032-255-xxxx" },
        { name: "Don Bosco Chapel Center", address: "Leon Kilat St.", capacity: 200, occupancy: 30, contact: "032-256-xxxx" },
    ];
    return (
        <div>
            <div className="rb-section-title" style={{ marginBottom: 16 }}>Evacuation Centers</div>
            <div className="rb-map-placeholder"><Map size={48} opacity={0.5} /></div>
            <div style={{ marginTop: 20 }}>
                {centers.map((c, i) => (
                    <div key={i} className="rb-card" style={{ marginBottom: 12 }}>
                        <div className="evacuation-card-inner">
                            <div>
                                <div className="evac-name">{c.name}</div>
                                <div className="evac-address"><MapPin size={12} style={{ marginRight: 4 }} /> {c.address}</div>
                                <div className="evac-contact"><Phone size={12} style={{ marginRight: 4 }} /> {c.contact}</div>
                            </div>
                            <div className="evac-stats">
                                <div className="evac-capacity">
                                    <div className="cap-label">Capacity</div>
                                    <div className="cap-value">{c.occupancy} / {c.capacity}</div>
                                    <div className="cap-bar">
                                        <div className="cap-fill" style={{ width: `${(c.occupancy / c.capacity) * 100}%`, background: c.occupancy / c.capacity > 0.8 ? "var(--red-600)" : "var(--green-600)" }}></div>
                                    </div>
                                </div>
                                <button className="rb-btn rb-btn-primary rb-btn-sm"><Navigation size={14} style={{ marginRight: 4 }} /> Navigate</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Announcements = () => {
    const anns = [
        { title: "TYPHOON WARNING: Prepare Evacuation Bags", body: "Barangay Officials advise all residents to prepare emergency kits with 3-day supplies. Evacuation may commence by 6PM.", time: "1 hr ago", emergency: true, unread: true },
        { title: "Community Flood Preparedness Seminar", body: "Join us on Saturday, Feb 24 at the Barangay Hall for a free seminar on flood preparedness.", time: "3 hrs ago", emergency: false, unread: true },
        { title: "Barangay Clean-Up Drive Results", body: "Thank you to all 200+ volunteers who participated in last Saturday's clean-up drive!", time: "Yesterday", emergency: false, unread: false },
        { title: "Updated Evacuation Routes Posted", body: "New evacuation route maps have been posted at the barangay bulletin board and online.", time: "2 days ago", emergency: false, unread: false },
    ];
    return (
        <div>
            <div className="rb-section-header">
                <div className="rb-section-title">Announcements</div>
                <div className="rb-filters">
                    <select className="rb-filter-select"><option>All</option><option>Emergency</option><option>General</option></select>
                </div>
            </div>
            {anns.map((a, i) => (
                <div key={i} className={`rb-announcement${a.emergency ? " emergency-alert" : ""}${a.unread ? " unread" : ""}`} style={{ marginBottom: 10 }}>
                    {a.unread && <div className="rb-unread-dot"></div>}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <div className="rb-announcement-title">{a.emergency ? <Siren size={18} style={{ marginRight: 6 }} /> : ""}{a.title}</div>
                        {a.unread && <span className="rb-badge responding" style={{ fontSize: 9 }}>New</span>}
                    </div>
                    <div className="rb-announcement-body">{a.body}</div>
                    <div className="rb-announcement-meta">
                        {a.emergency && <span className="rb-badge emergency">Emergency</span>}
                        <span><Clock size={12} style={{ marginRight: 4 }} /> {a.time}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Profile = ({ user }) => (
    <div>
        <div className="rb-section-title" style={{ marginBottom: 20 }}>My Profile</div>
        <div className="rb-grid-2">
            <div className="rb-card">
                <div className="rb-card-header"><div className="rb-card-title">Personal Information</div></div>
                <div className="rb-card-body">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar">{user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}</div>
                        <button className="rb-btn rb-btn-secondary rb-btn-sm">Change Photo</button>
                    </div>
                    <div className="rb-form-group"><label className="rb-label">Full Name</label><input className="rb-input" defaultValue={`${user?.firstName} ${user?.lastName}`} /></div>
                    <div className="rb-form-group"><label className="rb-label">Address</label><input className="rb-input" defaultValue="123 Rizal St., Brgy 76, Cebu City" /></div>
                    <div className="rb-form-group"><label className="rb-label">Contact Number</label><input className="rb-input" defaultValue={user?.phoneNumber || "+63 912 345 6789"} /></div>
                    <div className="rb-form-group"><label className="rb-label">Barangay</label><input className="rb-input" defaultValue="Barangay 76, Cebu City" readOnly /></div>
                    <button className="rb-btn rb-btn-primary">Save Changes</button>
                </div>
            </div>
            <div>
                <div className="rb-card" style={{ marginBottom: 16 }}>
                    <div className="rb-card-header">
                        <div className="rb-card-title">Emergency Contacts</div>
                        <button className="rb-btn rb-btn-primary rb-btn-sm">+ Add</button>
                    </div>
                    <div className="rb-card-body" style={{ padding: "12px 20px" }}>
                        {[
                            { name: "Juan Reyes", rel: "Spouse", num: "+63 917 xxx xxxx" },
                            { name: "Elena Santos", rel: "Mother", num: "+63 918 xxx xxxx" },
                        ].map((c, i) => (
                            <div key={i} className="emergency-contact-row">
                                <div className="ec-avatar">{c.name[0]}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name} · <span style={{ color: "var(--gray-500)", fontWeight: 400 }}>{c.rel}</span></div>
                                    <div style={{ fontSize: 12, color: "var(--gray-500)" }}>{c.num}</div>
                                </div>
                                <button className="rb-btn rb-btn-ghost rb-btn-sm"><Edit2 size={14} /></button>
                                <button className="rb-btn rb-btn-ghost rb-btn-sm"><Trash2 size={14} /></button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="rb-card">
                    <div className="rb-card-header"><div className="rb-card-title">Account Security</div></div>
                    <div className="rb-card-body">
                        <button className="rb-btn rb-btn-secondary" style={{ width: "100%", marginBottom: 10 }}><Lock size={16} style={{ marginRight: 8 }} /> Change Password</button>
                        <button className="rb-btn rb-btn-ghost" style={{ width: "100%", color: "var(--red-600)" }}><Navigation size={16} style={{ marginRight: 8, rotate: "90deg" }} /> Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// ---- MAIN EXPORT ----

export default function DashboardResident({ user }) {
    const [active, setActive] = useState("dashboard");
    const [isModalOpen, setModalOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [reports, setReports] = useState([]);
    const [stats, setStats] = useState({
        activeReports: 0,
        alerts: 2,
        nearestCenter: "Brgy Hall"
    });

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
    };

    const fetchData = async () => {
        try {
            const [reportsRes, dashboardRes] = await Promise.all([
                getReports(),
                getDashboardData()
            ]);
            setReports(reportsRes.data);

            // Map backend stats
            setStats({
                activeReports: reportsRes.data.length,
                alerts: dashboardRes.data.weatherAlerts?.length || 0,
                nearestCenter: dashboardRes.data.evacuationCenters?.[0]?.name || "Brgy Hall"
            });
        } catch (err) {
            console.error("Dashboard fetch error:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const screens = {
        dashboard: <DashboardHome onReport={() => setModalOpen(true)} stats={stats} />,
        report: <div className="rb-empty"><div className="rb-empty-icon"><Siren size={48} /></div><div className="rb-empty-text">Detailed Incident Reporting History</div><button onClick={() => setModalOpen(true)} className="rb-btn rb-btn-primary" style={{ marginTop: 20 }}>Report Incident Now</button></div>,
        evacuation: <EvacuationCenters />,
        myreports: <MyReports reports={reports} />,
        announcements: <div className="rb-empty"><div className="rb-empty-icon"><Bell size={48} /></div><div className="rb-empty-text">Community Alerts & Announcements</div></div>,
        profile: <Profile user={user} />,
    };

    const titles = {
        dashboard: "Resident Dashboard",
        report: "Emergency Reporting",
        evacuation: "Evacuation Status",
        myreports: "My Reported Incidents",
        announcements: "Community Bulletins",
        profile: "Account Settings",
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
                            <div className="rb-notif-count">3</div>
                        </div>
                    </div>
                </header>
                <div className="rb-content">
                    {screens[active]}
                </div>
            </div>

            {isModalOpen && <ReportModal onClose={() => setModalOpen(false)} onSuccess={fetchData} />}

            <LogoutModal
                show={showLogout}
                onClose={() => setShowLogout(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
}
