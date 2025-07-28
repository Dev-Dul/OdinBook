import styles from "../styles/newpost.module.css";
import { SendIcon, ImagePlus } from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../../utils/context";
import { useForm } from "react-hook-form";
import { sendNewPost } from "../../utils/fetch";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loader from "./Loader";

function NewPost(){
    const { user, userLoad } = useContext(AuthContext);
    const [openImage, setopenImage] = useState(false);
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    function handleImage(){
        setopenImage(prev => !prev);
    }

    if(userLoad) return <Loader />;
    if(!user) return <Navigate to={"/"} />;

    async function onSubmit(data){
          const formData = new FormData();
          formData.append("userId", user.id);
          formData.append("text", data.post);
          if(data.picUrl && data.picUrl.length > 0) formData.append("picUrl", data.picUrl[0]);
          const sendPromise = sendNewPost(formData);
          toast.promise(sendPromise, {
              loading: "Just a moment...",
              success: (response) => {
                  if(response){
                    navigate("/home");
                    return response.message;
                  }
              },
              error: (error) => {
                  return error.message;
              }
          })
      }

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>New post</h1>
        </div>
        <div className={styles.body}>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
              <div className={styles.first}>
                <div className={styles.pic}></div>
                <textarea
                  placeholder="Write something amazing...."
                  {...register("post", {
                    required: "Post cannot be empty!",
                    maxLength: {
                      value: 350,
                      message: "Post length cannot exceed 350 characters.",
                    },
                  })}
                ></textarea>
                {errors.post && <p className={styles.error}>{errors.post.message}</p>}
              </div>
              {openImage && (
                <label htmlFor="Image">
                  Add Image:
                  <input
                    type="file"
                    accept="image/*"
                    {...register("picUrl", {
                      validate: (files) => {
                        if(files.length === 0) return true;
                        const file = files[0];
                        const isSmall = file.size <= 2 * 1024 * 1024;
                        if(!isSmall) return "File size must not exceed 2MB";

                        return true;
                      },
                    })}
                  />
                {errors.picUrl && <p className={styles.error}>{errors.picUrl.message}</p>}
                </label>
              )}
            </div>
            <div className={styles.action}>
              <button onClick={handleImage} type="button" className="btn">
                <ImagePlus />
              </button>
              <button className="btn">
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default NewPost;