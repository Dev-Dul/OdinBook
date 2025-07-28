import styles from "../styles/friends.module.css";
import { useGetAllUsers, addFriend } from "../../utils/fetch";
import { useNavigate, Navigate } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";
import { useEffect, useContext, useState } from "react";
import { toast } from "sonner";
import { AuthContext } from "../../utils/context";
import Friend from "./Friend";


function Friends(){
    const navigate = useNavigate();
    const { user, userLoad } = useContext(AuthContext);
    const [tab, setTab] = useState(1);
    const { users, error, loading, getAllUsers } = useGetAllUsers();

    useEffect(() => {
        console.log(user);
        getAllUsers();
    }, []);


    
    if(userLoad) return <Loader />
    if(!user) return <Navigate to={'/'} replace/>
    if(loading) return <Loader />
    if(error) return <Error error={error} />

    async function friendPlus(id){
      if(!user || !user.id){
        toast.error("User not authenticated.");
        return;
      }

      const friendPromise = addFriend(user.id, id);
      toast.promise(friendPromise, {
        loading: "Adding friend...",
        success: (response) => {
          if(response){
            navigate("/home");
            return response.message;
          }
        },
        error: (error) => {
          return error.message;
        },
      });
    }

    function handleTab(num){
      setTab(num);
    }

    const pending = user.friends.filter(friend => friend.status === "PENDING");
    const accepted = user.friends.filter(friend => friend.status === "ACCEPTED");
    const rejected = user.friends.filter(friend => friend.status === "REJECTED");

    
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Friends</h1>
        </div>
        <div className={styles.friends}>
          <div className={styles.nav}>
            <button
              onClick={() => handleTab(1)}
              style={{ borderBottom: tab === 1 ? "2px solid" : "" }}
            >
              All
            </button>
            <button
              onClick={() => handleTab(2)}
              style={{ borderBottom: tab === 2 ? "2px solid" : "" }}
            >
              Friends
            </button>
            <button
              onClick={() => handleTab(3)}
              style={{ borderBottom: tab === 3 ? "2px solid" : "" }}
            >
              Pending
            </button>
            <button
              onClick={() => handleTab(4)}
              style={{ borderBottom: tab === 4 ? "2px solid" : "" }}
            >
              Rejected
            </button>
          </div>
          <div className={`${styles.tab} ${tab === 1 ? styles.active : ""}`}>
            {users.length === 0 ? (
              <h2>No users available</h2>
            ) : (
              users.map((user) => (
                <Friend id={user.id} key={user.id} friend={user} />
              ))
            )}
          </div>
          <div className={`${styles.tab} ${tab === 2 ? styles.active : ""}`}>
            {accepted.length === 0 ? (
              <h2>No accepted friend request available.</h2>
            ) : (
              accepted.map((user) => (
                <Friend id={user.id} key={user.id} friend={user.owner} status={user.status}/>
              ))
            )}
          </div>
          <div className={`${styles.tab} ${tab === 3 ? styles.active : ""}`}>
            {pending.length === 0 ? (
              <h2>No pending friend request available.</h2>
            ) : (
              pending.map((user) => (
                <Friend id={user.id} key={user.id} friend={user.owner} status={user.status}/>
              ))
            )}
          </div>
          <div className={`${styles.tab} ${tab === 4 ? styles.active : ""}`}>
            {rejected.length === 0 ? (
              <h2>No rejected friend request available.</h2>
            ) : (
              rejected.map((user) => (
                <Friend id={user.id} key={user.id} friend={user.owner} status={user.status}/>
              ))
            )}
          </div>
        </div>
      </div>
    );
}

export default Friends;