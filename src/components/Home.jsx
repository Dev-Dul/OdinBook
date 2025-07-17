import styles from "../styles/home.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/context";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Loader from "./Loader";
import Post from "./Post";

function Home(){
  const [tab, setTab] = useState(1);
    // const { user, userLoad } = useContext(AuthContext);

    // if(userLoad) return <Loader />;
    // if(!user) return <Navigate to={"/"} replace />
    
    function formatDate(date){
      const formatted = format(new Date(date), "h:mm a");
      return formatted;
    }

    function findMessage(id){
      const lastMessage = user.sentMessages.filter(message => message.recipientId === id).sort((a, b) => new Date(a.created) - new Date(b.created))[0];
      return lastMessage;
    }

    function handleTab(num){
      setTab(num);
    }

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Odinbook</h1>
        </div>
        <div className={styles.posts}>
          <div className={styles.nav}>
            <button onClick={() => handleTab(1)} style={{borderBottom: tab == 1 ? "2px solid" : ''}}>For You</button>
            <button onClick={() => handleTab(2)} style={{borderBottom: tab == 2 ? "2px solid" : ''}}>Your Circle</button>
          </div>
          <div className={styles.tabs}>
            <div className={`${styles.tab} ${tab === 1 ? styles.active : ''}`}>
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
            <div className={`${styles.tab} ${tab === 2 ? styles.active : ''}`}>
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home;