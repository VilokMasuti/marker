import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { fetchProducts, fetchCategories } from '../Data/productService';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  categories: string[];
  loading: boolean;
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      const categoriesData = await fetchCategories();
      setProducts(productsData);
      setCategories(categoriesData);
      setFilteredProducts(productsData);
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, categories, loading, setFilteredProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
