import styles from "../styles/error.module.css";
import { toast } from "sonner";
import { AuthContext } from "../../utils/context";
import { useContext, useEffect } from "react";
import { hydrateUser } from "../../utils/fetch";

function AuthSuccess(){
  const { handleUser } = useContext(AuthContext);

  async function onFetch(){
          const userPromise = hydrateUser();
          toast.promise(userPromise, {
              loading: "Just a moment...",
              success: (response) => {
                  if(response){
                      handleUser(response.user);
                      localStorage.setItem("logged", 'true');
                      navigate("/home");
                      return response.message;
                  }
              },
              error: (error) => {
                  return error.message;
              }
          });
      }

      useEffect(() => {
        onFetch();
      }, []);

    return (
      <div className={styles.error}>
        <h2>Login Via Google was successful!</h2>
        <p className={styles.sub}>just a moment as we redirect you to the HomePage.</p>
      </div>
    );
}

export default AuthSuccess;