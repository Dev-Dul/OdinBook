import styles from "../styles/chat.module.css";

function Chat(){
    return (
        <div className={styles.container}>
            <div className="header">
                <h2>Chat</h2>
            </div>
            <div className={styles.chats}>
                <form action="">
                    <textarea name="message" id="message"></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat;