import styles from "../styles/postview.module.css";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";
import { deleteComment } from "../../utils/fetch";

function Comment({ id, author, authorId, text, postId, date }){
   const { user } = useContext(AuthContext);
   const check = user.id === authorId;

   async function handleClick(){
       const deletePromise = deleteComment(postId, id);
        toast.promise(deletePromise, {
          loading: "Deleting comment...",
          success: (response) => {
            if(response) {
              return response.message;
            }
          },
          error: (error) => {
            return error.message;
          },
        });
   }

    return (
      <div className={styles.comment}>
        <h2>{author.username}</h2>
        <p>{text}</p>
        <div className={styles.action}>
          <p className={styles.stamp}>{date}</p>
          {check && <Trash2 onClick={handleClick} className={styles.trash}/>}
        </div>
      </div>
    );
}

export default Comment;