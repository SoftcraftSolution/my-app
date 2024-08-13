// components/MapComponent.js
import React from 'react';
import './HomePage.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px', // Set height according to your design
  };

  const center = {
    lat: 19.4174, // Default latitude
    lng: 72.8328, // Default longitude
  };

  return (
    <div className="map-container">
      <input type="text" placeholder="Search by Location" className="search-bar" />
      <LoadScript googleMapsApiKey="AIzaSyBd4z2gXxOiMPdtXS31nlQmaYeBGgguAxw">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14} // Adjust the zoom level as needed
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
