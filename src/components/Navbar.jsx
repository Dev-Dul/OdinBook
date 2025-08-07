import styles from "../styles/navbar.module.css";
import { Home, Search, FeatherIcon, User, UserPlus} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ScrollContext } from "../../utils/utils";
import { useEffect, useState, useContext } from "react";

function Navbar({ showNav, isMobile }){
    const navigate = useNavigate();
    const location = useLocation();
    const { isScrolling } = useContext(ScrollContext);
    


    return (
        <div className={`${styles.navbar} ${(!showNav && isMobile) ? styles.show  : ''} ${isScrolling ? styles.scroll : ''}`}>
            <Home className={styles.icon} style={{ '--i': '1'}} onClick={() => navigate('/home')}/>
            <Search className={styles.icon} style={{ '--i': '2'}} onClick={() => navigate('/search')}/>
            <FeatherIcon className={styles.icon} style={{ '--i': '3'}} onClick={() => navigate('/new')}/>
            <UserPlus className={styles.icon} style={{ '--i': '4'}} onClick={() => navigate('/friends')}/>
            <User className={styles.icon} style={{ '--i': '5'}} onClick={() => navigate('/profile')}/>
        </div>
    )
}

export default Navbar;