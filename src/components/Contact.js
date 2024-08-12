import React, { useState } from 'react';
import './Contact.css';
import Sidebar from './sidebar'; // Import the Sidebar component
import menuIcon from './Group 1171275657.png'; // Path to your menu icon

const ContactForm = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="contact-form-container">
      <div className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar sidebarOpen={sidebarOpen} />
      </div>
      <div className="menu-icon" onClick={toggleSidebar}>
        <img src={menuIcon} alt="Menu Icon" />
      </div>
      <div className={`contact-form-content ${sidebarOpen ? 'shifted' : ''}`}>
        <header className="form-header">
          <h1>Get In Touch</h1>
          <p>We are here to help you</p>
        </header>
        <form className="contact-form">
          <input type="text" placeholder="Full Name" className="input-field" />
          <input type="email" placeholder="Email ID" className="input-field" />
          <input type="tel" placeholder="Phone Number" className="input-field" />
          <textarea placeholder="Message (optional)" className="input-field textarea-field"></textarea>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
