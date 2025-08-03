import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
const apiUrl = import.meta.env.VITE_API_URL;



export function useIsScrolling() {
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolling to true immediately when a scroll event occurs
      setIsScrolling(true);

      // Clear any existing timeout
      clearTimeout(timeoutRef.current);

      // Set a new timeout to set isScrolling to false after 200ms of inactivity
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };

    // Add the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener and the timeout when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return isScrolling;
}

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