import React, { useState, useEffect } from 'react';
import './Fav.css';
import dore from './dore.png'; // Default image for businesses
import Sidebar from './sidebar';
import menuIcon from './Group 1171275657.png'; // Path to your menu icon

const Favorites = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Hardcoded userId
  const userId = '66b5e8001e961324d5d704db';

  // Fetch favorite shops from the actual endpoint
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`https://ambulance-booking-backend.vercel.app/user/get-favorite-shop?userId=${userId}`);
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
      <div className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar sidebarOpen={sidebarOpen} />
      </div>
      <div className="menu-icon" onClick={toggleSidebar}>
        <img src={menuIcon} alt="Menu Icon" />
      </div>
      <div className={`favorites-content ${sidebarOpen ? 'shifted' : ''}`}>
        <h2>Favorites</h2>
        <p>Here are your saved favorite locations.</p>
        <div className="favorites-list">
          {favorites.map(favorite => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
