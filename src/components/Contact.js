import React, { useState,useEffect } from 'react';
import { useNavigate, } from 'react-router-dom'; // Import useNavigate for redirection
import './Contact.css'; // Import the CSS file
import Sidebar from './sidebar';
import Cookies from 'js-cookie';
import { Drawer, CircularProgress, Dialog, DialogContent, DialogTitle, Button } from '@mui/material';

const ContactForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const userId = Cookies.get('user_id'); // Hardcoded userId
    const navigate = useNavigate(); 
  

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const validateForm = () => {
        if (phoneNumber.length !== 10) {
            alert('Phone number must be exactly 10 digits long.');
            return false;
        }

        if (message.length > 50) {
            alert('Message cannot exceed 50 characters.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

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
                setPhoneNumber('');
                setMessage('');
                setSuccessPopup(true);
            } else {
                alert('Failed to submit feedback.');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Error submitting feedback. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const closePopup = () => {
        setSuccessPopup(false);
    };

    const handleBackToHome = () => {
        closePopup();
        navigate('/home'); // Redirect to /home
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
                    </button>
                </div>
            </form>
            
            {/* Success Popup */}
            <Dialog open={successPopup} onClose={closePopup}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <img src="./checked.png" alt="Success" style={{ width: '30%' }} />
                        <p style={{fontSize:'25px', fontWeight:'200', top:'-5px'}}>Sucessfull</p>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleBackToHome} 
                            style={{ marginTop: '20px' }}
                        >
                            Back to Home
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ContactForm;
