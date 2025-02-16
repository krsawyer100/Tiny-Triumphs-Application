import DashboardHeader from "../components/dashboardHeader/index.jsx"
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
                <title>{props.user.username}&apos;s Dashboard</title>
            </Head>

            <DashboardHeader username={props?.user?.username}/>

            <main>
                <h1>{props.user.username}&apos;s  Dashboard</h1>
            </main>

        </div>
    )
}