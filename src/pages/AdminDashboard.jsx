import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../features/productsSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
  });

  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      await dispatch(addProduct(newProduct)).unwrap();
      setNewProduct({ name: '', description: '', price: 0, imageUrl: '' });
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error (display message, etc.)
    }
  };

  const handleEditProduct = (product) => {
    setEditProductId(product.id);
    setEditProductData({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  const handleEditInputChange = (e) => {
    setEditProductData({
      ...editProductData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProduct = async () => {
    try {
      await dispatch(
        updateProduct({ id: editProductId, ...editProductData })
      ).unwrap();
      setEditProductId(null);
      setEditProductData({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error updating product:', error);
      // Handle error
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProduct(productId)).unwrap();
      } catch (error) {
        console.error('Error deleting product:', error);
        // Handle error
      }
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Add Product Form */}
      <div className="mb-6 p-4 border rounded-md">
        <h2 className="text-lg font-medium mb-2">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="input-field"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="input-field"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input-field"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            className="input-field"
            value={newProduct.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">
                {product.description.substring(0, 50)}...
              </td>
              <td className="border px-4 py-2">${product.price}</td>
              <td className="border px-4 py-2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Product Modal (You can style this better) */}
      {editProductId && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-medium mb-4">Edit Product</h2>
            {/* ... (Similar input fields as Add Product Form) ... */}
            <button
              onClick={handleUpdateProduct}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditProductId(null)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;