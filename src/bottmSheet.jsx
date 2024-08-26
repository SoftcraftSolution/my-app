import React, { useState } from 'react';
import './bottomSheet.css';
import { useNavigate, useLocation } from 'react-router-dom';


const BottomSheet = ({ sheetHeight, handleTouchStart, handleTouchMove, handleTouchEnd }) => {
  const navigate = useNavigate();
  const handleOnSeeAll=()=>{
    console.log("cliked");
    navigate('/Fav');
  }
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
        <div className="h">
          Top Brands
        </div>
        <div className="brands-container">
          <img src="/coke.png" alt="Coca Cola" />
          <img src="/zorko.png" alt="Zomato" />
          <img src="/mcd.png" alt="McDonald's" />
          <img src="/mcd.png" alt="McDonald's" />
          <img src="/mcd.png" alt="McDonald's" />
          <div className='space'></div>
        </div>
        <div className='header-fav'>
        <div className="h-1">Favorite Brands</div>
        <div className='see-all-fav-link' onClick={handleOnSeeAll}>See all</div>
        </div>
        <div className="brands-container">
          <div className="brand-item">
            <img src="/dore.png" alt="Dorea Thai Food" />
            <p>Dorea Thai Food</p>
          </div>
          <div className="brand-item">
            <img src="/dore2.png" alt="Bali Digital Food" />
            <p>Bali Digital Food</p>
          </div>
          <div className="brand-item">
            <img src="/bali.png" alt="Work Portfolio Makana" />
            <p>Work Portfolio Makana</p>
          </div>
          <div className="brand-item">
            <img src="/bali.png" alt="Work Portfolio Makana" />
            <p>Work Portfolio Makana</p>
          </div>
          <div className="brand-item">
            <img src="/bali.png" alt="Work Portfolio Makana" />
            <p>Work Portfolio Makana</p>
          </div>
          <div className="brand-item">
            <img src="/bali.png" alt="Work Portfolio Makana" />
            <p>Work Portfolio Makana</p>
          </div>
          <div className='space'>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
