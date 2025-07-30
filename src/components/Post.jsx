import styles from "../styles/post.module.css";
import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { likeHandler } from "../../utils/fetch";
import { AuthContext } from "../../utils/context";
import { toast } from "sonner";
import socket from "../../utils/utils";

function Post({ post, formatDate }){
    const { user } = useContext(AuthContext);
    const [likeCount, setLikeCount] = useState(0)
    const [commentCount, setCommentCount] = useState(0)
    const [isLiked, setLiked] = useState(false);
    const authorPic = post.author.avatarUrl;
    const navigate = useNavigate();

    useEffect(() => {
        const liked = post.likes.some(like => like.userId === user.id);
        setLiked(liked);
        setLikeCount(post.likes.length);
        setCommentCount(post.comments.length);
        

        function handleLikeEvent(obj){
            if(obj.postId === post.id){
                if(obj.userId === user.id){
                    setLiked(true);
                }
                setLikeCount((prev) => prev + 1);
            }
            
        }

        function handleUnlike(obj){
            if(obj.postId === post.id){
                if(obj.userId === user.id) {
                  setLiked(false);
                }
               setLikeCount((prev) => Math.max(0, prev -1));
            }
        }

        function handleLikeError(error){
          setLiked(false);
          toast.error(error);
        }

        function handleNewComment(obj){
            if(post.id === obj.postId) {
              setCommentCount((prev) => prev + 1);
            }
        }

        function handleDeleteComment(obj){
            if(post.id === obj.postId) {
              setCommentCount((prev) => Math.max(0, prev - 1));
            }
        }

        socket.on("unlike", handleUnlike);
        socket.on("like", handleLikeEvent);
        socket.on("like error", handleLikeError);
        socket.on("new comment", handleNewComment);
        socket.on("delete comment", handleDeleteComment);

        return () => {
            socket.off("unlike", handleUnlike);
            socket.off("like", handleLikeEvent);
            socket.off("like error", handleLikeError);
            socket.off("new comment", handleNewComment);
            socket.off("delete comment", handleDeleteComment);
        }

    }, []);


    async function handleLike(e){
        e.preventDefault();
        e.stopPropagation();
        await likeHandler(user.id, post.id);
    }

    function handleClick(e){
        e.preventDefault();
        e.stopPropagation();
        navigate(`/users/view/${post.author.id}`);
    }


    return (
        <div className={styles.post}>
            <div className={styles.header}>
                <div className={styles.pic} onClick={handleClick} style={{backgroundImage: authorPic ? `url(${authorPic})` : '' }}></div>
                <p className="author">{post.author.username}</p>
                <p className="time">{formatDate(post.created)}</p>
            </div>
            <div className={styles.body}>
                <p>{post.text}</p>
                {post.picUrl && <img className={styles.postPic} src={post.picUrl} alt={"Picture for post"} />}
                <div className={styles.action}>
                    <div className={styles.count} onClick={handleLike}>
                        <Heart fill={isLiked ? 'red' : 'none'} color={isLiked ? 'red' : 'grey'} />
                        {likeCount}
                    </div>
                    <div className={styles.count}>
                        <MessageCircle />
                        {commentCount}
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default Post;