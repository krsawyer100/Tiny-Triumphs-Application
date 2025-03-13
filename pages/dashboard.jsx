import DashboardHeader from "../components/dashboardHeader/index.jsx"
import Head from "next/head"
import { useRouter } from 'next/router'
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import Image from "next/image.js"

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

    return (
        <>
            <Head>
                <title>{props.user.username}&apos;s Dashboard</title>
            </Head>

            <DashboardHeader username={props?.user?.username}/>

            <main>
                <h1>{props.user.username}&apos;s Dashboard</h1>

                {/* Dashboard Components */}
                <section>
                    {/* Routine */}
                    <section>
                        <div>
                            <h2>Self-Care Routine</h2>
                            <div>
                                <div>
                                    <Image 
                                        src="https://picsum.photos/25"
                                        alt="Placeholder Icon"
                                        width={25}
                                        height={25}
                                    />
                                    <h3>Morning</h3>
                                </div>
                                <div>
                                    {/* Self-care tasks populated in */}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Image 
                                        src="https://picsum.photos/25"
                                        alt="Placeholder Icon"
                                        width={25}
                                        height={25}
                                    />
                                    <h3>Afternoon</h3>
                                </div>
                                <div>
                                    {/* Self-care tasks populated in */}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Image 
                                        src="https://picsum.photos/25"
                                        alt="Placeholder Icon"
                                        width={25}
                                        height={25}
                                    />
                                    <h3>Evening</h3>
                                </div>
                                <div>
                                    {/* Self-care tasks populated in */}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Image 
                                        src="https://picsum.photos/25"
                                        alt="Placeholder Icon"
                                        width={25}
                                        height={25}
                                    />
                                    <h3>Night</h3>
                                </div>
                                <div>
                                    {/* Self-care tasks populated in */}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div>
                            {/* Quote pulled in from the api I selected */}
                        </div>
                        <div>
                            <h2>How are your energy levels today?</h2>
                            <div>
                                <button>Low</button>
                                <button>Medium</button>
                                <button>High</button>
                            </div>
                        </div>
                        <div>
                            <h3>Need to change your routines?</h3>
                            <button>Edit Here</button>
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}