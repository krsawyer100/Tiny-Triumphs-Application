import DashboardHeader from "../components/dashboardHeader/index.jsx"
import Head from "next/head"
import { useRouter } from 'next/router'
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import { useState, useEffect } from "react"
import Image from "next/image.js"
import Link from "next/link.js"
import styles from "../public/styles/Dashboard.module.css"

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
    const [profilePhoto, setProfilePhoto] = useState(props.user?.profilePhoto || "/images/account-icon-blue.png");

    const localDate = new Date().toLocaleDateString("en-CA");
    const [displayDate, setDisplayDate] = useState(new Date().toLocaleDateString())
    console.log("Display date: ", displayDate)
    
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
        fetchQuote()
    }, [])

    useEffect(() => {
        fetchUserProfile();
    }, []);

    async function fetchUserProfile() {
        try {
          const res = await fetch('/api/user/get-current');
          if (res.ok) {
            const data = await res.json();
            setProfilePhoto(data.user.profilePhoto);
        } else {
            console.error('Failed to fetch user profile');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
    }
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
                console.log("Routine exists for this date:", data.routine);
                setRoutine(data.routine)
                setEnergySelected(true)
                setHasPastRoutine(true)
            } else {
                console.log("No routine for this date:", date);
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
        console.log(`Current date: ${date}, Direction ${direction}`)

        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    
        const today = new Date().toLocaleDateString("en-CA")
        const newDateString = newDate.toLocaleDateString("en-CA")

        console.log(`Attempting to set new date: ${newDateString}`);
    
        if (direction === "next" && newDate.toLocaleDateString("en-CA") > today) {
            console.log("🚫 Prevented from moving past today")
            return;
        }
    
        setDate(newDateString);
        setDisplayDate(newDate.toLocaleDateString())

        fetchRoutine()
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

            <DashboardHeader username={props?.user?.username} profilePhoto={profilePhoto}/>

            <main className={styles.main}>
                <h1>{props.user.username}&apos;s Dashboard</h1>

                {/* Dashboard Components */}
                <section className={styles.dashboardContainer}>
                    {/* Routine */}
                    <section className={styles.routineContainer}>
                        <div className={styles.dateContainer}>
                            {hasPastRoutine && date !== new Date().toLocaleDateString("en-CA") && (
                                <button onClick={() => changeDate("prev")} className={styles.prevDateBtn}>⬅️</button>
                            )}
                            <h2 className={styles.dateText}>{displayDate}</h2>
                            {!isToday && (
                                <button onClick={() => changeDate("next")} className={styles.nextDateBtn}>➡️</button>
                            )}
                        </div>
                        {routine ? (
                        <div className={styles.routines}>
                            <div className={styles.routine}>
                                <div className={styles.routineTitle}>
                                    <Image 
                                        src="/images/morning-icon-white.png"
                                        alt=""
                                        width={35}
                                        height={35}
                                    />
                                    <h3>Morning</h3>
                                </div>
                                <div className={styles.tasksContainer}> 
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
                            <div className={styles.routineDivider}>
                                <span className={styles.circle}></span>
                                <span className={styles.line}></span>
                                <span className={styles.circle}></span>
                            </div>
                            <div className={styles.routine}>
                                <div className={styles.routineTitle}>
                                    <Image 
                                        src="/images/afternoon-icon-white.png"
                                        alt=""
                                        width={35}
                                        height={35}
                                    />
                                    <h3>Afternoon</h3>
                                </div>
                                <div className={styles.tasksContainer}>
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
                            <div className={styles.routineDivider}>
                                <span className={styles.circle}></span>
                                <span className={styles.line}></span>
                                <span className={styles.circle}></span>
                            </div>
                            <div className={styles.routine}>
                                <div className={styles.routineTitle}>
                                    <Image 
                                        src="/images/evening-icon-white.png"
                                        alt=""
                                        width={35}
                                        height={35}
                                    />
                                    <h3>Evening</h3>
                                </div>
                                <div className={styles.tasksContainer}>
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
                            <div className={styles.routineDivider}>
                                <span className={styles.circle}></span>
                                <span className={styles.line}></span>
                                <span className={styles.circle}></span>
                            </div>
                            <div className={styles.routine}>
                                <div className={styles.routineTitle}>
                                    <Image 
                                        src="/images/night-icon-white.png"
                                        alt=""
                                        width={35}
                                        height={35}
                                    />
                                    <h3>Night</h3>
                                </div>
                                <div className={styles.tasksContainer}>
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
                            <div className={styles.preRoutine}>
                                <h3>How are you feeling today?</h3>
                                <Image
                                    src="/images/routine-img.jpg"
                                    alt=""
                                    width={500}
                                    height={300}
                                    className={styles.preRoutineImg}
                                />
                                <h4>Let us know so we can help you reach your self-care goals!</h4>
                            </div>
                        )}
                    </section>
                    <section className={styles.imgContainer}>
                        <Image
                            src="/images/dashboard-decorative.webp"
                            alt=""
                            width={200}
                            height={150}
                            className={styles.decorativeImg}
                        />
                    </section>
                    <section className={styles.quoteContainer}>
                        <div>
                            <h3>&quot;{quote}&quot;</h3>
                            <h4>~ {author}</h4>
                        </div>
                    </section>
                    <section className={styles.energyContainer}>
                        {energySelected ? (
                            <div className={styles.energyInfo}>
                                <h2>Thanks for Sharing How You are Feeling Today!</h2>
                                <Image
                                    src="/images/energy-img.webp"
                                    alt=""
                                    width={500}
                                    height={300}
                                    className={styles.energyInfoImg}
                                />
                            </div>
                        ) : (
                            <div className={styles.energyInfo}>
                            <h2>How are you feeling today?</h2>
                            <div className={styles.btnsContainer}>
                                <button onClick={() => handleEnergySelection("highEnergy")}>High Energy</button>
                                <button onClick={() => handleEnergySelection("mediumEnergy")}>Medium Energy</button>
                                <button onClick={() => handleEnergySelection("lowEnergy")}>Low Energy</button>
                            </div>
                            </div>
                        )}
                    </section>
                </section>
            </main>
        </>
    )
}