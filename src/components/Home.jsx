import styles from "../styles/home.module.css";
import { useContext, useEffect, useState } from "react";
import { useGetAllPosts } from "../../utils/fetch";
import { AuthContext } from "../../utils/context";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Loader from "./Loader";
import Post from "./Post";
import socket from "../../utils/utils";

function Home(){
    const [tab, setTab] = useState(1);
    const { user, userLoad } = useContext(AuthContext);
    const { posts, setPosts, error, loading, getAllPosts } = useGetAllPosts();

    useEffect(() => {
      getAllPosts();
      
      function handleNewPost(post){
        setPosts((prev) => [post, ...prev]);
      }

      function handleDeletePost(postId){
        setPosts((prev) => prev.filter(post => post.id !== postId));
      }

      socket.on("new post", handleNewPost);
      socket.on("delete post", handleDeletePost);

      return () => {
        socket.off("new post", handleNewPost);
        socket.off("delete post", handleDeletePost);
      }

    }, []);

    if(userLoad || loading) return <Loader />;
    if(!user) return <Navigate to={"/"} replace />
    if(error) return <Error error={error} />
    
    function formatDate(date){
      const formatted = format(new Date(date), "h:mm a");
      return formatted;
    }

    function handleTab(num){
      setTab(num);
    }

    const postsOne = posts.filter(post => {
      return user.friendships.some(friend => friend.id === post.authorId);
    });

    const postsTwo = posts.filter(post => {
      return user.friends.some(friend => friend.id === post.authorId);
    });

    const friendsPosts = [...postsOne, ...postsTwo];


    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Odinbook</h1>
        </div>
        <div className={styles.posts}>
          <div className={styles.nav}>
            <button
              onClick={() => handleTab(1)}
              style={{ borderBottom: tab == 1 ? "2px solid" : "" }}
            >
              For You
            </button>
            <button
              onClick={() => handleTab(2)}
              style={{ borderBottom: tab == 2 ? "2px solid" : "" }}
            >
              Your Circle
            </button>
          </div>
          <div className={styles.tabs}>
            <div className={`${styles.tab} ${tab === 1 ? styles.active : ""}`}>
              {posts.length === 0 ? (
                <h2>No posts available</h2>
              ) : (
                posts.map((post) => (
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
              {friendsPosts.length === 0 ? (
                <h2>No posts from people in your circle available.</h2>
              ) : (
                friendsPosts.map((post) => (
                  <Link to={`/posts/view/${post.id}`}>
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
          </div>
        </div>
      </div>
    );
}

export default Home;