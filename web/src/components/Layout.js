import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="dashboard-wrapper">
            <Sidebar />
            <main className="main">
                {children}
            </main>
        </div>
    );
};

export default Layout;
