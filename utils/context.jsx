import { createContext, useEffect, useState } from "react";
import { hydrateUser } from "./fetch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [userLoad, setLoading] = useState(true);
    const navigate = useNavigate();

    function handleUser(person){
        setUser(person)
    }

    async function hydrate(){
      try{
        const hydrate = await hydrateUser();
        handleUser(hydrate);
      }catch(err){
        toast.error(err.message);
        if(err.message === "Unauthorized"){
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
        if(!user && hasLogged){
           hydrate();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, handleUser, userLoad, hydrate }}>
            {children}
        </AuthContext.Provider>
    )
}