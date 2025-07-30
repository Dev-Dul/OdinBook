import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useEffect, useState } from "react";
import { AuthProvider } from '../utils/context';
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();
  const [likedPosts, setLikedPosts] = useState({});
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const hideSidebar = location.pathname === '/' || location.pathname === '/signup';

  useEffect(() => {
    const stored = localStorage.getItem("likedPosts");
    console.log("stored:", stored);
    if(stored) setLikedPosts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    console.log("liked posts", likedPosts);
  }, [likedPosts]);

  function toggleLike(postId){
    console.log("post toggled:", postId);
    console.log("post toggled 2:", likedPosts[postId]);
    setLikedPosts((prev) => ({
      ...prev,
      [postId] : !prev[postId],
    }));
  }

  return (
    <AuthProvider>
      <Toaster richColors position="top-right" />
      <AnimatePresence mode="wait">
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
              <Outlet context={{ likedPosts, toggleLike }}/>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    </AuthProvider>
  );

}


export default App;
