// src/components/CircularAvatar.js

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CircularAvatar.css'; // Add your styles here

const CircularAvatar = ({ imageUrl, businessId, businessName, businessDetail ,size}) => {
    const navigate = useNavigate();

    // Generate a consistent background color based on the business name
    const backgroundColor = useMemo(() => {
        const hash = Array.from(businessName).reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
        return `#${((hash & 0x00FFFFFF) | 0x1000000).toString(16).substring(1)}`;
    }, [businessName]);

    const handleClick = () => {
        navigate(`/offerspage`,{ state: { businessDetail: businessDetail } });
    };

    return (
        <div className="circular-avatar-container" onClick={handleClick}>
            <div className="circular-avatar" style={{ backgroundColor ,width:`${size}px`,height:`${size}px`}}>
                {imageUrl ? (
                    <div style={{backgroundImage:`url(${imageUrl})`,height:'100%',width:'100%',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'}} alt={businessName} />
                ) : (
                    <span className="avatar-text">{businessName.charAt(0)}</span>
                )}
            </div>
        
        </div>
    );
};

CircularAvatar.propTypes = {
    imageUrl: PropTypes.string,
    businessId: PropTypes.string.isRequired,
    businessName: PropTypes.string.isRequired,
};

export default CircularAvatar;
