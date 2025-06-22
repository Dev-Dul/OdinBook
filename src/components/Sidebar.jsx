import styles from "../styles/sidebar.module.css";
function Sidebar(){
    return(
        <div className={styles.sidebar}>
            <div className={styles.icon}>Icon</div>
            <div className={styles.icon}>Icon</div>
            <div className={styles.icon}>Icon</div>
            <div className={styles.icon}>Icon</div>
            <div className={styles.icon}>Icon</div>
        </div>
    )
}

export default Sidebar;