import styles from "../styles/navbar.module.css";
import { Home, Search, FeatherIcon, User, UserPlus} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useScrollRef } from "../../utils/utils";
import { useEffect, useState } from "react";

function Navbar({ showNav, isMobile }){
    const navigate = useNavigate();
    const location = useLocation();
    const scrollRef = useScrollRef();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      let observerInterval;

      const tryAttachScroll = () => {
        const el = scrollRef?.current;
        if (!el) return;

        const handleScroll = () => {
          setIsScrolled(el.scrollTop > 0);
        };

        el.addEventListener("scroll", handleScroll);
        handleScroll();

        // Clear interval after success
        clearInterval(observerInterval);

        // Cleanup
        return () => {
          el.removeEventListener("scroll", handleScroll);
        };
      };

      observerInterval = setInterval(() => {
        if(scrollRef?.current) {
          tryAttachScroll();
        }
      }, 100); // Try every 100ms until attached

      // In case it never attaches
      setTimeout(() => clearInterval(observerInterval), 3000); // max wait 3s
    }, [scrollRef]);


    return (
        <div className={`${styles.navbar} ${(!showNav && isMobile) ? styles.show  : ''} ${isScrolled ? styles.scroll : ''}`}>
            <Home className={styles.icon} style={{ '--i': '1'}} onClick={() => navigate('/home')}/>
            <Search className={styles.icon} style={{ '--i': '2'}} onClick={() => navigate('/search')}/>
            <FeatherIcon className={styles.icon} style={{ '--i': '3'}} onClick={() => navigate('/new')}/>
            <UserPlus className={styles.icon} style={{ '--i': '4'}} onClick={() => navigate('/friends')}/>
            <User className={styles.icon} style={{ '--i': '5'}} onClick={() => navigate('/profile')}/>
        </div>
    )
}

export default Navbar;