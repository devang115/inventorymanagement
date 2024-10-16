import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; 
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); 

  // If `isAdmin` is true, check for both login and admin role
  if (isAdmin && (!isLoggedIn || !user.isAdmin)) { 
    return <Navigate to="/login" replace />; 
  } else if (!isAdmin && !isLoggedIn) {
    return <Navigate to="/login" replace />; 
  } else {
    return <Outlet />; // Render the child routes 
  }
};

export default ProtectedRoute;