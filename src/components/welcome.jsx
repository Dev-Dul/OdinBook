import styles from "../styles/welcome.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { logIn } from "../../utils/fetch";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/context";
import { toast } from "sonner";


function Welcome(){
    const { handleUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const apiUrl = import.meta.env.VITE_API_URL;



    async function onSubmit(formData){
        const logInPromise = logIn(formData.username, formData.password);
        toast.promise(logInPromise, {
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
        })
    }

     async function handleAuth(e) {
       e.preventDefault(); // prevent form reload if any
       window.location.href = `${apiUrl}/api/v1/auth/google`; // ✅ Do a browser redirect
     }


    return (
      <div className={styles.container}>
        <h1>Odinbook.</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h2>Login to continue to your account.</h2>
          <div className={styles.inputBox}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters long",
                },
                maxLength: {
                  value: 18,
                  message: "Username must not exceed 18 characters long",
                },
              })}
            />
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long.",
                },
              })}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>
          <button type="submit" className="btn">Log In</button>
          <div className={styles.line}>
            <hr />
            <p>Or</p>
          </div>
          <div className={`${styles.inputBox} ${styles.two}`}>
            <button className={styles.google} onClick={handleAuth}>Sign In Using Google</button>
          </div>
          <p className={styles.redirect}>Don't have an account? <Link to={"/signup"} className="link">Sign Up</Link></p>
        </form>
        <h2 className={styles.dev}>Made with ❤️ by <a href="https://github.com/Dev-Dul" target="_blank" rel="noopener noreferrer" className="link">DevAbdul</a> 
            &nbsp; Check Out the <a href="https://github.com/Dev-Dul/OdinBook.git" target="_blank" rel="noopener noreferrer" className="link">Repo.</a>
        </h2>
      </div>
    );
}

export default Welcome;