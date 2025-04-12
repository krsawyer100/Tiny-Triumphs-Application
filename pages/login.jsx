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
            </Head>

            <Header 
                isLoggedIn={props.isLoggedIn}
            />
            <AccessibilityToggle />
            <main className={styles.main}>
                <div className={styles.loginContainer}>
                    <h2>Login Page</h2>
                    <form onSubmit={handleLogin} className={styles.form}>
                        <div>
                            <label htmlFor='username'>Username:</label>
                            <input 
                                type="text"
                                name='username'
                                id='username'
                                onChange={handleChange}
                                value={username}
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>Password:</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                onChange={handleChange}
                                value={password}   
                            />
                        </div>
                        {error && <p className={styles.error}>{error}</p>}
                        <button>Login</button>
                    </form>
                    <p>Don&apos;t have an account? <Link href="/signup" className={styles.link}>Sign up here!</Link></p>
                </div>
            </main>
            <Footer />
        </div>
    )

}