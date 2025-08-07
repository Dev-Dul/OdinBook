import styles from "../styles/welcome.module.css";
import { signUp, googleAuth } from "../../utils/fetch";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";



function Signup(){
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const apiUrl = import.meta.env.VITE_API_URL;


    async function onSubmit(formData){
        const signUpPromise = signUp(formData.username, formData.email, formData.password);
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

    async function handleAuth(e) {
      e.preventDefault(); // prevent form reload if any
      window.location.href = `${apiUrl}/api/v1/auth/google`; // ✅ Do a browser redirect
    }



    return (
      <div className={`${styles.container} ${styles.signup}`}>
        <h1>Odinbook</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h2>Join Us On A Social Adventure Of A Lifetime.</h2>
          <div className={styles.inputBox}>
            <button className={styles.google} onClick={handleAuth}>Sign Up Using Google</button>
          </div>
          <div className={`${styles.line} ${styles.two}`}>
            <hr />
            <p>Or</p>
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
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
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
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
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
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>
          <button type="submit" className="btn">Sign Up</button>
          <p className={styles.already}>Already have an account? <Link to="/" className="link">Log In</Link></p>
        </form>
        <h2 className={styles.dev}>Made with ❤️ by <a href="https://github.com/Dev-Dul" target="_blank" className="link">DevAbdul</a> 
            &nbsp; Check Out the <a href="https://github.com/Dev-Dul/OdinBook.git" target="_blank" className="link">Repo.</a>
        </h2>
      </div>
    );
}

export default Signup;