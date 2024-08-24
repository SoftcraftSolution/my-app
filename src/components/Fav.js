import React, { useState, useEffect } from 'react';
import './Fav.css';
import dore from './dore.png'; // Default image for businesses
import Sidebar from './sidebar';
import { Drawer } from '@mui/material';
import Cookies from 'js-cookie';

const Favorites = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(false); 

  // Hardcoded userId
  const userId = Cookies.get('user_id');

  // Fetch favorite shops from the actual endpoint
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`https://ambulance-booking-backend.vercel.app/user/get-favorite-shop?userId=${userId}`);

        // Check for a 400 error
        if (response.status === 400) {
          setError(true);
          return;
        }

        const data = await response.json();

        if (data && data.favoriteShops) {
          const fetchedFavorites = data.favoriteShops.map(shop => ({
            id: shop._id,
            businessId: shop.businessId._id,
            name: shop.businessName,
            address: shop.address,
            image: dore, // Using default image for now
          }));
          setFavorites(fetchedFavorites);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError(true); // Set error state if any other error occurs
      }
    };

    fetchFavorites();
  }, [userId]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleFavorite = async (id, businessId) => {
    try {
      // Make a DELETE request to the backend to remove the favorite shop
      await fetch(`https://ambulance-booking-backend.vercel.app/user/delete-fav-shop?businessId=${businessId}&userId=${userId}`, {
        method: 'DELETE',
      });

      // Update the state to remove the favorite from the list
      setFavorites(favorites.filter(favorite => favorite.id !== id));
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
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
                  <p>{favorite.address}</p>
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
