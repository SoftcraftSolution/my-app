import React, { useState } from 'react';
import './FavoriteItem.css'; // Import the CSS file

function FavoriteCard({ image, name, isFavorite: initialIsFavorite, onFavoriteToggle }) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [avatarColor, setAvatarColor] = useState(getRandomColor()); // Store the color in state

  const avatarText = name ? name[0].toUpperCase() : '';

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onFavoriteToggle(!isFavorite); // Call the callback with the new favorite status
  };

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
        {isFavorite ? (
          <span className="favorite-card__heart favorite-card__heart--filled">&#10084;</span>
        ) : (
          <span className="favorite-card__heart">&#10084;</span>
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
