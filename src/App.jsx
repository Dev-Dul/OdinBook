import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '../utils/context';
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
// import Post from './components/Post';
import PostView from './components/PostView';
import SearchPage from './components/Search';

function App() {
  // const location = useLocation();
  // const hideSidebar = location.pathname === '/' || location.pathname === '/signup';
  // const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


  // return (
  //   <AuthProvider>
  //     <Toaster richColors position="top-right" />
  //     <AnimatePresence mode="wait">
  //       <div className={(!hideSidebar && !isMobile) ? "grid" : "mobile"}>
  //         {(!hideSidebar && !isMobile) ? <Sidebar /> : <Navbar showNav={hideSidebar} isMobile={isMobile} /> }
  //         <motion.div
  //           key={location.pathname}
  //           initial={{ opacity: 0, x: 50 }}
  //           animate={{ opacity: 1, x: 0 }}
  //           exit={{ opacity: 0, x: -50 }}
  //           transition={{ duration: 0.8 }}>
  //           <Outlet />
  //         </motion.div>
  //       </div>
  //     </AnimatePresence>
  //   </AuthProvider>
  // );

  return (
    <SearchPage />
  )
}


export default App;
