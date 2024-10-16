import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cartSlice';
import { placeOrder } from '../features/ordersSlice';
import OrderSummary from '../components/OrderSummary';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    // Add fields for address, city, etc.
    address: '',
    city: '',
    // ...
  });

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: cartItems,
        shippingAddress, // Include shipping address in order data
      };

      await dispatch(placeOrder(orderData)).unwrap();
      dispatch(clearCart());
      navigate('/order-history');
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error (display message, etc.)
    }
  };

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <p>
          Your cart is empty.{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            Continue Shopping
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={shippingAddress.address}
              onChange={handleAddressChange}
              required
            />
          </div>
          {/* Add more input fields for city, state, zip code, etc. */}
          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            type="button" // Change type to "button" to avoid form submission
          >
            Place Order
          </button>
        </form>
      </div>
      <div>
        <OrderSummary />
      </div>
    </div>
  );
};

export default Checkout;