import { useNavigate } from "react-router-dom";
import styles from "../styles/welcome.module.css";
import { useForm } from "react-hook-form";
import { logIn } from "../../utils/fetch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";


function Welcome(){
    const { handleUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    async function onSubmit(formData){
        const logInPromise = await logIn(formData.username, formData.password);
        toast.promise(logInPromise, {
            loading: "Just a moment...",
            success: (response) => {
                if(response){
                    handleUser(response.user);
                    navigate("/home");
                    return response.message;
                }
            },
            error: (error) => {
                return error.message;
            }
        })
    }
    return (
        <div className={styles.container}>
            <h1>Welcome Back to TreeHouse.</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <h2>Login to continue to your account.</h2>
                <div className={styles.inputBox}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" {...register("username", {
                        required: "Username is required",
                        minLength: {
                            value: 5,
                            message: "Username must be at least 5 characters long"
                        }
                    })}/>
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long.",
                        }
                    })}/>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit">Log In</button>
                <p>Don't have an account? <Link to={"/signup"}>Sign Up</Link></p>
            </form>
        </div>
    )
}

export default Welcome;