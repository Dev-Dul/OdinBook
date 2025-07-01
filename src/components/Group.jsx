import styles from "../styles/chat.module.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SendIcon } from "lucide-react";
import Error from "./Error";
import Loader from "./Loader";
import { joinGroup, useFetchGroup, sendGroupMessage } from "../../utils/fetch";

function Group(){
   const { nestId } = useParams();
   const { user } = useContext(AuthContext);
   const { group, error, loading, fetchGroup } = useFetchGroup();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
  //  console.log(nestId);

   useEffect(() => {
     fetchGroup(nestId);
     console.log("Messages:", group.Messages);
    }, [])
    
    if(loading) return <Loader />
    if(error) return <Error error={error} />
    console.log("group:", group);

   async function joinNest(){
      const joinPromise = await joinGroup(nestId, user.id);
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
      });
   }

   async function onSend(formData){
     const sendPromise = await sendGroupMessage(formData.msg, user.id, nestId)
      toast.promise(sendPromise, {
          loading: "Sending message...",
          success: (response) => {
              if(response){
                  fetchGroup(id);
                  return response.message;
              }
          },
          error: (error) => {
              return error.message;
          }
      })
   }

  //  const check = user.groups.find(group => group.user.id === user.id);
   const check = 1 == 2;
   console.log("user:", user);
  //  console.log("user groups:", user.groups);
    return (
      <div className={styles.container}>
        <div className={`header ${styles.groupHeader}`}>
          <h2>{group.name}</h2>
          {check ? <button onClick={joinNest}> Join Nest </button> : <button>Leave Nest</button> }
        </div>
        <div className={`${styles.chats} ${styles.two}`}>
          {group.Messages.map((msg) => (
            <div className={styles.chat}>
              <p>{msg.text}</p>
              <p className={styles.stamp}>{msg.time}</p>
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