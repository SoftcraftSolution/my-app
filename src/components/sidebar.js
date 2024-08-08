import React from 'react';
import './sidebar.css';
import profilePic from './profpic.png'; // Ensure the path is correct

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="profile-section">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h3>Karan Nair</h3>
      </div>
      <nav className="menu">
        <ul>
          <li><a href="#"><i className="icon-home"></i>Home</a></li>
          <li><a href="#"><i className="icon-reward"></i>Reward History</a></li>
          <li><a href="#"><i className="icon-favorites"></i>Favorites</a></li>
          <li><a href="#"><i className="icon-contact"></i>Contact Us</a></li>
          <li><a href="#"><i className="icon-privacy"></i>Privacy Policy</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
