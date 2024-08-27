import React, { useState, useEffect } from 'react';
import './Fav.css';
import dore from './dore.png'; // Default image for businesses
import Sidebar from './sidebar';
import { Drawer } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios'; // Import axios

const Favorites = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(false); 
  const [expandedItemId, setExpandedItemId] = useState(null); // State to track expanded address

  // Hardcoded userId
  const userId = Cookies.get('user_id');

  // Function to fetch favorite shops from the actual endpoint
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`https://ambulance-booking-backend.vercel.app/user/get-favorite-shop?userId=${userId}`);
        console.log(response);

        if (response.status === 400) {
          setError(true);
          return;
        }

        const data = response.data;

        if (data.body && data.body.length > 0) {
          const fetchedFavorites = data.body.flatMap(shop =>
            shop.businessIds.map(business => ({
              id: business._id,
              businessId: business._id,
              name: business.businessName,
              address: business.address, // Store full address for expansion
              image: dore, // Using default image for now
            }))
          );
          setFavorites(fetchedFavorites);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError(true);
      }
    };

    fetchFavorites();
  }, [userId]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleFavorite = async (id, businessIds) => {
    console.log("businessIds=>"+businessIds);
    try {
      await axios.delete(`https://ambulance-booking-backend.vercel.app/user/delete-fav-shop?businessIds=${businessIds}&userId=${userId}`);
      setFavorites(favorites.filter(favorite => favorite.id !== id));
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  const toggleAddress = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  return (
    <div className="favorites-container">
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => toggleSidebar(false)}
      >
        <Sidebar />
      </Drawer>
      <div className="hd">
        <div>Favorites</div>
      </div>
      <div className="menu-icon" onClick={toggleSidebar}></div>
      <div className={`favorites-content ${sidebarOpen ? 'shifted' : ''}`}>
        <div className="subTitle">Here are your saved favorite locations.</div>
        <div className="favorites-list">
          {error || favorites.length === 0 ? (
            <div className="no-favorites">
              <div className='image'></div>
              <p>Your favorites list is empty. Start exploring and add a place you love</p>
            </div>
          ) : (
            favorites.map(favorite => (
              <div className="favorite-item" key={favorite.id}>
                <img src={favorite.image} alt={favorite.name} className="favorite-image" />
                <div className="favorite-details">
                  <h3>{favorite.name}</h3>
                  <p className={`favorite-address ${expandedItemId === favorite.id ? 'expanded' : 'collapsed'}`}>
                    {favorite.address}
                  </p>

                </div>
                <div
                  className="favorite-heart"
                  onClick={() => toggleFavorite(favorite.id, favorite.businessId)}
                >
                  <span>&hearts;</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
