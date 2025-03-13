import Header from '../components/header'
import Footer from '../components/footer'
import ContactForm from '../components/contactForm'

export default function Contact() {
    return (
        <>
            <Header />
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