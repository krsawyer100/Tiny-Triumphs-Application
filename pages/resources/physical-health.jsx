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

export default function Physical(props) {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Physical Health Resources</title>
            </Head>

            <Header 
                isLoggedIn={props.isLoggedIn}
            />
            <main className={styles.main}>
                <h1>Physical Health Resources</h1>
                <section className={styles.emergencyResources}>
                    <h2>If you or someone you know is experiencing a medical emergency, please reach out immediately:</h2>
                    <div className={styles.emergencyResourcesContainer}>
                        <div className={styles.emergencyResourceLink}>
                            <h4>Emergency Services (U.S.)</h4>
                            <p>Call <a href="tel:911" className={styles.phone}>911</a> for immediate medical attention. Clearly state the nature of the emergency and request paramedics.</p>
                        </div>
                        <span className={styles.emergencyDivider}></span>
                        <div className={styles.emergencyResourceLink}>
                            <h4>Poison Control</h4>
                            <p>Call <a href="tel:18002221222" className={styles.phone}>1-800-222-1222</a> if there is a suspected poisoning or exposure to harmful substances.</p>
                        </div>
                        <span className={styles.emergencyDivider}></span>
                        <div className={styles.emergencyResourceLink}>
                            <h4>Atrium Health&apos;s Emergency Services</h4>
                            <p>Use Atrium Health&apos;s <a href="https://atriumhealth.org/locations/emergency-departments?isMobileWidget=false&cityName=&community=All_Communities&locationName=&pageNumber=&pageSize=10&latitude=35.2270869&longitude=-80.8431267&sortBy=Distance&datasource=9660a689-88e1-4db6-8e2f-88bd656a66c5&childrensLocationOnly=false&locationType=Emergency_Department" target="_BLANK" className={styles.web}>Online Emergency Care Video services or the Er Locator</a> receive care or find a hospital or emergency walk-in clinic in your area.</p>
                        </div>
                    </div>
                    <h3>These services are available 24/7 and can connect you with a trained medical professional.</h3>
                </section>
                {/* Resources */}
                <section className={styles.resourceLinks}> 
                    <h2>Resources</h2>
                    <div className={styles.resourceLinksContainer}>
                        <ResourceLink
                            resourceURL="https://www.nami.org/"
                            resourceImgURL="/images/about.jpg"
                            resourceTitle="Yoga for Spoonies"
                            resourceDescription="A gentle yoga workshop series tailored for people with chronic pain, fatigue, and limited mobility. Learn movement that meets you where you are."
                        />
                        <ResourceLink
                            resourceURL="https://www.nami.org/"
                            resourceImgURL="/images/about.jpg"
                            resourceTitle="Chronic Babe"
                            resourceDescription="Created by and for young women with chronic illness, this site offers coaching, blog posts, videos, and encouragement for living your best life while managing chronic conditions."
                        />
                        <ResourceLink
                            resourceURL="https://www.nami.org/"
                            resourceImgURL="/images/about.jpg"
                            resourceTitle="Disability Dame"
                            resourceDescription="A disability advocate&apos;s hub with accessible health tips, lifestyle advice, and a blog focused on thriving with chronic illness."
                        />
                        <ResourceLink
                            resourceURL="https://www.nami.org/"
                            resourceImgURL="/images/about.jpg"
                            resourceTitle="Multiple Chronic Conditions Resource Center"
                            resourceDescription="Description: Provides patients and families with free resources on health policy and clinical practices related to managing multiple chronic conditions.​"
                        />
                        <ResourceLink
                            resourceURL="https://www.nami.org/"
                            resourceImgURL="/images/about.jpg"
                            resourceTitle="PatientsLikeMe"
                            resourceDescription="An online platform where individuals with various health conditions can share experiences, track their health, and find support from others with similar conditions."
                        />
                        <ResourceLink
                            resourceURL="https://www.nami.org/"
                            resourceImgURL="/images/about.jpg"
                            resourceTitle="Chronic Illness Bloggers"
                            resourceDescription="A hub of blog posts and lived experiences from people with chronic physical health conditions like fibromyalgia, lupus, EDS, and more."
                        />
                        <ResourceLink
                            resourceURL="https://www.nami.org/"
                            resourceImgURL="/images/about.jpg"
                            resourceTitle="Pain Resource"
                            resourceDescription="Provides education, articles, and tools for people managing chronic physical pain, covering topics like treatments, nutrition, and mobility."
                        />
                        <ResourceLink
                            resourceURL="https://www.nami.org/"
                            resourceImgURL="/images/about.jpg"
                            resourceTitle="NIA: Exercising with Chronic Conditions"
                            resourceDescription="Offers guidance on safe physical activities tailored for individuals with chronic illnesses, emphasizing symptom management."
                        />
                        <ResourceLink
                            resourceURL="https://www.nami.org/"
                            resourceImgURL="/images/about.jpg"
                            resourceTitle="CDSME Programs"
                            resourceDescription="Evidence-based programs designed to help individuals with chronic conditions learn skills to manage their health, improve quality of life, and reduce healthcare costs."
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}