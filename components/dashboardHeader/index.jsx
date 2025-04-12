import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import { useState } from "react"
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import Image from "next/image";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({req}) {
      const user = req.session.user
      const props = {}
      if (user) {
          props.user = req.session.user
          props.isLoggedIn = true
      } else {
          props.isLoggedIn = false
      }
      return { props }
  },
  sessionOptions
)

export default function DashboardHeader({ username, profilePhoto}) {
  const logout = useLogout();
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuClosing, setMenuClosing] = useState(false)
  const finalProfilePhoto = profilePhoto?.startsWith('/uploads')
  ? profilePhoto
  : `/images/account-icon-blue.png`

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuClosing(true); // Start closing
      setTimeout(() => {
        setMenuOpen(false);
        setMenuClosing(false);
    }, 800);
  } else {
      setMenuOpen(true);
  }
    console.log("menu: ", menuOpen)
  }
  return (
    <>
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <Link href="/dashboard" className={styles.navLogo}>
          <Image
            src="/images/Logo-Icon.png"
            alt="Navigation link to dashboard"
            width={80}
            height={80}
            className={styles.navLogoIcon}
          />
        Tiny Triumphs Dashboard
        </Link>
        <div>
          <p className={styles.userGreeting}>Welcome, {username}</p>
          <button className={styles.navBtn} onClick={toggleMenu}>
            <Image
              src={finalProfilePhoto}
              alt="user navigation menu button"
              width={50}
              height={50}
              className={styles.navBtnImg}
            />
          </button>
        </div> 
      </div>
    </header>

    {(menuOpen || menuClosing) && ( <div className={`${styles.overlay} ${menuOpen ? styles.open : ''} ${menuClosing ? styles.close : ''}`} onClick={toggleMenu}></div>)}

    <div className={`${styles.navMenuContainer} ${menuOpen ? styles.open : ''} ${menuClosing ? styles.close : ''}`}>
      <nav> 
        <p><Link href="/settings" className={styles.navLink}>Account Settings</Link></p>
        <p><Link href="/dashboard" className={styles.navLink}>Dashboard</Link></p>
        <p onClick={logout} style={{cursor: "pointer"}} className={styles.navLink}>Logout</p>
      </nav>
    </div>
    </>
  );
}