import styles from "./style.module.css"
import Link from "next/link"
import useLogout from "../../hooks/useLogout.js"
export default function DashboardFooter() {
    const logout = useLogout();
    return( 
        <footer className={styles.footer} role="footer">
        <div className={styles.footerContainer}>
          <>
            <div className={styles.sitemapContainer} role="navigation">
              <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
              <Link href="/settings" className={styles.navLink}>Settings</Link>
              <button onClick={logout} className={styles.navLink}>Logout</button>
            </div>
            <div className={styles.copyright}>
              <p className={styles.copyrightText}>&copy; 2025 Tiny Triumphs - All Rights Reserved. Icons by <a href="https://icons8.com/" target="_BLANK" aria-label="Icons8, Link to Icons8 Website">Icons8</a></p>
            </div>
          </>
        </div>
      </footer>
    )
}