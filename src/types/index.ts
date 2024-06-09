// types.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductContextType {
  products: Product[];
  categories: string[];
  loading: boolean;
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}


export type ActionType =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: Product };