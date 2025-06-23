import { useState } from "react";
import styles from "../styles/profile.module.css";

function Profile(){
    const [openEdit, setOpenEdit] = useState(false);

    function handleEdit(){
        setOpenEdit(prev => !prev);
    }

    return (
      <div className={styles.container}>
        {openEdit && (
          <div className={styles.overlay}>
            <form action="">
              <div className={styles.close} onClick={handleEdit}></div>
              <h2>Edit Profile</h2>
              <div className={styles.inputBox}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="bio">Bio</label>
                <textarea id="bio"></textarea>
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="profile">Profile Image</label>
                <input type="file" id="profile" accept="image/*" />
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="bg">Background Image</label>
                <input type="file" id="bg" accept="image/*" />
              </div>
            </form>
          </div>
        )}
        <div className={styles.header}>
          <h2>Profile</h2>
        </div>
        <div className={styles.imgs}>
          <div className={styles.bg}></div>
          <div className={styles.front}></div>
        </div>
        <div className={styles.bio}>
          <h2>Name</h2>
          <p>Email</p>
          <p>Date Joined</p>
          <p style={{ textAlign: "justify" }}>
            Bio: Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Possimus, iure itaque ullam ad tenetur exercitationem laudantium
            illum molestiae, maxime officia, cupiditate dolorum nesciunt eum?
            Velit delectus consequuntur, beatae modi ut est deserunt laudantium,
            amet, error aut facilis! Omnis nemo nobis, doloremque eos iusto
            possimus quisquam in, asperiores, quas assumenda vitae?
          </p>
          <button onClick={handleEdit}>Edit Profile</button>
        </div>
      </div>
    );
}

export default Profile;