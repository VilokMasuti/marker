import React, { useContext, useState, ChangeEvent } from 'react';
import ProductCard from './ProductCard';
import ProductContext from '../Context/ProductContext';
import { Product, ProductContextType } from '../types';
import l from '../assets/l.svg';

enum SortingOption {
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
  RATING_HIGH_TO_LOW = 'RATING_HIGH_TO_LOW',
}

const ProductList: React.FC = () => {
  const context = useContext<ProductContextType | null>(ProductContext);
  if (!context) return null;

  const { products, categories, loading, setFilteredProducts } = context;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);
  const [categoryFilter, setCategoryFilter] = useState<string | null>('');
  const [priceMinFilter, setPriceMinFilter] = useState<string>('');
  const [priceMaxFilter, setPriceMaxFilter] = useState<string>('');
  const [sortingOption, setSortingOption] = useState<SortingOption | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (loading) return  <img src={l} alt="Loading" className="lg:w-[40%] lg:h-[40%] lg:ml-[30%] max-sm:w-[40%] max-sm:h-[40%] ml-[30%]" />;

  if (products.length === 0) return <img src={l} alt="Loading" className="lg:w-[30%] lg:h-[30%] lg:ml-[30%]" />;

  let filteredProducts = products;

  if (categoryFilter) {
    filteredProducts = filteredProducts.filter((product: Product) => product.category === categoryFilter);
  }

  if (priceMinFilter) {
    filteredProducts = filteredProducts.filter((product: Product) => product.price >= parseFloat(priceMinFilter));
  }

  if (priceMaxFilter) {
    filteredProducts = filteredProducts.filter((product: Product) => product.price <= parseFloat(priceMaxFilter));
  }

  if (searchQuery !== '') {
    filteredProducts = filteredProducts.filter((product: Product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortingOption === SortingOption.PRICE_LOW_TO_HIGH) {
    filteredProducts.sort((a: Product, b: Product) => a.price - b.price);
  } else if (sortingOption === SortingOption.PRICE_HIGH_TO_LOW) {
    filteredProducts.sort((a: Product, b: Product) => b.price - a.price);
  } else if (sortingOption === SortingOption.RATING_HIGH_TO_LOW) {
    filteredProducts.sort((a: Product, b: Product) => b.rating.rate - a.rating.rate);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value || null);
  };

  const handlePriceMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceMinFilter(e.target.value);
  };

  const handlePriceMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceMaxFilter(e.target.value);
  };

  const handleSortingOptionChange = (option: SortingOption) => {
    setSortingOption(option);
  };

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFilteredProducts(filteredProducts.filter((product: Product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-grow">
          <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700">
            Search...!
          </label>
          <input
            type="text"
            id="searchQuery"
            name="searchQuery"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for products..."
          />
        </div>
        <div className="flex-grow">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={categoryFilter ?? ''}
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-grow">
          <label htmlFor="priceMin" className="block text-sm font-medium text-gray-700">
            Min Price
          </label>
          <input
            type="text"
            id="priceMin"
            name="priceMin"
            value={priceMinFilter}
            onChange={handlePriceMinChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex-grow">
          <label htmlFor="priceMax" className="block text-sm font-medium text-gray-700">
            Max Price
          </label>
          <input
            type="text"
            id="priceMax"
            name="priceMax"
            value={priceMaxFilter}
            onChange={handlePriceMaxChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700">Sort by:</label>
          <div className="mt-1 flex gap-2">
            <button
              onClick={() => handleSortingOptionChange(SortingOption.PRICE_LOW_TO_HIGH)}
              className={`px-3 py-1 rounded-md ${
                sortingOption === SortingOption.PRICE_LOW_TO_HIGH ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
            >
              Price Low to High
            </button>
            <button
              onClick={() => handleSortingOptionChange(SortingOption.PRICE_HIGH_TO_LOW)}
              className={`px-3 py-1 rounded-md ${
                sortingOption === SortingOption.PRICE_HIGH_TO_LOW ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
            >
              Price High to Low
            </button>
            <button
              onClick={() => handleSortingOptionChange(SortingOption.RATING_HIGH_TO_LOW)}
              className={`px-3 py-1 rounded-md ${
                sortingOption === SortingOption.RATING_HIGH_TO_LOW ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
            >
              Rating High to Low
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-4">
        <ul className="flex justify-center">
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
            <li key={index} className="mx-1">
              <button
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
