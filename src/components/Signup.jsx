import styles from "../styles/welcome.module.css";
import { signUp } from "../../utils/fetch";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Signup(){
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();

    async function onSubmit(formData){
        const signUpPromise = await signUp(formData.name, formData.email, formData.username, formData.password);
        toast.promise(signUpPromise, {
            loading: "Creating your account",
            success: (response) => {
                if(response){
                    navigate("/login");
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
            <h1>Welcome, to TreeHouse.</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <h2>Join Us At the great tree of peace.</h2>
                <div className={styles.inputBox}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" {...register("name", {
                        required: "Name is required",
                        minLength: {
                            value: 5,
                            message: "Name must be at least 5 characters long"
                        }
                    })} />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" {...register("username", {
                        required: "Username is required",
                        minLength: {
                            value: 5,
                            message: "Username must be at least 5 characters long"
                        }
                    })} />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register("email", {
                        required: "Email is required",
                    })} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long."
                        }
                    })}/>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button>Sign Up</button>
                <p>Already have an account? Log In</p>
            </form>
        </div>
    )
}

export default Signup;