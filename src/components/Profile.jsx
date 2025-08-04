import styles from "../styles/profile.module.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";
import { updateProfile, logOut } from "../../utils/fetch";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useScrollRef } from "../../utils/utils";
import { toast } from "sonner";
import Loader from "./Loader";
import Post from "./Post";
import Comment from "./Comment";
import { X } from "lucide-react";
import { Palette } from "lucide-react";
import { ThemeEngine } from "../../utils/utils";

function Profile(){
    const { user, userLoad, handleUser } = useContext(AuthContext);
    const [tab, setTab] = useState(1);
    const scrollRef = useScrollRef();
    const [openTheme, setOpenTheme] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    useEffect(() => {
        ThemeEngine(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    if(userLoad) return <Loader />;
    if(!user) return <Navigate to={"/"} />;

    function handleEdit(){
        setOpenEdit(prev => !prev);
    }

    function handleOpenTheme(){
        setOpenTheme(prev => !prev);
    }


    function handleTheme(value){
      setTheme(value);
    }

    function handleTab(num){
      setTab(num);
    }

    function formatDate(date) {
      const formatted = format(new Date(date), "h:mm a");
      return formatted;
    }

    async function onUpdate(data){
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("username", data.username);
      formData.append("email", data.email);
      if(data.bio) formData.append("bio", data.bio);
      if(data.profilePic[0]) formData.append("profilePic", data.profilePic[0]);
        
      const updatePromise = updateProfile(formData);
        toast.promise(updatePromise, {
            loading: "Updating your profile...",
            success: (response) => {
                if(response){
                    handleUser(response.user);
                    handleEdit();
                    return response.message;
                }
            },
            error: (error) => {
                return error.message || "An error occurred while updating your profile.";
            }
        });
    }

    async function onLogOut(){
      const logOutPromise = logOut();
      toast.promise(logOutPromise, {
        loading: "Logging you out...",
        success: (response) => {
          if(response){
            navigate("/");
            localStorage.removeItem("logged");
            handleUser(null);
            return response.message;
          }
        },
        error: (error) => {
          return error.message;
        },
      });
    }

    const accepted = user.friendships.filter(friend => friend.status === "ACCEPTED");
    const accepted_two = user.friends.filter(friend => friend.status === "ACCEPTED");
    const friendsCount = accepted.length + accepted_two.length;
    const postsCount = user.posts.length;

    return (
      <div className={styles.container}>
        {openEdit && (
          <div className={styles.overlay}>
            <form action="" onSubmit={handleSubmit(onUpdate)}>
              <div className={styles.close} onClick={handleEdit}>
                <X />
              </div>
              <h2>Edit Profile</h2>
              <div className={styles.inputBox}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={user.username}
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 5,
                      message: "Username must be at least 5 characters long",
                    },
                  })}
                />
                {errors.username && (
                  <p className={styles.error}>{errors.username.message}</p>
                )}
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <p className={styles.error}>{errors.email.message}</p>
                )}
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  {...register("bio", {
                    validate: (value) => {
                      value === "" ||
                        value.length >= 100 ||
                        "Bio must be at least 100 characters";
                    },
                  })}
                >
                  {user.bio}
                </textarea>
              </div>
              {errors.bio && (
                <p className={styles.error}>{errors.bio.message}</p>
              )}
              <div className={styles.inputBox}>
                <label htmlFor="profile">Profile Image</label>
                <input
                  type="file"
                  id="profile"
                  accept="image/*"
                  {...register("profilePic", {
                    validate: (files) => {
                      if (files.length === 0) return true;
                      const file = files[0];
                      const isSmall = file.size <= 2 * 1024 * 1024;
                      if (!isSmall) return "File size must not exceed 2MB";

                      return true;
                    },
                  })}
                />
                {errors.profilePic && (
                  <p className={styles.error}>{errors.profilePic.message}</p>
                )}
              </div>
              <button type="submit" className="btn">Update</button>
            </form>
          </div>
        )}
        <div className={styles.header}>
          <h1>Profile</h1>
        </div>
        <div className={styles.deets}>
          <div className={styles.top}>
            <div className={styles.theme}>
              <Palette className={styles.palette} onClick={handleOpenTheme} />
              <div
                className={`${styles.circle} ${
                  openTheme ? styles.showTheme : ""
                }`}
              >
                <div
                  className={styles.color}
                  style={{ "--pos": "1", backgroundColor: "#f7f7f7f7" }}
                  onClick={() => handleTheme("light")}
                ></div>
                <div
                  className={styles.color}
                  style={{ "--pos": "2", backgroundColor: "#0d0d0eff" }}
                  onClick={() => handleTheme("dark")}
                ></div>
                <div
                  className={styles.color}
                  style={{ "--pos": "3", backgroundColor: "#2c0c3c" }}
                  onClick={() => handleTheme("orchid")}
                ></div>
                <div
                  className={styles.color}
                  style={{ "--pos": "4", backgroundColor: "#f7d3d8ff" }}
                  onClick={() => handleTheme("rose")}
                ></div>
                <div
                  className={styles.color}
                  style={{ "--pos": "5", backgroundColor: "#003d29" }}
                  onClick={() => handleTheme("emerald")}
                ></div>
              </div>
            </div>
            <div
              className={styles.pic}
              style={{
                backgroundImage: user.avatarUrl ? `url(${user.avatarUrl})` : "",
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
            <h2>{user.username}</h2>
            <p>{user.bio}</p>
            <div className={styles.action}>
              <button onClick={onLogOut} className="btn">
                Log Out
              </button>
              <button onClick={handleEdit} className="btn">
                Edit Profile
              </button>
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
          <div className={`${styles.tab} ${tab === 1 ? styles.active : ""}`} ref={scrollRef}>
            {user.posts.length === 0 ? (
              <h3>No posts available</h3>
            ) : (
              user.posts.map((post) => (
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
            {user.comments.length === 0 ? (
              <h3>No comments yet.</h3>
            ) : (
              user.comments.map((comment) => (
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

export default Profile;