import DashboardHeader from "../components/dashboardHeader/index.jsx"
import Head from "next/head"
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import { useState, useEffect, useRef } from "react"
import Image from "next/image.js"
import styles from "../public/styles/Dashboard.module.css"
import DashboardFooter from "../components/dashboardFooter/index.jsx"

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
    const [profilePhoto, setProfilePhoto] = useState(props.user?.profilePhoto || "/images/account-icon-blue.png");

    const [displayDate, setDisplayDate] = useState(new Date().toLocaleDateString())
    
    const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
    console.log("Date: ", typeof(date), date)
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")

    const [routine, setRoutine] = useState(null)
    const [energySelected, setEnergySelected] = useState(false)

    const [isEditing, setIsEditing] = useState(null);
    const [newTasks, setNewTasks] = useState({
        morning: '',
        afternoon: '',
        evening: '',
        night: ''
    });

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

            if (data.routine) {
                setRoutine(data.routine)
                setEnergySelected(true)
            } else {
                setEnergySelected(false)
                setRoutine(null)
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
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1)
        newDate.setDate(newDate.getDate() + direction)
    
        setDate(newDate.toLocaleDateString("en-CA"));
        setDisplayDate(newDate.toLocaleDateString())
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

    async function saveEditedTask(timeOfDay, taskIndex, updatedText) {
        try {
            const res = await fetch("/api/routine/edit-daily-task", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ date, timeOfDay, taskIndex, updatedTask: {task: updatedText} })
            })

            const data = await res.json()
            setRoutine(data.routine)
            setIsEditing(null)

        } catch (err) {
            console.error("Error saving edited task: ", err)
        }
    }

    async function deleteTaskFromDay(timeOfDay, taskIndex) {
        try {
            const res = await fetch("/api/routine/delete-daily-task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ date, timeOfDay, taskIndex })
            })

            const data = await res.json()
            setRoutine(data.routine)
        } catch (err) {
            console.error("Error deleting task: ", err)
        }
    }

    async function addTaskToDay(timeOfDay) {
        const task = newTasks[timeOfDay]?.trim()
        if (!task) return

        try {
            const res = await fetch("/api/routine/add-daily-task", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ date, timeOfDay, newTask: { task, completed: false } })
            })
            
            const data = await res.json()
            setRoutine(data.routine)
            setNewTasks(prev => ({...prev, [timeOfDay]: ''}))
        } catch (err) {
            console.error("Error adding task: ", err)
        }
    }

    function handleNewTaskChange(e, timeOfDay) {
        setNewTasks((prev) => ({...prev, [timeOfDay]: e.target.value}))
    }

    function handleEdit(taskId) {
        setTimeout(() => {
            setIsEditing(taskId)
          }, 0)
    }

    function handleKeyDown(e, timeOfDay, index) {
        if (e.key === "Enter") saveEditedTask(timeOfDay, index, e.target.value)
    }

    function renderTasks(tasks, timeOfDay) {
        return tasks?.map((taskObj, index) => (
            <div key={index} className={styles.task}>
                <input
                    type="checkbox"
                    checked={taskObj.completed}
                    onChange={() => toggleTaskCompletion(timeOfDay, index)}
                    onKeyDown={(e) => {if(e.key === "Enter") {
                        e.preventDefault()
                        toggleTaskCompletion(timeOfDay, index)
                    }}}
                />
                <p>
                {isEditing === taskObj._id ? (
                    <input
                        type="text"
                        defaultValue={taskObj.task}
                        onBlur={(e) => saveEditedTask(timeOfDay, index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, timeOfDay, index)}
                        autoFocus
                    />
                ):(
                    <span tabIndex={0} onClick={() => handleEdit(taskObj._id)} onFocus={(e) => {
                        e.preventDefault()
                        handleEdit(taskObj._id)
                    }}>{taskObj.task}</span>
                )}
                
                <button aria-label="delete task" className={styles.deleteBtn} onClick={() => deleteTaskFromDay(timeOfDay, index)}>
                    <Image
                        src="/images/delete-icon-white.png"
                        alt=""
                        width={30}
                        height={30}
                    />
                </button>
                </p>
            </div>
        ))
    }
    function renderAddTask(timeOfDay) {
        return (
            <p className={styles.addTaskContainer}>
                <input 
                    type="text"
                    placeholder="Add new Task"
                    value={newTasks[timeOfDay] || ""} 
                    onChange={(e) => handleNewTaskChange(e, timeOfDay)}
                    onKeyDown={(e) => e.key === "Enter" && addTaskToDay(timeOfDay)}
                />
                <button onClick={() => addTaskToDay(timeOfDay)} className={styles.addBtn}>
                    <Image
                        src="/images/add-icon-white.png"
                        alt=""
                        width={25}
                        height={25}
                    />
                </button>
            </p>
        )
    }

    return (
        <>
            <Head>
                <title>{props.user.username}&apos;s Dashboard</title>
                <meta name="robots" content="noindex" />
            </Head>

            <DashboardHeader username={props?.user?.username} profilePhoto={profilePhoto}/>

            <main className={styles.main}>
                <h1>{props.user.username}&apos;s Dashboard</h1>

                {/* Dashboard Components */}
                <section className={styles.dashboardContainer}>
                    {/* Routine */}
                    <section className={styles.routineContainer}>
                        <div className={styles.dateContainer}>
                            <button onClick={() => changeDate(-1)} className={styles.prevDateBtn}>                     
                                <Image
                                    src="/images/left-arrow-icon.svg"
                                    alt=""
                                    width={25}
                                    height={25}
                                />
                            </button>
                            <h2 className={styles.dateText}>{displayDate}</h2>
                            <button onClick={() => changeDate(1)} className={styles.nextDateBtn}>
                                <Image
                                    src="/images/right-arrow-icon.svg"
                                    alt=""
                                    width={25}
                                    height={25}
                                />
                            </button>
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
                                {renderTasks(routine.routine.morning, "morning")}
                                {renderAddTask("morning")}
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
                                {renderTasks(routine.routine.afternoon, "afternoon")}
                                {renderAddTask("afternoon")}
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
                                {renderTasks(routine.routine.evening, "evening")}
                                {renderAddTask("evening")}
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
                                {renderTasks(routine.routine.night, "night")}
                                {renderAddTask("night")}
                                </div>
                            </div>
                        </div>
                        ) : (
                            <div className={styles.preRoutine}>
                                <h3>How are you feeling today?</h3>
                                <Image
                                    src="/images/routine-img.webp"
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
                            src="/images/decorative-img-dashboard.jpg"
                            alt=""
                            width={200}
                            height={150}
                            className={styles.decorativeImg}
                            priority
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
            <DashboardFooter />
        </>
    )
}