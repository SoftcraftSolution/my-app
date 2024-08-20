import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams,useLocation } from 'react-router-dom';// Adjust the import path as needed
import ReviewUI from './components/Review';
import Demo from './components/demo';
import Landing from './components/gaurav';
import RewardHistory from './components/rewardhistory';
import ThankYouPage from './components/Less';
import NewPage from './components/newpage';
import Coupon from './components/coupon';
import ContactForm from './components/Contact';
import Favorites from './components/Fav';
import Sidebar from './components/sidebar';
import MapPage from './components/home';
import SheetUpdate from './components/homeupdate';
import PrivateRoute from './components/ProtectedRoute'; // Import the PrivateRoute component

function App() {
  



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/rewardhistory" element={<RewardHistory />} />
        <Route path="/newpage" element={<NewPage />} />
        <Route path="/review" element={<ReviewUI />} />
        <Route path="/review-submitted" element={<ThankYouPage />} />
        <Route path="/not-found" element={<Demo />} />
        <Route path="/sheetupd" element={<SheetUpdate />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/Fav" element={<Favorites />} />

        {/* Protected Route */}
        <Route path="/home" element={<PrivateRoute element={MapPage} />} />

        {/* Redirect unknown routes to error page */}
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </Router>
  );
}

export default App;
