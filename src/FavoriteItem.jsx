import React, { useState } from 'react';
import './FavoriteItem.css'; // Import the CSS file
import { FaHeart } from 'react-icons/fa'; 

function FavoriteCard({ image, name, isFavorite, onFavoriteToggle }) {
  
  const [avatarColor, setAvatarColor] = useState(getRandomColor()); // Store the color in state

  const avatarText = name ? name[0].toUpperCase() : '';

 
console.log("isFav=>"+isFavorite);
  return (
    <div className='rootParent'>
    <div className="favorite-card">
      {image ? (
        <img src={image} alt={name} className="favorite-card__image" />
      ) : (
        <div className="favorite-card__default-avatar" style={{ backgroundColor: avatarColor }}>
          {avatarText}
        </div>
      )}
     
      <button className="favorite-card__button" onClick={()=>onFavoriteToggle(isFavorite)}>
        {(!isFavorite )? (
          <span className="favorite-card__heart favorite-card__heart--filled"><FaHeart style={{color:'red',padding:"4px"}}/></span>
        ) : (
          <span className="favorite-card__heart"><FaHeart style={{color:'white',alignItems:"center"}}/></span>
        )}
      </button>
    </div>
    <div  style={{textOverflowe:"ellipsis", maxLines:2,overflow:"hidden"}}>{name}</div>
    </div>
  );
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default FavoriteCard;
