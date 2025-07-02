import styles from "../styles/home.module.css";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home(){
    const { user } = useContext(AuthContext);
    if(!user) return <Navigate to={"/"} replace />

    console.log("friends:", user.friends);

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
              {user.friends.map((fr) => (
                <Link to={`/chats/${fr.friend.id}`}>
                  <div className={styles.preview} key={fr.friend.id}>
                    <h2>{fr.friend.name}</h2>
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