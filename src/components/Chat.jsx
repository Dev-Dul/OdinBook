import styles from "../styles/chat.module.css";
import { useParams } from "react-router-dom";
import { useGetPrivateMessage, sendPrivateMessage } from "../../utils/fetch";
import { useForm } from "react-hook-form";
import { SendIcon } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../App";
import Bubble from "./Message";
import Error from "./Error";
import Loader from "./Loader";

function Chat(){
    const { friendId }  = useParams();
    const { user } = useContext(AuthContext);
    const { messages, error, loading, getPrivateMessage } = useGetPrivateMessage(friendId);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    if(loading) return <Loader />;
    if(error) return <Error error={error} />;

    async function onSend(formData){
        const msgPromise = await sendPrivateMessage(formData.text, user.id, friendId);
        toast.promise(msgPromise, {
          loading: "Sending message...",
          success: (response) => {
            if(response){
              getPrivateMessage(friendId);
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
                <h2>Chat</h2>
            </div>
            <div className={styles.chats}>
                {messages.map((message) => {
                    <Bubble key={message.id} id={message.id} message={message.text} date={message.date} />
                })}
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