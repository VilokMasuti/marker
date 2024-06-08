import React, { createContext, useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../Data/productService';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  loading: boolean;
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
    <ProductContext.Provider value={{ products, filteredProducts, categories, loading, setFilteredProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
