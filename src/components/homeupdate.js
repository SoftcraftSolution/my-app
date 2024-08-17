import React, { useState } from 'react';
import axios from 'axios'; 
import './homeupdate.css';
import kfg from './dore.png';

const LocationDetails = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = async () => {
        const businessId = '669100434fe85a4e2b93dadf'; 
        const userId = '66bc924feae02c90474efddb'; 
        
        let finalPath;
        try {
            if (isFavorite) {
                // API endpoint for deleting from favorites
                finalPath = `https://ambulance-booking-backend.vercel.app/user/delete-fav-shop?businessIds=${businessId}&userId=${userId}`;
                const response = await axios.delete(finalPath);
                console.log('API response:', response.data); 
            } else {
                // API endpoint for adding to favorites
                finalPath = `https://ambulance-booking-backend.vercel.app/user/add-favorites?businessIds=${businessId}&userId=${userId}`;
                const response = await axios.post(finalPath);
                console.log('API response:', response.data); 
            }
            setIsFavorite(!isFavorite); // Toggle the favorite state after successful API call
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    return (
        <div className="location-details">
            <div className="info">
                <img src={kfg} alt="Dorea Thai Food" className="restaurant-image" />
                <div className="details">
                    <h2>Dorea Thai Food</h2>
                    <p>Vasai Station Rd, Vishal Nagar, Vasai West, Vasai-Virar, Maharashtra 401202</p>
                    <a href="#!" className="visit-website">Visit our Website</a>
                </div>
            </div>
            <button className="favorite-button" onClick={toggleFavorite}>
                {isFavorite ? '❤️' : '🤍'}
            </button>
        </div>
    );
};

export default LocationDetails;
