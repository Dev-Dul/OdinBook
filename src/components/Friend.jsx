import styles from "../styles/friends.module.css";

function Friend(){
    return (
      <div className={styles.friend}>
        <div className={styles.head}>
          <div className={styles.pic}></div>
          <p className={styles.name}>AbdulRahim Jamil</p>
        </div>
        <div className={styles.action}>
          <p className={styles.status}>ACCEPTED</p>
          <button>Unfriend</button>
        </div>
      </div>
    );
}

export default Friend;