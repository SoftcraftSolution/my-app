// src/components/ReviewForm.js
import React from 'react';
import './gaurav.css';
import icon from './bg3.png';
const ReviewForm = () => {
  return (
    <div className="review-form-container">
      <div className="header">
        <img src="./logon.png" alt="ScanStar Logo" className="logo" />
        <h1>SoftCraft Solutions</h1>
        <p>Tech Company</p>
        <address>
          1st floor, SoftCraft Solutions, Leela niwas,<br />
          401202, near Rajiv Gandhi High school,<br />
          behind bus depot, Anand Nagar, Vasai West
        </address>
        <div className="rating">
          <span><img src={icon} /></span>
        </div>
        <ol className="instructions">
          <li>Write Your Review: Share your experience and give us a 5-star rating</li>
          <li>Claim Your Reward: Receive a special coupon as a thank you for your positive feedback.</li>
        </ol>
      </div>
      <form className="form">
        
       
        <button type="submit">Continue with Google</button>
      </form>
    </div>
  );
};

export default ReviewForm;
