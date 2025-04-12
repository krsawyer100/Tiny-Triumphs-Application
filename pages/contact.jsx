import Header from '../components/header'
import Footer from '../components/footer'
import ContactForm from '../components/contactForm'
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from '../config/session'
import styles from '../public/styles/Contact.module.css'
import AccessibilityToggle from '../components/accessibility/accessibilityToggle';
import Head from 'next/head';

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

export default function Contact(props) {
    return (
        <>
            <Head>
                <title>Contact Us</title>
                <link rel="preload" as="image" href="/images/form-background.webp" />
            </Head>
            <Header 
                isLoggedIn={props.isLoggedIn}
            />
            <AccessibilityToggle />
            <main className={styles.main}>
                <div className={styles.contactInfoContainer}>
                    <h1>Contact Us</h1>
                    <p>Whether you have a question, feedback, or just want to share your Tiny Triumphs journey, we&apos;re here for you. Reach out anytime — your voice matters, and we&apos;re always happy to connect.</p>
                </div>
                <ContactForm />
            </main>
            <Footer />
        </>
    )
  }