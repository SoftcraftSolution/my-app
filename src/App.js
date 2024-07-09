import React, { useState } from 'react';
import ReviewModal from './components/Review';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Leave a Review</button>
      <ReviewModal showModal={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default App;
