import styles from "../styles/postview.module.css";
import { Trash2 } from "lucide-react";

function Comment({ author, text, date }){
    return (
      <div className={styles.chat}>
        <h2>{author}</h2>
        <p>{text}</p>
        <div className={styles.action}>
          <p className={styles.stamp}>{date}</p>
          <Trash2 />
        </div>
      </div>
    );
}

export default Comment;