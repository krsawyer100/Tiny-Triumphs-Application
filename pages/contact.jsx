import Header from '../components/header'
import Footer from '../components/footer'
import ContactForm from '../components/contactForm'
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

export default function Contact(props) {
    return (
        <>
            <Header 
                isLoggedIn={props.isLoggedIn}
            />
            <main>
                <div>
                    <h1>Contact Us</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, maxime dolorum qui odit perferendis itaque, in cumque doloribus aspernatur enim tempora nostrum sint. Porro praesentium adipisci neque ducimus. Sint, error!</p>
                </div>
                <ContactForm />
            </main>
            <Footer />
        </>
    )
  }