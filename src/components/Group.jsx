import styles from "../styles/chat.module.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../utils/context";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SendIcon } from "lucide-react";
import { format } from "date-fns";
import Error from "./Error";
import Loader from "./Loader";
import { joinGroup, leaveGroup, useFetchGroup, sendGroupMessage } from "../../utils/fetch";

function Group(){
   const { nestId } = useParams();
   const { user } = useContext(AuthContext);
   const { group, error, loading, fetchGroup } = useFetchGroup();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   useEffect(() => {
     fetchGroup(nestId);
    }, [])
    
    if(loading) return <Loader />
    if(error) return <Error error={error} />

  function formatDate(date){
    return format(new Date(date), "d, MMM yyyy, h:mm a")
  }

   async function joinNest(){
      const joinPromise = joinGroup(nestId, user.id);
      toast.promise(joinPromise, {
        loading: "Joining nest...",
        success: (response) => {
          if(response){
            fetchGroup(nestId);
            return response;
          }
        },
        error: (error) => {
          return error.message;
        }
      });
   }

   async function leaveNest(){
      const leavePromise = leaveGroup(nestId, user.id);
      toast.promise(leavePromise, {
        loading: "Leaving nest...",
        success: (response) => {
          if(response){
            fetchGroup(nestId);
            return response;
          }
        },
        error: (error) => {
          return error.message;
        }
      });
   }

   async function onSend(formData){
     const sendPromise = sendGroupMessage(formData.msg, user.id, nestId)
      toast.promise(sendPromise, {
          loading: "Sending message...",
          success: (response) => {
              if(response){
                  fetchGroup(nestId);
                  return response.message;
              }
          },
          error: (error) => {
              return error.message;
          }
      })
   }

   const check = group.members.find(member => member.user.id === user.id);
    return (
      <div className={styles.container}>
        <div className={`header ${styles.groupHeader}`}>
          <h2>{group.name}</h2>
          {check ?  <button onClick={leaveNest}>Leave Nest</button> : <button onClick={joinNest}> Join Nest </button>}
        </div>
        <div className={`${styles.chats} ${styles.two}`}>
          {group.Messages.map((msg) => (
            <div className={styles.chat}>
              <p>{msg.text}</p>
              <p className={styles.author}>{msg.sender.username}</p>
              <p className={styles.stamp}>{formatDate(msg.created)}</p>
            </div>
          ))}
          {check ? (
            <form action="" onSubmit={handleSubmit(onSend)}>
              <textarea name="message" id="message" {...register("msg", {
                required: "Message can't be empty",
              })}></textarea>
              <button type="submit"><SendIcon /></button>
              {errors.msg && toast.error(errors.msg.message)}
            </form>
          ) : (
            <div className={styles.btm}>
              <h2>You need to be a member before you can send messages.</h2>
            </div>
          )}
        </div>
      </div>
    );
}

export default Group;