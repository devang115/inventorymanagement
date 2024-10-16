import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice'; // Assuming you have this action

const Header = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); 
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
    // Add any other logout logic (e.g., redirect to home)
  };

  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-lg font-bold">
          Inventory App
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn ? ( 
            <>
              <li><Link to="/order-history">Order History</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li> 
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;