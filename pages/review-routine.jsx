import Header from "../components/header"
import Footer from "../components/footer"
import Head from "next/head"
import { useRouter } from 'next/router'
import useLogout from "../hooks/useLogout"
import { useState, useEffect } from "react"
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"

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
    
    function addTask(energyLevel, timeOfDay, newTask) {
        if (!newTask.trim()) return

        const updatedRoutine = {...routine}

        if (!updatedRoutine[energyLevel][timeOfDay]) {
            updatedRoutine[energyLevel][timeOfDay] = []
        }

        updatedRoutine[energyLevel][timeOfDay].push({ task: newTask })

        setRoutine(updatedRoutine)
        localStorage.setItem("temporaryRoutine", JSON.stringify(updatedRoutine))
    }

    function renderAddTask(energyLevel, timeOfDay) {
        const [newTask, setNewTask] = useState("")

        return (
            <div>
                <input
                    type="text"
                    placeholder="Add new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={() => {
                    addTask(energyLevel, timeOfDay, newTask)
                    setNewTask("")
                }}>Add Task</button>
            </div>
        )
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
            <ul>
                {tasks.map((taskObj, index) => (
                    <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {editingTask === taskObj.task ? (
                            <input
                                type="text"
                                defaultValue={taskObj.task}
                                onBlur={(e) => updateTask(energyLevel, timeOfDay, index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, energyLevel, timeOfDay, index)}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => handleEdit(taskObj.task)} style={{ cursor: "pointer" }}>
                                {taskObj.task}
                            </span>
                        )}
                        <button onClick={() => deleteTask(energyLevel, timeOfDay, index)}>delete</button>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <>
            <Head>
                <title>Routine Review</title>
            </Head>

            <Header 
                isLoggedIn={props.isLoggedIn}
            />

            <main>
                <h1>Review Your Generated Routines</h1>
                <>
                <div>
                    {routine ? (
                        <div>
                            <h2>Low Energy Routine</h2>
                            <h3>Morning</h3>
                            {renderTasks(routine.lowEnergy.morning, "lowEnergy", "morning")}
                            {renderAddTask("lowEnergy", "morning")}
                            <h3>Afternoon</h3>
                            {renderTasks(routine.lowEnergy.afternoon, "lowEnergy", "afternoon")}
                            {renderAddTask("lowEnergy", "afternoon")}
                            <h3>Evening</h3>
                            {renderTasks(routine.lowEnergy.evening, "lowEnergy", "evening")}
                            {renderAddTask("lowEnergy", "evening")}
                            <h3>Night</h3>
                            {renderTasks(routine.lowEnergy.night, "lowEnergy", "night")}
                            {renderAddTask("lowEnergy", "night")}

                            <h2>Medium Energy Routine</h2>
                            <h3>Morning</h3>
                            {renderTasks(routine.mediumEnergy.morning, "mediumEnergy", "morning")}
                            {renderAddTask("mediumEnergy", "morning")}
                            <h3>Afternoon</h3>
                            {renderTasks(routine.mediumEnergy.afternoon, "mediumEnergy", "afternoon")}
                            {renderAddTask("mediumEnergy", "afternoon")}
                            <h3>Evening</h3>
                            {renderTasks(routine.mediumEnergy.evening, "mediumEnergy", "evening")}
                            {renderAddTask("mediumEnergy", "evening")}
                            <h3>Night</h3>
                            {renderTasks(routine.mediumEnergy.night, "mediumEnergy", "night")}
                            {renderAddTask("mediumEnergy", "night")}
                            <h2>High Energy Routine</h2>
                            <h3>Morning</h3>
                            {renderTasks(routine.highEnergy.morning, "highEnergy", "morning")}
                            {renderAddTask("highEnergy", "morning")}
                            <h3>Afternoon</h3>
                            {renderTasks(routine.highEnergy.afternoon, "highEnergy", "afternoon")}
                            {renderAddTask("highEnergy", "afternoon")}
                            <h3>Evening</h3>
                            {renderTasks(routine.highEnergy.evening, "highEnergy", "evening")}
                            {renderAddTask("highEnergy", "evening")}
                            <h3>Night</h3>
                            {renderTasks(routine.highEnergy.night, "highEnergy", "night")}
                            {renderAddTask("highEnergy", "night")}
                        </div>
                    ) : (
                        <p>Loading routine...</p>
                    )}
                </div>
                <button onClick={saveRoutine}>Save Routines</button>
                </>
            </main>
            <Footer />
        </>
    )
}