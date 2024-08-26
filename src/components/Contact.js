import React, { useState } from 'react';
import './Contact.css'; // Import the CSS file
import Sidebar from './sidebar';
import Cookies from 'js-cookie';
import { Drawer, CircularProgress } from '@mui/material';

const ContactForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state
    const userId = Cookies.get('user_id'); // Hardcoded userId

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const validateForm = () => {
        // Validate phone number length
        if (phoneNumber.length !== 10) {
            alert('Phone number must be exactly 10 digits long.');
            return false;
        }

        // Validate message length
        if (message.length > 50) {
            alert('Message cannot exceed 50 characters.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        setLoading(true); // Set loading to true when API call starts

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
        } finally {
            setLoading(false); // Set loading to false after API call completes
        }
    };

    return (
        <div className="contact-form-container">
            <Drawer
                anchor="left"
                open={sidebarOpen}
                onClose={() => toggleSidebar(false)}
            >
                <Sidebar />
            </Drawer>
            <div className="menu-icon" onClick={toggleSidebar}></div>
            <div className="hd">
                <div>Any Suggestion</div>
            </div>
             <p className="subtitle">We value your Opinions</p>
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="input-field"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    required
                />
                <textarea 
                    placeholder="Message" 
                    className="textarea-field"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>
                <div className='button-parent'>
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                </button></div>
            </form>
        </div>
    );
};

export default ContactForm;
