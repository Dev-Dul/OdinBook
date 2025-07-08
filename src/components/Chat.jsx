import styles from "../styles/chat.module.css";
import { Navigate, useParams } from "react-router-dom";
import { useGetPrivateMessage, sendPrivateMessage } from "../../utils/fetch";
import { useForm } from "react-hook-form";
import { SendIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../utils/context";
import { format } from "date-fns";
import { toast } from "sonner"
import Bubble from "./Message";
import Error from "./Error";
import Loader from "./Loader";

function Chat(){
    const { friendId }  = useParams();
    const { user, userLoad } = useContext(AuthContext);
    const { messages, error, loading, getPrivateMessage } = useGetPrivateMessage();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    
    useEffect(() => {
        if(user){
            getPrivateMessage(user.id);
        }
    }, [user]);
    
    if(loading || userLoad) return <Loader />;
    if(!user) return <Navigate to={'/'}/>
    if(error) return <Error error={error} />;
    
    const friend = user?.friends?.find(f => f.friend.id === Number(friendId));

    function formatDate(date){
        return format(new Date(date), "d, MMM yyyy, h:mm a")
    }


    async function onSend(formData){
        const msgPromise = sendPrivateMessage(formData.text, user.id, friendId);
        toast.promise(msgPromise, {
          loading: "Sending message...",
          success: (response) => {
            if(response){
              getPrivateMessage(user.id);
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
                <h2>{friend.friend.name}</h2>
            </div>
            <div className={styles.chats}>
                {messages.map((message) => (
                    <Bubble key={message.id} id={message.id} message={message.text} date={formatDate(message.created)} />
                ))}
                <form action="" onSubmit={handleSubmit(onSend)}>
                    <textarea name="message" id="message" {...register("text", {
                        required: "Message cannot be empty."
                    })}></textarea>
                    <button type="submit"><SendIcon /></button>
                    {errors.text && toast.error(errors.text.message)}
                </form>
            </div>
        </div>
    )
}

export default Chat;