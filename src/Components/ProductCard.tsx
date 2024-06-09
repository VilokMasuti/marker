import  { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import CartContext, { CartItem } from '../Context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useContext(CartContext);

  const addToCart = () => {
    const cartItem: CartItem = { id: product.id.toString(), title: product.title, price: product.price };
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  if (!product) {
    return <div>Product information is not available.</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex flex-col items-center">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.title} className="w-full h-32 object-cover mb-4 hover:animate-ping duration-1000" />
        </Link>
        <h2 className="text-lg font-bold">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
