import styles from "../styles/post.module.css";
import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

function Post(){
    return (
        <div className={styles.post}>
            <div className={styles.header}>
                <div className={styles.pic}></div>
                <p className="author">AbdulRahim Jamil</p>
                <p className="time">12:20 AM</p>
            </div>
            <div className={styles.body}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae modi et atque exercitationem consequatur! Quia nobis quibusdam pariatur tempore quasi excepturi praesentium facilis quisquam, voluptate laudantium blanditiis sapiente voluptatum unde dicta, et optio reprehenderit. A.</p>
                <div className={styles.action}>
                    <Heart />
                    <MessageCircle />
                </div>
            </div>
        </div>
    )
}

export default Post;