import Header from "../components/header"
import Footer from "../components/footer"
import Head from "next/head"
import { useRouter } from 'next/router'
import useLogout from "../hooks/useLogout"
import { useState, useEffect } from "react"
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import styles from "../public/styles/Quiz.module.css"
import AccessibilityToggle from "../components/accessibility/accessibilityToggle"

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
    const [hasStarted, setHasStarted] = useState(false)

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

    async function handleStartQuiz() {
        await getQuestions()
        setHasStarted(true)
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
        const routineData = JSON.parse(localStorage.getItem("temporaryRoutine")) || {
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
        setHasStarted(false)
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
            <AccessibilityToggle />
            <main className={styles.main}>
                {!hasStarted ? (
                    <div className={styles.startMenu}>
                        <h1>Start your Journey Today</h1>
                        <h2>All it takes is one click to start your journey to self-care routines generated just for you!</h2>
                        <button onClick={handleStartQuiz}>Start Quiz</button>
                    </div>
                ):(
                    questions.length > 0 && questions[currentQuestion] ? (
                        <div className={styles.questionsContainer}>
                            <h2>{questions[currentQuestion].category}</h2>
                            <h4>{questions[currentQuestion].question}</h4>
                            <div className={styles.answerChoices}>
                                {questions[currentQuestion].answers.map((answer, index) => (
                                    <label
                                        key={index}
                                        className={`${styles.answerChoice} ${selectedAnswers.includes(answer) ? styles.selected : ''}`}
                                    >
                                    <input
                                        type="checkbox"
                                        checked={selectedAnswers.includes(answer)}
                                        onChange={() => handleAnswerSelection(answer)}
                                        readOnly
                                        style={{ display: 'none' }}
                                    />
                                        {answer.text}
                                    </label>
                                ))}
                            </div>
                            <div className={styles.questionNav}>
                                {currentQuestion > 0 ? (
                                    <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                                        &larr;
                                    </button>
                                ): (
                                    <div style={{ visibility: "hidden" }}>Button Placeholder</div>
                                )}
                                <div className={styles.questionCount}>
                                    {questions.map((_, index) => (
                                        <span
                                            key={index}
                                            className={`${styles.dot} ${index === currentQuestion ? styles.active : ''}`}
                                        />
                                    ))}
                                </div>
                                {currentQuestion < questions.length - 1 ? (
                                    <button onClick={handleNextQuestion}>&rarr;</button>
                                ) : (
                                    <button onClick={handleFinishQuiz} className={styles.reviewBtn}>Review</button>
                                )}
                            </div>
                        </div>
                        ) : (
                            <p>Fetching questions...</p>
                        )
                    )}
            </main>
            <Footer />
        </>
    )
}