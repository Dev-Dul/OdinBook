import { createContext, useEffect, useState } from "react";
import { hydrateUser } from "./fetch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [userLoad, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleUser(person){
        setUser(person)
    }

    async function hydrate(){
      try{
        setLoading(true);
        const hydrate = await hydrateUser();
        console.log(hydrate);
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
        console.log("logged:", hasLogged);
        if(user === null && hasLogged){
           hydrate();
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, handleUser, userLoad, hydrate }}>
            {children}
        </AuthContext.Provider>
    )
}