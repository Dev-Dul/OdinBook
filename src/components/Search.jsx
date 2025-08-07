import styles from "../styles/search.module.css"
import { Search } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/context";
import { ScrollContext } from "../../utils/utils";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSearch } from "../../utils/fetch";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { format } from "date-fns";
import Loader from "./Loader";
import Friend from "./Friend";
import Post from "./Post";
import Comment from "./Comment";
import Error from "./Error";

function SearchPage(){
    const [search, setSearch] = useState(false);
    const [tab, setTab] = useState(1);
    const { user, userLoad } = useContext(AuthContext);
    const { onScroll } = useContext(ScrollContext);
    const { usersRes, postsRes, commentsRes, error, loading, SearchEngine } = useSearch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    if(userLoad) return <Loader />;
    if(!user) return <Navigate to={"/"} />;
    if(error) return <Error error={error} />

    async function onSubmit(data){
      const searchPromise = SearchEngine(data.search);
        toast.promise(searchPromise, {
            loading: "Fetching data...",
            success: (response) => {
                if(response){
                    setSearch(true);
                    return "Data fetch complete!.";
                }
            },
            error: (error) => {
                return error.message || "An error occurred while fetching results.";
            }
        });
    }

    function handleTab(num){
      setTab(num);
    }

    function formatDate(date){
        const formatted = format(new Date(date), "h:mm a");
        return formatted;
    }

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Search</h2>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <input
              type="search"
              placeholder="Search"
              {...register("search", {
                required: "Search Term is required!",
              })}
            />
            <button type="submit" className="btn">
              <Search />
            </button>
            {errors.search && (
              <p className={styles.error}>{errors.search.message}</p>
            )}
          </div>
        </form>
        {search && (
          <div className={styles.result}>
            <div className={styles.nav}>
              <button
                onClick={() => handleTab(1)}
                style={{ borderBottom: tab === 1 ? "2px solid" : "" }}>
                Users
              </button>
              <button
                onClick={() => handleTab(2)}
                style={{ borderBottom: tab === 2 ? "2px solid" : "" }}>
                Posts
              </button>
              <button
                onClick={() => handleTab(3)}
                style={{ borderBottom: tab === 3 ? "2px solid" : "" }}>
                Comments
              </button>
            </div>
            <div className={styles.tabs}>
              <div className={`${styles.tab} ${tab === 1 ? styles.active : ""}`} onScroll={onScroll}>
                {usersRes.length === 0 ? (
                  <h2>No Users Found For this search term.</h2>
                ) : (
                  usersRes.map((user) => (
                    <Friend id={user.id} key={user.id} friend={user} />
                  ))
                )}
              </div>
              <div className={`${styles.tab} ${tab === 2 ? styles.active : ""}`} onScroll={onScroll}>
                {postsRes.length === 0 ? (
                  <h2>No Posts Found For this search term.</h2>
                ) : (
                  postsRes.map((post) => (
                    <Link to={`/posts/view/${post.id}`} className="link">
                      <Post id={post.id} key={post.id} post={post} formatDate={formatDate} />
                    </Link>
                  ))
                )}
              </div>
              <div className={`${styles.tab} ${tab === 3 ? styles.active : ""}`} onScroll={onScroll}>
                {commentsRes.length === 0 ? (
                    <h3>No comments found for this search term.</h3>
                  ) : (
                    commentsRes.map((comment) => (
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
        )}
      </div>
    );
}

export default SearchPage;