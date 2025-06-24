import styles from "../styles/friends.module.css";

function Friends(){
    return (
      <div className={styles.container}>
        <div className="header">
          <h1>Find Friends</h1>
        </div>
        <div className={styles.friends}>
          <div className={styles.friend}>
            <div className={styles.text}>
              <h3>Name</h3>
              <p>Date Joined</p>
              <p>Online</p>
            </div>
            <div className={styles.action}>
                <button>Add Friend</button>
            </div>
          </div>
          <div className={styles.friend}>
            <div className={styles.text}>
              <h3>Name</h3>
              <p>Date Joined</p>
              <p>Online</p>
            </div>
            <div className={styles.action}>
                <button>Add Friend</button>
            </div>
          </div>
          <div className={styles.friend}>
            <div className={styles.text}>
              <h3>Name</h3>
              <p>Date Joined</p>
              <p>Online</p>
            </div>
            <div className={styles.action}>
                <button>Add Friend</button>
            </div>
          </div>
          <div className={styles.friend}>
            <div className={styles.text}>
              <h3>Name</h3>
              <p>Date Joined</p>
              <p>Online</p>
            </div>
            <div className={styles.action}>
                <button>Add Friend</button>
            </div>
          </div>
          <div className={styles.friend}>
            <div className={styles.text}>
              <h3>Name</h3>
              <p>Date Joined</p>
              <p>Online</p>
            </div>
            <div className={styles.action}>
                <button>Add Friend</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Friends;