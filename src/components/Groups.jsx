import styles from "../styles/groups.module.css";
import { useFetchGroups } from "../../utils/fetch";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";

function Groups(){
    const { groups, error, loading, fetchGroups } = useFetchGroups();

    useEffect(() => {
        fetchGroups();
    }, []);

    if(loading) return <Loader />
    if(error) return <Error error={error} />;

    return (
        <div className={styles.container}>
            <div className="header">
                <h1>Nests</h1>
            </div>
            <div className="texts">
                <h3>Welcome to TreeHouse's Chatrooms, Nests!</h3>
                <p className="sub">Click on anyone to join.</p>
                <div className={styles.nests}>
                    {groups.map((group) => (
                        <Link to={`/nests/${group.name}/${group.id}`}>
                            <div key={group.id}>
                                <h2>{group.name}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Groups;