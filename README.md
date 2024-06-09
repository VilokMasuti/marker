# React + TypeScript + Vite
How to run the app:

Ensure npm is Installed: Before starting, make sure that npm (Node Package Manager) is installed on your system.

Product List Application
This React application allows users to view and filter a list of products based on categories, price ranges, and search queries. It also supports sorting products by price and rating. The app is designed to be responsive and user-friendly.

Features
Product Filtering: Filter products by category, minimum and maximum price, and search query.
Sorting Options: Sort products by price (low to high and high to low) and by rating (high to low).
Pagination: Paginate through the list of products with a configurable number of products per page.
Loading Indicators: Display loading indicators while fetching products.
Responsive Design: Optimized for both desktop and mobile views.
Installation
Clone the repository:
sh
Copy code
git clone https://github.com/yourusername/product-list-app.git
Navigate to the project directory:
sh
Copy code
cd product-list-app
Install dependencies:
sh
Copy code
npm install
Start the development server:
sh
Copy code
npm start
Usage
Search: Use the search bar to find products by title.
Filter: Select a category from the dropdown to filter products.
Price Range: Enter minimum and maximum prices to filter products within a price range.
Sort: Click on the sorting buttons to sort products by price or rating.
Pagination: Navigate through pages using the pagination controls at the bottom.
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch:
sh
Copy code
git checkout -b feature-name
Make your changes and commit them:
sh
Copy code
git commit -m 'Add new feature'
Push to the branch:
sh
Copy code
git push origin feature-name
Open a pull request.
License
This project is licensed under the MIT License.



- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
