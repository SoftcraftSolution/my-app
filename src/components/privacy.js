import React, { useState } from 'react'; // Import useState
import './privacy.css';
import Sidebar from './sidebar';
import Drawer from '@mui/material/Drawer'; // Import Drawer if using Material-UI

const PrivacyPolicy = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="favorites-container">
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)} // Correctly close the sidebar
      >
        <Sidebar />
      </Drawer>
  
      <div className="menu-icon" onClick={toggleSidebar}></div>
      <div className={`favorites-content ${sidebarOpen ? 'shifted' : ''}`}>
        <div className="privacy-policy-container">
          <header className="privacy-policy-header">
            <h1>Privacy Policy</h1>
          </header>
          <main className="privacy-policy-content">
            <section>
              <h2>Introduction</h2>
              <p>
                Welcome to our Privacy Policy page! When you use our services, you trust us with your information. We are committed to protecting your privacy.
              </p>
            </section>
  
            <section>
              <h2>Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information. You can also object to the processing of your data.
              </p>
            </section>
            <section>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about our privacy policy, please contact us at privacy@yourcompany.com.
              </p>
            </section>
          </main>
        </div>
      </div> 
    </div> 
  );
};

export default PrivacyPolicy;
