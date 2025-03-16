import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from "../components/header"
import Footer from '../components/footer'
import { withIronSessionSsr } from 'iron-session/next'
import sessionOptions from '../config/session'
import useLogout from '../hooks/useLogout'

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
export default function Signup(props) {
    const router = useRouter()
    const logout = useLogout()
    const [
        { firstName, lastName, username, email, password, "confirm-password": confirmPassword } , setForm,
    ] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        'confirm-password': ''
    })
    const [error, setError] = useState('')
    const [temporaryRoutine, setTemporaryRoutine] = useState(null)

    useEffect(() => {
        const storedRoutine = localStorage.getItem("temporaryRoutine");
        if (storedRoutine) {
          setTemporaryRoutine(JSON.parse(storedRoutine));
        }
      }, []);

    function handleChange(e) {
        // setForm({
        //   firstName,
        //   lastName,
        //   username,
        //   email,
        //   password,
        //   "confirm-password": confirmPassword,
        //   ...{ [e.target.name]: e.target.value.trim() },
        // });
        setForm(prevForm => ({
            ...prevForm,
            [e.target.name]: e.target.value.trim()
        }))
    }

    async function handleSignup(e) {
        e.preventDefault()
        if (!(firstName && lastName && username && email)) return setError('Must include first and last name, username, and email')
        
        if (password !== confirmPassword) return setError('Passwords must match')

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, username, email, password, temporaryRoutine })
            })
            if (res.ok) {
                const data = await res.json()
                if (data.redirect) {
                    if (temporaryRoutine) {
                        localStorage.removeItem("temporaryRoutine");
                    }
                    return router.push(data.redirect)
                }
            } else {
                setError("signup failed. please try again")
            }
        } catch (error) {
            console.error('error:', error)
        }
    }

    return (
        <div>
            <Head>
                <title>Sign Up</title>
            </Head>

            <Header 
                isLoggedIn={props.isLoggedIn}
            />

            <main>
                <div>
                    <h1>Sign up page</h1>
                    <form onSubmit={handleSignup}>
                        <label htmlFor='firstName'>First Name:</label>
                        <input
                            type='text'
                            name='firstName'
                            id='firstName'
                            onChange={handleChange}
                            value={firstName}
                        />
                        <label htmlFor='lastName'>Last Name:</label>
                        <input
                            type='text'
                            name='lastName'
                            id='lastName'
                            onChange={handleChange}
                            value={lastName}
                        />
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            onChange={handleChange}
                            value={email}
                        />
                        <label htmlFor='username'>Username:</label>
                        <input
                            type='text'
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
                        <label htmlFor='confirm-password'>Confirm Password:</label>
                        <input
                            type='password'
                            name='confirm-password'
                            id='confirm-password'
                            onChange={handleChange}
                            value={confirmPassword}
                        />
                        {error && <p>{error}</p>}
                        <button>Sign Up</button>
                    </form>
                    <Link href="/Login">
                        <p>Have an account? Login here!</p>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    )
}