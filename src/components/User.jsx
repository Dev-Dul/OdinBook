import styles from "../styles/profile.module.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";
import { updateProfile, useGetUser, friendRequest } from "../../utils/fetch";
import { useNavigate, Navigate, useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import Loader from "./Loader";
import Error from "./Error";
import Post from "./Post";
import Comment from "./Comment";

function UserView(){
    const { userId } = useParams();
    const { user, userLoad } = useContext(AuthContext);
    const { other, userError, userLoading, getUser } = useGetUser();
    const [tab, setTab] = useState(1);
    const navigate = useNavigate();


    useEffect(() => {
        getUser(userId);
    }, []);


    if(userLoad || userLoading) return <Loader />;
    if(!user) return <Navigate to={"/"} />;
    if(userError) return <Error error={userError} />
    if(Number(userId) === user.id) return <Navigate to={"/profile"} />

    function handleTab(num){
      setTab(num);
    }

    function formatDate(date){
        const formatted = format(new Date(date), "h:mm a");
        return formatted;
    }


    async function handleClick(status){
      const friendPromise = friendRequest(user.id, other.id, status);
        toast.promise(friendPromise, {
            loading: "Just a moment...",
            success: (response) => {
                if(response){
                    return response.message;
                }
            },
            error: (error) => {
                return error.message || `An error occurred while ${status.toLowerCase()}ing this user.`;
            }
        });
    }


    const friendsCount = other.friendships.length + other.friends.length;
    const postsCount = other.posts.length;
    const isFriend =
      user.friends.find((friend) => friend.id === other.id) ||
      user.friendships.find((friend) => friend.id === other.id);

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Profile</h1>
        </div>
        <div className={styles.deets}>
          <div className={styles.top}>
            <div
              className={styles.pic}
              style={{
                backgroundImage: other.AvatarUrl
                  ? `url(${user.AvatarUrl})`
                  : "",
              }}
            ></div>
            <div className={styles.text}>
              <h2>
                {friendsCount} <br /> <span>Friends</span>
              </h2>
              <h2>
                {postsCount} <br /> <span>Posts</span>
              </h2>
            </div>
          </div>
          <div className={styles.bottom}>
            <h2>{other.username}</h2>
            <p>{other.bio}</p>
            <div className={styles.action}>
              {isFriend ? (
                <button onClick={() => handleClick("ADD")} className="btn">
                    Add Friend
                </button>    
              ): (
                <button onClick={() => handleClick("REMOVE")} className="btn">
                    Unfriend
                </button>    
              )}
            </div>
          </div>
        </div>
        <div className={styles.tabs}>
          <div className={styles.nav}>
            <button
              onClick={() => handleTab(1)}
              style={{ borderBottom: tab === 1 ? "2px solid" : "" }}
            >
              Posts
            </button>
            <button
              onClick={() => handleTab(2)}
              style={{ borderBottom: tab === 2 ? "2px solid" : "" }}
            >
              Comments
            </button>
          </div>
          <div className={`${styles.tab} ${tab === 1 ? styles.active : ""}`}>
            {other.posts.length === 0 ? (
              <h3>No posts available</h3>
            ) : (
              other.posts.map((post) => (
                <Link to={`/posts/view/${post.id}`} className="link">
                  <Post
                    id={post.id}
                    key={post.id}
                    post={post}
                    formatDate={formatDate}
                  />
                </Link>
              ))
            )}
          </div>
          <div className={`${styles.tab} ${tab === 2 ? styles.active : ""}`}>
            {other.comments.length === 0 ? (
              <h3>No comments yet.</h3>
            ) : (
              other.comments.map((comment) => (
                <Comment
                  id={comment.id}
                  key={comment.id}
                  author={comment.author}
                  authorId={comment.author.id}
                  text={comment.text}
                  postId={comment.postId}
                  date={formatDate(comment.created)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
}

export default UserView;