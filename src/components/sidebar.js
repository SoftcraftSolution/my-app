import React, { useEffect, useState } from 'react';
import './sidebar.css';
import RewardHistory from './rewardhistory';
import disp from './dd.png'; // Default image
import Cookies from 'js-cookie';

const Sidebar = () => {
    const [profile, setProfile] = useState({
        name: 'Loading...', // Default name
        avatar: disp, // Default image
    });

    useEffect(() => {
        // Retrieve profile name and avatar URL from cookies
        const nameFromCookies = Cookies.get('name');
        const avatarFromCookies = Cookies.get('profile_image');
        console.log(avatarFromCookies);

        // Update the state with the cookie values if they exist
        setProfile({
            name: nameFromCookies || 'Karan Nair', // Fallback to default name
            avatar: avatarFromCookies || disp, // Fallback to default image
        });
    }, []);

    const handleImageError = () => {
        setProfile(prevProfile => ({
            ...prevProfile,
            avatar: disp, // Revert to default image on error
        }));
    };

    return (
        <div className="sidebar">
            <div className="profile">
                <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="avatar"
                    onError={handleImageError} // Handle image load error
                />
                <p className="name">{profile.name}</p>
            </div>
            <nav className="menu">
                <a href="./home" className="menu-item">
                    <span className="icon home"></span>
                    <span className="text">Home</span>
                </a>
                <a href="./rewardhistory" className="menu-item">
                    <span className="icon reward"></span>
                    <span className="text">Reward History</span>
                </a>
                <a href="./Fav" className="menu-item">
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
