import styles from "../styles/newpost.module.css";
import { SendIcon, ImagePlus } from "lucide-react";
import { useState } from "react";

function NewPost(){
    const [openImage, setopenImage] = useState(false);

    function handleImage(){
        setopenImage(prev => !prev);
    }

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>New post</h1>
        </div>
        <div className={styles.body}>
          <form action="">
            <div className={styles.inputs}>
              <div className={styles.first}>
                <div className={styles.pic}></div>
                <textarea placeholder="Write something amazing...."></textarea>
              </div>
              {openImage && (
                <label htmlFor="Image">
                  Add Image:
                  <input type="file" accept="image/*" />
                </label>
              )}
            </div>
            <div className={styles.action}>
              <button onClick={handleImage} type="button"> 
                <ImagePlus />
              </button>
              <button>
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default NewPost;