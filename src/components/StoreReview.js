import React, { useState, useEffect } from 'react';
import './StoreReview.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import logo from './scanStarLogo.jpeg';
import Demo from './demo';

const StoreReview = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [storeDetails, setStoreDetails] = useState(null); // State to hold fetched data

  useEffect(() => {
    if (id && id !== "null") {
      sessionStorage.setItem("id", id);
      fetchData(id);
    } else {
      sessionStorage.setItem("id", "null");
    }
  }, [id]);

  const fetchData = async (storedValue) => {
    try {
      const response = await axios.get(`https://ambulance-booking-backend.vercel.app/user/get-data-by-id?id=${storedValue}`);
      console.log(response.data);
      sessionStorage.setItem("storeName", response.data.data.businessName);
      sessionStorage.setItem("address", response.data.data.address);
      console.log("object stored successfully");
      setStoreDetails(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log(`Review submitted by ${name}`);
    sessionStorage.setItem("name", name);
    setName('');
    navigate('/review');
  };

  const storedName = sessionStorage.getItem("storeName");
  const storedAddress = sessionStorage.getItem("address");

  if (sessionStorage.getItem("id") === "null") {
    return <Demo />;
  }

  return (
    <div className="store-review-container">
      <header className="store-header">
        <img src={logo} alt="Scan" className="store-logo" />
        <h1>Your Growth Our Pride</h1>
      </header>
      <div className="review-steps">
        <div className="step">
          <span className="step-icon"></span>
          <div className='displaystore'>{storedName || 'Loading...'}</div> {/* Display store name or loading message */}
        </div>
        <div className="step">
          <span className="step-icon"></span>
          <div>{storedAddress ? storedAddress.toUpperCase() : 'Loading...'}</div>
        </div>
      </div>
      <form className="review-form" onSubmit={handleSubmitReview}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={handleNameChange}
          className="name-input"
          required
        />
        <button type="submit" className="write-review-button">
          Next <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </form>
    </div>
  );
};

export default StoreReview;
