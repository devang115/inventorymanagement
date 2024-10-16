import React from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../features/cartSlice'; 

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover mr-4" />
        <div>
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          <p className="text-gray-500">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button 
          onClick={() => dispatch(decreaseQuantity(item.id))} 
          className="font-medium text-gray-500 hover:text-gray-700"
        >
          -
        </button>
        <span className="mx-4 font-medium">{item.quantity}</span>
        <button 
          onClick={() => dispatch(increaseQuantity(item.id))} 
          className="font-medium text-gray-500 hover:text-gray-700"
        >
          +
        </button>
        <button 
          onClick={() => dispatch(removeFromCart(item.id))}
          className="ml-4 text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;