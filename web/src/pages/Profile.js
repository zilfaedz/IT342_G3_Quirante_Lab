import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-avatar-large">
                    <div className="avatar-placeholder">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                </div>
                <h1>{user?.name || 'User'}</h1>
                <p className="profile-email">{user?.email}</p>
            </div>

            <div className="profile-content">
                <div className="profile-section">
                    <h2>Personal Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Full Name</label>
                            <p>{user?.name || 'Not set'}</p>
                        </div>
                        <div className="info-item">
                            <label>Email Address</label>
                            <p>{user?.email || 'Not set'}</p>
                        </div>
                        <div className="info-item">
                            <label>Member Since</label>
                            <p>{new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="info-item">
                            <label>Account Status</label>
                            <p className="status-active">Active</p>
                        </div>
                    </div>
                </div>

                <div className="profile-section">
                    <h2>Activity</h2>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon">📍</div>
                            <div className="activity-details">
                                <h3>Visited Community Park</h3>
                                <p>2 days ago</p>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon">🎨</div>
                            <div className="activity-details">
                                <h3>Joined Art Workshop</h3>
                                <p>1 week ago</p>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon">🌳</div>
                            <div className="activity-details">
                                <h3>Explored Nature Trail</h3>
                                <p>2 weeks ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
