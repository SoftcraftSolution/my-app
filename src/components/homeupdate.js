// src/pages/ThankYouPage.js
import React from 'react';
import './homeupdate.css';
import Confetti from 'react-confetti';

const SheetUpdate = () => {


  return (
    <div className="new-details">
      <div className="new-info">
        <img src={kfg} alt="Dorea Thai Food" className="restaurant-image" />
        <div className="new-details">
          <h2>Dorea Thai Food</h2>
          <p>Vasai Station Rd, Vishal Nagar, Vasai West, Vasai-Virar, Maharashtra 401202</p>
          <a href="#!" className="visit-website">Visit our Website</a>
        </div>
      </div>
      <button className="new-button" onClick={toggleFavorite}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default SheetUpdate;
