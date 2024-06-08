
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from '../Context/ProductContext';

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products } = useContext(ProductContext);

  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <img src={product.image} alt={product.title} className="w-full h-64  object-contain mb-4" />
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
        <p className="mt-4">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
