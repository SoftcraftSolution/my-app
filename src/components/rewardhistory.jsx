import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './rewardhistory.css';
import Sidebar from './sidebar';
import menuIcon from './Group 1171275657.png';
import cokeLogo from './coke.png';
import zorkoLogo from './zorko.png';
import { Drawer } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

const RewardHistory = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [rewards, setRewards] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Fetch rewards data from API
    const fetchRewards = async () => {
        try {
            const userId = Cookies.get("user_id");
            console.log(`https://ambulance-booking-backend.vercel.app/user/get-rewards?userId=${userId}`);
            const response = await axios.get(`https://ambulance-booking-backend.vercel.app/user/get-rewards?userId=${userId}`);
            const { coupons } = response.data;
            setRewards(coupons);
        } catch (error) {
            console.error('Error fetching rewards:', error);
        }
    };

    useEffect(() => {
        fetchRewards();
    }, []);

    // Helper function to determine if a coupon is expired
    const isExpired = (expiredDate) => new Date(expiredDate) < new Date();

    // Helper function to format date
    const formatDate = (date) => {
        const options = {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    };

    // Handle card click
    const handleCardClick = (reward) => {
        navigate(`/coupon`, { state: { couponData: reward } });
    };

    return (
        <div className="reward-history">
            <div className="menu-icon" onClick={toggleSidebar}>
                <img src={menuIcon} alt="Menu" />
            </div>
            <Drawer
                anchor="left"
                open={sidebarOpen}
                onClose={toggleSidebar}
            >
                <Sidebar />
            </Drawer>
            <div className='hd'>
                <div>Rewards</div>
            </div>
            <div className={`favorites-content ${sidebarOpen ? 'shifted' : ''}`}></div>
            <p className='subTitle'>Track and view your reward history for all your earned points coupons</p>
            <div className="rewards-list">
                {rewards.map((reward) => (
                    <div 
                        key={reward._id} 
                        className={`reward-item ${isExpired(reward.expiredDate) ? 'expired' : ''}`}
                        onClick={() => handleCardClick(reward)}
                    >
                        <img src={zorkoLogo} alt="Logo" className="reward-logo" />
                        <div className="reward-details">
                            <div className="reward-description">{reward.offer}</div>
                            <div className="reward-date">{formatDate(reward.issueDate)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RewardHistory;
