import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // Solid heart icon
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // Regular heart icon
import axios from 'axios';
import Cookies from 'js-cookie'; // Importing js-cookie to manage cookies
import './Details.css';

const OffersPage = () => {
  const { state } = useLocation();
  const businessDetail = state?.businessDetail || {};
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const businessId = state?.businessDetail._id || '669100274fe85a4e2b93dacb'; // Default business ID for fetching offers

      try {
        const response = await axios.get('http://ambulance-booking-backend.vercel.app/user/get-business-offer', {
          params: { businessId }
        });
        setOffers(response.data.offers);
      } catch (error) {
        console.error('Error fetching offers', error);
      }
    };

    fetchOffers();
  }, [state?.businessDetail._id]);

  const handleBackButtonClick = () => {
    navigate('/home');
  };

  const toggleFavorite = async () => {
    const businessId = state?.businessDetail._id || ''; 
    const userId = Cookies.get('user_id'); // Fetching user ID from cookies
    console.log('Business ID:', businessId);
    console.log('User ID:', userId);

    // Toggle the favorite status immediately
    setIsFavorite(!isFavorite);

    try {
      if (isFavorite) {
        await axios.delete('https://ambulance-booking-backend.vercel.app/user/delete-fav-shop', {
          params: { businessIds: businessId, userId: userId }
        });
      } else {
        const response = await axios.post(`https://ambulance-booking-backend.vercel.app/user/add-favorites?businessIds=${businessId}&userId=${userId}`);
        console.log('Response from server:', response.data); // Debugging: Log the server's response
      }
    } catch (error) {
      console.error('Error updating favorite status', error.response ? error.response.data : error.message);
      // Revert the UI change if the API call fails
      setIsFavorite(isFavorite);
    }
  };

  const getLastTwoLines = (address) => {
    const lines = address?.split('\n').filter(line => line.trim() !== '');
    return lines?.slice(-2).join('\n');
  };

  return (
    <div className="offers-page">
      <header className="header">
        <button className="back-button" onClick={handleBackButtonClick}>
          <img src="./backbutton.png" alt="Back" className="back-button-image" />
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
        <h2 className='bus'>{businessDetail.name}</h2>
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
