import axios from 'axios';

import { Product } from '../types';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

export const fetchCategories = async () => {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      return response.data;
    };
    
    export const fetchProductById = async (id: number) => {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return response.data;
    };