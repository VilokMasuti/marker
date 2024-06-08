import { useContext } from 'react';
import CartContext from '../Context/CartContext';
import ProductCard from './ProductCard';
import { Product } from '../types';

const Cart: React.FC = () => {
  const { state, dispatch } = useContext(CartContext);
  const { items } = state;

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  return (
    <div>
      <h1>Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        items.map((product: Product) => (
          <div key={product.id}>
            <ProductCard product={product} />
            <button onClick={() => removeFromCart(product.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
