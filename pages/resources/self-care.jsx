import Header from "../../components/header/index.jsx"
import Head from "next/head"

// export const getServerSideProps = withIronSessionSsr(
//     async function getServerSideProps({req}) {
//         const user = req.session.user
//         const props = {}
//         if (user) {
//             props.user = req.session.user
//             props.isLoggedIn = true
//         } else {
//             props.isLoggedIn = false
//         }
//         return { props }
//     },
//     sessionOptions
// )

export default function Self (props) {
    return (
        <div>
            <Head>
                <title>Self-care Resources</title>
            </Head>

            <Header isLoggedIn={props.isLoggedIn} firstName={props?.user?.firstName}/>

            <main>
                <h1>Self-Care Resources</h1>
            </main>

        </div>
    )
}