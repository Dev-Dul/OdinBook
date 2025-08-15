import { useRef, createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
const apiUrl = import.meta.env.VITE_API_URL;


// Create the context
// ScrollContext.js

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Reset after 150ms of no scroll
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

  return (
    <ScrollContext.Provider value={{ isScrolling }}>
      {children}
    </ScrollContext.Provider>
  );
};




export function ThemeEngine(theme){
    const body = document.body;
    switch (theme){
        case 'light': 
            body.style.setProperty('--bg-color', '#f7f7f7');
            body.style.setProperty('--text-color', '#040404');
            body.style.setProperty('--shadow-color', '#04040480');
        break;
        case 'dark': 
            body.style.setProperty('--bg-color', '#0d0d0eff');
            body.style.setProperty('--text-color', '#dee2e8ff');
            body.style.setProperty('--shadow-color', '#ffffff80');
        break;
        case 'orchid': 
            body.style.setProperty('--bg-color', '#2c0c3c');
            body.style.setProperty('--text-color', '#f0e6f7');
            body.style.setProperty('--shadow-color', '#ffffff80');
        break;
        case 'rose': 
            body.style.setProperty('--bg-color', '#f7d3d8ff');
            body.style.setProperty('--text-color', '#2b0209ff');
            body.style.setProperty('--shadow-color', '#2b020990');
        break;
        case 'emerald': 
            body.style.setProperty('--bg-color', '#003d29');
            body.style.setProperty('--text-color', '#e0ffe0');
            body.style.setProperty('--shadow-color', '#e0ffe080');
        break;   
    }
}

const socket = io(apiUrl, {
    transports: ["websocket"],
    withCredentials: true,
    autoConnect: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export default socket;