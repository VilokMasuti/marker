import React, { createContext, useReducer, ReactNode } from 'react';
import { Product } from '../types';

interface CartState {
  items: Product[];
}

type ActionType = 
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number };

const initialState: CartState = {
  items: []
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

const cartReducer = (state: CartState, action: ActionType): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
