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

export default function DashboardHeader(props) {
  const logout = useLogout();
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  return (
    
    <header>
      <div>
        <Link href="/dashboard">Tiny Triumphs Dashboard</Link>
        <div>
          <p>Welcome, {props.username}</p>
          <nav>
            <Link href="/settings">Account Settings</Link>
            <p onClick={logout} style={{ cursor: "pointer" }}>Logout</p>
          </nav>
        </div> 
      </div>
    </header>
  );
}