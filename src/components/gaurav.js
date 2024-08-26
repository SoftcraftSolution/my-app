import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import './gaurav.css';
import { GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Corrected import for jwt-decode

// Define the function to check user review status
const checkUserReviewStatus = async (businessId, userId, navigate) => {
  if (!businessId) {
    console.error('Business ID not found in URL');
    navigate('/error');
    return;
  }

  try {
    const reviewResponse = await axios.get(`https://ambulance-booking-backend.vercel.app/user/check-review?businessId=${businessId}&userId=${userId}`);
    const hasReviewed = reviewResponse.data?.hasReviewed;

    if (hasReviewed) {
      navigate('/home');
    } else {
      navigate('/review');
    }
  } catch (reviewError) {
    console.error('Error checking review status:', reviewError);
    navigate('/error');
  }
};

const Landing = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'SoftCraft Solutions',
    address: '1st floor, SoftCraft Solutions, Leela niwas, 401202, near Rajiv Gandhi High school, behind bus depot, Anand Nagar, Vasai West'
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const cookieValue = Cookies.get('user_id');

  useEffect(() => {
    console.log("useeffect1");
    if (cookieValue) {
      const params = new URLSearchParams(location.search);
      const businessId = params.get('id');
      checkUserReviewStatus(businessId, cookieValue, navigate);
    }
  }, [cookieValue, navigate]);

  useEffect(() => {
    console.log("useeffect2");
    const fetchCompanyData = async () => {
      const params = new URLSearchParams(location.search);
      const companyId = params.get('id');

      if (!companyId) {
        if(cookieValue)
        {
          navigate('/home');
          return;
        }
        
        
       
      }

      try {
        const response = await axios.get(`https://ambulance-booking-backend.vercel.app/user/get-data-by-id?id=${companyId}`);
        const data = response.data;

        if (data && data.data) {
          setCompanyInfo({
            name: data.data.businessName || 'Company Name Not Available',
            address: data.data.address || 'Address Not Available'
          });
        } else {
          console.error('No company data returned');
          navigate('/not-found');
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [location.search, navigate]);

  const handleCredentialResponse = async (credentialResponse) => {
    if (credentialResponse && credentialResponse.credential) {
      const token = credentialResponse.credential;

      try {
        const decodedPayload = jwtDecode(token);

        if (decodedPayload) {
          const { name, email, picture } = decodedPayload;
          const dob = decodedPayload.birthdate || 'DOB not available';
          const gender = decodedPayload.gender || 'Gender not available';

          try {
            const response = await axios.post(
              'https://ambulance-booking-backend.vercel.app/user/scanstar-register',
              {
                name,
                email,
                image: picture,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );

            const userId = response.data.user._id;

            if (userId) {
              // Set cookies for user info
              Cookies.set('name', name, { expires: 7 });
              Cookies.set('email', email, { expires: 7 });
              Cookies.set('dob', dob, { expires: 7 });
              Cookies.set('gender', gender, { expires: 7 });
              Cookies.set('profile_image', picture, { expires: 7 });
              Cookies.set('user_id', userId, { expires: 7 });

              // Check if the user has reviewed the business
              const params = new URLSearchParams(location.search);
              const businessId = params.get('id');

              checkUserReviewStatus(businessId, userId, navigate);

            } else {
              console.error('User ID not found in API response');
            }
          } catch (error) {
            console.error('Error posting data to API:', error);
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

  if (loading) {

    return <div>Loading...</div>;

  }

  return (
    <div className="container">
      <div className='space'></div>
      <div className='logo'></div>
      <div className='space1'></div>

      <div className="company-info">
        <div id='titleSub'>
          <div id="h">{companyInfo.name}</div>
        </div>
        <div id='add'>{companyInfo.address}</div>
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
