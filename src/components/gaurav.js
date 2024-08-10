import React from 'react';
import StarRatings from 'react-star-ratings';
import './gaurav.css';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
// import CircularBadge from './butets.js';

const Landing = () => {
 
  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
  });
  console.log('Button was clicked!');
  return (
   
    <div className="container">
      <div className='space'></div>
      
      <div className='logo'></div>
      <div className='space1'></div>

      <div className="company-info">
        <div id='titleSub'>
          <div id="h">SoftCraft Solutions</div>
          <div className='subTitle'>Tech Company</div>
        </div>
        <p id='add'>1st floor, SoftCraft Solutions, Leela niwas, 401202, near Rajiv Gandhi High school, behind bus depot, Anand Nagar, Vasai West</p>
        <div className="star-rating">
          <StarRatings
            rating={3} // Example rating
            starRatedColor="gold"
            numberOfStars={5}
            name='rating'
            starDimension="16px"
            starSpacing="2px"
          />
        </div>
      </div>

      <div className="rating-section">

        <div className="step">
        <div className="circular-badge">1</div>
       
          
          <div>Enter Your Full Name: Start by entering your full name to continue.</div>
        </div>

        <div className='space2'></div>

        <div className="step">
        <div className="circular-badge" >2</div>
       
          <div>Rate and Comment: Give a rating of up to 5 stars & add your comment.</div>
        </div>

        {/ Star Ratings Component /}
      
      </div>

      <div className="google-sign-in">
      <GoogleLogin 
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
      </div>
      
    </div>
  );
};

export default Landing;