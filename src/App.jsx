import { useState } from 'react'
import './App.css'
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '../utils/context';
import Sidebar from './components/Sidebar';


function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/' || location.pathname === '/signup';


  return (
    <AuthProvider>
      <Toaster richColors position='top-right' />
      <div className={!hideSidebar ? "grid" : ''}>
        {!hideSidebar && <Sidebar />}
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App
