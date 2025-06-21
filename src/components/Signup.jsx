import styles from "../styles/welcome.module.css";


function Signup(){
    return (
        <div className={styles.container}>
            <h1>Welcome, to TreeHouse.</h1>
            <form action="">
                <h2>Join Us At the great tree of peace.</h2>
                <div className={styles.inputBox}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <button>Sign Up</button>
                <p>Already have an account? Log In</p>
            </form>
        </div>
    )
}

export default Signup;