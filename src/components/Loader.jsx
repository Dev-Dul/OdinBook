import styles from "../styles/loader.module.css";

function Loader(){
    return (
        <div className={styles.loader}>
            {/* <img src="" alt="" /> */}
            <p>Loading...</p>
        </div>
    )
}

export default Loader;