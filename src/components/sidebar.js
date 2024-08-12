import React from 'react';
import './sidebar.css';
import RewardHistory from './rewardhistory';
import disp from './dd.png';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="profile">
                <img src={disp} alt="Karan Nair" className="avatar" />
                <p className="name">Karan Nair</p>
            </div>
            <nav className="menu">
                <a href="#" className="menu-item">
                    <span className="icon home"></span>
                    <span className="text">Home</span>
                </a>
                <a href="./rewardhistory" className="menu-item">
                    <span className="icon reward"></span>
                    <span className="text">Reward History</span>
                </a>
                <a href="./favorite" className="menu-item">
                    <span className="icon favorites"></span>
                    <span className="text">Favorites</span>
                </a>
                <a href='./Contact' className="menu-item">
                    <span className="icon contact"></span>
                    <span className="text">Contact Us</span>
                </a>
                <a href="#" className="menu-item">
                    <span className="icon privacy"></span>
                    <span className="text">Privacy Policy</span>
                </a>
            </nav>
        </div>
    );
};

export default Sidebar;
