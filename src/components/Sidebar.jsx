import { useState } from "react";
import styles from "../styles/sidebar.module.css";
import { Home, Search, Plus, FeatherIcon, User, UserPlus, Menu, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar(){
    const [collapse, setCollapse] = useState(true);
    // const navigate = useNavigate();
    const items = [
        { icon: <Home />, label: "Home", path: '/home' },
        { icon: <Search />, label: "Search", path: '/nests' },
        { icon: <FeatherIcon />, label: "Post", path: '/nests' },
        { icon: <UserPlus />, label: "Friends", path: '/friends' },
        { icon: <User />, label: "Profile", path: '/profile' },
    ]

    function handleCollapse(){
        setCollapse(prev => !prev);
    }

    return (
      <div className={`${styles.sidebar} ${collapse ? styles.collapsed : ''}`}>
        <div className="top">
          {collapse ? <h2>O</h2> : <h2>OdinBook</h2> }
        </div>
        <div className="middle">
          {items.map((item, index) => (
            <div className={styles.icon} key={index} 
              onClick={() => navigate(item.path)}
              style={{ borderBottom: location.pathname === item.path ? "2px solid" : '' }}>
              {item.icon}
              {!collapse && item.label}
            </div>
        ))}
        </div>
        <div className="bottom">
          <div className={`${styles.icon} ${styles.one}`} onClick={handleCollapse}>
          {!collapse ? <ArrowLeft />
           : <Menu />
          }
        </div>
        </div>
      </div>
    );
}

export default Sidebar;