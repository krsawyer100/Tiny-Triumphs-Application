import Head from "next/head"
import { useRouter } from 'next/router'
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import useLogout from "../hooks/useLogout"
import { useState, useEffect } from "react"
import DashboardHeader from "../components/dashboardHeader"

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

export default function Settings(props) {
    const router = useRouter()
    const logout = useLogout()
    const userId = props.user._id
    const [{ firstName, lastName, username, email, password }, setForm] = useState({
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        username: props.user.username,
        email: props.user.email
    })
    const [error, setError] = useState('')
    const [confirm, setConfirm] = useState('')

    const [generatedRoutine, setGeneratedRoutine] = useState(null)
    const [newTaskInput, setNewTaskInput] = useState({})
    const [editingTask, setEditingTask] = useState(null)

    useEffect(() => {
        fetchRoutines()
    }, [userId])

    async function fetchRoutines() {
        try {
            const res = await fetch('/api/routine/get-routine', {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (res.ok) {
                const data = await res.json()
                console.log("Generated Routines: ", data.routine)
                setGeneratedRoutine(data.routine)
            } else {
                console.error("failed to fetch generated routines")
            }
        } catch (err) {
            console.error("Error fetching routine: ", err)
        }
    }

    function handleNewTaskChange(e, energyLevel, timeOfDay) {
        setNewTaskInput(prev => ({
            ...prev, 
            [`${energyLevel}-${timeOfDay}`]: e.target.value
        }))
    }

    function handleChange(e) {
        setForm(prevForm => ({
            ...prevForm,
            [e.target.name]: e.target.value
        }))
    }

    async function handleUpdate(e) {
        e.preventDefault()
        const userId = props.user._id

        try {
            const res = await fetch('/api/user/update', {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({userId, firstName, lastName, username, email})
            })

            if (res.status === 200) {
                setConfirm('User updated successfully')
                return confirm
            }

            const { error: message } = await res.json()
            setError(message)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function handleDelete() {
        const userId = props.user._id
        console.log('userid: ', userId)

        try {
            const res = await fetch('/api/user/delete', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({userId})
            })

            if (res.status === 200) {
                setConfirm('User deleted successfully')
                return router.push('/')
            } else {
                console.error('Delete failed')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async function addTask(energyLevel, timeOfDay, newTask) {
        if (!newTask) return

        try {
            const res = await fetch('/api/routine/add-task', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ userId, energyLevel, timeOfDay, task: newTask })
            })

            if (res.ok) {
                const updatedRoutine = await res.json()
                setGeneratedRoutine(updatedRoutine.routine)
                setNewTaskInput(prev => ({
                    ...prev,
                    [`${energyLevel}-${timeOfDay}`]: ""
                }))
            }
        } catch (err) {
            console.error("Error adding task: ", err)
        }
    }

    async function editTask(energyLevel, timeOfDay, taskIndex, updatedTask) {
        try {
            const res = await fetch('/api/routine/edit-task', {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ userId, energyLevel, timeOfDay, taskIndex, updatedTask })
            })

            if (res.ok) {
                const updatedRoutine = await res.json()
                setGeneratedRoutine(updatedRoutine.routine)
                setEditingTask(null)
            }
        } catch (err) {
            console.error("error editing task: ", error)
        }
    }

    function handleEdit(taskKey) {
        setEditingTask(taskKey)
    }

    function handleKeyDown(e, energyLevel, timeOfDay, taskIndex) {
        if (e.key === "Enter") {
            editTask(energyLevel, timeOfDay, taskIndex, e.target.value)
        }
    }

    async function deleteTask(energyLevel, timeOfDay, taskIndex) {
        console.log("Deleting task with: ", { userId, energyLevel, timeOfDay, taskIndex })
        try {
            const res = await fetch('/api/routine/delete-task', {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ userId, energyLevel, timeOfDay, taskIndex })
            })

            if (res.ok) {
                const updatedRoutine = await res.json()
                console.log("updated routine: ", updatedRoutine.routine)
                setGeneratedRoutine(updatedRoutine.routine)
            }
        } catch (err) {
            console.error("error deleting task: ", err)
        }
    }

    function renderTasks(tasks, energyLevel, timeOfDay) {
        if (!tasks || tasks.length === 0) return <p>No tasks available</p>
        return ( 
            <ul>
                {tasks.map((task, index) => {
                    const taskKey = `${energyLevel}-${timeOfDay}-${index}`

                    return (
                        <li key={index}>
                            {editingTask === taskKey ? (
                                <input
                                    type="text"
                                    defaultValue={task.task}
                                    onBlur={(e) => editTask(energyLevel, timeOfDay, index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, energyLevel, timeOfDay, index)}
                                />
                            ) : (
                                <span onClick={() => handleEdit(taskKey)} style={{ curser: "pointer" }}>
                                    {task.task}
                                </span>
                            )}
                            <button onClick={() => deleteTask(energyLevel, timeOfDay, index)}>Delete</button>
                        </li>
                    )
                }
                )}
            </ul>
        )
    }
    function renderAddTask(energyLevel, timeOfDay) {

        return (
            <div>
                <label>Add Tasks here:</label>
                <input
                    type="text"
                    placeholder="Add new task"
                    value={newTaskInput[`${energyLevel}-${timeOfDay}`] || ""}
                    onChange={(e) => handleNewTaskChange(e, energyLevel, timeOfDay)}
                />
                <button onClick={() => {
                    const newTask = newTaskInput[`${energyLevel}-${timeOfDay}`]
                    addTask(energyLevel, timeOfDay, newTask)
                }}>Add Task</button>
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>{props.user.username}&apos;s Settings</title>
            </Head>

            <DashboardHeader username={props?.user?.username}/>

            <main>
                <h1>{props.user.username}&apos;s Settings</h1>
                {confirm && <p>{confirm}</p>}
                <h2>User Information</h2>
                <form onSubmit={handleUpdate}>
                    <label htmlFor="firstName">First Name: </label>
                    <input 
                        type="text"
                        name='firstName'
                        id='firstName'
                        onChange={handleChange}
                        value={firstName}
                    />
                    <label htmlFor="lastName">Last Name: </label>
                    <input 
                        type="text"
                        name='lastName'
                        id='lastName'
                        onChange={handleChange}
                        value={lastName}
                    />
                    <label htmlFor="username">Username: </label>
                    <input 
                        type="text"
                        name='username'
                        id='username'
                        onChange={handleChange}
                        value={username}
                    />
                    <label htmlFor="email">Email: </label>
                    <input 
                        type="email"
                        name='email'
                        id='email'
                        onChange={handleChange}
                        value={email}
                    />
                    {error && <p>{error}</p>}
                    <button>Update Information</button>
                </form>
                <button onClick={handleDelete}>Delete Account</button>
                <h2>Edit Routines</h2>
                <div>
                {generatedRoutine ? (
                    <div>
                        <div>
                            <h3>Low Energy Routine</h3>
                            <h4>Morning</h4>
                            {renderTasks(generatedRoutine.routine.lowEnergy.morning, "lowEnergy", "morning")}
                            {renderAddTask("lowEnergy", "morning")}
                            <h4>Afternoon</h4>
                            {renderTasks(generatedRoutine.routine.lowEnergy.afternoon, "lowEnergy", "afternoon")}
                            {renderAddTask("lowEnergy", "afternoon")}
                            <h4>Evening</h4>
                            {renderTasks(generatedRoutine.routine.lowEnergy.evening, "lowEnergy", "evening")}
                            {renderAddTask("lowEnergy", "evening")}
                            <h4>Night</h4>
                            {renderTasks(generatedRoutine.routine.lowEnergy.night, "lowEnergy", "night")}
                            {renderAddTask("lowEnergy", "night")}
                        </div>
                        <div>
                        <h3>Medium Energy Routine</h3>
                            <h4>Morning</h4>
                            {renderTasks(generatedRoutine.routine.mediumEnergy.morning, "mediumEnergy", "morning")}
                            {renderAddTask("mediumEnergy", "morning")}
                            <h4>Afternoon</h4>
                            {renderTasks(generatedRoutine.routine.mediumEnergy.afternoon, "mediumEnergy", "afternoon")}
                            {renderAddTask("mediumEnergy", "afternoon")}
                            <h4>Evening</h4>
                            {renderTasks(generatedRoutine.routine.mediumEnergy.evening, "mediumEnergy", "evening")}
                            {renderAddTask("mediumEnergy", "evening")}
                            <h4>Night</h4>
                            {renderTasks(generatedRoutine.routine.mediumEnergy.night, "mediumEnergy", "night")}
                            {renderAddTask("mediumEnergy", "night")}
                        </div>
                        <div>
                        <h3>High Energy Routine</h3>
                            <h4>Morning</h4>
                            {renderTasks(generatedRoutine.routine.highEnergy.morning, "highEnergy", "morning")}
                            {renderAddTask("highEnergy", "morning")}
                            <h4>Afternoon</h4>
                            {renderTasks(generatedRoutine.routine.highEnergy.afternoon, "highEnergy", "afternoon")}
                            {renderAddTask("highEnergy", "afternoon")}
                            <h4>Evening</h4>
                            {renderTasks(generatedRoutine.routine.highEnergy.evening, "highEnergy", "evening")}
                            {renderAddTask("highEnergy", "evening")}
                            <h4>Night</h4>
                            {renderTasks(generatedRoutine.routine.highEnergy.night, "highEnergy", "night")}
                            {renderAddTask("highEnergy", "night")}
                        </div>
                    </div>
                    ) : (
                        <p>Loading routine...</p>
                    )}
                </div>
            </main>
        </div>
    )
}