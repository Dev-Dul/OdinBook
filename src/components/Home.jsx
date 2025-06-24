import styles from "../styles/home.module.css";

function Home(){
    const msgs = ['one', 'two', 'three'];
    return(
        <div className={styles.container}>
            <div className="header">
                <h1>TreeHouse</h1>
            </div>
            <div className={styles.messages}>
                {msgs.map((msg) => (
                    <div className={styles.preview}>
                        <h2>{msg}</h2>
                        <p>12:00 PM</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;