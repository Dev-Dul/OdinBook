import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '../utils/context';
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from './components/Sidebar';


function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/' || location.pathname === '/signup';


  return (
    <AuthProvider>
      <Toaster richColors position='top-right' />
      <AnimatePresence mode='wait'>
        <motion.div key={location.pathname}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className={!hideSidebar ? "grid" : ''}>
          {!hideSidebar && <Sidebar />}
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </AuthProvider>
  );
}


export default App;
