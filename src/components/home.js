import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import axios from 'axios';
import Sidebar from './sidebar';
import BottomSheet from '../bottmSheet.jsx';
import './home.css';
import { TextField, InputAdornment, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const initialCenter = {
  lat: 19.7515,
  lng: 75.7139,
};

const MapPage = () => {
  const [sheetHeight, setSheetHeight] = useState(150);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const onChange = async (e) => {
    setValue(e.target.value);
    try {
      const response = await axios.get(
        `https://ambulance-booking-backend.vercel.app/user/search-address`,
        {
          params: {
            query: e.target.value,
          },
        }
      );
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
    const newLocation = {
      lat: location.geometry.location.lat,
      lng: location.geometry.location.lng,
    };

    setMapCenter(newLocation);
    setValue(location.formatted_address);
  };

  return (
    <div className="map-container">
      <div className="search-bar-container">
        <div className="child">
          <TextField
            placeholder="Search"
            value={value}
            onChange={onChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={() => toggleSidebar(true)}>
                    <MenuIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: '100%',
              height: '30',
              '& .MuiOutlinedInput-root': {
                height: '100%',
                '& fieldset': {
                  borderColor: 'grey',
                },
                '&:hover fieldset': {
                  borderColor: 'grey',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'grey',
                },
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              },
              '& .MuiInputBase-input': {
                height: '100%',
              },
            }}
          />

          <Drawer
            anchor="left"
            open={sidebarOpen}
            onClose={() => toggleSidebar(false)}
          >
            <Sidebar />
          </Drawer>
        </div>
      </div>

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
          ))}
      </div>

      <LoadScript googleMapsApiKey="AIzaSyB5GV0AxvGQOTRaomj95JE_8k5yejLMVYo">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={20}
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <MarkerF position={mapCenter} />
        </GoogleMap>
      </LoadScript>

      <BottomSheet
        sheetHeight={sheetHeight}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default MapPage;
