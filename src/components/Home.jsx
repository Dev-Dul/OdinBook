import styles from "../styles/home.module.css";
import { useContext } from "react";
import { AuthContext } from "../App";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home(){
    const { user } = useContext(AuthContext);
    if(!user) return <Navigate to={"/"} replace />


    return (
      <div className={styles.container}>
        <div className="header">
          <h1>TreeHouse</h1>
        </div>
        <div className={styles.messages}>
          {user.friends.length === 0 ? (
            <h2>
              You have no friend yet,{" "}
              <Link to={"/friends"}>Add Some Friends</Link> to start chatting.
            </h2>
          ) : (
            <div>
              {user.friends.map((friend) => (
                <Link to={`/chats/${friend.id}`}>
                  <div className={styles.preview}>
                    <h2>{friend.name}</h2>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
}

export default Home;