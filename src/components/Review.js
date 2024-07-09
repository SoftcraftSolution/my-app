import React, { useState } from 'react';
import './Review.css';
import GoogleSignInModal from './GoogleSignInModal'; 
import SuccessModal from './SuccessModal'; // Import the new SuccessModal component
import myicon from '../components/og.png';
const ReviewModal = ({ showModal, onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [photos, setPhotos] = useState([]);
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);
  };

  const handleSubmit = () => {
    if (rating >= 4) {
      setShowGoogleSignIn(true);
    } else {
      setShowSuccessMessage(true);
    }
  };

  const handleGoogleSignInClose = () => {
    setShowGoogleSignIn(false);
    onClose();
  };

  const handleSuccessClose = () => {
    setShowSuccessMessage(false);
    onClose();
  };

  if (!showModal) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>×</button>
          <h2 className="gg">Softcraft Solutions</h2>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'filled' : ''}`}
                onClick={() => handleRating(star)}
              >★</span>
            ))}
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share details of your own experience at this place"
          />
          <div className="actions1">
          <label className="add-photo-button">
           <img className="gg" src={myicon}></img>Add photos and videos
              
              <input type="file" accept="image/*,video/*" multiple onChange={handlePhotoUpload} />
            </label>
          </div>
          <div className="actions">
            
            <button className="cancel-button" onClick={handleSubmit}>Cancel</button>
            <button className="submit-button" onClick={handleSubmit}>Post</button>
          </div>
          <div className="uploaded-photos">
            {photos.map((photo, index) => (
              <img key={index} src={URL.createObjectURL(photo)} alt={`Upload ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
      {showGoogleSignIn && <GoogleSignInModal onClose={handleGoogleSignInClose} />}
      {showSuccessMessage && <SuccessModal onClose={handleSuccessClose} />}
    </>
  );
};

export default ReviewModal;
