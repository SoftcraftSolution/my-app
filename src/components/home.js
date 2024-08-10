// src/MapPage.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './home.css';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

// Maharashtra coordinates
const center = {
  lat: 19.7515,  // Latitude for Maharashtra, India
  lng: 75.7139,  // Longitude for Maharashtra, India
};

const MapPage = () => {
  const [sheetHeight, setSheetHeight] = useState(150); // Default height in pixels
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
          zoom={7}  // Adjust the zoom level to show a larger region
        >
          {/* Child components, like markers, info windows, etc., go here */}
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
        <h2>Maharashtra Information</h2>
        <p>Details about Maharashtra, landmarks, and more can go here.</p>
      </div>
    </div>
  );
};

export default MapPage;
