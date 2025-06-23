import styles from "../styles/chat.module.css";

function Bubble(){
    return (
      <div className={styles.chat}>
        <p>Hello world</p>
        <p className={styles.stamp}>23rd June, 2025 9:00 PM</p>
      </div>
    );
}

export default Bubble;