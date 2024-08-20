// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Element }) => {
  const userId = Cookies.get('user_id'); // Check for the user ID in cookies

  return userId ? <Element /> : <Navigate to="/" />;
};

export default PrivateRoute;
