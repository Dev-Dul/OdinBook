import styles from "../styles/profile.module.css";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";
import { updateProfile, logOut } from "../../utils/fetch";
import { useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Loader from "./Loader";

function Profile(){
    const { user, userLoad, handleUser } = useContext(AuthContext);
    const [openEdit, setOpenEdit] = useState(false);
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    if(userLoad) return <Loader />;
    if(!user) return <Navigate to={"/"} />;

    function handleEdit(){
        setOpenEdit(prev => !prev);
    }


    async function onUpdate(data){
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("username", data.username);
      formData.append("email", data.email);
      if(data.bio) formData.append("bio", data.bio);
      if(data.profilePic[0]) formData.append("profilePic", data.profilePic[0]);
      if(data.backgroundPic[0]) formData.append("backgroundPic", data.backgroundPic[0]);
        
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

    return(
      <div className={styles.container}>
        {openEdit && (
          <div className={styles.overlay}>
            <form action="" onSubmit={handleSubmit(onUpdate)}>
              <div className={styles.close} onClick={handleEdit}></div>
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
                {errors.username && <p className={styles.error}>{errors.username.message}</p>}
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  {...register("email", {
                    required: "Email is required", })}
                />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
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
              {errors.bio && <p className={styles.error}>{errors.bio.message}</p>}
              <div className={styles.inputBox}>
                <label htmlFor="profile">Profile Image</label>
                <input type="file" id="profile" accept="image/*" {...register("profilePic", {
                  validate: (files) => {
                    if(files.length === 0) return true;
                    const file = files[0];
                    const isSmall = file.size <= 2 * 1024 * 1024;
                    if(!isSmall) return "File size must not exceed 2MB";

                    return true;
                  }
                })} />
                {errors.profilePic && <p className={styles.error}>{errors.profilePic.message}</p>}
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="bg">Background Image</label>
                <input type="file" id="bg" accept="image/*" {...register("backgroundPic", {
                  validate: (files) => {
                    if(files.length === 0) return true;
                    const file = files[0];
                    const isSmall = file.size <= 2 * 1024 * 1024;
                    if(!isSmall) return "File size must not exceed 2MB";

                    return true;
                  }
                })}/>
                {errors.backgroundPic && <p className={styles.error}>{errors.backgroundPic.message}</p>}
              </div>
              <button type="submit">Update</button>
            </form>
          </div>
        )}
        <div className="header">
          <h1>Profile</h1>
        </div>
        <div className={styles.imgs}>
          <div className={styles.bg} style={{ backgroundImage: `url(${user.backgrd})`}}></div>
          <div className={styles.front} style={{ backgroundImage: `url(${user.profile})`}}></div>
        </div>
        <div className={styles.bio}>
          <h2>{user.name}</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p style={{ textAlign: "justify" }}>Bio: {user.bio}</p>
          <div className={styles.action}>
            <button onClick={onLogOut}>Log Out</button>
            <button onClick={handleEdit}>Edit Profile</button>
          </div>
        </div>
      </div>
    );
}

export default Profile;