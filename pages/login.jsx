import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { withIronSessionSsr } from 'iron-session/next'
import sessionOptions from '../config/session'
import Header from "../components/header"
import Footer from '../components/footer'
import useLogout from "../hooks/useLogout"
import styles from "../public/styles/Login.module.css"
import AccessibilityToggle from '../components/accessibility/accessibilityToggle'

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user
        const props = {}
        if (user) {
            props.user = req.session.user
            props.isLoggedIn = true
        } else {
            props.isLoggedIn = false
        }

        return { props }
    },
    sessionOptions
)

export default function Login(props) {
    const router = useRouter()
    const logout = useLogout() 
    const [{ username, password }, setForm] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState("")

    function handleChange(e) {
        setForm({ username, password, ... { [e.target.name]: e.target.value }})
    }

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            if (res.status === 200) {
                return router.push("/dashboard")
            }
            const { error: message } = await res.json()
            setError(message)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <Head>
                <title>Login</title>
                <link rel="preload" as="image" href="/images/form-background.webp" />
            </Head>

            <Header 
                isLoggedIn={props.isLoggedIn}
            />
            <AccessibilityToggle />
            <main className={styles.main}>
                <div className={styles.loginContainer}>
                    <h2>Login</h2>
                    <form onSubmit={handleLogin} className={styles.form} role='form' aria-label='login to your account'>
                        <div>
                            <label htmlFor='username'>Username:</label>
                            <input 
                                type="text"
                                name='username'
                                id='username'
                                onChange={handleChange}
                                value={username}
                                aria-describedby='usernameDescription' 
                            />
                            <small id="usernameDescription" aria-hidden="true" style={{ fontSize: "12px", marginTop: "5px", display: "none" }}>Please enter your account username</small>
                        </div>
                        <div>
                            <label htmlFor='password'>Password:</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                onChange={handleChange}
                                value={password}  
                                aria-describedby='passwordDescription' 
                            />
                            <small id="passwordDescription" aria-hidden="true" style={{ fontSize: "12px", marginTop: "5px", display: "none" }}>Please enter your account password</small>
                        </div>
                        {error && <p className={styles.error} role='alert' aria-live="assertive">{error}</p>}
                        <button aria-label='Login to your account'>Login</button>
                    </form>
                    <p>Don&apos;t have an account? <Link href="/signup" className={styles.link} aria-label='Create an account here'>Sign up here!</Link></p>
                </div>
            </main>
            <Footer />
        </div>
    )

}