import React, { useContext } from 'react';
import CartContext from '../Context/CartContext';

const Header: React.FC = () => {
  const { state } = useContext(CartContext);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">My Shop</h1>
      <div>
        <span>Cart ({state.items.length})</span>
      </div>
    </header>
  );
};

export default Header;
