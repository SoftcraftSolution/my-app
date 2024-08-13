import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './HomePage.css';
import kfg from './dore.png';
import jfg from './ad.png';
const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 19.7515,
  lng: 75.7139,
};

const LocationDetails = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="location-details">
      <div className="location-info">
        <img src={kfg} alt="Dorea Thai Food" className="restaurant-image" />
        <div className="restaurant-details">
          <h2>Dorea Thai Food</h2>
          <p>Vasai Station Rd, Vishal Nagar, Vasai West, Vasai-Virar, Maharashtra 401202</p>
          <a href="#!" className="visit-website">Visit our Website</a>
        </div>
      </div>
      <button className="favorite-button" onClick={toggleFavorite}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

const MapPage = () => {
  const [sheetHeight, setSheetHeight] = useState(150);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setStartHeight(sheetHeight);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const newY = e.touches[0].clientY;
    const diff = startY - newY;
    const newHeight = Math.min(Math.max(startHeight + diff, 100), window.innerHeight - 100);
    setSheetHeight(newHeight);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="map-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search location..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <LoadScript googleMapsApiKey="AIzaSyBd4z2gXxOiMPdtXS31nlQmaYeBGgguAxw">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
          options={{
            mapTypeControl: false, // Disables the map type control (Map/Satellite toggle)
            fullscreenControl: false, // Disables the fullscreen control
          }}
        >
        </GoogleMap>
      </LoadScript>
      <div
        className="bottom-sheet"
        style={{ height: `${sheetHeight}px` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="drag-handle" />
        <div className="location-detai">
          <LocationDetails />
          <div className="image-gallery">
            <img src={jfg} alt="Product 1" />
            <img src={jfg} alt="Product 2" />
            <img src={jfg} alt="Product 3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
