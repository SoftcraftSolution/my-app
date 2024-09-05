import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // Solid heart icon
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // Regular heart icon
import axios from 'axios';
import Cookies from 'js-cookie'; // Importing js-cookie to manage cookies
import './Details.css';
import CircularAvatar from './circulerAvatar';
import { FaArrowLeft } from 'react-icons/fa';

const OffersPage = () => {
  const { state } = useLocation();
  const businessDetail = state?.businessDetail || {};
  
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(state?.isFav);
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
      <div className="detail-head">
      <a href="./home" className="back-button">
        <FaArrowLeft style={{ padding:"10px" ,fontSize:'18px'}} /> 
        </a>
        <div className="favorite-button" onClick={toggleFavorite}>
          <FontAwesomeIcon 
            icon={isFavorite ? solidHeart : regularHeart} 
            style={{ color: isFavorite ? 'red' : 'grey' }} 
          />
        </div>
      </div>

      <div className="restaurant-info">
        <CircularAvatar key={businessDetail._id}
        size={100}
                            imageUrl={businessDetail.image || ''}
                            businessId={businessDetail._id}
                            businessName={businessDetail.businessName}
                            businessDetail={businessDetail}/>
        <h2 style={{marginTop:'0px',fontSize:"20px",fontWeight:"600",lineClamp:'1'}}>{businessDetail.name}</h2>
        <p className="address">
          {getLastTwoLines(businessDetail.address)}
        </p>
      </div>

      <div className="offers-section">
  <div className="detail-offer-header">Available Offers</div>
  {offers.length > 0 ? (
    offers.map((offer, index) => {
      // Define the image path
      const imagePath = `./offer${index + 1}.png`;

      // Function to check if image exists
      const imageExists = (imagePath) => {
        try {
          require(`${imagePath}`);
          return true;
        } catch (err) {
          return false;
        }
      };

      // Function to extract percentage from the offer text
      const getOfferPercentage = (text) => {
        const match = text.match(/(\d+)%/); // Regex to find digits followed by a %
        return match ? match[0] : "N/A";    // Return the percentage or "N/A" if not found
      };

      // Generate a random background color
      const randomBackgroundColor = () => {
        const colors = ['#FFB6C1', '#B0E0E6', '#FFE4B5', '#D3FFCE', '#FFC0CB']; // Example colors
        return colors[Math.floor(Math.random() * colors.length)];
      };

      return (
        <div key={index} className="offer-card">
          {imageExists(imagePath) ? (
            <img src={imagePath} alt={`Offer ${index + 1}`} className="offer-image" />
          ) : (
            <div
              className="offer-placeholder"
              style={{
                backgroundColor: randomBackgroundColor(),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px', // Example height, adjust as needed
                width: '105px', 
                borderRadius:"20px"
                ,textAlign:"center",
                 // Example width, adjust as needed
              }}
            >
              <span style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>
                {getOfferPercentage(offer)} OFF
              </span>
            </div>
          )}
          <div className="offer-details">
            <div>{offer}</div>
            <p style={{ color: 'grey' }}>Get {offer} on next buy</p>
          </div>
        </div>
      );
    })
  ) : (
    <p className="detail-no-offer">No offers available</p>
  )}
</div>


    </div>
  );
};

export default OffersPage;
