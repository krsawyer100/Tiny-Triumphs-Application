import Header from "../components/header"
import Footer from "../components/footer"
import Head from "next/head"
import { useRouter } from 'next/router'
import Link from "next/link";
import Image from "next/image"
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from '../config/session'

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
    console.log()

    return (
        <div>
            <Head>
                <title>Tiny Triumphs</title>
            </Head>

            <Header 
                isLoggedIn={props.isLoggedIn}
            />
            <main>
                {/* Hero Section */}
                <section> 
                    <div>
                        <div>
                            <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam iste officiis ex molestiae illum. Molestias optio, modi earum adipisci pariatur veniam omnis obcaecati numquam commodi fuga, at, recusandae quod natus.</h1>
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo minus corrupti sit ut, in omnis unde voluptatem pariatur quas nam vitae vel enim autem voluptatum qui odio fugit quia porro?</h4>
                        </div>
                        <div>
                            {props.isLoggedIn ? (
                                <div>
                                    <Link href="/dashboard">Go to Dashboard</Link>
                                </div>
                            ):(
                                <div>
                                    <Link href="/Quiz">Start your Journey Today</Link>
                                    <Link href="/login">Login</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                {/* Bit about the application and health */}
                <section>
                    <div>
                        <div>
                            <h2>Blurb about the app</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic perferendis amet repudiandae beatae rem sequi, pariatur vel excepturi vero nulla non expedita repellendus quidem? Tempora obcaecati aspernatur maiores numquam itaque.</p>
                        </div>
                        <div>
                            <img 
                                src="https://picsum.photos/200/300"
                                alt="Placeholder"

                            />
                            {/* <Image 
                                src="https://picsum.photos/200/300"
                                alt="Placeholder"

                            /> */}
                        </div>
                    </div>
                    <div>
                        <div>
                            <img 
                                src="https://picsum.photos/200/300"
                                alt="Placeholder"

                            />
                            {/* <Image 
                                src="https://picsum.photos/200/300"
                                alt="Placeholder"
                                width={300}
                                height={200}
                            /> */}
                        </div>
                        <div>
                            <h2>Statistic about mental health and chronic illness</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic perferendis amet repudiandae beatae rem sequi, pariatur vel excepturi vero nulla non expedita repellendus quidem? Tempora obcaecati aspernatur maiores numquam itaque.</p>
                        </div>
                    </div>
                </section>
                {/* Self-care application benefits */}
                <section>
                    <h2>Benefits of the Tiny Triumphs Application</h2>
                    <div>
                        <img 
                            src="https://picsum.photos/200"
                            alt="Placeholder"
                        />
                        {/* <Image 
                            src="https://picsum.photos/200"
                            alt="Placeholder"
                            width={200}
                            height={200}
                        /> */}
                        <h3>Benefit #1</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas expedita eaque debitis officiis reiciendis optio ullam aperiam officia minima sed! Aspernatur tenetur sed impedit ratione vitae voluptatum quo, odit minus!</p>
                    </div>
                    <div>
                        <img 
                            src="https://picsum.photos/200"
                            alt="Placeholder"
                        />
                        {/* <Image 
                            src="https://picsum.photos/200"
                            alt="Placeholder"
                            width={200}
                            height={200}
                        /> */}
                        <h3>Benefit #2</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas expedita eaque debitis officiis reiciendis optio ullam aperiam officia minima sed! Aspernatur tenetur sed impedit ratione vitae voluptatum quo, odit minus!</p>
                    </div>
                    <div>
                        <img 
                            src="https://picsum.photos/200"
                            alt="Placeholder"
                        />
                        {/* <Image 
                            src="https://picsum.photos/200"
                            alt="Placeholder"
                            width={200}
                            height={200}
                        /> */}
                        <h3>Benefit #3</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas expedita eaque debitis officiis reiciendis optio ullam aperiam officia minima sed! Aspernatur tenetur sed impedit ratione vitae voluptatum quo, odit minus!</p>
                    </div>
                </section>
                {/* Resources */}
                <section>
                    <h2>Check out our reccommended resources</h2>
                    <div>
                        <Link href="/resources/mental-health">
                            <img 
                                src="https://picsum.photos/200"
                                alt="Placeholder"
                            />
                            {/* <Image 
                                src="https://picsum.photos/200"
                                alt="Placeholder"
                                width={200}
                                height={200}
                            /> */}
                            <h3>Mental Health Resources</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo expedita adipisci dolor minus numquam quos tempore alias error, facilis veniam veritatis ea vero laudantium soluta obcaecati nobis sed commodi neque.</p>
                        </Link>
                        <Link href="/resources/physical-health">
                            <img 
                                src="https://picsum.photos/200"
                                alt="Placeholder"
                            />
                            {/* <Image 
                                src="https://picsum.photos/200"
                                alt="Placeholder"
                                width={200}
                                height={200}
                            /> */}
                            <h3>Physical Health Resources</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo expedita adipisci dolor minus numquam quos tempore alias error, facilis veniam veritatis ea vero laudantium soluta obcaecati nobis sed commodi neque.</p>
                        </Link>
                        <Link href="/resources/self-care">
                            <img 
                                src="https://picsum.photos/200"
                                alt="Placeholder"
                            />
                            {/* <Image 
                                src="https://picsum.photos/200"
                                alt="Placeholder"
                                width={200}
                                height={200}
                            /> */}
                            <h3>Self-care Resources</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo expedita adipisci dolor minus numquam quos tempore alias error, facilis veniam veritatis ea vero laudantium soluta obcaecati nobis sed commodi neque.</p>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}