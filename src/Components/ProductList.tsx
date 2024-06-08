import React, { useContext, useState } from 'react';

import ProductCard from './ProductCard';
import ProductContext from '../Context/ProductContext';

enum SortingOption {
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
  RATING_HIGH_TO_LOW = 'RATING_HIGH_TO_LOW',
}

const ProductList: React.FC = () => {
  const { products, loading, setFilteredProducts } = useContext(ProductContext);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceMinFilter, setPriceMinFilter] = useState<string>('');
  const [priceMaxFilter, setPriceMaxFilter] = useState<string>('');
  const [sortingOption, setSortingOption] = useState<SortingOption | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (loading) return <p>Loading...</p>;

  if (products.length === 0) return <p>No products available.</p>;

  let filteredProducts = products;

  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
  }
  
  if (priceMinFilter) {
    filteredProducts = filteredProducts.filter(product => parseFloat(product.price) >= parseFloat(priceMinFilter));
  }
  
  if (priceMaxFilter) {
    filteredProducts = filteredProducts.filter(product => parseFloat(product.price) <= parseFloat(priceMaxFilter));
  }

  if (searchQuery !== '') {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortingOption === SortingOption.PRICE_LOW_TO_HIGH) {
    filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortingOption === SortingOption.PRICE_HIGH_TO_LOW) {
    filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortingOption === SortingOption.RATING_HIGH_TO_LOW) {
    filteredProducts.sort((a, b) => parseFloat(b.rating.rate) - parseFloat(a.rating.rate));
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value || null);
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMinFilter(e.target.value);
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMaxFilter(e.target.value);
  };

  const handleSortingOptionChange = (option: SortingOption) => {
    setSortingOption(option);
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFilteredProducts(filteredProducts.filter(product =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    ));
  };

  return (
    <div className=''>
      <div className=' bg-slate-100 shadow-lg'>
      <div className="mb-4  ">
      <div className="mb-4">
        <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700">
          Search for products
        </label>
        <input
          type="text"
          id="searchQuery"
          name="searchQuery"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className="mt-1 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for products..."
        />
      </div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          className="mt-1 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={categoryFilter || ''}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          {[...new Set(products.map(product => product.category))].map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="priceMin" className="block text-sm font-medium text-gray-700">
          Min Price
        </label>
        <input
          type="text"
          id="priceMin"
          name="priceMin"
          value={priceMinFilter}
          onChange={handlePriceMinChange}
          className="mt-1 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="priceMax" className="block text-sm font-medium text-gray-700">
          Max Price
        </label>
        <input
          type="text"
          id="priceMax"
          name="priceMax"
          value={priceMaxFilter}
          onChange={handlePriceMaxChange}
          className="mt-1 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Sort by:</label>
        <div className="mt-1 flex">
          <button
            onClick={() => handleSortingOptionChange(SortingOption.PRICE_LOW_TO_HIGH)}
            className={`px-3 py-1 rounded-md mr-2 ${
              sortingOption === SortingOption.PRICE_LOW_TO_HIGH ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            Price Low to High
          </button>
          <button
            onClick={() => handleSortingOptionChange(SortingOption.PRICE_HIGH_TO_LOW)}
            className={`px-3 py-1 rounded-md mr-2 ${
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
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-4 py-2 rounded-md ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
