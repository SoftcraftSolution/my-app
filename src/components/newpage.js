import React, { useState, useEffect } from 'react';
// import './StoreReview.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import logo from './scanStarLogo.jpeg';
import Demo from './demo';
import './newpage.css';

function NewPage() {
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
  
   
  
    if (sessionStorage.getItem("id") === "null") {
      return <Demo />;
    }
    const str=sessionStorage.getItem("storeName");
  return (
    <div className="NewPage">
      <div className="container">
        <header>
          <img src="/scanStarLogo.jpeg" alt="ScanStar Logo" className="logo" />
        </header>
        <main>
          <h1>
            <img src="/star.png" alt="Icon" className="icon" /> {/* Icon here */}
            Review {str.charAt(0).toUpperCase() + str.slice(1)}
          </h1>
          <ol className="instructions">
            <li>1. Enter Your Full Name: Start by entering your full name to continue.</li>
            <li>2. Rate and Comment: Give a rating of up to 5 stars & add your comment.</li>
          </ol>
          <div className="image-container">
            <img src="/bg.png" alt="Review" className="review-image" />
          </div>
          <form className="review-form" onSubmit={handleSubmitReview}>
            <label className='name' htmlFor="fullName">Full Name</label>
            <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={handleNameChange}
          className="name-input"
          required
        /> <button type="submit">Continue →</button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default NewPage;