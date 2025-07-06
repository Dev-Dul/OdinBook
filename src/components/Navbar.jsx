import styles from "../styles/navbar.module.css";
import { Home, Users, User, UserPlus} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar({ showNav, isMobile }){
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={`${styles.navbar} ${(!showNav && isMobile) ? styles.show  : ''}`}>
            <Home className={styles.icon} style={{ '--i': '0'}} onClick={() => navigate('/home')}/>
            <Users className={styles.icon} style={{ '--i': '1'}} onClick={() => navigate('/nests')}/>
            <UserPlus className={styles.icon} style={{ '--i': '2'}} onClick={() => navigate('/friends')}/>
            <User className={styles.icon} style={{ '--i': '3'}} onClick={() => navigate('/profile')}/>
        </div>
    )
}

export default Navbar;