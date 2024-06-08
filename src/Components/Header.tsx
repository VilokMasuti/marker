import React, { useContext } from 'react';
import CartContext from '../Context/CartContext';

const Header = () => {
  const { state } = useContext(CartContext);

  return (
    <header>
      <h1>{state ? `Items in cart: ${state.cart.length}` : 'Loading...'}</h1>
    </header>
  );
};

export default Header;
