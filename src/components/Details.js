import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faHeart as regularHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import Axios
import './Details.css';

const OffersPage = () => {
  const { state } = useLocation();
  const businessDetail = state?.businessDetail || {};
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the item is favorited
  const [offers, setOffers] = useState([]); // State to store offers

  useEffect(() => {
    const fetchOffers = async () => {
      const businessId = '669100274fe85a4e2b93dacb'; // Business ID for the offers

      try {
        const response = await axios.get('http://ambulance-booking-backend.vercel.app/user/get-business-offer', {
          params: { businessId }
        });
        setOffers(response.data.offers); // Update state with the fetched offers
      } catch (error) {
        console.error('Error fetching offers', error);
      }
    };

    fetchOffers();
  }, []);

  const handleBackButtonClick = () => {
    navigate('/home');
  };

  const toggleFavorite = async () => {
    const businessId = '669100274fe85a4e2b93dacb'; 
    const userId = '66c726535915ec6f827dc398'; 

    try {
      if (isFavorite) {
        // Remove from favorites
        await axios.delete('https://ambulance-booking-backend.vercel.app/user/delete-fav-shop', {
          params: { businessIds: businessId, userId: userId }
        });
      } else {
        // Add to favorites
        await axios.post('https://ambulance-booking-backend.vercel.app/user/add-favorites', null, {
          params: { businessIds: businessId, userId: userId }
        });
      }
      setIsFavorite(!isFavorite); // Toggle the favorite state
    } catch (error) {
      console.error('Error updating favorite status', error);
    }
  };

  // Function to get the last two lines of the address
  const getLastTwoLines = (address) => {
    const lines = address.split('\n').filter(line => line.trim() !== '');
    return lines.slice(-2).join('\n');
  };

  return (
    <div className="offers-page">
      <header className="header">
        <button className="back-button" onClick={handleBackButtonClick}>
          ←
        </button>
        <button className="favorite-button" onClick={toggleFavorite}>
          <FontAwesomeIcon 
            icon={isFavorite ? solidHeart : regularHeart} 
            style={{ color: isFavorite ? 'red' : 'grey' }} 
          />
        </button>
      </header>

      <div className="restaurant-info">
        <img src="./burgerki.png" alt="Burger King" className="restaurant-logo" />
        <h2>{businessDetail.name}</h2>
        <p className="address">
          {getLastTwoLines(businessDetail.address)}
        </p>
      </div>

      <div className="offers-section">
        <h3>Available Offers</h3>
        {offers.length > 0 ? (
          offers.map((offer, index) => (
            <div key={index} className="offer-card">
              <img src={`./offer${index + 1}.png`} alt={`Offer ${index + 1}`} className="offer-image" />
              <div className="offer-details">
                <h4>{offer}</h4>
                <p style={{color:"grey"}}>Get {offer} on next buy</p>
              </div>
            </div>
          ))
        ) : (
          <p>No offers available</p>
        )}
      </div>
    </div>
  );
};

export default OffersPage;
