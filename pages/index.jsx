import Header from "../components/header"
import Footer from "../components/footer"
import Head from "next/head"
import { useRouter } from 'next/router'
import Link from "next/link";
import Image from "next/image"
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from '../config/session'
import styles from '../public/styles/Home.module.css'

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
                <section className={styles.hero}> 
                    <div className={styles.heroContainer}>
                        <div className={styles.heroInfo}>
                            <h1>Tiny Triumphs Self-Care Application</h1>
                            <h2>Try our test today to get your personalized low, medium, and high energy routines to help you conquer your self-care goals one task at a time!</h2>
                        </div>
                        <div className={styles.heroBtn}>
                            {props.isLoggedIn ? (
                                <h5>
                                    <Link href="/dashboard" className={styles.btnText}>Go to Dashboard</Link>
                                </h5>
                            ):(
                                <h5>
                                    <Link href="/Quiz" className={styles.btnText}>Start your Journey Today</Link>
                                </h5>
                            )}
                        </div>
                    </div>
                </section>
                {/* Bit about the application and health */}
                <section className={styles.applicationInfo}>
                    <div className={styles.about}>
                        <div className={styles.aboutText}>
                            <h3>About Tiny Triumphs</h3>
                            <div className={styles.aboutImgMobileContainer}>
                                <Image 
                                    src="/images/about.jpg"
                                    alt=""
                                    width={400}
                                    height={400}
                                    className={styles.aboutImg}
                                />
                            </div>
                            <div>
                                <h4>What Makes Us Different</h4>
                                <p>Tiny Triumphs is a self-care application that focuses on providing neurodivergent, mentally ill, and chronically ill individuals with customized daily routines based upon their needs and wants. The application provides each person with 3 different generated routines (low, medium, and high energy) that the user can choose from at the beginning of each day based on their energy levels for the day.</p>
                            </div>
                            <div>
                                <h4>Our Mission</h4>
                                <p>The goal of this application is to help individuals with following routines even on the hard days to help prompt better mental and physical health.</p>
                            </div>
                        </div>
                        <div className={styles.aboutImgContainer}>
                            <Image 
                                src="/images/about.jpg"
                                alt=""
                                width={400}
                                height={400}
                                className={styles.aboutImg}
                            />
                        </div>
                    </div>
                    <div className={styles.statistic}>
                        <div className={styles.statisticImgContainer}>
                            <Image 
                                src="/images/statistic.jpg"
                                alt=""
                                width={400}
                                height={400}
                                className={styles.statisticImg}
                            />
                        </div>
                        <div className={styles.statisticText}>
                            <h3>Link Between Self-care and Mental Health</h3>
                            <div className={styles.statisticImgMobileContainer}>
                                <Image 
                                    src="/images/statistic.jpg"
                                    alt=""
                                    width={400}
                                    height={400}
                                    className={styles.statisticImg}
                                />
                            </div>
                            <div>
                                <h4>According to <a href="#">Vagaro&apos;s</a> Survey, “64% said self-care has given them a confidence boost, 67% said it increased productivity, and 71% said it increased happiness.”</h4>
                                <h4>~ <a href="#">BlueCross BlueShield</a></h4>
                            </div>
                            <p>These findings show that self-care is not just about pampering — it is a powerful tool for boosting mood, motivation, and mental clarity. For individuals navigating mental illness, chronic conditions, or neurodivergence, even small routines can lead to meaningful improvements in daily life.</p>
                        </div>
                    </div>
                </section>
                {/* Self-care application benefits */}
                <section className={styles.benefits}>
                    <h3>Benefits of the Tiny Triumphs Application</h3>
                    <div className={styles.benefitsContainer}>
                        <div>
                            <h4>Personalized Daily Routines Based on Energy Levels</h4>
                            <Image 
                                src="/images/energy-icon.png"
                                alt=""
                                width={150}
                                height={150}
                            />
                            <p>Tiny Triumphs provides users with three routine options—low, medium, and high energy—so they can choose the one that best matches how they feel each day. This flexibility reduces pressure and helps users feel successful no matter their energy level.</p>
                        </div>
                        <span className={styles.benefitsDivider}></span>
                        <div>
                            <h4>Designed with Accessibility in Mind</h4>
                            <Image 
                                src="/images/accessibility-icon.png"
                                alt=""
                                width={150}
                                height={150}
                            />
                            <p>The app is tailored specifically for neurodivergent, mentally ill, and chronically ill individuals, ensuring that routines are gentle, supportive, and manageable. This makes self-care more inclusive and attainable for those who often feel overlooked by mainstream wellness tools.</p>
                        </div>
                        <span className={styles.benefitsDivider}></span>
                        <div>
                            <h4>Reduces Decision Fatigue</h4>
                            <Image 
                                src="/images/decision-icon.png"
                                alt=""
                                width={150}
                                height={150}
                            />
                            <p>By generating routines through a simple quiz, Tiny Triumphs takes the guesswork out of planning a day. This helps users conserve mental energy, making it easier to take care of themselves without feeling overwhelmed.</p>
                        </div>
                    </div>
                </section>
                {/* Resources */}
                <section className={styles.resources}>
                    <h3>Check out our recommended resources</h3>
                    <div className={styles.resourceLinksContainer}>
                        <Link href="/resources/mental-health" className={styles.resourceLink}>
                            <Image 
                                src="/images/mental-health.jpg"
                                alt=""
                                width={250}
                                height={250}
                                className={styles.resourceLinkImg}
                            />
                            <div>
                                <h4>Mental Health Resources</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo expedita adipisci dolor minus numquam quos tempore alias error, facilis veniam veritatis ea vero laudantium soluta obcaecati nobis sed commodi neque.</p>
                            </div>
                        </Link>
                        <Link href="/resources/physical-health" className={styles.resourceLink}>
                            <Image 
                                src="/images/physical-health.jpg"
                                alt=""
                                width={250}
                                height={250}
                                className={styles.resourceLinkImg}
                            />
                            <div>
                                <h4>Physical Health Resources</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo expedita adipisci dolor minus numquam quos tempore alias error, facilis veniam veritatis ea vero laudantium soluta obcaecati nobis sed commodi neque.</p>
                            </div>
                        </Link>
                        <Link href="/resources/self-care" className={styles.resourceLink}>
                            <Image 
                                src="/images/self-care.jpg"
                                alt="Placeholder"
                                width={250}
                                height={250}
                                className={styles.resourceLinkImg}
                            />
                            <div>
                                <h4>Self-care Resources</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo expedita adipisci dolor minus numquam quos tempore alias error, facilis veniam veritatis ea vero laudantium soluta obcaecati nobis sed commodi neque.</p>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}