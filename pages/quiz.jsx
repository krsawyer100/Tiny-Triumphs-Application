import { Header, Footer } from "../components"
import Head from "next/head"
import { useRouter } from 'next/router'
import useLogout from "../hooks/useLogout"
import { useState } from "react"

export default function Quiz() {
    const router = useRouter()
    const logout = useLogout()

    const [questions, setQuestions] = useState([])


    return (
        <>
            <Head>
                <title>Tiny Triumphs</title>
            </Head>

            <Header/>

            <main>
                <h1>Quiz Page</h1>

            </main>
            <Footer />
        </>
    )
}