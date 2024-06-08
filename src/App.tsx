import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { CartProvider } from './Context/CartContext'; // Add this import
import { ProductProvider } from './Context/ProductContext'; // Add this import
import AppLayout from './Components/AppLayout';
import Home from './pages/Home';
import Cart from './Components/Cart';
import ProductDetails from './Components/ProductDetails';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/:productId',  // Note the parameter :productId
        element: <ProductDetails />
      }
    ]
  }
]);
const App = () => {
  return (
    <main className='container mx-auto'>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router}/>
        </CartProvider>
      </ProductProvider>
    </main>
  );
};

export default App;
