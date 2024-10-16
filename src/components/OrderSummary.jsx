import React from 'react';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
  const cartItems = useSelector(state => state.cart.items);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span> 
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <div className="flex justify-between items-center font-medium">
        <span>Total:</span>
        <span>${calculateTotalPrice().toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;