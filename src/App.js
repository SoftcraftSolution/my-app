import React, { useState } from 'react';
import ReviewModal from './components/Review';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/"  />
        {/* Add more routes as needed */}
      </Routes>

      <ReviewModal showModal={showModal} onClose={() => setShowModal(false)} />
    </Router>
  );
}

export default App;
