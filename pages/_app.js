import '../public/styles/globals.css'
import {Playpen_Sans} from 'next/font/google'
import { AccessibilityProvider, useAccessibility } from '../components/accessibility/accessibilityContext'
import { useEffect } from 'react'

const playpenSans = Playpen_Sans({
    subsets: ['latin'],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    display: 'swap',
})

function AppInner({ Component, pageProps }) {
    const { highContrast, reduceMotion, dyslexiaFont } = useAccessibility()

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.body.classList.toggle('high-contrast', highContrast)
            document.body.classList.toggle('reduce-motion', reduceMotion)
            document.body.classList.toggle('dyslexia-font', dyslexiaFont)
        }
    }, [highContrast, reduceMotion, dyslexiaFont])

    return (
        <main>
            <Component {...pageProps} />
        </main>
    )
}

function MyApp({ Component, pageProps }) {
    return (
        <AccessibilityProvider>
            <main>
                <AppInner Component={Component} pageProps={pageProps} />
            </main>
        </AccessibilityProvider>
    )
}

export default MyApp