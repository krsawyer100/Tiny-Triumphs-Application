import styles from "./style.module.css";
import Link from "next/link";

export default function Footer() {

  return (
    
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <>
          <div className={styles.sitemapContainer}>
            <Link href="/about" className={styles.navLink}>About</Link>
            <Link href="/resources/mental-health" className={styles.navLink}>Resources</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
            <Link href="/login" className={styles.navLink}>Login</Link>
            <Link href="/quiz" className={styles.navLink}>Try Our Quiz</Link>
          </div>
          <div className={styles.copyright}>
            <p className={styles.copyrightText}>&copy; 2025 Tiny Triumphs - All Rights Reserved. Icons by <a href="https://icons8.com/" target="_BLANK">Icons8</a></p>
          </div>
        </>
      </div>
    </footer>
  );
}