import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'All', icon: '🏠' },
        { id: 'parks', label: 'Parks', icon: '🌳' },
        { id: 'culture', label: 'Culture', icon: '🎨' },
        { id: 'sports', label: 'Sports', icon: '⚽' },
        { id: 'education', label: 'Education', icon: '📚' },
        { id: 'community', label: 'Community', icon: '👥' }
    ];

    const places = [
        { id: 1, name: 'Central Park', category: 'parks', image: '🌲', desc: 'Lorem ipsum dolor sit amet' },
        { id: 2, name: 'Cultural Center', category: 'culture', image: '🏛️', desc: 'Consectetur adipiscing elit' },
        { id: 3, name: 'Swimming Pool', category: 'sports', image: '🏊', desc: 'Sed do eiusmod tempor' },
        { id: 4, name: 'Public Library', category: 'education', image: '📖', desc: 'Incididunt ut labore' },
        { id: 5, name: 'Sports Complex', category: 'sports', image: '🏋️', desc: 'Et dolore magna aliqua' },
        { id: 6, name: 'Art Gallery', category: 'culture', image: '🖼️', desc: 'Ut enim ad minim veniam' }
    ];

    return (
        <div className="dashboard-modern">
            {/* Hero Section with Illustration */}
            <div className="dashboard-hero">
                <div className="hero-illustration">
                    <div className="illustration-trees">🌳 🌲 🌳</div>
                    <div className="illustration-people">👨‍👩‍👧‍👦 🚶‍♀️ 🧘‍♂️</div>
                    <div className="illustration-buildings">🏢 🏠 🏫</div>
                </div>
                <h1 className="hero-title">Welcome to Your Community</h1>
                <p className="hero-subtitle">Discover parks, activities, and events near you</p>

                {/* Search Bar */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for places, activities, or events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button className="search-button">🔍</button>
                </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="stats-section">
                <div className="stat-card">
                    <div className="stat-icon">🏞️</div>
                    <div className="stat-content">
                        <h3>Latest News</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing</p>
                        <span className="stat-date">Feb 14, 2026</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🎪</div>
                    <div className="stat-content">
                        <h3>Events</h3>
                        <p>Over 100 cultural events happening this month</p>
                        <span className="stat-date">Feb 14, 2026</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📢</div>
                    <div className="stat-content">
                        <h3>Announcements</h3>
                        <p>Check out the latest community updates</p>
                        <span className="stat-date">Feb 14, 2026</span>
                    </div>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="category-section">
                <h2 className="section-title">Explore by Category</h2>
                <div className="category-nav">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <span className="category-icon">{cat.icon}</span>
                            <span className="category-label">{cat.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Places Grid */}
            <div className="places-section">
                <h2 className="section-title">Popular Places</h2>
                <div className="places-grid">
                    {places.map(place => (
                        <div key={place.id} className="place-card">
                            <div className="place-image">
                                <div className="image-placeholder">{place.image}</div>
                            </div>
                            <div className="place-info">
                                <h3>{place.name}</h3>
                                <p className="place-category">{categories.find(c => c.id === place.category)?.label}</p>
                                <p className="place-desc">{place.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Map Section Placeholder */}
            <div className="map-section">
                <h2 className="section-title">Explore on Map</h2>
                <div className="map-placeholder">
                    <div className="map-illustration">
                        <p className="map-icon">🗺️</p>
                        <h3>Interactive Map</h3>
                        <p className="map-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explore locations on an interactive map.</p>
                        <div className="map-markers">
                            <span className="marker">📍</span>
                            <span className="marker">📍</span>
                            <span className="marker">📍</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activities Section */}
            <div className="activities-section">
                <h2 className="section-title">Recent Activities</h2>
                <div className="activities-carousel">
                    <div className="activity-card">
                        <div className="activity-image">🎨</div>
                        <h4>Art Workshop</h4>
                        <p>Creative sessions</p>
                    </div>
                    <div className="activity-card">
                        <div className="activity-image">🏃</div>
                        <h4>Morning Run</h4>
                        <p>Fitness activity</p>
                    </div>
                    <div className="activity-card">
                        <div className="activity-image">🎭</div>
                        <h4>Theater Show</h4>
                        <p>Cultural event</p>
                    </div>
                    <div className="activity-card">
                        <div className="activity-image">🎵</div>
                        <h4>Music Festival</h4>
                        <p>Live performance</p>
                    </div>
                    <div className="activity-card">
                        <div className="activity-image">📚</div>
                        <h4>Book Club</h4>
                        <p>Reading group</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
