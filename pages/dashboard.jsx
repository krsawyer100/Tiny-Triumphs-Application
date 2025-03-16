import DashboardHeader from "../components/dashboardHeader/index.jsx"
import Head from "next/head"
import { useRouter } from 'next/router'
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import { useState, useEffect } from "react"
import Image from "next/image.js"

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

export default function Dashboard(props) {
    const router = useRouter()
    const localDate = new Date().toLocaleDateString("en-CA");
    
    const [date, setDate] = useState(localDate);
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")

    const [routine, setRoutine] = useState(null)
    const [energySelected, setEnergySelected] = useState(false)
    const [hasPastRoutine, setHasPastRoutine] = useState(true)
    const [isToday, setIsToday] = useState(false)

    useEffect(() => {
        fetchRoutine()
    }, [date])

    useEffect(() => {
        if (typeof window !== "undefined") {
            fetchQuote()
        }
    }, [])
    async function fetchQuote() {
        try {
            const res = await fetch('https://thequoteshub.com/api/tags/inspiration')

            if (!res.ok) throw new Error(`failed to fetch quote: ${res}`)

            const data = await res.json()
            console.log("Quote data: ", data)
            const singleQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)]
            console.log("Single Quote: ", singleQuote)
            setQuote(singleQuote.text)
            setAuthor(singleQuote.author)
        } catch (err) {
            console.error("error getting quote: ", err)
        }
    }
    async function fetchRoutine() {
        try {
            const res = await fetch(`/api/routine/get-daily-routine?date=${date}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })

            const data = await res.json()

            const today = new Date().toLocaleDateString("en-CA")
            const isSameDate = date === today
            
            console.log(`Comparing dates - Selected: ${date}, Today: ${today}, isToday: ${isSameDate}`);
            setIsToday(isSameDate);

            if (data.routine) {
                setRoutine(data.routine)
                setEnergySelected(true)
                setHasPastRoutine(true)
            } else {
                setEnergySelected(false)
                if (new Date(date) < new Date()) {
                    setHasPastRoutine(false)
                }
            }
        } catch (err) {
            console.error("error fetching routine: ", err)
        }
    }

    async function handleEnergySelection(level) {
        try {
            const res = await fetch(`/api/routine/create-daily-routine`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: props.user._id, energyLevel: level, date })
            })

            const data = await res.json()
            console.log("Response from API:", data)

            if (data.routine) {
                setRoutine(data.routine)
                setEnergySelected(true)
            }
        } catch (err) {
            console.error("Error creating daily routine: ", err)
        }
    }

    function changeDate(direction) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    
        const today = new Date().toLocaleDateString("en-CA")
    
        if (direction === "next" && newDate.toLocaleDateString("en-CA") > today) {
            return;
        }
    
        setDate(newDate.toLocaleDateString("en-CA"));
    }

    async function toggleTaskCompletion(timeOfDay, taskIndex) {
        try {
            const res = await fetch(`/api/routine/toggle-task`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: props.user._id,
                    date: new Date(date).toISOString().split("T")[0],
                    timeOfDay,
                    taskIndex
                })
            })

            const data = await res.json()

            if (data.routine) {
                setRoutine(data.routine)
            } else {
                console.error("routine update failed: ", data)
            }
        } catch (err) {
            console.error("error toggling task completion: ", err)
        }
    }

    return (
        <>
            <Head>
                <title>{props.user.username}&apos;s Dashboard</title>
            </Head>

            <DashboardHeader username={props?.user?.username}/>

            <main>
                <h1>{props.user.username}&apos;s Dashboard</h1>

                {/* Dashboard Components */}
                <section>
                    {/* Routine */}
                    <section>
                        <div>
                            {hasPastRoutine && (
                                <button onClick={() => changeDate("prev")}>⬅️</button>
                            )}
                            <h2>{date}</h2>
                            {!isToday && (
                                <button onClick={() => changeDate("next")}>➡️</button>
                            )}
                        </div>
                        {routine ? (
                        <div>
                            <div>
                                <div>
                                    {/* <Image 
                                        src="https://picsum.photos/25"
                                        alt="Placeholder Icon"
                                        width={25}
                                        height={25}
                                    /> */}
                                    <h3>Morning</h3>
                                </div>
                                <div>
                                {routine.routine.morning.map((tasks, index) => (
                                    <label key={index}>
                                        <input 
                                            type="checkbox"
                                            checked={tasks.completed}
                                            onChange={() => toggleTaskCompletion("morning", index)}
                                        />
                                        <span style={{ textDecoration: tasks.completed ? "line-through" : "none" }}>
                                            {tasks.task}
                                        </span>
                                    </label>
                                ))}
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <Image 
                                        src="https://picsum.photos/25"
                                        alt="Placeholder Icon"
                                        width={25}
                                        height={25}
                                    /> */}
                                    <h3>Afternoon</h3>
                                </div>
                                <div>
                                {routine.routine.afternoon.map((tasks, index) => (
                                    <label key={index}>
                                        <input 
                                            type="checkbox"
                                            checked={tasks.completed}
                                            onChange={() => toggleTaskCompletion("afternoon", index)}
                                        />
                                        <span style={{ textDecoration: tasks.completed ? "line-through" : "none" }}>
                                            {tasks.task}
                                        </span>
                                    </label>
                                ))}
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <Image 
                                        src="https://picsum.photos/25"
                                        alt="Placeholder Icon"
                                        width={25}
                                        height={25}
                                    /> */}
                                    <h3>Evening</h3>
                                </div>
                                <div>
                                {routine.routine.evening.map((tasks, index) => (
                                    <label key={index}>
                                        <input 
                                            type="checkbox"
                                            checked={tasks.completed}
                                            onChange={() => toggleTaskCompletion("evening", index)}
                                        />
                                        <span style={{ textDecoration: tasks.completed ? "line-through" : "none" }}>
                                            {tasks.task}
                                        </span>
                                    </label>
                                ))}
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <Image 
                                        src="https://picsum.photos/25"
                                        alt="Placeholder Icon"
                                        width={25}
                                        height={25}
                                    /> */}
                                    <h3>Night</h3>
                                </div>
                                <div>
                                {routine.routine.night.map((tasks, index) => (
                                    <label key={index}>
                                        <input 
                                            type="checkbox"
                                            checked={tasks.completed}
                                            onChange={() => toggleTaskCompletion("night", index)}
                                        />
                                        <span style={{ textDecoration: tasks.completed ? "line-through" : "none" }}>
                                            {tasks.task}
                                        </span>
                                    </label>
                                ))}
                                </div>
                            </div>
                        </div>
                        ) : (
                            <div>
                                <h3>How are you feeling today? Let us know so we can help you reach your self-care goals!</h3>
                            </div>
                        )}
                    </section>
                    <section>
                        <div>
                            <h4>"{quote}"</h4>
                            <h5>~ {author}</h5>
                        </div>
                        {energySelected ? (
                            <div>
                                <h2>Thanks for sharing how you are feeling today.</h2>
                                <p>Keep up the great work!</p>
                            </div>
                        ) : (
                            <div>
                            <h2>How are you feeling today?</h2>
                            <div>
                                <button onClick={() => handleEnergySelection("lowEnergy")}>Low Energy</button>
                                <button onClick={() => handleEnergySelection("mediumEnergy")}>Medium Energy</button>
                                <button onClick={() => handleEnergySelection("highEnergy")}>High Energy</button>
                            </div>
                            </div>
                        )}
                        <div>
                            <h3>Need to change your routines?</h3>
                            <button>Edit Here</button>
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}