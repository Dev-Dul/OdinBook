import styles from "../styles/chat.module.css";
import { joinGroup, useFetchGroup } from "../../utils/fetch";
import { useContext } from "react";
import { AuthContext } from "../App";
import { toast } from "sonner";

function Group({ id }){
   const { user } = useContext(AuthContext);
   const { group, error, loading, fetchGroup } = useFetchGroup(id);

   if(loading) return <Loader />
   if(error) return <Error />

   async function joinNest(){
      const joinPromise = await joinGroup(id, user.id);
      toast.promise(joinPromise, {
        loading: "Joining nest...",
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

   const check = user.groups.find(group => group.id === id);
    return (
      <div className={styles.container}>
        <div className={`header ${styles.groupHeader}`}>
          <h2>Group</h2>
          {check ? <button onClick={joinNest}> Join Nest </button> : <button>Leave Nest</button> }
        </div>
        <div className={`${styles.chats} ${styles.two}`}>
          {group.messages.map((msg) => (
            <div className={styles.chat}>
              <p>{msg.text}</p>
              <p className={styles.stamp}>{msg.time}</p>
            </div>
          ))}
          {check ? (
            <form action="">
              <textarea name="message" id="message"></textarea>
              <button type="submit">Send</button>
            </form>
          ) : (
            <div>
              <h2>You need to be a member before you can send messages.</h2>
            </div>
          )}
        </div>
      </div>
    );
}

export default Group;