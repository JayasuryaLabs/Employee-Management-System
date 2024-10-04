import React from 'react';
import { Link } from 'react-router-dom';
import './topbar.css';

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Admin</span>
                </div>
                <div className="topRight">
                    {/* Dark Mode Toggle Icon */}
                    <div className="topbarIconContainer">
                        <i className="fas fa-moon"></i>
                    </div>

                    {/* Notification Icon */}
                    <div className="topbarIconContainer">
                        <i className="fas fa-bell"></i>
                        <span className="topIconBadge">3</span>
                    </div>

                    {/* Language Selector Icon */}
                    <div className="topbarIconContainer">
                        <i className="fas fa-globe"></i>
                    </div>

                    {/* Profile Avatar */}
                    <Link to="/profile">
                        <img
                            src="https://source.unsplash.com/random/?girl"
                            alt="Profile"
                            className="topAvatar"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}
