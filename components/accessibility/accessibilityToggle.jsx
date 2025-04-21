import { useAccessibility } from './accessibilityContext'
import styles from './style.module.css'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import useFocusTrap from '../../hooks/useFocusTrap'

export default function AccessibilityToggle() {
    const { highContrast, reduceMotion, dyslexiaFont, toggleHighContrast, toggleReduceMotion, toggleDyslexiaFont } = useAccessibility()
    const [menuOpen, setMenuOpen] = useState(false)

    const accessibilityMenu = useRef(null)

    function toggleMenu() {
        if (menuOpen) {
            setMenuOpen(false)
          } else {
            setMenuOpen(true)
          }
    }

    useFocusTrap(accessibilityMenu, menuOpen)

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Escape') setMenuOpen(false)
        }
        if (menuOpen) {
            document.addEventListener('keydown', handleKeyDown)
        } else {
            document.removeEventListener('keydown', handleKeyDown)
        }
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [menuOpen])

    return (
        <>
            <button className={styles.accessibilityBtn} onClick={toggleMenu} aria-label='Accessibility Options' aria-haspopup="true" aria-expanded={menuOpen} aria-controls='accessibility-menu'>
                <Image
                    src="/images/accessibility-btn.png"
                    alt="accessibility button logo"
                    width={40}
                    height={40}
                />
            </button>
            <div className={`${styles.accessibilityContainer} ${menuOpen ? styles.open : ""}`} ref={accessibilityMenu} role='menu' id='accessibility-menu' tabIndex={menuOpen ? 0 : -1} aria-hidden={!menuOpen}>
                <h4>Accessibility Options</h4>

                <div className={styles.toggleRow}>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={highContrast} onChange={toggleHighContrast} role="switch" aria-checked={highContrast} aria-label="Toggle high contrast mode"/>
                        <span className={styles.slider}></span>
                    </label>
                    <span>High Contrast Mode</span>
                </div>

                <div className={styles.toggleRow}>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={dyslexiaFont} onChange={toggleDyslexiaFont} role="switch" aria-checked={dyslexiaFont} aria-label="Toggle dyslexia-friendly font" tabIndex={0}/>
                        <span className={styles.slider}></span>
                    </label>
                    <span>Dyslexia-Friendly Font</span>
                </div>

                <div className={styles.toggleRow}>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={reduceMotion} onChange={toggleReduceMotion} role="switch" aria-checked={reduceMotion} aria-label="Toggle reduced motion" tabIndex={0}/>
                        <span className={styles.slider}></span>
                    </label>
                    <span>Reduce Motion</span>
                </div>
            </div>
        
        </>
    )
}