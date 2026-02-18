
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="split-screen">
            <div className="left-panel">
                <Outlet />
            </div>

            <div className="right-panel">
                <div className="circle circle-1"></div>
                <div className="brand-content">
                    <h1 className="brand-title">Welcome</h1>
                    <h3 className="brand-headline">Your Headline Name</h3>
                    <p className="brand-tagline">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum vehicula dui, non feugiat nibh euismod vitae.</p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
