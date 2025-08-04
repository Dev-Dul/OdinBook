import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useEffect, useState } from "react";
import { AuthProvider } from '../utils/context';
import { ScrollProvider } from '../utils/utils';
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const hideSidebar = location.pathname === '/' || location.pathname === '/signup' || location.pathname.startsWith('/posts/view/');


  return (
    <AuthProvider>
      <Toaster richColors position="top-right" />
      <AnimatePresence mode="wait">
        <ScrollProvider>
            <div className={(!hideSidebar && !isMobile) ? "grid" : "mobile"}>
            {(!hideSidebar && !isMobile) ? <Sidebar /> : <Navbar showNav={hideSidebar} isMobile={isMobile} /> }
            <div>
              <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className='wrapper'>
                <Outlet />
              </motion.div>
            </div>
          </div>
        </ScrollProvider>
      </AnimatePresence>
    </AuthProvider>
  );

}


export default App;
