import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import { useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import Image from "next/image";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);

export default function Header(props) {
  const logout = useLogout();
  const [resourcesMenu, setResourcesMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuClosing, setMenuClosing] = useState(false)

  function toggleResourcesMenu() {
    setResourcesMenu((prev) => !prev);
  }

  function toggleMenu() {
    if (menuOpen) {
      setMenuClosing(true)
      setTimeout(() => {
        setMenuOpen(false)
        setMenuClosing(false)
        setResourcesMenu(false)
      }, 600)
    } else {
      setMenuOpen(true)
    }
  }

  return (
    <>
    <header className={styles.headerContainer}>
      <div className={styles.headerInfo}>
        <Link href="/" className={styles.logoContainer} aria-label="Go to Homepage">
          <Image 
            src="/images/Logo-horizontal.png"
            alt="Tiny Triumphs Logo"
            width={200}
            height={100}
            className={styles.logo}
            priority
          />
        
        </Link>
        <div className={styles.desktopMenu}>
          {props.isLoggedIn ? (
            <>
              <Link href="/about" className={styles.headerInfoLink}>
                  About
              </Link>

              <div className={styles.dropdownContainer}>
                <button onClick={toggleResourcesMenu} className={styles.headerInfoLink}>
                  Resources ▼
                </button>
                {resourcesMenu && (
                  <div className={styles.dropdownMenu}>
                    <Link href="/resources/mental-health" className={styles.dropdownItem}>
                      Mental Health Resources
                    </Link>
                    <Link href="/resources/physical-health" className={styles.dropdownItem}>
                      Physical Health Resources
                    </Link>
                    <Link href="/resources/self-care" className={styles.dropdownItem}>
                      Self Care Resources
                    </Link>
                  </div>
                )}
              </div>

                <Link href="/contact" className={styles.headerInfoLink}>
                  Contact
                </Link>
                <button onClick={logout}  className={styles.headerInfoLink}>
                  Logout
                </button>
                <Link href="/quiz" className={styles.quizBtn}>
                  Try Our Quiz
                </Link>
            </>
          ) : (
            <>
              <Link href="/about" className={styles.headerInfoLink}>
                  About
              </Link>

              <div className={styles.dropdownContainer}>
                <button onClick={toggleResourcesMenu} className={styles.headerInfoLink}>
                  Resources ▼
                </button>
                {resourcesMenu && (
                  <div className={styles.dropdownMenu}>
                    <Link href="/resources/mental-health" className={styles.dropdownItem}>
                      Mental Health Resources
                    </Link>
                    <Link href="/resources/physical-health" className={styles.dropdownItem}>
                      Physical Health Resources
                    </Link>
                    <Link href="/resources/self-care" className={styles.dropdownItem}>
                      Self Care Resources
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/contact" className={styles.headerInfoLink}>
                  Contact
                </Link>
                <Link href="/login" className={styles.headerInfoLink}>
                  Login
                </Link>
                <Link href="/quiz" className={styles.quizBtn}>
                  Try Our Quiz
                </Link>
            </>
          )}
        </div>
        <div className={`${styles.navMenuBtn} ${menuOpen ? styles.open : ""} ${menuClosing ? styles.close : ""}`} onClick={toggleMenu}>
            <div className={styles.lineOne}></div>
            <div className={styles.lineTwo}></div>
            <div className={styles.lineThree}></div>
        </div>
      </div>
    </header>

    {(menuOpen || menuClosing) && (
        <div
          className={`${styles.backgroundOverlay} ${menuOpen ? styles.open : ""} ${
            menuClosing ? styles.close : ""
          }`}
          onClick={toggleMenu}
        />
      )}

      <div className={`${styles.menu} ${menuOpen ? styles.open : ""} ${menuClosing ? styles.close : "" }`}>
        <nav>
          <Link href="/about" className={styles.menuLink} onClick={toggleMenu}>About</Link>
          <div className={styles.menuDropdown}>
            <button onClick={toggleResourcesMenu} className={styles.menuLink}>
                Resources {resourcesMenu ? "▲" : "▼"}
            </button>
            {resourcesMenu && (
              <div className={styles.menuDropdownMenu}>
                  <Link href="/resources/mental-health" className={styles.dropdownMenuLink} onClick={toggleMenu}>Mental Health</Link>
                  <Link href="/resources/physical-health" className={styles.dropdownMenuLink} onClick={toggleMenu}>Physical Health</Link>
                  <Link href="/resources/self-care" className={styles.dropdownMenuLink} onClick={toggleMenu}>Self-care</Link>
              </div>
            )}
          </div>
          <Link href="/contact" className={styles.menuLink} onClick={toggleMenu}>Contact Us</Link>

          {props.isLoggedIn ? (
            <button onClick={() => { logout(); toggleMenu();}}>Logout</button>
          ):(
            <Link href="/login" className={styles.menuLink} onClick={toggleMenu}>Login/Signup</Link>
          )}
          <div className={styles.quizBtnContainer}>
            <p>Start your Journey Today with our Quiz:</p>
            <Link href="/quiz" className={styles.quizBtn} onClick={toggleMenu}>Try Our Quiz!</Link>
          </div>
        </nav>
      </div>
    </>
  );
}