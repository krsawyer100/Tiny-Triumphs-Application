import { useAccessibility } from './accessibilityContext'
import styles from './style.module.css'
import Image from 'next/image'
import { useState } from 'react'

export default function AccessibilityToggle() {
    const { highContrast, reduceMotion, toggleHighContrast, toggleReduceMotion } = useAccessibility()
    const [menuOpen, setMenuOpen] = useState(false)

    function toggleMenu() {
        if (menuOpen) {
            setMenuOpen(false)
          } else {
            setMenuOpen(true)
          }
    }

    return (
        <>
            <button className={styles.accessibilityBtn} onClick={toggleMenu}>
                <Image
                    src="/images/accessibility-btn.png"
                    alt="accessibility button logo"
                    width={40}
                    height={40}
                />
            </button>
            <div className={`${styles.accessibilityContainer} ${menuOpen ? styles.open : ""}`}>
                <h4>Accessibility Options</h4>

                <div className={styles.toggleRow}>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={highContrast} onChange={toggleHighContrast} />
                        <span className={styles.slider}></span>
                    </label>
                    <span>High Contrast Mode</span>
                </div>

                <div className={styles.toggleRow}>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={reduceMotion} onChange={toggleReduceMotion} />
                        <span className={styles.slider}></span>
                    </label>
                    <span>Reduce Motion</span>
                </div>
            </div>
        
        </>
    )
}