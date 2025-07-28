import styles from "../styles/post.module.css";
import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

    useEffect(() => {
        setLikeCount(post.likes.length);
        setCommentCount(post.comments.length);

        socket.on("like", (postId) => {
          setLiked(true);
          setLikeCount(prev => prev + 1);
        });

        socket.on("unlike", (postId) => {
          setLiked(false);
          setLikeCount(prev => prev - 1);
        });

        socket.on("like error", (error) => {
            setLiked(false);
            toast.error(error);
        });

        socket.on("new comment", (obj) => {
            if(post.id === obj.postId){
                setCommentCount(prev => prev + 1);
            }
        });

        socket.on("delete comment", (obj) => {
            if(post.id === obj.postId){
                setCommentCount(prev => prev - 1);
            }
        });

    }, []);

    async function handleLike(e){
        e.stopPropagation();
        await likeHandler(user.id, post.id);
    }


    return (
        <div className={styles.post}>
            <div className={styles.header}>
                <div className={styles.pic} style={{backgroundImage: authorPic ? `url(${authorPic})` : '' }}></div>
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