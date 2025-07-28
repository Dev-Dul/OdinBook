import styles from "../styles/search.module.css"
import { Search } from "lucide-react";
import Loader from "./Loader";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/context";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSearch } from "../../utils/fetch";
import Friend from "./Friend";
import Post from "./Post";
import Comment from "./Comment"

function SearchPage(){
    const [search, setSearch] = useState(false);
    const [tab, setTab] = useState(1);
    const { user, userLoad } = useContext(AuthContext);
    const { users, posts, comments, SearchEngine } = useSearch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    if(userLoad) return <Loader />;
    if(!user) return <Navigate to={"/"} />;

    async function onSubmit(data){
      const searchPromise = SearchEngine(data.search);
        toast.promise(searchPromise, {
            loading: "Fetching data...",
            success: (response) => {
                if(response){
                    setSearch(true);
                    return response.message;
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

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Search</h2>
        </div>
        <form action="">
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
          </div>
        </form>
        {search && (
          <div className={styles.result}>
            <div className={styles.nav}>
              <button
                onClick={() => handleTab(1)}
                style={{ borderBottom: tab === 1 ? "2px solid" : "" }}
              >
                Users
              </button>
              <button
                onClick={() => handleTab(2)}
                style={{ borderBottom: tab === 2 ? "2px solid" : "" }}
              >
                Posts
              </button>
            </div>
            <div className={styles.tabs}>
              <div
                className={`${styles.tab} ${tab === 1 ? styles.active : ""}`}
              >
                {users.length === 0 ? (
                  <h2>No Users Found For this term.</h2>
                ) : (
                  users.map((user) => (
                    <Friend id={user.id} key={user.id} friend={user} />
                  ))
                )}
              </div>
              <div
                className={`${styles.tab} ${tab === 2 ? styles.active : ""}`}
              >
                {posts.length === 0 ? (
                  <h2>No Posts Found For this term.</h2>
                ) : (
                  posts.map((post) => (
                    <Link to={`/posts/view/${post.id}`}>
                      <Post id={post.id} key={post.id} post={post} />
                    </Link>
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