import styles from "../styles/loader.module.css";
import butterfly from "../assets/Img/butterfly.gif";

function Loader(){
    return (
        <div className={styles.loader}>
            {/* <img src={butterfly} alt="load animation" /> */}
            <p>Loading...</p>
        </div>
    )
}

export default Loader;