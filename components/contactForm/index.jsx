import { useState } from "react"
import emailjs from "@emailjs/browser"
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
        <div>
            <h2>Contact Form</h2>
            <form onSubmit={sendEmail}>
                {stateMessage && <p>{stateMessage}</p>}
                <input type="text" id='name' name='name' placeholder='Name' required/>
                <input type="email" id='email' name='email' placeholder='Email' required/>
                <input type="text" id="category" name='category' placeholder='Message category (i.e. New Features, Complaint, etc.)' required/>
                <textarea id='message' name='message' placeholder='Message' required/>
                <button type='submit' disabled={isSubmitting}>Send Message</button>
            </form>
        </div>
    )
}