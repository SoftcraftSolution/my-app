import React, { useState, useEffect } from 'react';
import './bottomSheet.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie
import CircularAvatar from './components/circulerAvatar';
import FavoriteCard from './FavoriteItem';

const BottomSheet = ({ sheetHeight, handleTouchStart, handleTouchMove, handleTouchEnd }) => {
    const [businesses, setBusinesses] = useState([]);
    const [favoriteBusinesses, setFavoriteBusinesses] = useState([]);
    const navigate = useNavigate();
    const userId = Cookies.get('user_id'); // Get the userId from cookies

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get('https://ambulance-booking-backend.vercel.app/user/get-all-scanstar-shop');
                setBusinesses(response.data.businesses.slice(0, 8)); // Limit to top 8 businesses
            } catch (error) {
                console.error('Error fetching businesses:', error);
            }
        };

        const fetchFavoriteBusinesses = async () => {
            if (userId) { // Ensure userId exists before making the API call
                try {
                    const response = await axios.get(`https://ambulance-booking-backend.vercel.app/user/get-favorite-shop?userId=${userId}`);
                    setFavoriteBusinesses(response.data.body.flatMap(fav => fav.businessIds));
                } catch (error) {
                    console.error('Error fetching favorite businesses:', error);
                }
            }
        };

        fetchBusinesses();
        fetchFavoriteBusinesses();
    }, [userId]);

    const handleOnSeeAll = () => {
        navigate('/Fav');
    };

    const handleFavoriteToggle = async (businessId, isFavorite) => {
        try {
            if (isFavorite) {
                await axios.post(`https://ambulance-booking-backend.vercel.app/user/add-to-favorites`, { userId, businessId });
                setFavoriteBusinesses(prevFavorites => [...prevFavorites, businessId]);
            } else {
                await axios.post(`https://ambulance-booking-backend.vercel.app/user/remove-from-favorites`, { userId, businessId });
                setFavoriteBusinesses(prevFavorites => prevFavorites.filter(id => id !== businessId));
            }
        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    };

    return (
        <div
            className="bottom-sheet"
            style={{ height: `${sheetHeight}px` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="drag-handle" />
            <div className="brands-section" style={{ padding: `0px` }}>
                <div className="h">Top Brands</div>
                <div className="brands-container">
                    {businesses.map((business) => (
                        <CircularAvatar
                            key={business._id}
                            imageUrl={business.imageUrl || ''}
                            businessId={business._id}
                            businessName={business.businessName}
                            businessDetail={business}
                        />
                    ))}
                </div>
                {favoriteBusinesses.length > 0 ? (
                    <>
                        <div className='header-fav'>
                            <div className="h-1">Favorite Brands</div>
                            <div className='see-all-fav-link' onClick={handleOnSeeAll}>See all</div>
                        </div>
                        <div className="brands-container">
                            {favoriteBusinesses.map((businessId) => {
                                const business = businesses.find(b => b._id === businessId);
                                return business ? (
                                    <FavoriteCard
                                        key={business._id}
                                        image={business.imageUrl || ''}
                                        name={business.businessName}
                                        isFavorite={true}
                                        onFavoriteToggle={(isFavorite) => handleFavoriteToggle(business._id, isFavorite)}
                                    />
                                ) : null;
                            })}
                        </div>
                    </>
                ) : (
                    <div className="no-favorites-section">
                        <div className="add-to-favorites-message">
                            <div className="h">Add Your Favorite Brands</div>
                            <div className="brands-container">
                                {businesses.map((business) => (
                                    <FavoriteCard
                                        key={business._id}
                                        image={business.imageUrl || ''}
                                        name={business.businessName}
                                        isFavorite={false}
                                        onFavoriteToggle={(isFavorite) => handleFavoriteToggle(business._id, isFavorite)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BottomSheet;
