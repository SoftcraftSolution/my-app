import React from 'react';
import './coupon.css';
import { useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';
import giftImage from './conf.png';

function Coupon() {
  const { state } = useLocation(); // Get the passed state
  const couponData = state?.couponData || {}; // Extract coupon data

  const { offer, issueDate, expiredDate, couponCode } = couponData;
  console.log(couponData);

  // Helper function to format date
  const formatDate = (date) => {
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  };

  return (
    <div className="container">
         <Confetti />
         <div className='imgHead'>
          <img src={giftImage} className='imgHead-img'></img>
          <div id='imgHead-header'>Exciting Reward for you</div>
         </div>
      <div className="coupon-card">
        <div className="discount">{offer}</div>
        <p>Get {offer} at your next purchase</p>
        <div className="coupon-body">
          
          <ul>
            <li>Redeemable at all locations.</li>
            <li>Not valid with any other discounts and promotions.</li>
            <li>The coupon is non-transferable and can only be used by the person who received it.</li>
          </ul>
          
        </div>
        <div className="coupon-code">
            <div id='titleCoupon'>Your coupon code</div>
            <span>{couponCode}</span>
          </div>
        <div className="coupon-footer">Valid till {formatDate(expiredDate)}</div>
      </div>
    </div>
  );
}

export default Coupon;
