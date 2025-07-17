import styles from "../styles/welcome.module.css";
import { signUp } from "../../utils/fetch";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";


function Signup(){
    // const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();

    async function onSubmit(formData){
        const signUpPromise = await signUp(formData.name, formData.email, formData.username, formData.password);
        toast.promise(signUpPromise, {
            loading: "Creating your account...",
            success: (response) => {
                if(response){
                    navigate("/");
                    return response.message;
                }
            },
            error: (error) => {
                return error.message;
            }
        })
    }


    return (
      <div className={`${styles.container} ${styles.signup}`}>
        <h1>Odinbook</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h2>Join Us On A Social Adventure Of A Lifetime.</h2>
          <div className={styles.inputBox}>
            <button className={styles.google}>Sign Up Using Google</button>
          </div>
          <div className={`${styles.line} ${styles.two}`}>
            <hr />
            <p>Or</p>
          </div>
          <div className={styles.inputBox}>
            <input
              type="text"
              id="name"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 characters long",
                },
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className={styles.inputBox}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters long",
                },
              })}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div className={styles.inputBox}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className={styles.inputBox}>
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long.",
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button>Sign Up</button>
          <p>{/* Already have an account? <Link to="/">Log In</Link> */}</p>
        </form>
      </div>
    );
}

export default Signup;