import React from 'react';
import './coupon.css'; // Import the CSS file for styling
import kfcLogo from './kfclogo.png'; // Assuming you have the KFC logo saved locally
import confettiImage from './conf.png'; // Assuming you have a confetti image saved locally

function Coupon() {
  return (
    <div className="coupon-container">
      <div className="coupon-header">
       
        <h1>Exciting Reward for you</h1>
      </div>
      <div className="coupon-body">
        <img src={kfcLogo} alt="KFC Logo" className="kfc-logo" />
        <h2>25% OFF</h2>
        <p>Get 25% OFF at your next KFC buy</p>
        <ul>
          <li>Redeemable at all KFC restaurants in India.</li>
          <li>Not valid with any other discounts and promotions.</li>
          <li>The coupon is non-transferable and can only be used by the person who received it.</li>
        </ul>
      </div>
      <div className="coupon-footer">
        <h3>Your coupon code</h3>
        <div className="coupon-code">DH3YHZXB</div>
        <p>Valid till 3 August, 2024</p>
      </div>
    </div>
  );
}

export default Coupon;
