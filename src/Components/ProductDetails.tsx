import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from '../Context/ProductContext';
import { Product,ProductContextType } from '../types';
import { motion } from "framer-motion";
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
      <motion.div 
         initial={{ opacity: 0, scale: 1 }}
         animate={{ opacity: 9, scale: 1 }}
         transition={{ duration: 4, delay: 1 }}
      
      className="flex flex-col items-center">
        <img src={product.image} alt={product.title} className=" animate-bounce duration-1000 w-full h-64 object-contain mb-4" />
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
        <p className="mt-4  text-center  font-semibold">{product.description}</p>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
