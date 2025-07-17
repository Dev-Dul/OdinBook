import styles from "../styles/search.module.css"
import { Search } from "lucide-react";

function SearchPage(){
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Search</h2>
            </div>
            <form action="">
                <div className={styles.inputBox}>
                    <input type="search" placeholder="Search" />
                    <button type="submit"><Search /></button>
                </div>
            </form>
            <div className="results">

            </div>
        </div>
    )
}

export default SearchPage;