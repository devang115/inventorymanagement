import api from './api';

const getProducts = async () => {
  try {
    const response = await api.get('/products'); 
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

// Functions for admin to manage products
const addProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData); 
    return response.data; // The newly added product
  } catch (error) {
    throw error; 
  }
};

const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/products/${productId}`, productData); 
    return response.data; // The updated product
  } catch (error) {
    throw error; 
  }
};

const deleteProduct = async (productId) => {
  try {
    await api.delete(`/products/${productId}`);
  } catch (error) {
    throw error; 
  }
};

export default { 
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct 
};