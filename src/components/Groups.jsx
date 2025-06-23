import styles from "../styles/groups.module.css";

function Groups(){
    return (
        <div className={styles.container}>
            <div className="header">
                <h1>Nests</h1>
            </div>
            <div className="texts">
                <h3>Welcome to TreeHouse's Chatrooms, Nests!</h3>
                <p className="sub">Click on anyone to join</p>
                <div className={styles.nests}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Groups;