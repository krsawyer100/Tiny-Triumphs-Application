import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import { useState } from "react"

export default function Header() {
  const logout = useLogout();
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  return (
    
    <header className={styles.headerContainer}>
      <div className={styles.headerInfo}>
      <Link href="/">Tiny Triumphs 🧘‍♂️</Link>
        <>
          <div className={styles.headerInfo}>
            <p>
              <Link href="/about" className={styles.headerInfoLink}>About</Link>
            </p>
            <p>
              <Link href="/resources" className={styles.headerInfoLink}>Resources</Link>
            </p>
            <p>
              <Link href="/contact" className={styles.headerInfoLink}>Contact</Link>
            </p>
            <p>
              <Link href="/login" className={styles.headerInfoLink}>Login</Link>
            </p>
            <p>
              <Link href="/quiz" className={styles.headerInfoLink}>Try Our Quiz</Link>
            </p>
          </div>
        </>
      </div>
    </header>
  );
}