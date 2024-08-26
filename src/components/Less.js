// src/pages/ThankYouPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Less.css';
import Confetti from 'react-confetti';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    
    // Navigate to home or any other page
    navigate('/home'); // Replace with your desired route
  };

  return (
    <div className="thank-you-page">
        <Confetti />
      <div className="thank-you-content">

        <div className='hh'>Thank You!</div>
        <div  className='sub'>Your submission has been received successfully.</div>
        <button className="home-button" onClick={handleHomeClick}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
