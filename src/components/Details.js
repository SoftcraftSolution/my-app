import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Details.css'; // Import the external CSS file

const OffersPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleBackButtonClick = () => {
    navigate('/home'); // Redirect to /home when the back button is clicked
  };

  return (
    <div className="offers-page">
      <header className="header">
        <button className="back-button" onClick={handleBackButtonClick}>
          ←
        </button>
        <img src="/heart-icon.png" alt="Favorite" className="favorite-icon" />
      </header>

      <div className="restaurant-info">
        <img src="./burgerki.png" alt="Burger King" className="restaurant-logo" />
        <h2>Burger King</h2>
        <p className="address">
          Vasai Station Rd, Vishal Nagar, Vasai West,
          Vasai West, Maharashtra 401202
        </p>
      </div>

      <div className="offers-section">
        <h3>Available Offers</h3>
        <div className="offer-card">
          <img src="/offer1.png" alt="Offer 1" className="offer-image" />
          <div className="offer-details">
            <h4>25% OFF</h4>
            <p>Get 25% OFF at your next KFC buy</p>
          </div>
        </div>
        <div className="offer-card">
          <img src="/offer2.png" alt="Offer 2" className="offer-image" />
          <div className="offer-details">
            <h4>50% OFF</h4>
            <p>Get 50% OFF at your next KFC buy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
