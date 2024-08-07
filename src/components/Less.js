// src/pages/ThankYouPage.js
import React from 'react';
import './Less.css';
import Confetti from 'react-confetti';

const ThankYouPage = () => {
  const handleHomeClick = () => {
    // Navigate to home or any other page
    window.location.href = `/?id=${sessionStorage.getItem("id")}`; // Replace with your desired route
  };

  return (
    <div className="thank-you-page">
        <Confetti />
      <div className="thank-you-content">

        <h1>Thank You!</h1>
        <p>Your submission has been received successfully.</p>
        <button className="home-button" onClick={handleHomeClick}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
