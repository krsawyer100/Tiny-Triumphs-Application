import Header from "../../components/header"
import Footer from "../../components/footer"
import ResourceLink from "../../components/resourceLink"
import Head from "next/head"
import { useRouter } from 'next/router'
import Image from "next/image"
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from '../../config/session'
import styles from '../../public/styles/Resources.module.css'
import { useState, useRef } from "react"
import AccessibilityToggle from "../../components/accessibility/accessibilityToggle"
import useFocusTrap from "../../hooks/useFocusTrap"

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

export default function Mental(props) {
    const router = useRouter()
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null)

    useFocusTrap(popupRef, showPopup)

    const handleContactClick = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);

    };

    return (
        <div>
            <Head>
                <title>Mental Health Resources</title>
            </Head>

            <Header 
                isLoggedIn={props.isLoggedIn}
            />
            <AccessibilityToggle />
            <main className={styles.main}>
                <h1>Mental Health Resources</h1>
                <section className={styles.emergencyResources}>
                    <h2>If you or someone you know is in crisis, please reach out immediately:</h2>
                    <div className={styles.emergencyResourcesContainer}>
                        <div className={styles.emergencyResourceLink}>
                            <h4>988 Suicide & Crisis Lifeline (U.S.)</h4>
                            {showPopup && (
                                <div className={styles.popup} ref={popupRef} onKeyDown={(e) => {
                                    if (e.key === "Escape") {
                                        e.preventDefault()
                                        setShowPopup(false)
                                    }
                                }}>
                                    <button onClick={closePopup} className={styles.closeBtn}>
                                        <Image
                                            src="/images/x-icon.svg"
                                            alt="close popup"
                                            width={10}
                                            height={10}
                                        />
                                    </button>
                                    <div className={styles.links}>
                                        <a href="tel:988">Call 📞</a>
                                        <a href="sms:988">Text 📱</a>
                                    </div>
                                    <div className={styles.nodule}></div>
                                </div>
                            )}
                            <p>Call or text <a href="#" onClick={handleContactClick} className={styles.phone}>988</a> or visit <a href="https://988lifeline.org/" target="_BLANK" className={styles.web}>988lifeline.org</a></p>
                        </div>
                        <span className={styles.emergencyDivider}></span>
                        <div className={styles.emergencyResourceLink} >
                            <h4>Crisis Text Line</h4>
                            <p>Text <emphasize>HOME</emphasize> to <a href="sms:741741?&body=HOME" className={styles.phone}>741741</a></p>
                        </div>
                        <span className={styles.emergencyDivider}></span>
                        <div className={styles.emergencyResourceLink}>
                            <h4>National Alliance on Mental Illness (NAMI) HelpLine</h4>
                            <p>Call <a href="tel:18009506264" className={styles.phone}>1-800-950-NAMI (6264)</a> for information and support.</p>
                        </div>
                    </div>
                    <h3>These services are available 24/7 and can connect you with a trained crisis counselor.</h3>
                </section>
                {/* Resources */}
                <section className={styles.resourceLinks}> 
                    <h2>Resources</h2>
                    <div className={styles.resourceLinksContainer}>
                        <ResourceLink
                            resourceURL="https://www.nami.org/"
                            resourceImgURL="/images/nami.webp"
                            resourceTitle="NAMI (National Alliance on Mental Illness)"
                            resourceDescription="Learn more about symptoms, treatment options, and support groups for all types of mental health conditions."
                        />
                        <ResourceLink
                            resourceURL="https://themighty.com/"
                            resourceImgURL="/images/mighty.webp"
                            resourceTitle="The Mighty"
                            resourceDescription="A peer-driven platform with stories from people navigating mental illness, chronic pain, and neurodivergence. Real voices, shared experiences."
                        />
                        <ResourceLink
                            resourceURL="https://mhanational.org/"
                            resourceImgURL="/images/mha.webp"
                            resourceTitle="Mental Health America (MHA)"
                            resourceDescription="Mental health screenings, tool kits, and advocacy resources for a wide range of emotional and behavioral health needs."
                        />
                        <ResourceLink
                            resourceURL="https://adaa.org/"
                            resourceImgURL="/images/adaa.webp"
                            resourceTitle="ADAA (Anxiety & Depression Association of America)"
                            resourceDescription="Practical guides and tips for managing anxiety, depression, and related conditions."
                        />
                        <ResourceLink
                            resourceURL="https://therapyforblackgirls.com/"
                            resourceImgURL="/images/therapy-for-black-girls.webp"
                            resourceTitle="Therapy for Black Girls"
                            resourceDescription="A safe space to find mental health resources and therapists who support the Black community."
                        />
                        <ResourceLink
                            resourceURL="https://www.verywellmind.com/"
                            resourceImgURL="/images/verywell-mind.webp"
                            resourceTitle="Verywell Mind"
                            resourceDescription="Evidence-based, approachable articles on everything from burnout and grief to self-care and therapy options."
                        />
                        <ResourceLink
                            resourceURL="https://www.inclusivetherapists.com/"
                            resourceImgURL="/images/inclusive-therapists.webp"
                            resourceTitle="Inclusive Therapists"
                            resourceDescription="A directory to help you find culturally affirming, neurodiversity-affirming, and trauma-informed care."
                        />
                        <ResourceLink
                            resourceURL="https://therapistndc.org/"
                            resourceImgURL="/images/therapist-neurodiversity-collective.webp"
                            resourceTitle="Therapist Neurodiversity Collective"
                            resourceDescription="Offers free neurodiversity-affirming educational resources and information for families, therapists, and educators."
                        />
                        <ResourceLink
                            resourceURL="https://hhd.psu.edu/"
                            resourceImgURL="/images/project-spoonies.webp"
                            resourceTitle="Project Spoonies"
                            resourceDescription="Provides a supportive community for individuals with chronic illnesses, fostering connections and shared experiences among &quot;spoonies.&quot;"
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}