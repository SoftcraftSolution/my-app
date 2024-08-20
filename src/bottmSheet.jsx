import React, { useState } from 'react';
import './bottomSheet.css';

const BottomSheet = ({ sheetHeight, handleTouchStart, handleTouchMove, handleTouchEnd }) => {
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

        <div className="h">Favorite Brands</div>
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
