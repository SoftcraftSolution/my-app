import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import axios from 'axios';
import Sidebar from './sidebar';
import menuIcon from './Group 1171275657.png';
import './home.css';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const initialCenter = {
  lat: 19.7515,
  lng: 75.7139,
};

const locationIcon = '/placeholder.png'; // Replace with the path to your icon

const MapPage = () => {
  const [sheetHeight, setSheetHeight] = useState(150);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [markerPosition, setMarkerPosition] = useState(initialCenter);
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
  };


  const onChange = async (e) => {
    setValue(e.target.value);
    console.log("in onChange =>" + `${e.target.value}`);
    try {
      const response = await axios.get(
        `https://ambulance-booking-backend.vercel.app/user/search-address`,
        {
          params: {
            query: e.target.value,
          },
        }
      );
      console.log(response);

      const result = response.data.results;

      if (Array.isArray(result)) {
        setData(result);
      } else if (result && Array.isArray(result.data)) {
        setData(result.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setStartHeight(sheetHeight);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const newY = e.touches[0].clientY;
    const diff = startY - newY;
    const newHeight = Math.min(
      Math.max(startHeight + diff, 100),
      window.innerHeight - 100
    );
    setSheetHeight(newHeight);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleSuggestionClick = (location) => {
    setData([]);
    console.log(suggestions);

    // Access lat and lng directly as properties
    const newLocation = {
      lat: location.geometry.location.lat, // Access directly
      lng: location.geometry.location.lng  // Access directly
    };

    setMapCenter(newLocation);
    setMarkerPosition(newLocation); // Update the marker position
    setValue(location.formatted_address); // Update the input value with the selected address
  };

  return (
    
    <div className="map-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search location..."
        value={value}
        onChange={onChange}
      />
                  <div className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
                <Sidebar />
            </div>
            <div className="menu-icon" onClick={toggleSidebar}>
                <img src={menuIcon} alt="Menu Icon" />
            </div>
            <div className={`favorites-content ${sidebarOpen ? 'shifted' : ''}`}></div>
            <div className="header"></div>
      <div className="dropdown-content">
        {value &&   
          data.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="drop"
              onClick={() => handleSuggestionClick(item)}
            >
              {item.name} - {item.formatted_address}
              <hr />
            </div>
          ))
        }
      </div>
      <LoadScript googleMapsApiKey="AIzaSyBd4z2gXxOiMPdtXS31nlQmaYeBGgguAxw">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={20}
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <MarkerF
            position={mapCenter}
             // Set custom icon
          />
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
          <strong>
            <h3>Top Brands</h3>
          </strong>
          <div className="brands-container">
            <img src="/coke.png" alt="Coca Cola" />
            <img src="/zorko.png" alt="Zomato" />
            <img src="/mcd.png" alt="McDonald's" />
            <img src="/mcd.png" alt="McDonald's" />
            <img src="/mcd.png" alt="McDonald's" />
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
            <div className="brand-item">
              <img src="/bali.png" alt="Work Portfolio Makana" />
              <p>Work Portfolio Makana</p>
            </div>
            <div className="brand-item">
              <img src="/bali.png" alt="Work Portfolio Makana" />
              <p>Work Portfolio Makana</p>
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
