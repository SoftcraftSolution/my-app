// src/components/ReviewForm.js
import React from 'react';
import './gaurav.css';

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
          <span>⭐⭐⭐⭐⭐</span>
        </div>
        <ol className="instructions">
          <li>Enter Your Full Name: Start by entering your full name to continue.</li>
          <li>Rate and Comment: Give a rating of up to 5 stars & add your comment.</li>
        </ol>
      </div>
      <form className="form">
        <label htmlFor="full-name">Full Name</label>
        <input type="text" id="full-name" placeholder="Enter your name" />
        <button type="submit">Continue →</button>
      </form>
    </div>
  );
};

export default ReviewForm;
