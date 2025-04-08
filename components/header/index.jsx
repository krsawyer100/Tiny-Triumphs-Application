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
        <Link href="/" className={styles.logoContainer}>
          <Image 
            src="/images/Logo-horizontal.png"
            alt=""
            width={200}
            height={100}
            className={styles.logo}
          />
        
        </Link>
        <div className={styles.desktopMenu}>
          {props.isLoggedIn ? (
            <>
              <p>
                <Link href="/about" className={styles.headerInfoLink}>
                  About
                </Link>
              </p>

              <div className={styles.dropdownContainer}>
                <p onClick={toggleResourcesMenu} className={styles.headerInfoLink}>
                  Resources ▼
                </p>
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

              <p>
                <Link href="/contact" className={styles.headerInfoLink}>
                  Contact
                </Link>
              </p>
              <p onClick={logout} style={{ cursor: "pointer" }} className={styles.headerInfoLink}>
                Logout
              </p>
              <p>
                <Link href="/quiz" className={styles.quizBtn}>
                  Try Our Quiz
                </Link>
              </p>
            </>
          ) : (
            <>
              <p>
                <Link href="/about" className={styles.headerInfoLink}>
                  About
                </Link>
              </p>

              <div className={styles.dropdownContainer}>
                <p onClick={toggleResourcesMenu} className={styles.headerInfoLink}>
                  Resources ▼
                </p>
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

              <p>
                <Link href="/contact" className={styles.headerInfoLink}>
                  Contact
                </Link>
              </p>
              <p>
                <Link href="/login" className={styles.headerInfoLink}>
                  Login
                </Link>
              </p>
              <p>
                <Link href="/quiz" className={styles.quizBtn}>
                  Try Our Quiz
                </Link>
              </p>
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
            <p onClick={toggleResourcesMenu} className={styles.menuLink}>
                Resources {resourcesMenu ? "▲" : "▼"}
            </p>
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
            <p onClick={() => { logout(); toggleMenu();}}>Logout</p>
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