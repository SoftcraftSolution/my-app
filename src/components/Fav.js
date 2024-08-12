import React, { useState } from 'react';
import './Fav.css';
import dore from './dore.png';
import bal from './bali.png';
import dore2 from './dore2.png';
import Sidebar from './sidebar';
import menuIcon from './Group 1171275657.png'; // Path to your menu icon

const Favorites = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Dorea Thai Food',
      address: 'Vasai Station Rd, Vishal Nagar, Vasai West, Vasai-Virar, Maharashtra 401202',
      image: dore,
    },
    {
      id: 2,
      name: 'Bali Digital Food',
      address: 'Vasai Station Rd, Vishal Nagar, Vasai West, Vasai-Virar, Maharashtra 401202',
      image: bal,
    },
    {
      id: 3,
      name: 'Dorea Thai Food',
      address: 'Vasai Station Rd, Vishal Nagar, Vasai West, Vasai-Virar, Maharashtra 401202',
      image: dore2,
    },
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleFavorite = (id) => {
    setFavorites(favorites.filter(favorite => favorite.id !== id));
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
                onClick={() => toggleFavorite(favorite.id)}
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
