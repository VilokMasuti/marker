import { useContext } from 'react';
import CartContext, { CartItem } from '../Context/CartContext';
import { toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import e from '../assets/e.svg'
const Cart = () => {
  const { state: { cart }, dispatch } = useContext(CartContext);

  const removeFromCart = (product: CartItem) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    toast.error('Your product has been  Removed.', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    
  };

  if (cart.length === 0) return <img src={e} alt='' className=' lg:w-[30%] lg:h-[30%]  lg:ml-[30%] ' />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <ul>
        {cart.map((item) => (
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
