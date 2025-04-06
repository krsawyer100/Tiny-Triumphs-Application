import Header from "../components/header"
import Footer from "../components/footer"
import Head from "next/head"
import { useRouter } from 'next/router'
import useLogout from "../hooks/useLogout"
import { useState, useEffect } from "react"
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import styles from "../public/styles/ReviewRoutines.module.css"
import Image from "next/image"

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
export default function ReviewRoutine(props) {
    const router = useRouter()
    const logout = useLogout()
    const isLoggedIn = props.isLoggedIn
    const user = props.user

    const [routine, setRoutine] = useState({ lowEnergy: {}, mediumEnergy: {}, highEnergy: {} })
    const [editingTask, setEditingTask] = useState(null)
    const [newTaskInput, setNewTaskInput] = useState({})
    

    useEffect(() => {
        const generatedRoutine = JSON.parse(localStorage.getItem("temporaryRoutine"))
        if (generatedRoutine) {
            setRoutine(generatedRoutine)
        } else {
            console.error("No routine data found in localStorage")
        }
    }, [])

    async function saveRoutine() {
        if (isLoggedIn && user) {
            try {
                const res = await fetch('/api/routine/create-routine', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user._id, temporaryRoutine: routine })
                })

                if (!res.ok) throw new Error('Failed to save routines: ', error)

                const data = await res.json()

                if (data.redirect) {
                    return router.push(data.redirect)
                }
            } catch (error) {
                console.error('error saving routine: ', error)
            }
        } else {
            localStorage.setItem("temporaryRoutine", JSON.stringify(routine))
            router.push("/signup")
        }
    }

    function deleteTask(energyLevel, timeOfDay, index) {
        const updatedRoutine = { ...routine };
        updatedRoutine[energyLevel][timeOfDay].splice(index, 1);
    
        setRoutine(updatedRoutine);
        localStorage.setItem("temporaryRoutine", JSON.stringify(updatedRoutine));
    }

    function handleNewTaskChange(e, energyLevel, timeOfDay) {
        setNewTaskInput((prev) => ({
            ...prev,
            [`${energyLevel}-${timeOfDay}`]: e.target.value
        }))
    }
    
    function addTask(energyLevel, timeOfDay, newTask) {
        if (!newTask.trim()) return

        const updatedRoutine = {...routine}

        if (!updatedRoutine[energyLevel][timeOfDay]) {
            updatedRoutine[energyLevel][timeOfDay] = []
        }

        updatedRoutine[energyLevel][timeOfDay].push({ task: newTask })

        setRoutine(updatedRoutine)
        localStorage.setItem("temporaryRoutine", JSON.stringify(updatedRoutine))
        setNewTaskInput((prev) => ({
            ...prev,
            [`${energyLevel}-${timeOfDay}`]: ""
        }))
    }

    function updateTask(energyLevel, timeOfDay, index, newText) {
        if (!newText.trim()) return;
    
        const updatedRoutine = { ...routine };
        updatedRoutine[energyLevel][timeOfDay][index].task = newText;
    
        setRoutine(updatedRoutine);
        localStorage.setItem("temporaryRoutine", JSON.stringify(updatedRoutine));
        setEditingTask(null);

        localStorage.setItem("temporaryRoutine", JSON.stringify(updatedRoutine))

        setRoutine(updatedRoutine)
        setEditingTask(null)
    }

    function handleEdit(taskText) {
        setEditingTask(taskText)
    }

    function handleKeyDown(event, energyLevel, timeOfDay, index) {
        if (event.key === "Enter") {
            updateTask(energyLevel, timeOfDay, index, event.target.value);
        }
    }

    function renderTasks(tasks, energyLevel, timeOfDay) {
        if (!tasks || tasks.length === 0) return <p>No tasks available</p>;
    
        return (
            <div>
                {tasks.map((taskObj, index) => (
                    <p key={index} className={styles.task}>
                        {editingTask === taskObj.task ? (
                            <input
                                type="text"
                                defaultValue={taskObj.task}
                                onBlur={(e) => updateTask(energyLevel, timeOfDay, index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, energyLevel, timeOfDay, index)}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => handleEdit(taskObj.task)}>
                                {taskObj.task}
                            </span>
                        )}
                        <button className={styles.deleteBtn} onClick={() => deleteTask(energyLevel, timeOfDay, index)}>
                            <Image
                                src="/images/delete-icon.png"
                                alt=""
                                width={25}
                                height={25}
                                className={styles.deleteBtnIcon}
                            />
                        </button>
                    </p>
                ))}
            </div>
        );
    }

    function renderAddTask(energyLevel, timeOfDay) {
        return (
            <div className={styles.addTaskContainer}>
                <input
                    type="text"
                    placeholder="Add new task"
                    value={newTaskInput[`${energyLevel}-${timeOfDay}`] || ""}
                    onChange={(e) => handleNewTaskChange(e, energyLevel, timeOfDay)}
                />
                <button className={styles.addBtn} onClick={() => {
                    const newTask = newTaskInput[`${energyLevel}-${timeOfDay}`]
                    addTask(energyLevel, timeOfDay, newTask)
                }}>
                    <Image
                        src="/images/add-icon.png"
                        alt=""
                        width={25}
                        height={25}
                        className={styles.addBtnIcon}
                    />
                </button>
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Routine Review</title>
            </Head>

            <Header 
                isLoggedIn={props.isLoggedIn}
            />

            <main className={styles.main}>
                <h1>Personalized Routines</h1>
                <h2>Please review your personalized routines and edit them as you need to meet your needs and desires! Don&apos;t worry, you can always edit them later if needed.</h2>
                <>
                <div className={styles.routinesContainer}>
                    {routine ? (
                        <div className={styles.routine}>
                            <h3>Low Energy Routine:</h3>
                            <h4>
                                <Image
                                    src="/images/morning-icon.png"
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                                Morning
                            </h4>
                            {renderTasks(routine.lowEnergy.morning, "lowEnergy", "morning")}
                            {renderAddTask("lowEnergy", "morning")}
                            <h4>
                                <Image
                                    src="/images/afternoon-icon.png"
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                                Afternoon
                            </h4>
                            {renderTasks(routine.lowEnergy.afternoon, "lowEnergy", "afternoon")}
                            {renderAddTask("lowEnergy", "afternoon")}
                            <h4>
                                <Image
                                    src="/images/evening-icon.png"
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                                Evening
                            </h4>
                            {renderTasks(routine.lowEnergy.evening, "lowEnergy", "evening")}
                            {renderAddTask("lowEnergy", "evening")}
                            <h4>
                                <Image
                                    src="/images/night-icon.png"
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                                Night
                            </h4>
                            {renderTasks(routine.lowEnergy.night, "lowEnergy", "night")}
                            {renderAddTask("lowEnergy", "night")}
                            <span className={styles.divider}></span>
                            <h3>Medium Energy Routine:</h3>
                            <h4>
                                <Image
                                    src="/images/morning-icon.png"
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                                Morning
                            </h4>
                            {renderTasks(routine.mediumEnergy.morning, "mediumEnergy", "morning")}
                            {renderAddTask("mediumEnergy", "morning")}
                            <h4>
                                <Image
                                    src="/images/afternoon-icon.png"
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                                Afternoon
                            </h4>
                            {renderTasks(routine.mediumEnergy.afternoon, "mediumEnergy", "afternoon")}
                            {renderAddTask("mediumEnergy", "afternoon")}
                            <h4>
                                <Image
                                    src="/images/evening-icon.png"
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                                Evening
                            </h4>
                            {renderTasks(routine.mediumEnergy.evening, "mediumEnergy", "evening")}
                            {renderAddTask("mediumEnergy", "evening")}
                            <h4>
                                <Image
                                    src="/images/night-icon.png"
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                                Night
                            </h4>
                            {renderTasks(routine.mediumEnergy.night, "mediumEnergy", "night")}
                            {renderAddTask("mediumEnergy", "night")}
                            <span className={styles.divider}></span>
                            <h3>High Energy Routine:</h3>
                            <h4>
                                <Image
                                    src="/images/morning-icon.png"
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                                Morning
                            </h4>
                            {renderTasks(routine.highEnergy.morning, "highEnergy", "morning")}
                            {renderAddTask("highEnergy", "morning")}
                            <h4>
                                <Image
                                    src="/images/afternoon-icon.png"
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                                Afternoon
                            </h4>
                            {renderTasks(routine.highEnergy.afternoon, "highEnergy", "afternoon")}
                            {renderAddTask("highEnergy", "afternoon")}
                            <h4>
                                <Image
                                    src="/images/evening-icon.png"
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                                Evening
                            </h4>
                            {renderTasks(routine.highEnergy.evening, "highEnergy", "evening")}
                            {renderAddTask("highEnergy", "evening")}
                            <h4>
                                <Image
                                    src="/images/night-icon.png"
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                                Night
                            </h4>
                            {renderTasks(routine.highEnergy.night, "highEnergy", "night")}
                            {renderAddTask("highEnergy", "night")}
                            <button className={styles.saveBtn} onClick={saveRoutine}>Save Routines</button>
                        </div>
                    ) : (
                        <p>Loading routine...</p>
                    )}
                </div>
                </>
            </main>
            <Footer />
        </>
    )
}