import { useState } from 'react'
import './App.css'
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { createContext } from 'react';
import Sidebar from './components/Sidebar';

export const AuthContext = createContext({});

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const hideSidebar = location.pathname === '/' || location.pathname === '/signup';

  function handleUser(user){
    setUser(user);
  }


  return (
    <AuthContext.Provider value={{ user, handleUser }} >

      <div className={!hideSidebar ? "grid" : ''}>
        <Toaster richColors position='top-right' />
        {!hideSidebar && <Sidebar />}
        <Outlet />
      </div>

    </AuthContext.Provider>
  );
}

export default App
