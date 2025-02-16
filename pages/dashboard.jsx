import Header from "../components/header/index.jsx"
import Head from "next/head"
import { useRouter } from 'next/router'
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import useLogout from "../hooks/useLogout"
import Link from "next/link.js"

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

export default function Dashboard(props) {
    const router = useRouter()
    const logout = useLogout()

    return (
        <div>
            <Head>
                <title>{props.user.username}'s Dashboard</title>
            </Head>

            <header>
                <Link href='/'>Tiny Triumphs</Link>
                <>
                <div>
                    <Link href='/settings'>Settings</Link>
                    <p onClick={logout} style={{ cursor: "pointer" }}>Logout</p>
                </div>
                </>
            </header>

            {/* <Header isLoggedIn={props.isLoggedIn} firstName={props?.user?.firstName}/> */}

            <main>
                <h1>{props.user.username}'s  Dashboard</h1>
            </main>

        </div>
    )
}