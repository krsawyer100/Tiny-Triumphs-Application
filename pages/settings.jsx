import Head from "next/head"
import { useRouter } from 'next/router'
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import useLogout from "../hooks/useLogout"
import { useState, useEffect, useRef } from "react"
import DashboardHeader from "../components/dashboardHeader"
import Cropper from 'react-easy-crop'
import getCroppedImg from '../utils/cropImage.js'
import Image from "next/image.js"
import styles from "../public/styles/Settings.module.css"


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
    const [profilePhoto, setProfilePhoto] = useState(props.user?.profilePhoto || "/images/account-icon-blue.png");
    const [{ firstName, lastName, username, email }, setForm] = useState({
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        username: props.user.username,
        email: props.user.email
    })
    const [error, setError] = useState('')
    const [confirm, setConfirm] = useState('')

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordSuccess, setPasswordSuccess] = useState('')

    const [generatedRoutine, setGeneratedRoutine] = useState(null)
    const [newTaskInput, setNewTaskInput] = useState({})
    const [editingTask, setEditingTask] = useState(null)
    const [message, setMessage] = useState("")

    const [selectedImage, setSelectedImage] = useState(null)
    const [crop, setCrop] = useState({x:0, y:0})
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)
    const [rotation, setRotation] = useState(0)
    const fileInputRef = useRef(null)

    const cropperRef = useRef(null)
    const cropAreaRef = useRef(null)

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

    function handleMessage(e) {
        e.preventDefault()
        setMessage("Routines Saved Successfully")
        setTimeout(() => {
            setMessage("")
        }, 5000)
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
                setTimeout(() => {
                    setConfirm("")
                }, 5000)
            }

            const { error: message } = await res.json()
            setError(message)
            setTimeout(() => {
                setError("")
            }, 5000)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function handlePasswordUpdate(e) {
        e.preventDefault()

        try {
            const res = await fetch('/api/user/update-password', {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({oldPassword, newPassword, confirmPassword})
            })

            const data = await res.json()

            if (res.ok) {
                setPasswordSuccess(data.message)
                setPasswordError('')
                setOldPassword('')
                setNewPassword('')
                setConfirmPassword('')
                setTimeout(() => {
                    setPasswordSuccess("")
                }, 5000)
            } else {
                setPasswordError(data.error)
                setPasswordSuccess('')
                setTimeout(() => {
                    setPasswordError("")
                }, 5000)
            }

        } catch (err) {
            console.error('Error updating password:', error)
            setPasswordError('An unexpected error occurred.')
            setPasswordSuccess('')
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
            <div>
                {tasks.map((task, index) => {
                    const taskKey = `${energyLevel}-${timeOfDay}-${index}`

                    return (
                        <p key={index} className={styles.task}>
                            {editingTask === taskKey ? (
                                <input
                                    type="text"
                                    defaultValue={task.task}
                                    onBlur={(e) => editTask(energyLevel, timeOfDay, index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, energyLevel, timeOfDay, index)}
                                    autoFocus
                                />
                            ) : (
                                <span onClick={() => handleEdit(taskKey)} onFocus={(e) => {
                                    e.preventDefault()
                                    handleEdit(taskKey)
                                }} style={{ curser: "pointer" }} tabIndex={0}>
                                    {task.task}
                                </span>
                            )}
                            <button aria-label="delete task" className={styles.deleteTaskBtn} onClick={() => deleteTask(energyLevel, timeOfDay, index)}>
                                <Image
                                    src="/images/delete-icon.png"
                                    alt=""
                                    width={25}
                                    height={25}
                                    className={styles.deleteBtnIcon}
                                />
                            </button>
                        </p>
                    )
                }
                )}
            </div>
        )
    }
    function renderAddTask(energyLevel, timeOfDay) {

        return (
            <div className={styles.addTaskContainer}>
                <input
                    type="text"
                    placeholder="Add new task"
                    value={newTaskInput[`${energyLevel}-${timeOfDay}`] || ""}
                    onChange={(e) => handleNewTaskChange(e, energyLevel, timeOfDay)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            const newTask = newTaskInput[`${energyLevel}-${timeOfDay}`]
                    addTask(energyLevel, timeOfDay, newTask)
                        }
                    }}
                />
                <button aria-label="add task" className={styles.addTaskBtn} onClick={() => {
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

    function onFileChange(e) {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setSelectedImage(reader.result)
            reader.readAsDataURL(file)
        }
    }

    async function showCroppedImage() {
        try {

            if (!selectedImage || !croppedAreaPixels) {
                console.error('Missing required data for cropping');
                return;
            }

            const croppedImg = await getCroppedImg(selectedImage, croppedAreaPixels, rotation)
            console.log('Cropped Image URL:', croppedImg);

            setCroppedImage(croppedImg)
            await uploadImageToServer(croppedImg)

            setRotation(0);
            setZoom(1);
            setSelectedImage(null);
            setCroppedAreaPixels(null);
        } catch (err) {
            console.error('Error in showCroppedImage: ', err)
        }
    }

    async function uploadImageToServer(croppedImageUrl) {
        const blob = await fetch(croppedImageUrl).then(res => res.blob());

        const signatureRes = await fetch('api/user/cloudinary-signature')
        const {
            timestamp,
            signature,
            folder,
            public_id,
            apiKey,
            cloudName,
        } = signatureRes.json()

        const formData = new FormData()
        formData.append('file', blob)
        formData.append('api_key', apiKey)
        formData.append('timestamp', timestamp)
        formData.append('signature', signature)
        formData.append('folder', folder)
        formData.append('public_id', public_id)

        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        })

        const data = await uploadRes.json()

        const updatedRes = await fetch('/api/user.update-profile-photo', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ filePath: data.secure_url })
        })

        if (updatedRes.ok) {
            setProfilePhoto(data.secure_url)
        } else {
            console.error("Failed to update user photo in DB")
        }

        // const formData = new FormData();
        // formData.append('file', blob);
        // formData.append('rotation', rotation)
    
        // try {
        //     const res = await fetch('/api/user/upload-photo', {
        //         method: 'POST',
        //         body: formData,
        //     });
    
        //     if (res.ok) {
        //         const data = await res.json();
        //         console.log('Upload success: ', data);
        //         setProfilePhoto(data.filePath);
        //         setSelectedImage(null);
        //     } else {
        //         console.error('Upload failed');
        //     }
        // } catch (error) {
        //     console.error('Error uploading image: ', error);
        // }
    }

    function handleCropKeyDown(e) {
        const moveAmount = e.shiftKey ? 10 : 1;
      
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            setCrop((prev) => ({ ...prev, y: prev.y - moveAmount }));
            break;
          case "ArrowDown":
            e.preventDefault();
            setCrop((prev) => ({ ...prev, y: prev.y + moveAmount }));
            break;
          case "ArrowLeft":
            e.preventDefault();
            setCrop((prev) => ({ ...prev, x: prev.x - moveAmount }));
            break;
          case "ArrowRight":
            e.preventDefault();
            setCrop((prev) => ({ ...prev, x: prev.x + moveAmount }));
            break;
          default:
            break;
        }
      }

      useEffect(() => {
        if (selectedImage && cropAreaRef.current) {
          cropAreaRef.current.focus()
        }
      }, [selectedImage])

      useEffect(() => {
        if (!selectedImage) return;
      
        const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
      
        const cropper = cropperRef.current;
        const cropArea = cropAreaRef.current;
        if (!cropper || !cropArea) return;
      
    
        const cropperItems = Array.from(cropper.querySelectorAll(focusableSelector));
      
        const focusables = [cropArea, ...cropperItems];
      
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
      
        function handleTab(e) {
          if (e.key !== 'Tab') return;
      
          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      
        firstEl?.focus();
        document.addEventListener('keydown', handleTab);
      
        return () => {
          document.removeEventListener('keydown', handleTab);
        };
      }, [selectedImage]);
      
    return (
        <div>
            <Head>
                <title>{props.user.username}&apos;s Settings</title>
                <meta name="description" content="Manage your account settings, update your generated routines, and upload a profile photo." />
                <meta name="robots" content="noindex" />
            </Head>

            <DashboardHeader username={props?.user?.username} profilePhoto={profilePhoto}/>

            <main className={styles.main} role="main">
                <h1>{props.user.username}&apos;s Settings</h1>
                <section className={styles.userInformation}>
                    <h2>User Information</h2>
                    <div className={styles.userDetails}>
                        <div className={styles.userProfileImg}>
                            <label htmlFor="profilePhoto" className={styles.profilePhotoLabel}>Profile Photo:</label>
                            <Image
                                src={profilePhoto.startsWith('/uploads') ? profilePhoto : `/images/account-icon-blue.png`}
                                alt=""
                                width={150}
                                height={150}
                                className={styles.newProfilePhoto}
                            />
                            <input type="file" accept="image/*" onChange={onFileChange} ref={fileInputRef} style={{display: 'none'}}/>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className={styles.uploadBtn}
                            >
                                <Image
                                    src="/images/upload-icon.png"
                                    alt=""
                                    width={25}
                                    height={25}
                                    className={styles.uploadBtnIcon}
                                />
                                Upload Photo
                            </button>
                        </div>
                        <form onSubmit={handleUpdate} className={styles.updateUserForm}>
                            <div className={styles.firstName}>
                                <label htmlFor="firstName">First Name: </label>
                                <input 
                                    type="text"
                                    name='firstName'
                                    id='firstName'
                                    onChange={handleChange}
                                    value={firstName}
                                />
                            </div>
                            <div className={styles.lastName}>
                                <label htmlFor="lastName">Last Name: </label>
                                <input 
                                    type="text"
                                    name='lastName'
                                    id='lastName'
                                    onChange={handleChange}
                                    value={lastName}
                                />
                            </div>
                            <div className={styles.username}>
                                <label htmlFor="username">Username: </label>
                                <input 
                                    type="text"
                                    name='username'
                                    id='username'
                                    onChange={handleChange}
                                    value={username}
                                />
                            </div>
                            <div className={styles.email}>
                                <label htmlFor="email">Email: </label>
                                <input 
                                    type="email"
                                    name='email'
                                    id='email'
                                    onChange={handleChange}
                                    value={email}
                                />

                            </div>         
                            {error && <p className={styles.error}>{error}</p>}
                            {confirm && <p className={styles.confirm}>{confirm}</p>}
                            <button className={styles.saveBtn}>Update Information</button>
                        </form>
                    </div>
                    <div>
                        {selectedImage && (
                            <div className={styles.cropModal}>
                                <div className={styles.cropModalBorder} ref={cropperRef}>
                                    <div className={styles.imgContainer} tabIndex={0} role="region" aria-label="Image crop area. Use arrow keys to move the image." onKeyDown={handleCropKeyDown} ref={cropAreaRef}>
                                        <Cropper
                                            image={selectedImage}
                                            crop={crop}
                                            zoom={zoom}
                                            rotation={rotation}
                                            aspect={1}
                                            cropShape="round"
                                            showGrid={false}
                                            onCropChange={setCrop}
                                            onZoomChange={setZoom}
                                            onRotationChange={setRotation}
                                            onCropComplete={(_, croppedAreaPixels) => {
                                                console.log('Crop complete:', croppedAreaPixels);
                                                setCroppedAreaPixels(croppedAreaPixels)}
                                            }
                                        />
                                        <div
                                            role="slider"
                                            aria-valuetext={`Image position X: ${crop.x}, Y: ${crop.y}`}
                                            tabIndex="0"
                                            aria-label="Adjust image position"
                                            className={styles.keyboardCropControl}
                                            onKeyDown={(e) => {
                                                const step = 5
                                                    switch (e.key) {
                                                        case "ArrowUp":
                                                            setCrop((prev) => ({ ...prev, y: prev.y - step }))
                                                            break
                                                        case "ArrowDown":
                                                            setCrop((prev) => ({ ...prev, y: prev.y + step }))
                                                            break
                                                        case "ArrowLeft":
                                                            setCrop((prev) => ({ ...prev, x: prev.x - step }))
                                                            break
                                                        case "ArrowRight":
                                                            setCrop((prev) => ({ ...prev, x: prev.x + step }))
                                                            break
                                                        default:
                                                            break
                                                    }
                                            }}>
                                            {/* Screen reader only instructions */}
                                            <span className={styles.srOnly}>Use arrow keys to move the image left, right, up, or down.</span>
                                        </div>
                                    </div>
                                    <div className={styles.imageEditingBtns}>
                                        <button onClick={() => setRotation((prev) => prev - 90)} className={styles.rotationBtnLeft}>
                                            <Image
                                                src="/images/rotate-left-icon.png"
                                                alt="Rotate image left button"
                                                width={50}
                                                height={50}
                                                className={styles.rotationBtnImgLeft}
                                            />
                                        </button>
                                        <div className={styles.sliderContainer}>
                                            <label htmlFor="zoomSlider">Zoom:</label>
                                            <input
                                                id="zoomSlider"
                                                type="range"
                                                min={1}
                                                max={3}
                                                step={0.1}
                                                value={zoom}
                                                onChange={(e) => setZoom(e.target.value)}
                                                style={{ width: '60%' }}
                                            />
                                        </div>
                                        <button onClick={() => setRotation((prev) => prev + 90)} className={styles.rotationBtnRight}>
                                            <Image
                                                src="/images/rotate-right-icon.png"
                                                alt="Rotate image right button"
                                                width={50}
                                                height={50}
                                                className={styles.rotationBtnImgRight}
                                            />
                                        </button>
                                    </div>
                                    <div className={styles.btnsContainer}>
                                        <button onClick={() => setSelectedImage(null)} className={styles.modalBtn}>
                                            Cancel
                                        </button>
                                        <button onClick={() => showCroppedImage()} className={styles.modalBtn}>
                                            Save Crop
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <span className={styles.divider}></span>
                    <div className={styles.passwordContainer}>
                        <form onSubmit={handlePasswordUpdate} className={styles.passwordForm} id="passwordForm">
                            <div className={styles.oldPassword}>
                                <label htmlFor="oldPassword">Old Password:</label>
                                <input
                                    type="password"
                                    id="oldPassword" 
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className={styles.newPassword}>
                                <label htmlFor="newPassword">New Password:</label>
                                <input
                                    type="password"
                                    id="newPassword" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className={styles.confirmPassword}>
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input
                                    type="password"
                                    id="confirmPassword" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </form>
                        <div className={styles.formBtnsContainer}>
                            {passwordError && <p className={styles.passwordError}>{passwordError}</p>}
                            {passwordSuccess && <p className={styles.passwordSuccess}>{passwordSuccess}</p>}
                            <button className={styles.passwordBtn} type="submit" form="passwordForm">Update Password</button>
                            <button onClick={handleDelete} className={styles.deleteBtn}>Delete Account</button>
                        </div>
                    </div>

                </section>
                <section className={styles.routineInformation}>
                    <h2>Edit Routines</h2>
                    <div className={styles.routinesContainer}>
                    {generatedRoutine ? (
                        <div className={styles.routines}>
                            <div className={styles.routine}>
                                <h3>Low Energy Routine</h3>
                                <h4>
                                    <Image
                                        src="/images/morning-icon.png"
                                        alt=""
                                        width={30}
                                        height={30}
                                    />
                                    Morning
                                </h4>
                                {renderTasks(generatedRoutine.routine.lowEnergy.morning, "lowEnergy", "morning")}
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
                                {renderTasks(generatedRoutine.routine.lowEnergy.afternoon, "lowEnergy", "afternoon")}
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
                                {renderTasks(generatedRoutine.routine.lowEnergy.evening, "lowEnergy", "evening")}
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
                                {renderTasks(generatedRoutine.routine.lowEnergy.night, "lowEnergy", "night")}
                                {renderAddTask("lowEnergy", "night")}
                            </div>
                            <span className={styles.routineDivider}></span>
                            <div className={styles.routine}>
                                <h3>Medium Energy Routine</h3>
                                <h4>
                                    <Image
                                        src="/images/morning-icon.png"
                                        alt=""
                                        width={30}
                                        height={30}
                                    />
                                    Morning
                                </h4>
                                {renderTasks(generatedRoutine.routine.mediumEnergy.morning, "mediumEnergy", "morning")}
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
                                {renderTasks(generatedRoutine.routine.mediumEnergy.afternoon, "mediumEnergy", "afternoon")}
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
                                {renderTasks(generatedRoutine.routine.mediumEnergy.evening, "mediumEnergy", "evening")}
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
                                {renderTasks(generatedRoutine.routine.mediumEnergy.night, "mediumEnergy", "night")}
                                {renderAddTask("mediumEnergy", "night")}
                            </div>
                            <span className={styles.routineDivider}></span>
                            <div className={styles.routine}>
                                <h3>High Energy Routine</h3>
                                <h4>
                                    <Image
                                        src="/images/morning-icon.png"
                                        alt=""
                                        width={30}
                                        height={30}
                                    />
                                    Morning
                                </h4>
                                    {renderTasks(generatedRoutine.routine.highEnergy.morning, "highEnergy", "morning")}
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
                                    {renderTasks(generatedRoutine.routine.highEnergy.afternoon, "highEnergy", "afternoon")}
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
                                    {renderTasks(generatedRoutine.routine.highEnergy.evening, "highEnergy", "evening")}
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
                                    {renderTasks(generatedRoutine.routine.highEnergy.night, "highEnergy", "night")}
                                    {renderAddTask("highEnergy", "night")}
                                </div>
                                {message && (
                                    <p className={styles.message}>{message}</p>
                                )}
                                <button onClick={handleMessage} className={styles.saveRoutinesBtn}>Save Routines</button>
                            </div>
                        ) : (
                            <p>Loading routine...</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}