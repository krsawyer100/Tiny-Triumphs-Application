import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { withIronSessionSsr } from 'iron-session/next'
import sessionOptions from '../config/session'
import Header from '../components/header'
import useLogout from "../hooks/useLogout"

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

            <Header/>

            <main>
                <div>
                    <h1>Login Page</h1>
                    <form onSubmit={handleLogin}>
                        <label htmlFor='username'>Username:</label>
                        <input 
                            type="text"
                            name='username'
                            id='username'
                            onChange={handleChange}
                            value={username}
                        />
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            onChange={handleChange}
                            value={password}   
                        />
                        {error && <p>{error}</p>}
                        <button>Login</button>
                    </form>
                    <Link href="/signup">
                        <p>Don&apos;t have an account? Sign up here!</p>
                    </Link>
                </div>
            </main>
        </div>
    )

}