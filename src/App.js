import React, { useState } from 'react';
import ReviewModal from './components/Review';
import { BrowserRouter as Router, Routes, Route ,useParams} from 'react-router-dom';


function BlogPost() {
  let { id } = useParams();
  console.log(id)


}

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
     
        {/* Define your routes here */}
       
        <Routes>
        <Route path="/page/:id" element={<BlogPost />} />
      </Routes>
        {/* Add more routes as needed */}


      <ReviewModal showModal={showModal} onClose={() => setShowModal(false)} />
    </Router>
  );
}

export default App;
