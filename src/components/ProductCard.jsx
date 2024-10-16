import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}> 
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img src={product.imageUrl} alt={product.name} className="w-full" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product.name}</div>
          <p className="text-gray-700 text-base">
            {product.description.substring(0, 100)}...
          </p>
          <div className="font-bold text-xl mt-4">${product.price}</div> 
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;