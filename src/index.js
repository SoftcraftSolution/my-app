// debug-
// 54052688178-v5dg4hrbnjnarji1gltol5bh4vs893i2.apps.googleusercontent.com
// sftcraft account
// 676008068383-f6u1va7fjss6tko4jtuicel71dus2r8o.apps.googleusercontent.com
// roahul
// 979845253776-ag6v4f754pkt3d9ai32p0ohe6vq34s0d.apps.googleusercontent.com
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <GoogleOAuthProvider clientId="54052688178-v5dg4hrbnjnarji1gltol5bh4vs893i2.apps.googleusercontent.com">
   
   <App />
   </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
