import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Success!</h2>
        <p>Your review is submitted successfully</p>
        <button className="ok-button" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default SuccessModal;
