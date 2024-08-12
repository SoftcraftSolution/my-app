import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './home.css';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 19.7515,
  lng: 75.7139,
};

const MapPage = () => {
  const [sheetHeight, setSheetHeight] = useState(150);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

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

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyBd4z2gXxOiMPdtXS31nlQmaYeBGgguAxw">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
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
        
        <div className="brands-section">
          <strong><h3>Top Brands</h3></strong>
          <div className="brands-container">
            <img src="/coke.png" alt="Coca Cola" />
            <img src="/zorko.png" alt="Zomato" />
            <img src="/mcd.png" alt="McDonald's" />
            <img src="/domi.png" alt="Domino's" />
            <img src="/domi.png" alt="Domino's" />
            <img src="/domi.png" alt="Domino's" />
            <img src="/domi.png" alt="Domino's" />
            <img src="/domi.png" alt="Domino's" />  
          </div>

          <h3>Favorite Brands</h3>
          <div className="favorite-brands-container">
            <div className="brand-item">
              <img src="/dore.png" alt="Dorea Thai Food" />
              <p>Dorea Thai Food</p>
            </div>
            <div className="brand-item">
              <img src="/dore2.png" alt="Bali Digital Food" />
              <p>Bali Digital Food</p>
            </div>
            <div className="brand-item">
              <img src="/bali.png" alt="Work Portfolio Makana" />
              <p>Work Portfolio Makana</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
