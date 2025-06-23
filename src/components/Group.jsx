import styles from "../styles/chat.module.css";

function Group(){
    return (
      <div className={styles.container}>
        <div className="header">
          <h2>Group</h2>
        </div>
        <div className={`${styles.chats} ${styles.two}`}>
          <div className={styles.chat}>
            <p>Hello world</p>
            <p className={styles.stamp}>23rd June, 2025 9:00 PM</p>
          </div>
          <form action="">
            <textarea name="message" id="message"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
}

export default Group;