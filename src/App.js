import React, { useState } from 'react';
import ReviewModal from './components/Review';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

function BlogPost() {
  let { id } = useParams();
  console.log(id)
  return (
      <div style={{ fontSize: "50px" }}>
          Now showing post {id}
      </div>
  );
}

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Leave a Review</button>
      
      <Router>
      <Routes>
        <Route path="/page/:id" element={<BlogPost />} />
      </Routes>
    </Router>
      <ReviewModal showModal={showModal} onClose={() => setShowModal(false)} />
      
    </div>
  );
};

export default App;
