import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../Context/CartContext';
import { motion, AnimatePresence } from "framer-motion";

import cart from '../assets/cart.svg';
import sh from '../assets/sh.svg';

const Header: React.FC = () => {
  const variants3 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const word = "MAKER STUDIO SHOP";
  const variants1 = {
    hidden: { y: 10 },
    visible: { y: -10 },
  };
  const { state: { cart: cartItems } } = useContext(CartContext);

  return (
    <header className="p-4 flex justify-between relative items-center">
      <motion.div className="flex items-center">
        <motion.img 
          initial="hidden"
          animate="visible"
          transition={{ duration: 3 }}
          variants={variants3}
          src={sh} 
          alt="shop logo" 
          className="w-[150px] h-auto max-sm:w-[40%]"
        />
      </motion.div>
      <div className="hidden sm:flex flex-row gap-1 lg:gap-6">
        <AnimatePresence>
          {word.split("").map((char, i) => (
            <motion.h1
              key={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants1}
              transition={{ yoyo: Infinity, duration: 0.5, delay: i * 0.2 }}
              className="text-center font-display lg:text-4xl text-xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
            >
              {char}
            </motion.h1>
          ))}
        </AnimatePresence>
      </div>
    
      <div className="flex items-center relative">
        <Link to="/cart" className="flex items-center text-white mr-4">
          <motion.img
            initial="hidden"
            animate="visible"
            transition={{ duration: 3 }}
            variants={variants3}
            src={cart} 
            alt="cart" 
            className="w-[40%] h-auto max-sm:ml-[60%]  lg:w-[140px] mt-[-30px] lg:mt-[-30%]"
          />
          {cartItems.length > 0 && (
            <span className="text-black font-extrabold text-2xl sm:text-4xl lg:absolute lg:top-[-30%] max-sm:top-[-90%] lg:left-7 max-sm:absolute  max-sm:ml-[62%]">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
