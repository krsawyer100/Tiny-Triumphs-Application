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

  function toggleResourcesMenu() {
    setResourcesMenu((prev) => !prev);
  }

  return (
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
        <div className={styles.headerInfo}>
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
              <p onClick={logout} style={{ cursor: "pointer" }}>
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
      </div>
    </header>
  );
}