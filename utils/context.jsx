import { createContext, useEffect, useState } from "react";
import { hydrateUser } from "./fetch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ThemeEngine } from "./utils";
import socket from "./utils";

export const AuthContext = createContext({});

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [userLoad, setLoading] = useState(true);
    const navigate = useNavigate();

    function handleUser(person){
        setUser(person)
        if(person && !socket.connected) {
          socket.connect();
        }else if(!user && socket.connected){
          socket.disconnect();
        }
    }

    async function hydrate(){
      try{
        const hydrate = await hydrateUser();
        handleUser(hydrate.user);
      }catch(err){
        toast.error(err.message);
        if(err.message === "Expired"){
          setUser(null);
          localStorage.removeItem("logged");
          toast.info("Your session has expired, you need to login again.");
          navigate("/");
        }
      }finally{
        setLoading(false);
      }
    }

    useEffect(() => {
        const hasLogged = localStorage.getItem("logged") === 'true';
        const theme = localStorage.getItem("theme");
        if(!user && hasLogged){
           hydrate().then(() => {
             if(user && !socket.connected){
              socket.connect();
             }
           });
        }

        if(theme){
          ThemeEngine(theme);
        }else{
          ThemeEngine("light");
        }

        socket.on('connect', () => {
          console.log("Connected to Socket.IO");
        });

        socket.on('disconnect', (reason) => {
          console.log("Disconnected", reason);
        });

        socket.on('connect_error', (err) => {
          console.log("Connection error:", err.message);
        });

        if(!hasLogged) localStorage.setItem("theme", "light");

        return () => {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('connect_error');
          socket.disconnect();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, handleUser, userLoad, hydrate }}>
            {children}
        </AuthContext.Provider>
    )
}