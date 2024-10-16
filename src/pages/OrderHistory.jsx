import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../features/ordersSlice';
import { format } from 'date-fns'; 

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <div>Loading order history...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Items</th>
              <th className="border px-4 py-2">Total</th>
              {/* Add more columns as needed (e.g., Status) */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">
                  {format(new Date(order.createdAt), 'MM/dd/yyyy')} 
                </td>
                <td className="border px-4 py-2">
                  {/* Example of displaying items: */}
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} x{item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2">
                  ${order.total.toFixed(2)} 
                </td>
                {/* Add more data columns (status, etc.) */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;