import { useState } from "react";
import styles from "../styles/sidebar.module.css";
import { Home, Users, User, UserPlus, Menu, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar(){
    const [collapse, setCollapse] = useState(false);
    const navigate = useNavigate();
    const items = [
        { icon: <Home />, label: "Home", path: '/home' },
        { icon: <Users />, label: "Nests", path: '/nests' },
        { icon: <UserPlus />, label: "Friends", path: '/friends' },
        { icon: <User />, label: "Profile", path: '/profile' },
    ]

    function handleCollapse(){
        setCollapse(prev => !prev);
    }

    return (
      <div className={`${styles.sidebar} ${collapse ? styles.collapsed : ''}`}>
        <div className={`${styles.icon} ${styles.one}`} onClick={handleCollapse}>
          {!collapse ? <ArrowLeft />
           : <Menu />
          }
        </div>
        {items.map((item, index) => (
          <div className={styles.icon} key={index} onClick={() => navigate(item.path)}>
            {item.icon}
            {!collapse && item.label}
          </div>
        ))}
      </div>
    );
}

export default Sidebar;