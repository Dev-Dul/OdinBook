import styles from "../styles/error.module.css";

function AuthError(){
    return (
      <div className={styles.error}>
        <h2>Oops, An Error Occurred while Signing In via Goggle..</h2>
        <p className={styles.sub}>
          Try: Refreshing the page or checking your internet connection.
        </p>
      </div>
    );
}

export default AuthError;