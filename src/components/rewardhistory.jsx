import React, { useState } from 'react';
import './rewardhistory.css'; // Ensure this path is correct
import Sidebar from './sidebar';
import menuIcon from './Group 1171275657.png';
import './coke.png';
import './zorko.png';
import { TextField, InputAdornment, IconButton, Drawer } from '@mui/material';

const RewardHistory = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Reward items data
    const rewards = [
        { id: 1, logo: 'coke.png', description: 'Get 25% OFF at your next Coca Cola buy', date: 'May 25, 12:04 am', expired: false },
        { id: 2, logo: 'zorko.png', description: 'Get a free Burger in your next Zorko Order', date: 'May 25, 12:04 am', expired: false },
        { id: 3, logo: 'coke.png', description: 'Get 25% OFF at your next Coca Cola buy', date: 'May 25, 12:04 am', expired: true },
        { id: 4, logo: 'coke.png', description: 'Get 25% OFF at your next Coca Cola buy', date: 'May 25, 12:04 am', expired: true },
    ];

    return (
        <div className="reward-history">
           
            <div className="menu-icon" onClick={toggleSidebar}>
                
            </div>
            <Drawer
            anchor="left"
            open={sidebarOpen}
            onClose={() => toggleSidebar(false)}
          >
            <Sidebar />
          </Drawer>
            <div className='hd'>
            <div>Rewards</div></div>
            <div className={`favorites-content ${sidebarOpen ? 'shifted' : ''}`}></div>
            {/* <div className="header" style={{padding:"0px"}}> */}
          
                
                <p className='subTitle'>Track and view your reward history for all your earned points coupons</p>
           
            <div className="rewards-list">
                {rewards.map((reward) => (
                    <div key={reward.id} className={`reward-item ${reward.expired ? 'expired' : ''}`}>
                        <img src={reward.logo} alt="Logo" className="reward-logo" />
                        <div className="reward-details">
                            <div className="reward-description">{reward.description}</div>
                            <div className="reward-date">{reward.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RewardHistory;
