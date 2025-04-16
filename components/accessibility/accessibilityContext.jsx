import { createContext, useContext, useEffect, useState } from 'react'

const AccessibilityContext = createContext()

export const AccessibilityProvider = ({ children }) => {
    const [highContrast, setHighContrast] = useState(false)
    const [reduceMotion, setReduceMotion] = useState(false)
    const [dyslexiaFont, setDyslexiaFont] = useState(false)

    useEffect(() => {
        const contrast = localStorage.getItem('highContrast') === 'true'
        const motion = localStorage.getItem('reduceMotion') === 'true'
        const font = localStorage.getItem('dyslexiaFont') === 'true'

        setHighContrast(contrast)
        setReduceMotion(motion)
        setDyslexiaFont(font)
    }, [])

    useEffect(() => {
        localStorage.setItem('highContrast', highContrast)
        localStorage.setItem('reduceMotion', reduceMotion)
        localStorage.setItem('dyslexiaFont', dyslexiaFont)
    }, [highContrast, reduceMotion, dyslexiaFont])

    const toggleHighContrast = () => setHighContrast(prev => !prev)
    const toggleReduceMotion = () => setReduceMotion(prev => !prev)
    const toggleDyslexiaFont = () => setDyslexiaFont(prev => !prev)

    return (
        <AccessibilityContext.Provider value={{
            highContrast,
            reduceMotion,
            dyslexiaFont,
            toggleHighContrast,
            toggleReduceMotion,
            toggleDyslexiaFont
        }}>
            {children}
        </AccessibilityContext.Provider>
    )
}

export const useAccessibility = () => useContext(AccessibilityContext)