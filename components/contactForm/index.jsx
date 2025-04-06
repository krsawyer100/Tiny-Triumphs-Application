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
                {stateMessage && <p>{stateMessage}</p>}
                <div>
                    <label htmlFor="name">First & Last Name*</label>
                    <input type="text" id='name' name='name' placeholder='Name' required/>
                </div>
                <div>
                    <label htmlFor="email">Email*</label>
                    <input type="email" id='email' name='email' placeholder='Email' required/>
                </div>
                <div>
                    <label htmlFor="category">
                        Reason for Contacting*
                    </label>
                    <select id="category" name='category' required>
                        <optgroup>
                            <option value="N/A">Select from the Options Provided</option>
                            <option value="">Product</option>
                        </optgroup>
                    </select>
                </div>
                <div>
                    <label htmlFor="message">Message*</label>
                    <textarea id='message' name='message' placeholder='Message' required/>
                </div>
                <button type='submit' disabled={isSubmitting}>Send Message</button>
            </form>
        </div>
    )
}