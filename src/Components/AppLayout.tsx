
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const AppLayout: React.FC = () => {
  return (
    <div className=' mt-10'>
      <Header />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
