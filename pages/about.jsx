import Header from "../components/header"
import Footer from "../components/footer"
import Head from "next/head"
import { useRouter } from 'next/router'
import Image from "next/image"
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from '../config/session'
import styles from '../public/styles/About.module.css'

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

export default function About(props) {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>About Tiny Triumphs</title>
            </Head>

            <Header 
                isLoggedIn={props.isLoggedIn}
            />
            <main>
                {/* About Tiny Triumphs */}
                <section className={styles.about}> 
                    <h1>About Tiny Triumphs</h1>
                    <div>
                        <div className={styles.aboutImgContainer}>
                            <Image 
                                src="/images/about-company.webp"
                                alt=""
                                width={300}
                                height={300}
                                className={styles.aboutImg}
                            />
                        </div>
                        <div className={styles.aboutTextContainer}>
                            <div>
                                <h4>Tiny Triumphs was created with one goal in mind: to make self-care feel manageable and meaningful — especially for those who often feel overwhelmed by it.</h4>
                                <p>This app is designed for neurodivergent, mentally ill, and chronically ill individuals who want support with building daily routines that match their real energy levels. Whether you&apos;re having a low, medium, or high energy day, Tiny Triumphs offers flexible routines to help you care for yourself without pressure or guilt.</p>
                            </div>
                            <div>
                                <h4>We know that traditional self-care advice can feel unrealistic or even inaccessible.</h4>
                                <p>That&apos;s why Tiny Triumphs focuses on small, intentional steps that meet you where you are. With personalized quiz-generated routines, supportive content, and a growing resource library, this app was built to help you feel empowered — not overwhelmed — on your journey to better mental and physical health.</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Meet the Creator */}
                <section className={styles.creator}>
                    <h2>Meet the Creator</h2>
                    <div className={styles.creatorContainer}>
                        <div className={styles.creatorTextContainer}>
                            <h3>Kylee Sawyer (Developer, Designer, and Creator)</h3>
                            <div>
                                <h4>Who is Kylee?</h4>
                                <p>Hi, I&apos;m Kylee Sawyer — a developer & designer passionate about building tools that make life more manageable and meaningful, especially for those who live with neurodivergence, chronic illness, and mental health challenges.</p>
                                <p>I studied Design Research at NC State and Web Design at the University of Florida. I&apos;ve always been drawn to projects that prioritize empathy, accessibility, and intentional design. Outside of coding, you can find me hanging out with my loved ones and pets, crocheting, or reading, always searching for balance between productivity and self-compassion.</p>
                            </div>
                            <div>
                                <h4>My Inspiration for Tiny Triumphs</h4>
                                <p>Tiny Triumphs was born from own journey with navigating anxiety, depression, adhd, ptsd, POTS, fibromylagia, chronic fatigue, chronic pain, and the list goes on.</p>
                                <p>I wanted to create something that could meet people where they are, rather than asking them to meet impossible expectations. I believe self-care doesn’t have to be “all or nothing” — and that even the smallest actions can be victories. This app is my way of offering that belief to others, one routine at a time.</p>
                            </div>
                        </div>
                        <div className={styles.creatorImgContainer}>
                            <Image 
                                src="/images/creator.png"
                                alt=""
                                width={300}
                                height={400}
                                className={styles.creatorImg}
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}