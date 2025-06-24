import { useNavigate } from "react-router-dom";
import styles from "../styles/welcome.module.css";


function Welcome(){
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <h1>Welcome, to TreeHouse.</h1>
            <form action="">
                <h2>Login if you have an account</h2>
                <div className={styles.inputBox}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <button onClick={() => navigate("/signup")}>Log In</button>
                <p>Don't have an account? Sign Up</p>
            </form>
        </div>
    )
}

export default Welcome;