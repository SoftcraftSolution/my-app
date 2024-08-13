import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams,useLocation } from 'react-router-dom';
import ReviewModal from './components/Review'; // Adjust the import path as needed
import StoreReview from './components/StoreReview'; // Adjust the import path as needed
import ReviewUI from './components/Review';
import ReviewSubmittedPage from './components/Less';
import Demo from './components/demo';
import ThankYouPage from './components/Less';
import NewPages from './components/newpage';
import ReviewForm from './components/gaurav';
import NewPage from './components/newpage';
import Coupon from './components/coupon';
import ContactForm from './components/Contact';
import Favorites from './components/Fav';
import Sidebar from './components/sidebar';
import RewardHistory from './components/rewardhistory';
import Landing from './components/gaurav.js';
import MapPage from './components/home';
import { Lan } from '@mui/icons-material';


// import { BrowserRouter as Router, Routes,useNavigate, Route, useParams,useLocation } from 'react-router-dom';



function App() {
  

  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <Routes>
      <Route path="/Contact" element={<ContactForm/>} />
      <Route path="/home" element={<MapPage/>} />
      <Route path="/" element={<Landing/>} />
      <Route path="/sidebar" element={<Sidebar/>} />
      <Route path="/coupon" element={<Coupon/>} />
      <Route path="/Fav" element={<Favorites/>} />
      <Route path="/contact" element={<ContactForm/>} />
      <Route path="/rewardhistory" element={<RewardHistory/>} />
      <Route path="/newpage" element={<NewPage/>} />
        <Route path="/review" element={<ReviewUI/>} />
        <Route path="/review-submitted" element={<ThankYouPage/>} />
        <Route path="/not-found" element={<Demo/>} />

        {/* Add more routes as needed */}
      </Routes>

    </Router>
  );
}

export default App;
