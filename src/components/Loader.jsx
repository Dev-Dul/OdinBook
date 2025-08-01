import styles from "../styles/loader.module.css";


function Loader(){
    return (
      <div className={styles.loader}>
        <span class={styles.load}></span>
      </div>
    );
}

export default Loader;