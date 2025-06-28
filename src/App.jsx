import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/' || location.pathname === '/signup';

  return (
    <div className={!hideSidebar ? "grid" : ''}>
      <Toaster richColors position='top-right' />
      {!hideSidebar && <Sidebar />}
      <Outlet />
    </div>
  );
}

export default App
