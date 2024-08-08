import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import icon7 from './bg3.png';
import logo from './scanStarLogo.jpeg';
import Demo from './demo';
import './newpage.css';
import { icon } from '@fortawesome/fontawesome-svg-core';
import icon9 from './gicon.png';


function NewPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [storeDetails, setStoreDetails] = useState(null);

    useEffect(() => {
        fetchData(id);
        sessionStorage.setItem("id", id);
    }, [id]);

    const fetchData = async (storedValue) => {
        try {
            const response = await axios.get(`https://ambulance-booking-backend.vercel.app/user/get-data-by-id?id=${storedValue}`);
            console.log(response.data);
            sessionStorage.setItem("storeName", response.data.data.businessName);
            sessionStorage.setItem("address", response.data.data.address);
            sessionStorage.setItem("placeId", response.data.data.placeId);
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
        console.log(e);
        e.preventDefault();
        console.log(`Review submitted by ${name}`);
        sessionStorage.setItem("name", name);
        setName('');
        navigate('/review');
    };

    if (sessionStorage.getItem("id") === "null") {
        return <Demo />;
    }

    const storeName = sessionStorage.getItem("storeName");
    const str = storeName ? storeName.charAt(0).toUpperCase() + storeName.slice(1) : 'Loading';

    return (
        <div className="NewPage">
            <div className="container">
                <main>
                    <header>
                        <img src={logo} alt="ScanStar Logo" className="logo" />
                    </header>
                    <h1>
                        <img src="/star.png" alt="Icon" className="icon" />
                        Review {str}
                    </h1>
                    <div className="image-container">
                        <img src={icon7} alt="Review" className="review-image" />
                    </div>
                    <form className="review-form" onSubmit={handleSubmitReview}>
                        <ol className="instructions">
                            <li>1. Write Your Review: Share your experience and give us a 5-star rating.</li>
                            <li>2. Claim Your Reward: Receive a special coupon as a thank you for your positive feedback.</li>
                        </ol>
                        <button type="submit">
                            <img className="kk" src={icon9} alt="Google Icon" />Continue with Google
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default NewPage;
