import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import CartContext, { CartItem } from '../Context/CartContext';
import { toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Star from '../Components/Star'
import { motion } from "framer-motion";
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const separate = {
    hidden: { opacity: 0, y: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      y: custom * 5,
      transition: { duration: 1.5 },
    }),
  };
  const { dispatch } = useContext(CartContext);

  const addToCart = () => {
    const cartItem: CartItem = { id: product.id.toString(), title: product.title, price: product.price };
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    toast.success('Your product has been added to the cart.', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (!product) {
    return <div>Product information is not available.</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <motion.div
        custom={-1}
        variants={separate}
        initial="hidden"
        animate="visible"
      className="flex flex-col items-center">
        <Link to={`/product/${product.id}`}>
          <motion.img src={product.image} alt={product.title} className="w-full h-32 object-cover mb-4  hover:animate-pulse duration-1000" />
        </Link>
        <motion.h2 className="text-lg font-bold">{product.title}</motion.h2>
        <p className="text-gray-600">${product.price}</p>
        <Star rating={product.rating} />
        <motion.button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addToCart}
        >
          Add to Cart
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ProductCard;
