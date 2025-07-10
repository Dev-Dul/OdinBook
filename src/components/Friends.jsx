import styles from "../styles/friends.module.css";
import { useGetAllUsers, addFriend } from "../../utils/fetch";
import { useNavigate, Navigate } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";
import { useEffect, useContext } from "react";
import { toast } from "sonner";
import { AuthContext } from "../../utils/context";


function Friends(){
    const navigate = useNavigate();
    const { user, userLoad } = useContext(AuthContext);
    const { users, error, loading, getAllUsers } = useGetAllUsers();

    
    
    useEffect(() => {
      if(user){
        getAllUsers();
      }
    }, [user])
    
    if(loading || userLoad) return <Loader />
    if(!user) return <Navigate to={'/'}/>
    if(error) return <Error error={error} />


    async function friendPlus(id){
      if (!user || !user.id){
        toast.error("User not authenticated.");
        return;
      }
      const friendPromise = addFriend(user.id, id);
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
          {users.map((friend) => (
            <div className={styles.friend} key={friend.id}>
              <div className={styles.text}>
                <h3>{friend.name}</h3>
                <p>{friend.username}</p>
                <p>Online</p>
              </div>
              <div className={styles.action}>
                <button onClick={() => {friendPlus(friend.id)}}>Add Friend</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Friends;