import '../public/styles/globals.css'
import {Playpen_Sans} from 'next/font/google'

const playpenSans = Playpen_Sans({
    subsets: ['latin'],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    display: 'swap',
    fallback: 'cursive',
})

function MyApp({ Component, pageProps }) {
    return ( 
        <main className={playpenSans.className}>
            <Component {...pageProps} />
        </main>
    )
}

export default MyApp