import { useState } from "react"
import emailjs from "@emailjs/browser"
import styles from './style.module.css'
export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [stateMessage, setStateMessage] = useState(null)

    const sendEmail = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_SERVICE_ID,
                process.env.NEXT_PUBLIC_TEMPLATE_ID,
                e.target,
                process.env.NEXT_PUBLIC_PUBLIC_KEY
            )
            .then(
                (result) => {
                    setStateMessage('Message sent!')
                    setIsSubmitting(false)
                    setTimeout(() => {
                        setStateMessage(null)
                    }, 5000)
                    e.target.reset()
                },
                (error) => {
                    setStateMessage('Something went wrong, please try again later')
                    console.log(error)
                    setIsSubmitting(false)
                    setTimeout(() => {
                        setStateMessage(null)
                    }, 5000)
                }
            )
    }

    return (
        <div className={styles.contactContainer}>
            <form onSubmit={sendEmail} className={styles.formContainer}>
                <h2>Contact Form</h2>
                <div>
                    <label htmlFor="name">First & Last Name*</label>
                    <input type="text" id='name' name='name' placeholder='Name' required tabIndex={0}
                    />
                    <small>If you are not comfortable sharing your name, type N/A.</small>
                </div>
                <div>
                    <label htmlFor="email">Email*</label>
                    <input type="email" id='email' name='email' placeholder='Email' required tabIndex={0} />
                    <small>We will use your email to respond to your message.</small>
                </div>
                <div>
                    <label htmlFor="category">
                        Reason for Contacting*
                    </label>
                    <select id="category" name='category' defaultValue="" tabIndex={0} required>
                        <option value="" selected disabled>Select from the Options Provided</option>
                        <option value="Product">Product</option>
                        <option value="Support">Support</option>
                        <option value="General">General Inquiry</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="message">Message*</label>
                    <textarea id='message' name='message' placeholder='Message' required tabIndex={0}/>
                </div>
                {stateMessage && <p role="alert" aria-live="assertive">{stateMessage}</p>}
                <button type='submit' disabled={isSubmitting} aria-disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</button>
            </form>
        </div>
    )
}