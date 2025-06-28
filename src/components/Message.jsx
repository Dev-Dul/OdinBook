import styles from "../styles/chat.module.css";

function Bubble({ message, date }){
    return (
      <div className={styles.chat}>
        <p>{message}</p>
        <p className={styles.stamp}>{date}</p>
      </div>
    );
}

export default Bubble;