import Head from "next/head"
import { useRouter } from 'next/router'
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import useLogout from "../hooks/useLogout"
import Link from "next/link.js"
import { useState } from "react"
import DashboardHeader from "../components/dashboardHeader"

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({req}) {
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

export default function Settings(props) {
    const router = useRouter()
    const logout = useLogout()
    const [{ firstName, lastName, username, email, password }, setForm] = useState({
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        username: props.user.username,
        email: props.user.email
    })
    const [error, setError] = useState('')

    function handleChange(e) {
        setForm(prevForm => ({
            ...prevForm,
            [e.target.name]: e.target.value
        }))
    }

    async function handleUpdate(e) {
        e.preventDefault()
        const userId = props.user._id

        try {
            const res = await fetch('/api/user/update', {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({userId, firstName, lastName, username, email})
            })

            if (res.status === 200) {
                return router.push('/dashboard')
            }

            const { error: message } = await res.json()
            setError(message)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function handleDelete() {
        const userId = props.user._id
        console.log('userid: ', userId)

        try {
            const res = await fetch('/api/user/delete', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({userId})
            })

            if (res.status === 200) {
                return router.push('/')
            } else {
                console.error('Delete failed')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <Head>
                <title>{props.user.username}&apos;s Settings</title>
            </Head>

            <DashboardHeader username={props?.user?.username}/>

            <main>
                <h1>{props.user.username}&apos;s Settings</h1>
                <form onSubmit={handleUpdate}>
                    <label htmlFor="firstName">First Name: </label>
                    <input 
                        type="text"
                        name='firstName'
                        id='firstName'
                        onChange={handleChange}
                        value={firstName}
                    />
                    <label htmlFor="lastName">Last Name: </label>
                    <input 
                        type="text"
                        name='lastName'
                        id='lastName'
                        onChange={handleChange}
                        value={lastName}
                    />
                    <label htmlFor="username">Username: </label>
                    <input 
                        type="text"
                        name='username'
                        id='username'
                        onChange={handleChange}
                        value={username}
                    />
                    <label htmlFor="email">Email: </label>
                    <input 
                        type="email"
                        name='email'
                        id='email'
                        onChange={handleChange}
                        value={email}
                    />
                    {error && <p>{error}</p>}
                    <button>Update Information</button>
                </form>

                <button onClick={handleDelete}>Delete Account</button>
            </main>

        </div>
    )
}