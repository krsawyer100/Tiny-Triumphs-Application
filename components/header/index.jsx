import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import { useState } from "react"
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";

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

export default function Header(props) {
  const logout = useLogout();
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  return (
    
    <header className={styles.headerContainer}>
      <div className={styles.headerInfo}>
      <Link href="/">Self-Care 🧘‍♂️</Link>
      {props.isLoggedIn ? (
        <>
          <div className={styles.headerInfo}>
            <p>Welcome, {props.username}!</p>
            <Link href='/dashboard'>Dashboard</Link>
            <p onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </p>
          </div>
        </>
      ) : (
        <>
          <div className={styles.headerInfo}>
            <p>
              <Link href="/" className={styles.headerInfoLink}>Home</Link>
            </p>
            <p>
              <Link href="/login" className={styles.headerInfoLink}>Login</Link>
            </p>
          </div>
        </>
      )}
      </div>
    </header>
  );
}