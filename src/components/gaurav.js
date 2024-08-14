import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import StarRatings from 'react-star-ratings';
import './gaurav.css';
import { GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correctly import jwt-decode

const Landing = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const cookieValue = Cookies.get('user_id');

  // Redirect to home page if user_id cookie is present
  useEffect(() => {
    if (cookieValue) {
      navigate('/home'); // Redirect to the home page
    }
  }, [cookieValue, navigate]);

  const handleCredentialResponse = async (credentialResponse) => {
    if (credentialResponse && credentialResponse.credential) {
      const token = credentialResponse.credential;

      try {
        // Decode JWT token
        const decodedPayload = jwtDecode(token);
        console.log(decodedPayload);

        if (decodedPayload) {
          const { name, email, picture } = decodedPayload;
          const dob = decodedPayload.birthdate || 'DOB not available';
          const gender = decodedPayload.gender || 'Gender not available';

          // Make an API call to save the data and get the ID using axios
          try {
            const response = await axios.post(
              'https://ambulance-booking-backend.vercel.app/user/scanstar-register',
              {
                name,
                email,
                image: picture, // Directly include the image data
              },
              {
                headers: {
                  'Content-Type': 'application/json', // Correct header for raw data
                },
              }
            );

            const userId = response.data.user._id; // Adjust based on actual response

            if (userId) {
              // Store the fetched ID and other data in cookies
              Cookies.set('name', name, { expires: 7 });
              Cookies.set('email', email, { expires: 7 });
              Cookies.set('dob', dob, { expires: 7 });
              Cookies.set('gender', gender, { expires: 7 });
              Cookies.set('profile_image', picture, { expires: 7 });
              Cookies.set('user_id', userId, { expires: 7 });

              console.log('User data and ID stored in cookies:', userId);
              
              // Redirect to home page after storing user data
              navigate('/home');
            } else {
              console.error('User ID not found in API response');
            }
          } catch (error) {
            console.error('Error posting data to API with axios:', error);
          }
        } else {
          console.log('Failed to decode payload');
        }
      } catch (error) {
        console.error('Failed to decode JWT token:', error);
      }
    } else {
      console.log('No credentials found');
    }
  };

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
          <div className="circular-badge">2</div>
          <div>Rate and Comment: Give a rating of up to 5 stars & add your comment.</div>
        </div>
      
      </div>

      <div className="google-sign-in">
        <GoogleLogin 
          onSuccess={handleCredentialResponse}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </div>
  );
};

export default Landing;
