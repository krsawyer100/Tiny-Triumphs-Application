import Header from "../components/header"
import Footer from "../components/footer"
import Head from "next/head"
import { useRouter } from 'next/router'
import useLogout from "../hooks/useLogout"
import { useState, useEffect } from "react"
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
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

export default function Quiz(props) {
    const router = useRouter()
    const logout = useLogout()

    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState([])

    useEffect(() => {
        getQuestions()
    }, [])
    async function getQuestions() {
        try {
            const res = await fetch('/api/quiz/questions', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                }
            });
    
            if (!res.ok) {
                throw new Error(`Error fetching questions: ${res.statusText}`);
            }
    
            const questionData = await res.json();
            
            setQuestions(questionData);
            console.log(questionData);
    
            return questionData;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function handleAnswerSelection(answer) {
        setSelectedAnswers((prevSelected) => {
            if (prevSelected.includes(answer)) {
                return prevSelected.filter((item) => item !== answer)
            } else {
                return [...prevSelected, answer]
            }
        })
    }

    function saveRoutineToLocalStorage() {
        const routineData = {
            lowEnergy: { morning: [], afternoon: [], evening: [], night: [] },
            mediumEnergy: { morning: [], afternoon: [], evening: [], night: [] },
            highEnergy: { morning: [], afternoon: [], evening: [], night: [] }
        }

        selectedAnswers.forEach((answer) => {
            if (answer.tasks) {
                Object.keys(answer.tasks).forEach((energyLevel) => {
                    Object.keys(answer.tasks[energyLevel]).forEach((timeOfDay) => {
                        routineData[energyLevel][timeOfDay] = [
                            ...  routineData[energyLevel][timeOfDay],
                            ...answer.tasks[energyLevel][timeOfDay]
                        ]
                    })
                })
            }
        })

        localStorage.setItem("temporaryRoutine", JSON.stringify(routineData))
        console.log("Saved routine: ", routineData)
    }

    function handleNextQuestion() {
        saveRoutineToLocalStorage()
        setSelectedAnswers([])
        setCurrentQuestion((prevIndex) => prevIndex + 1)
    }

    function handleFinishQuiz() {
        saveRoutineToLocalStorage()
        router.push("review-routine")
    }

    return (
        <>
            <Head>
                <title>Tiny Triumphs</title>
            </Head>

            <Header 
                isLoggedIn={props.isLoggedIn}
            />

            <main>
                <h1>Quiz Page</h1>
                {questions.length > 0 && questions[currentQuestion] ? (
                    <div>
                        <h2>{questions[currentQuestion].category}</h2>
                        <h3>{questions[currentQuestion].question}</h3>
                        <ul>
                            {questions[currentQuestion].answers.map((answer, index) => (
                                <li key={index}>
                                    <input 
                                        type="checkbox"
                                        checked={selectedAnswers.includes(answer)}
                                        onChange={() => handleAnswerSelection(answer)} 
                                    />
                                    {answer.text}
                                </li>
                            ))}
                        </ul>
                        {currentQuestion < questions.length - 1 ? (
                            <button onClick={handleNextQuestion}>Next Question</button>
                        ) : (
                            <button onClick={handleFinishQuiz}>Review your Routines</button>
                        )}
                    </div>
                    ) : (
                        <p>Fetching questions...</p>
                    )
                }
                <div>
                    {/* Temporary routines for editting before save here after completion of quiz */}
                </div>
            </main>
            <Footer />
        </>
    )
}