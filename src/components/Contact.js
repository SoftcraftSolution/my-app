import React from 'react';
import './Contact.css';

const ContactForm = () => {
  return (
    <div className="contact-form-container">
      <header className="form-header">
        <button className="menu-button">&#9776;</button>
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
  );
};

export default ContactForm;
