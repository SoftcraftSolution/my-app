import React, { useState, useEffect } from 'react';
import './StoreReview.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import Axios

import logo from './scanStarLogo.jpeg';
function BlogPost() {
    let { id } = useParams();
    console.log(id);
    sessionStorage.setItem("id",id);
  }

const StoreReview = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [storeDetails, setStoreDetails] = useState(null); // State to hold fetched data

  useEffect(() => {
    fetchData(); // Call fetchData function when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const storedValue = sessionStorage.getItem('id');
      const response = await axios.get(`https://ambulance-booking-backend.vercel.app/user/get-data-by-id?id=${storedValue}`); 
      console.log(response.data);
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
    setName('');
    navigate('/review');
  };
 BlogPost()
  return (
    <div className="store-review-container">
      <header className="store-header">
        <img src={logo} alt="Scan" className="store-logo" />
        <h1>Your Growth Our Pride</h1>
      </header>
      <div className="review-steps">
        <div className="step">
          <span className="step-icon"></span>
          <p>{storeDetails ? storeDetails.name : 'Loading...'}</p> {/* Display store name or loading message */}
        </div>
        <div className="step">
          <span className="step-icon"></span>
          <p></p>
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
