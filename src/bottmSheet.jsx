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
    const fetchBusinesses = async () => {
        try {
            const response = await axios.get('https://ambulance-booking-backend.vercel.app/user/get-all-scanstar-shop');
            setBusinesses(response.data.businesses.slice(0, 8)); // Limit to top 8 businesses
        } catch (error) {
            console.error('Error fetching businesses:', error);
        }
    };

    const fetchFavoriteBusinesses = async () => {
        if (!userId) return; // Exit early if userId does not exist
      
        try {
          const response = await axios.get(
            `https://ambulance-booking-backend.vercel.app/user/get-favorite-shop?userId=${userId}`
          );
      
          const favoriteBusinesses = response.data.body.flatMap(fav => fav.businessIds);
          setFavoriteBusinesses(favoriteBusinesses);
      
          console.log("Favorite Businesses:", favoriteBusinesses);
        } catch (error) {
          console.error('Error fetching favorite businesses:', error);
        }
      };
    useEffect(() => {
        

        fetchBusinesses();
        fetchFavoriteBusinesses();
    }, [userId]);

    const handleOnSeeAll = () => {
        navigate('/Fav');
    };

    const handleFavoriteToggle = async (businessId, isFavorite) => {
        console.log(isFavorite);
        try {
            if (!isFavorite) {
                await axios.post(`https://ambulance-booking-backend.vercel.app/user/add-favorites?businessIds=${businessId}&userId=${userId}`);
                setFavoriteBusinesses(prevFavorites => [...prevFavorites, businessId]);
            } else {
                await axios.delete(`https://ambulance-booking-backend.vercel.app/user/delete-fav-shop?businessIds=${businessId}&userId=${userId}`);
                setFavoriteBusinesses(prevFavorites => prevFavorites.filter(id => id !== businessId));

                   }
                   await fetchFavoriteBusinesses();
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
                <div className="bottom-h">Top Brands</div>
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
                
                <>
  {favoriteBusinesses.length > 0 ? (
    <div className='header-fav'>
      <div className="h-1">Favorite Brands</div>
      <div className='see-all-fav-link' onClick={handleOnSeeAll}>See all</div>
    </div>
  ) : (
    <div className='header-fav'>
      <div className="h-1">Add to Favorites</div>
    </div>
  )}

  <div className="brands-container">
    {
    favoriteBusinesses.length > 0
      ? favoriteBusinesses.slice(0, 3).map((business) => (
          <FavoriteCard
            key={business._id}
            image={business.imageUrl || ''}
            name={business.businessName}
            isFavorite={true}
            onFavoriteToggle={() => handleFavoriteToggle(business._id,true)}
          />
        ))
      : businesses.slice(0, 3).map((business) => (
          <FavoriteCard
            key={business._id}
            image={business.imageUrl || ''}
            name={business.businessName}
            isFavorite={false} // Not a favorite initially
            onFavoriteToggle={() => handleFavoriteToggle(business._id,false)} // Add to favorites
          />
        ))
    }
  </div>
</>

             
            </div>
        </div>
    );
};

export default BottomSheet;
