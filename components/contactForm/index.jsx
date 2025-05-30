import { useState, useEffect } from "react"
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

    useEffect(() => {
        function handleEnterOnSelect(e) {
            const activeElement = document.activeElement
            if ( activeElement.tagName === "SELECT" && e.key === "Enter") {
                e.preventDefault()
            }
        }

        document.addEventListener("keydown", handleEnterOnSelect)

        return () => {
            document.removeEventListener("keydown", handleEnterOnSelect)
        }
    }, [])

    return (
        <div className={styles.contactContainer}>
            <form onSubmit={sendEmail} className={styles.formContainer} role="contact-form">
                <h2>Contact Form</h2>
                <div>
                    <label htmlFor="name">First & Last Name*</label>
                    <input type="text" id='name' name='name' placeholder='Name' required tabIndex={0} aria-describedby="nameDescription"
                    />
                    <small id="nameDescription" aria-hidden="true" style={{ fontSize: "12px", marginTop: "5px" }}>If you are not comfortable sharing your name, type N/A.</small>
                </div>
                <div>
                    <label htmlFor="email">Email*</label>
                    <input type="email" id='email' name='email' placeholder='Email' required tabIndex={0} aria-describedby="emailDescription"/>
                    <small id="emailDescription" aria-hidden="true" style={{ fontSize: "12px", marginTop: "5px" }}>We will use your email to respond to your message.</small>
                </div>
                <div>
                    <label htmlFor="category">
                        Reason for Contacting*
                    </label>
                    <select id="category" name='category' defaultValue="" tabIndex={0} required aria-describedby="categoryDescription">
                        <option value="" disabled>Select from the Options Provided</option>
                        <option value="Product">Product</option>
                        <option value="Support">Support</option>
                        <option value="General">General Inquiry</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                    </select>
                    <small id="categoryDescription" aria-hidden="true" style={{ fontSize: "12px", marginTop: "5px" }}>Please select your reason for contacting us today from the dropdown menu.</small>
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