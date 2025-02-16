import Header from "../components/header/index.jsx"
import Head from "next/head"
import { useRouter } from 'next/router'
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import useLogout from "../hooks/useLogout"

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

export default function Home(props) {
    const router = useRouter()
    const logout = useLogout()

    return (
        <div>
            <Head>
                <title>Tiny Triumphs</title>
            </Head>

            <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />

            <main>
                <h1>Tiny Triumphs Homepage</h1>
            </main>

        </div>
    )
}