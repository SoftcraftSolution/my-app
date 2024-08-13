import React, { useState } from 'react';
import './Contact.css'; // Import the CSS file
import menuIcon from './Group 1171275657.png'; // Adjust path if necessary
import Sidebar from './sidebar';

const ContactForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const userId = '66b5e8001e961324d5d704db'; // Hardcoded userId

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the payload
        const feedbackData = {
            phoneNumber,
            message,
            userId,
        };

        try {
            const response = await fetch('https://ambulance-booking-backend.vercel.app/user/scan-star-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData),
            });

            if (response.ok) {
                alert('Feedback submitted successfully!');
                // Clear the form fields
                setPhoneNumber('');
                setMessage('');
            } else {
                alert('Failed to submit feedback.');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Error submitting feedback. Please try again.');
        }
    };

    return (
        <div className="contact-form-container">
            <header className="header">
                {/* Add any header content if necessary */}
            </header>
            <form className="form" onSubmit={handleSubmit}>
                <img src={menuIcon} alt="Menu" className="menu-icon" />
                <h1 className="title">Any Suggestion</h1>
                <p className="subtitle">We value your Opinions</p>
                
                <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="input-field"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                />
                <textarea 
                    placeholder="Message" 
                    className="textarea-field"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default ContactForm;
