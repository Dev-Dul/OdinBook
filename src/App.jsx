import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/' || location.pathname === '/signup';

  return (
    <div className={!hideSidebar ? "grid" : ''}>
      {!hideSidebar && <Sidebar />}
      <Outlet />
    </div>
  );
}

export default App
