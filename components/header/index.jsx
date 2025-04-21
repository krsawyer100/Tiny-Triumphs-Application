import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import { useState, useEffect, useRef, use } from "react";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import Image from "next/image";
import useFocusTrap from "../../hooks/useFocusTrap";

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
  const [wasClosedByEscape, setWasClosedByEscape] = useState(false);

  const menuRef = useRef(null)
  const desktopDropdownRef = useRef(null)
  const mobileDropdownRef = useRef(null)
  const navMenuBtnRef = useRef(null)

  useFocusTrap(desktopDropdownRef, resourcesMenu)
  useFocusTrap(mobileDropdownRef, menuOpen && resourcesMenu)
 
  useEffect(() => {
    if (!menuOpen) return;
  
    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  
    const menu = menuRef.current;
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
  

  function toggleResourcesMenu() {
    setResourcesMenu((prev) => !prev);
  }

  function closeMenu() {
    setMenuClosing(true)
    setTimeout(() => {
      setMenuOpen(false)
      setMenuClosing(false)
      setResourcesMenu(false)
    }, 600)
  }

  function toggleMenu() {
    if (menuOpen) {
      closeMenu()
    } else {
      setMenuOpen(true)
    }
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        if (menuOpen || resourcesMenu) {
          closeMenu()
          setWasClosedByEscape(true);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [menuOpen, resourcesMenu])

  useEffect(() => {
    if (!menuOpen && wasClosedByEscape && navMenuBtnRef.current) {
      navMenuBtnRef.current.focus();
      setWasClosedByEscape(false);
    }
  }, [menuOpen, wasClosedByEscape]);

  return (
    <>
    <header className={styles.headerContainer}>
      <nav className={styles.headerInfo} role="navigation" aria-label="Primary">
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
        <div className={styles.desktopMenu} role="navigation">
          {props.isLoggedIn ? (
            <>
              <Link href="/about" className={styles.headerInfoLink}>
                  About
              </Link>

              <div className={styles.dropdownContainer} ref={desktopDropdownRef}>
                <button aria-label="Resources Dropdown Toggle" onClick={toggleResourcesMenu} className={styles.headerInfoLink} aria-haspopup="true" aria-expanded={resourcesMenu} aria-controls="resource-menu">
                  Resources {resourcesMenu ? "▲" : "▼"}
                </button>
                {resourcesMenu && (
                  <div className={styles.dropdownMenu}>
                    <Link href="/resources/mental-health" className={styles.dropdownItem} tabIndex={resourcesMenu ? 0 : -1}>
                      Mental Health Resources
                    </Link>
                    <Link href="/resources/physical-health" className={styles.dropdownItem} tabIndex={resourcesMenu ? 0 : -1}>
                      Physical Health Resources
                    </Link>
                    <Link href="/resources/self-care" className={styles.dropdownItem} tabIndex={resourcesMenu ? 0 : -1}>
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
                <Link href="/quiz" className={styles.quizBtn} aria-label="Link to our quiz">
                  Try Our Quiz
                </Link>
            </>
          ) : (
            <>
              <Link href="/about" className={styles.headerInfoLink}>
                  About
              </Link>

              <div className={styles.dropdownContainer} ref={desktopDropdownRef}>
                <button onClick={toggleResourcesMenu} className={styles.headerInfoLink} aria-label="Resources Dropdown Toggle" aria-haspopup="true" aria-expanded={resourcesMenu} aria-controls="resource-menu">
                  Resources {resourcesMenu ? "▲" : "▼"}
                </button>
                {resourcesMenu && (
                  <div className={styles.dropdownMenu} id="resources-menu">
                    <Link href="/resources/mental-health" className={styles.dropdownItem} tabIndex={resourcesMenu ? 0 : -1}>
                      Mental Health Resources
                    </Link>
                    <Link href="/resources/physical-health" className={styles.dropdownItem} tabIndex={resourcesMenu ? 0 : -1}>
                      Physical Health Resources
                    </Link>
                    <Link href="/resources/self-care" className={styles.dropdownItem} tabIndex={resourcesMenu ? 0 : -1}>
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
                <Link href="/quiz" className={styles.quizBtn} aria-label="Link to our quiz">
                  Try Our Quiz
                </Link>
            </>
          )}
        </div>
        <button className={`${styles.navMenuBtn} ${menuOpen ? styles.open : ""} ${menuClosing ? styles.close : ""}`} onClick={toggleMenu} aria-label="Toggle navigation menu" aria-expanded={menuOpen} aria-controls="mobile-menu" ref={navMenuBtnRef}>
            <div className={styles.lineOne}></div>
            <div className={styles.lineTwo}></div>
            <div className={styles.lineThree}></div>
        </button>
      </nav>
    </header>

    {(menuOpen || menuClosing) && (
        <div
          className={`${styles.backgroundOverlay} ${menuOpen ? styles.open : ""} ${
            menuClosing ? styles.close : ""
          }`}
          onClick={toggleMenu}
        />
      )}

      <div className={`${styles.menu} ${menuOpen ? styles.open : ""} ${menuClosing ? styles.close : "" }`} ref={menuRef} aria-modal="true" aria-hidden={!menuOpen}>
        <nav id="mobile-menu" role="navigation" aria-label="Mobile">
          <Link href="/about" className={styles.menuLink} onClick={toggleMenu} tabIndex={menuOpen ? 0 : -1}>About</Link>
          <div className={styles.menuDropdown} ref={mobileDropdownRef}>
            <button onClick={toggleResourcesMenu} className={styles.menuLink} aria-haspopup="true" aria-expanded={resourcesMenu} aria-controls="resources-menu-mobile" tabIndex={menuOpen ? 0 : -1} aria-label="Resources Dropdown Toggle">
                Resources {resourcesMenu ? "▲" : "▼"}
            </button>
            {resourcesMenu && (
              <div className={styles.menuDropdownMenu} id="resources-menu-mobile">
                  <Link href="/resources/mental-health" className={styles.dropdownMenuLink} onClick={toggleMenu} tabIndex={menuOpen && resourcesMenu ? 0 : -1}>Mental Health</Link>
                  <Link href="/resources/physical-health" className={styles.dropdownMenuLink} onClick={toggleMenu}tabIndex={menuOpen && resourcesMenu ? 0 : -1}>Physical Health</Link>
                  <Link href="/resources/self-care" className={styles.dropdownMenuLink} onClick={toggleMenu} tabIndex={menuOpen && resourcesMenu ? 0 : -1}>Self-care</Link>
              </div>
            )}
          </div>
          <Link href="/contact" className={styles.menuLink} onClick={toggleMenu} tabIndex={menuOpen ? 0 : -1}>Contact Us</Link>

          {props.isLoggedIn ? (
            <button onClick={() => { logout(); toggleMenu();}} tabIndex={menuOpen ? 0 : -1} className={styles.menuLink}>Logout</button>
          ):(
            <Link href="/login" className={styles.menuLink} onClick={toggleMenu} tabIndex={menuOpen ? 0 : -1}>Login/Signup</Link>
          )}
          <div className={styles.quizBtnContainer}>
            <p>Start your Journey Today with our Quiz:</p>
            <Link aria-label="Link to our quiz" href="/quiz" className={styles.quizBtn} onClick={toggleMenu} tabIndex={menuOpen ? 0 : -1}>Try Our Quiz!</Link>
          </div>
        </nav>
      </div>
    </>
  );
}