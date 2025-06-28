import styles from "../styles/friends.module.css";
import { getAllUsers, addFriend } from "../../utils/fetch";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";

function Friends(){
    const navigate = useNavigate();
    const { users, error, loading } = getAllUsers();

    if(loading) return <Loader />
    if(error) return <Error error={error} />

    async function friendPlus(id){
      const friendPromise = await addFriend(id);
      toast.promise(friendPromise, {
        loading: "Adding friend...",
        success: (response) => {
          if(response){
            navigate("/home");
            return response.message;
          }
        },
        error: (error) => {
          return error.message;
        },
      });
    }
    
    return (
      <div className={styles.container}>
        <div className="header">
          <h1>Find Friends</h1>
        </div>
        <div className={styles.friends}>
          {users.map((user) => {
            <div className={styles.friend}>
              <div className={styles.text}>
                <h3>{user.name}</h3>
                <p>{user.date}</p>
                <p>Online</p>
              </div>
              <div className={styles.action}>
                <button onClick={() => friendPlus(user.id)}>Add Friend</button>
              </div>
            </div>;
          })}
        </div>
      </div>
    );
}

export default Friends;