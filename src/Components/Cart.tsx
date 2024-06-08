import React, { useContext } from 'react';
import CartContext from '../Context/CartContext';

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  const removeFromCart = (product: any) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  if (!cart) return <p>Your cart is empty</p>;

  if (cart.length === 0) return <p>Your cart is empty</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <ul>
        {cart.map((item: any) => (
          <li key={item.id} className="flex justify-between items-center p-2 border-b">
            <div>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => removeFromCart(item)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
