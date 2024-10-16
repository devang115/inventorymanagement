import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem'; 

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/" className="text-blue-500 hover:underline">Continue Shopping</Link></p> 
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} /> 
            ))}
          </ul>
          <div className="mt-6 text-right">
            <p className="text-lg font-medium">
              Total: <span className="text-xl">${calculateTotalPrice().toFixed(2)}</span>
            </p>
            <Link 
              to="/checkout" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;