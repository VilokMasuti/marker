
import { createContext, useReducer, useEffect, Dispatch, ReactNode } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: number;
}

interface CartState {
  cart: CartItem[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: CartItem }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface ContextProps {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

const CartContext = createContext<ContextProps>({
  state: { cart: [] },
  dispatch: () => null
});

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload.id);
    case 'LOAD_CART':
      return action.payload;
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ state: { cart }, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
