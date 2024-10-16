import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../features/productsSlice'; 
import { addToCart } from '../features/cartSlice'; 

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector(state => 
    state.products.products.find(p => p.id === parseInt(productId, 10)) 
  );
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    // Fetch the product if it's not already in the store
    if (!product) { 
      dispatch(fetchProduct(productId)); 
    }
  }, [dispatch, product, productId]);

  const handleAddToCart = () => {
    dispatch(addToCart(product)); 
    // Optionally show a success message or redirect to cart
    // navigate('/cart'); 
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => navigate(-1)} // Go back to previous page
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-lg mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <button 
            onClick={handleAddToCart} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;