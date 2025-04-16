import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import { useState, useRef, useEffect } from "react"
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import Image from "next/image";
import useFocusTrap from "../../hooks/useFocusTrap"

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
  const [wasClosedByEscape, setWasClosedByEscape] = useState(false)
  const navMenuRef = useRef(null)
  const navMenuBtnRef = useRef(null)
  const finalProfilePhoto = profilePhoto?.startsWith('/uploads')
  ? profilePhoto
  : `/images/account-icon-blue.png`

  useEffect(() => {
    if (!menuOpen) return;
  
    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  
    const menu = navMenuRef.current;
    const toggleBtn = navMenuBtnRef.current;
    if (!menu || !toggleBtn) return;
  

    const menuItems = Array.from(menu.querySelectorAll(focusableSelector));
  
    const focusables = [toggleBtn, ...menuItems];
  
    const firstEl = focusables[0];
    const lastEl = focusables[focusables.length - 1];
  
    function handleTab(e) {
      if (e.key !== 'Tab') return;
  
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  
    firstEl?.focus();
    document.addEventListener('keydown', handleTab);
  
    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, [menuOpen]);
  useEffect(() => {
    function handleKeyDown(e) {
      if (menuOpen) {
        if (e.key === "Escape") {
          setMenuClosing(true);
          setWasClosedByEscape(true);
          setTimeout(() => {
            setMenuOpen(false);
            setMenuClosing(false);
          }, 800);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen && wasClosedByEscape && navMenuBtnRef.current) {
      navMenuBtnRef.current.focus();
      setWasClosedByEscape(false);
    }
  }, [menuOpen, wasClosedByEscape]);
  const toggleMenu = () => {
    if (menuOpen) {
      setMenuClosing(true);
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
          <button className={styles.navBtn} onClick={toggleMenu} ref={navMenuBtnRef}>
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

    <div className={`${styles.navMenuContainer} ${menuOpen ? styles.open : ''} ${menuClosing ? styles.close : ''}`} ref={navMenuRef}>
      <nav className={styles.navMenu}> 
        <Link href="/settings" className={styles.navLink} tabIndex={menuOpen ? 0 : -1}>Account Settings</Link>
        <Link href="/dashboard" className={styles.navLink} tabIndex={menuOpen ? 0 : -1}>Dashboard</Link>
        <button onClick={logout} style={{cursor: "pointer"}} className={styles.navLink} tabIndex={menuOpen ? 0 : -1}>Logout</button>
      </nav>
    </div>
    </>
  );
}