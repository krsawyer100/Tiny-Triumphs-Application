import { createContext, useContext, useEffect, useState } from 'react'

const AccessibilityContext = createContext()

export const AccessibilityProvider = ({ children }) => {
    const [highContrast, setHighContrast] = useState(false)
    const [reduceMotion, setReduceMotion] = useState(false)

    useEffect(() => {
        const contrast = localStorage.getItem('highContrast') === 'true'
        const motion = localStorage.getItem('reduceMotion') === 'true'

        setHighContrast(contrast)
        setReduceMotion(motion)
    }, [])

    useEffect(() => {
        localStorage.setItem('highContrast', highContrast)
        localStorage.setItem('reduceMotion', reduceMotion)
    }, [highContrast, reduceMotion])

    const toggleHighContrast = () => setHighContrast(prev => !prev)
    const toggleReduceMotion = () => setReduceMotion(prev => !prev)

    return (
        <AccessibilityContext.Provider value={{
            highContrast,
            reduceMotion,
            toggleHighContrast,
            toggleReduceMotion
        }}>
            {children}
        </AccessibilityContext.Provider>
    )
}

export const useAccessibility = () => useContext(AccessibilityContext)