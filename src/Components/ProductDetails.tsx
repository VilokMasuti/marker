import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from '../Context/ProductContext';
import { Product,ProductContextType } from '../types';

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const context = useContext<ProductContextType | null>(ProductContext);

  if (!context) return null;

  const { products } = context;
  const product = products.find((p: Product) => p.id === parseInt(productId ?? '', 10));

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <img src={product.image} alt={product.title} className="w-full h-64 object-cover mb-4" />
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
        <p className="mt-4">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
