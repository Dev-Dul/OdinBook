import styles from "../styles/postview.module.css";
import Post from "./Post";
import Comment from "./Comment";
import { SendIcon } from "lucide-react";
import { ArrowLeft } from "lucide-react";


function PostView(){
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <button><ArrowLeft /></button>
                <h2>Post</h2>
            </div>
            <Post />
            <h2 className={styles.cmnts}>Comments</h2>
            <div className={styles.comments}>
                <Comment author={'Abdul'} text={"hello world, this is the first commment"} date={"17, July 2025."}/>
                <Comment author={'Abdul'} text={"hello world, this is the first commment"} date={"17, July 2025."}/>
                <Comment author={'Abdul'} text={"hello world, this is the first commment"} date={"17, July 2025."}/>
                <Comment author={'Abdul'} text={"hello world, this is the first commment"} date={"17, July 2025."}/>
            </div>
            <form action="">
                <textarea id="comment" placeholder="Add a comment..."></textarea>
                <button type="submit"><SendIcon /></button>
            </form>
        </div>
    )
}

export default PostView;