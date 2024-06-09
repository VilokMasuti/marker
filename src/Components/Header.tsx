import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../Context/CartContext';

import cart from '../assets/cart.svg';
import sh from '../assets/sh.svg';

const Header: React.FC = () => {
  const { state: { cart: cartItems } } = useContext(CartContext);

  return (
    <header className="p-4  flex justify-between items-center">
      <div className="flex items-center mt-[-30px]">
        <img src={sh} alt="cart" width={100} height={100} />
      </div>
      <div className="flex items-center relative">
        <Link to="/cart" className="flex items-center text-white mr-4">
          <img src={cart} alt="cart" width={100} height={100} className=' mt-[-50px]' />
          {cartItems.length > 0 && (
            <span className=" text-black font-extrabold text-4xl absolute top-[-130%] left-4">{cartItems.length}</span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
