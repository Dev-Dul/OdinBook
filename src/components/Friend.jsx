import styles from "../styles/friends.module.css";
import { friendRequest } from "../../utils/fetch";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";

function Button({ status, friendId }){
  const { user } = useContext(AuthContext);

  async function handleRequests(status, friendId){
    const friendPromise = friendRequest(user.id, friendId, status);
    toast.promise(friendPromise, {
        loading: "Just a moment...",
        success: (response) => {
            if(response){
              return response.message;
            }
        },
        error: (error) => {
            return error.message;
        }
    })
  }

  if(status === "ACCEPTED"){
    return <button type="button" onClick={() => handleRequests("REMOVE", friendId)}>Unfriend</button>
  }else if(status === "PENDING"){
    return (
      <div>
        <button type="button"onClick={() => handleRequests("ACCEPT", friendId)}>Accept</button>
        <button type="button"onClick={() => handleRequests("REJECT", friendId)}>Rejected</button>
      </div>
    );
  }else{
    return (
      <button type="button" onClick={() => handleRequests("ADD", friendId)}>
        Add Friend
      </button>
    );
  }
}

function Friend({ friend, status = '' }){
    const { user } = useContext(AuthContext);
    
    async function handleRequests(status, friendId) {
      const friendPromise = friendRequest(user.id, friendId, status);
      toast.promise(friendPromise, {
        loading: "Just a moment...",
        success: (response) => {
          if (response) {
            return response.message;
          }
        },
        error: (error) => {
          return error.message;
        },
      });
    }


    return (
      <div className={styles.friend}>
        <div className={styles.head}>
          <div className={styles.pic}></div>
          <p className={styles.name}>{friend.username}</p>
        </div>
        <div className={styles.action}>
          <p className={styles.bio}>{friend.bio}</p>
          {status === '' ? (
            <button type="button" onClick={() => handleRequests("ADD", friend.id)}>Add Friend</button>
          ): (
            <Button status={status} friendId={friend.id}/>
          )}
        </div>
      </div>
    );
}

export default Friend;