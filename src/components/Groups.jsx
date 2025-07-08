import styles from "../styles/groups.module.css";
import { useFetchGroups } from "../../utils/fetch";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";
import { AuthContext } from "../../utils/context";

function Groups(){
    const { user, userLoad } = useContext(AuthContext);
    const { groups, error, loading, fetchGroups } = useFetchGroups();

    useEffect(() => {
        if(user){
            fetchGroups();
        }
    }, [user]);

    if(loading || userLoad) return <Loader />;
    if(!user) return <Navigate to={"/"} />;
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