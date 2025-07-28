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
import { useGetPost } from "../../utils/fetch";
import { AuthContext } from "../../utils/context";
import { useForm } from "react-hook-form";
import { createNewComment, deletePost } from "../../utils/fetch";
import { toast } from "sonner";
import socket from "../../utils/utils";


function PostView(){
    const { postId } = useParams();
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [del, setDel] = useState(false);
    const { user, userLoad } = useContext(AuthContext);
    const { post, error, loading, getPost } = useGetPost();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    useEffect(() => {
      getPost(postId);
      socket.on("new comment", (obj) => {
        console.log("new comment received:", obj.comment);
        console.log("All comments:", comments);
        setComments((prev) => [obj.comment, ...prev]);
      });

      // socket.on("delete comment", (commentId) => {
      //   console.log("new commentId received:", commentId)
      //   console.log("All comments:", comments);
      //   setComments((prev) => prev.filter(comment => comment.id !== commentId));
      // });

      socket.on("delete comment", (obj) => {
        setComments((prev) => {
          const updated = prev.filter(comment => comment.id !== obj.commentId);
          console.log("Comment deleted:", obj.commentId);
          console.log("Updated comments:", updated);
          return updated;
        });
      });


      return () => {
        socket.off("new comment");
        socket.off("delete comment");
      };

    }, []);

    


    useEffect(() => {
      if(post && post.comments) {
        setComments(post.comments);
        console.log("New post received:", post);
      }
    }, [post]); // this runs AFTER post is updated


    if(userLoad) return <Loader />
    if(loading) return <Loader />
    if(error) return <Error />
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
          <div className={styles.options}>
            <button onClick={handleDel}>
              <MoreHorizontal />
            </button>
            <div className={`${styles.del} ${del ? styles.show : ''}`}>
              <button onClick={onDelete}><Trash2 /></button>
            </div>
          </div>
        </div>
        <Post post={post} formatDate={formatDate} />
        <h2 className={styles.cmnts}>Comments</h2>
        <div className={`${comments.length !== 0 ? styles.grids : styles.one }`}>
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