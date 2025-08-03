import styles from "../styles/postview.module.css";
import Post from "./Post";
import Comment from "./Comment";
import Loader from "./Loader";
import Error from "./Error";
import { format } from "date-fns";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MoreHorizontal, SendIcon, Trash2 } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { AuthContext } from "../../utils/context";
import { useForm } from "react-hook-form";
import { createNewComment, deletePost, getPost } from "../../utils/fetch";
import { toast } from "sonner";
import socket from "../../utils/utils";


function PostView(){
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [del, setDel] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const { user, userLoad } = useContext(AuthContext);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    async function onFetch(){
        const postPromise = getPost(postId);
        toast.promise(postPromise, {
            loading: "Fetching Post...",
            success: (response) => {
                if(response){
                    setPost(response.post);
                    setLoading(false);
                    return response.message;
                }
            },
            error: (error) => {
                return error.message;
            }
        });
    }

    useEffect(() => {
      onFetch();

      function handleNewComment(obj){
        setComments((prev) => [obj.comment, ...prev]);
      }

      function handleDeleteComment(obj){
        setComments((prev) => {
          const updated = prev.filter(comment => comment.id !== obj.commentId);
          return updated;
        });
      }

      socket.on("new comment", handleNewComment);  
      socket.on("delete comment", handleDeleteComment);


      return () => {
        socket.off("new comment", handleNewComment);
        socket.off("delete comment", handleDeleteComment);
      };

    }, []);

    


    useEffect(() => {
      if(post && post.comments) {
        setComments(post.comments);
        const Auth = post.author.id === user.id;
        setIsAuth(Auth);
      }
    }, [post]); 


    if(userLoad || loading) return <Loader />
    if(!user) return <Navigate to="/" replace="true" />

    function formatDate(date){
        const formatted = format(new Date(date), "h:mm a");
        return formatted;
    }

    function handleDel(){
      setDel(prev => !prev);
    }

    async function onSubmit(data){
        const commentPromise = createNewComment(data.comment, user.id, postId);
        toast.promise(commentPromise, {
          loading: "Posting new comment...",
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


    async function onDelete(){
        const deletePromise = deletePost(postId);
        toast.promise(deletePromise, {
          loading: "Deleting Post...",
          success: (response) => {
            if(response){
              return response.message;
            }
          },
          error: (error) => {
            return error.message;
          },
        });
    }

    
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
          <h2>Post</h2>
          {isAuth && (
            <div className={styles.options}>
              <button onClick={handleDel}>
                <MoreHorizontal />
              </button>
              <div className={`${styles.del} ${del ? styles.show : ""}`}>
                <button onClick={onDelete}>
                  <Trash2 />
                </button>
              </div>
            </div>
          )}
        </div>
        <Post post={post} formatDate={formatDate} />
        <h2 className={styles.cmnts}>Comments</h2>
        <div className={`${comments.length !== 0 ? styles.grids : styles.one}`}>
          {comments.length === 0 ? (
            <h2>No comments yet.</h2>
          ) : (
            comments.map((comment) => (
              <Comment
                id={comment.id}
                key={comment.id}
                author={comment.author}
                authorId={comment.author.id}
                text={comment.text}
                postId={postId}
                date={formatDate(comment.created)}
              />
            ))
          )}
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <textarea
            id="comment"
            placeholder="Add a comment..."
            {...register("comment", {
              required: "Comment cannot be blank!.",
              minLength: {
                value: 5,
                message: "Comment must be at least 5 characters long!.",
              },
            })}
          ></textarea>
          {errors.comment && (
            <p className={styles.error}>{errors.comment.message}</p>
          )}
          <button type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    );
}

export default PostView;