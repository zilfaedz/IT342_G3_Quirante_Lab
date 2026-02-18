import React from 'react';
import './logoutModal.css';

const LogoutIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const LogoutModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>

                <div className="modal-header">
                    <div className="modal-icon">
                        <LogoutIcon />
                    </div>
                    <h3>Confirm Logout</h3>
                </div>

                <div className="modal-divider" />

                <div className="modal-body">
                    <p>Are you sure you want to sign out of your account?</p>
                </div>

                <div className="modal-footer">
                    <button className="modal-btn cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="modal-btn logout-btn" onClick={onConfirm}>
                        Sign Out
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LogoutModal;
