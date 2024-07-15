import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams,useLocation } from 'react-router-dom';
import ReviewModal from './components/Review'; // Adjust the import path as needed
import StoreReview from './components/StoreReview'; // Adjust the import path as needed
import ReviewUI from './components/Review';
import ReviewSubmittedPage from './components/Less';
import Demo from './components/demo';
import ThankYouPage from './components/Less';

// import { BrowserRouter as Router, Routes,useNavigate, Route, useParams,useLocation } from 'react-router-dom';



function App() {
  

  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<StoreReview />} />
        <Route path="/review" element={<ReviewUI/>} />
        <Route path="/review-submitted" element={<ThankYouPage/>} />
        <Route path="/not-found" element={<Demo/>} />

        {/* Add more routes as needed */}
      </Routes>

    </Router>
  );
}

export default App;
