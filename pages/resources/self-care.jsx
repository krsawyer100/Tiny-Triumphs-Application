import Header from "../../components/header"
import Footer from "../../components/footer"
import ResourceLink from "../../components/resourceLink"
import Head from "next/head"
import { useRouter } from 'next/router'
import Image from "next/image"
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from '../../config/session'
import styles from '../../public/styles/Resources.module.css'

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

export default function Self(props) {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Self-Care Resources</title>
            </Head>

            <Header 
                isLoggedIn={props.isLoggedIn}
            />
            <main className={styles.main}>
                <h1>Self-Care Resources</h1>
                <section className={styles.emergencyResources}>
                    <h2>If you are in need of motivation, try using one of the hotlines below:</h2>
                    <div className={styles.emergencyResourcesContainer}>
                        <div className={styles.emergencyResourceLink}>
                            <h4>Success Hotline</h4>
                            <p>The Success Hotline at <a href="tel:9737434690" className={styles.phone}>(973) 743-4690</a> provides daily motivational messages. Callers can listen to a three-minute recorded message designed to inspire and motivate.</p>
                        </div>
                        <span className={styles.emergencyDivider}></span>
                        <div className={styles.emergencyResourceLink}>
                            <h4>Dial Hope</h4>
                            <p>Dial Hope provides pre-recorded messages of encouragement, inspiration, and hope through <a href="tel:8665284673" className={styles.phone}>(866) 528-4673</a>, a toll-free number.</p>
                        </div>
                        <span className={styles.emergencyDivider}></span>
                        <div className={styles.emergencyResourceLink}>
                            <h4>Peptoc Hotline</h4>
                            <p>Need a quick boost? Call the Peptoc Hotline at <a href="tel:7078737862" className={styles.phone}>(707) 873-7862</a> to hear pre-recorded pep talks and words of encouragement from elementary school children.</p>
                        </div>
                    </div>
                    <h3>These services are available 24/7 and can provide you with encouragement when you need it.</h3>
                </section>
                {/* Resources */}
                <section className={styles.resourceLinks}> 
                    <h2>Resources</h2>
                    <div className={styles.resourceLinksContainer}>
                        <ResourceLink
                            resourceURL="https://sites.google.com/hvrsd.org/virtualcalmingroom/fidgets-diy-fidgets"
                            resourceImgURL="/images/fidgets.webp"
                            resourceTitle="HVCHS Virtual Calming Room"
                            resourceDescription="Provides a variety of fun stimuli from fidgets, coloring, and puzzles while also providing resources for relaxation and mindfulness."
                        />
                        <ResourceLink
                            resourceURL="https://mynoise.net/"
                            resourceImgURL="/images/soundscapes.webp"
                            resourceTitle="Sensory-Friendly Music & Soundscapes – MyNoise"
                            resourceDescription="Customizable ambient sound tools and calming audio experiences for relaxation, focus, or sensory relief."
                        />
                        <ResourceLink
                            resourceURL="https://www.activeminds.org/"
                            resourceImgURL="/images/active-minds.webp"
                            resourceTitle="Active Minds – Self-Care Activities"
                            resourceDescription="Provides a comprehensive list of self-care activities, including creative outlets and relaxation techniques, to support mental health."
                        />
                        <ResourceLink
                            resourceURL="https://mission-cure.org/30-self-care-journal-prompts-for-those-with-chronic-illness/"
                            resourceImgURL="/images/journaling.webp"
                            resourceTitle="Mission: Cure – Self-Care Journal Prompts"
                            resourceDescription="Features 30 journal prompts designed to help individuals with chronic illnesses navigate their experiences and emotions."
                        />
                        <ResourceLink
                            resourceURL="https://www.essyknopf.com/"
                            resourceImgURL="/images/essy-knopf.webp"
                            resourceTitle="Essy Knopf – Self-Care Techniques for Neurodivergents"
                            resourceDescription="Offers innovative self-care strategies tailored for neurodivergent individuals, focusing on mindfulness and relaxation."
                        />
                        <ResourceLink
                            resourceURL="https://nhsdorset.nhs.uk/neurodiversity/"
                            resourceImgURL="/images/nhs.webp"
                            resourceTitle="NHS Dorset Neurodiversity Hub"
                            resourceDescription="Provides support, resources, and information that is catered to neurodivergent individuals"
                        />
                        <ResourceLink
                            resourceURL="https://mendedhearts.org/"
                            resourceImgURL="/images/mended-heart.webp"
                            resourceTitle="Mended Hearts – Chronic Illness and Mental Health"
                            resourceDescription="Provides practical self-care tips for individuals managing chronic illnesses, emphasizing the connection between physical health and mental well-being."
                        />
                        <ResourceLink
                            resourceURL="https://www.breathworks-mindfulness.org.uk/"
                            resourceImgURL="/images/breathworks.webp"
                            resourceTitle="Breathworks – Mindfulness for Health"
                            resourceDescription="Breathworks offers mindfulness-based pain management programs designed to help individuals living with chronic pain and illness."
                        />
                        <ResourceLink
                            resourceURL="https://dghscp.co.uk/wp-content/uploads/2024/08/A-resource-pack-for-people-with-chronic-health-conditions.pdf"
                            resourceImgURL="/images/self-care-pack.webp"
                            resourceTitle="Self-Care Resource Pack for Chronic Health Conditions"
                            resourceDescription="This comprehensive resource pack, offers self-management tools to assist individuals in coping with the challenges of living with long-term conditions."
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}