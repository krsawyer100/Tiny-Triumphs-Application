import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";
import db from "../../../db";
import dbConnect from "../../../db/controllers/util/connection";

export default withIronSessionApiRoute(
    function handler(req, res) {
        switch(req.query.action) {
            case 'create-routine':
                return createRoutines(req,res)
            case 'get-routine':
                return getRoutines(req, res)
            case 'create-daily-routine':
                return createDailyRoutine(req,res)
            case 'get-daily-routine':
                return getDailyRoutine(req, res)
            case 'toggle-task':
                return toggleTaskCompletion(req, res)
            case 'add-task':
                return addTask(req, res)
            case 'edit-task':
                return editTask(req, res)
            case 'delete-task':
                    return deleteTask(req, res)
            default:
                return res.status(404).end()
        }
    },
    sessionOptions
)

async function createRoutines(req, res) {
    await dbConnect();

    try {
        const userId = req.session.user?._id;
        const { temporaryRoutine } = req.body;

        if (!userId) {
            return res.status(302).json({ redirect: "/signup" })
        } 
        
        if (!temporaryRoutine) {
            return res.status(302).json({ redirect: "/quiz" })
        }

        console.log("userId: ", userId)
        console.log("temporary routine: ", temporaryRoutine)

        const newRoutine = await db.routine.createRoutines(userId, temporaryRoutine)

        return res.status(201).json({ message: "Routine saved successfully", routine: newRoutine, redirect: "/dashboard" });
    } catch (error) {
        console.error("Error saving routine:", error);
    }
}

async function getRoutines(req, res) {
    await dbConnect()

    try {
        const userId = req.session.user?._id

        if (!userId) {
            return res.status(401).json({redirect: "/login"})
        }

        const routine = await db.routine.getRoutines(userId)

        return res.status(200).json({ routine })
    } catch (err) {
        console.error("error fetching generated routines: ", err)
    }
}

async function createDailyRoutine(req, res) {
    await dbConnect();

    try {
        const userId = req.session.user?._id
        const { energyLevel, date } = req.body

        console.log("📌 API Received userId:", userId);
        console.log("📌 API Received energyLevel:", energyLevel);
        console.log("📌 API Received date:", date);

        if (!userId) {
            return res.status(401).json({redirect: "/login"})
        }

        if (!date) {
            console.error("missing date in request body")
            return res.status(400).json({ message: "date is required" })
        }
        
        const routine = await db.routine.createDailyRoutine({ userId, energyLevel, date })

        return res.status(201).json({ routine })
    } catch (err) {
        console.error("error fetching daily routine: ", err)
    }

}

async function getDailyRoutine(req, res) {
    await dbConnect()

    try {
        const userId = req.session.user?._id
        const { date } = req.query

        if (!userId) {
            return res.status(401).json({redirect: "/login"})
        }
        
        const routine = await db.routine.getDailyRoutine(userId, date)

        if (!routine) {
            return res.json({routine: null})
        }

        return res.json({ routine })
    } catch (err) {
        console.error("error getting daily routine: ", err)
    }
}

async function toggleTaskCompletion(req, res) {
    await dbConnect()

    try {
        console.log("req.body: ", req.body)
        const { userId, date, timeOfDay, taskIndex } = req.body

        if (!userId || !date || !timeOfDay || taskIndex === undefined) {
            return res.status(400).json({message: "missing required parameters"})
        }

        const updatedRoutine = await db.task.toggleTaskCompletion(userId, date, timeOfDay, taskIndex)

        if (!updatedRoutine) {
            return res.status(500).json({ message: "Routine update failed" })
        }

        console.log("updated routine: ", updatedRoutine)

        return res.json({ routine: updatedRoutine })
    } catch (err) {
        console.error("Error toggling task completion: ", err)
    }
}

async function addTask(req, res) {
    await dbConnect()

    try {
        const userId = req.session.user?._id
        const { energyLevel, timeOfDay, task } = req.body

        if (!userId) {
            return res.status(401).json({ redirect: "/login" })
        }

        const updatedRoutine = await db.task.addTask(userId, energyLevel, timeOfDay, task)

        return res.status(201).json({ message: "task added successfully", routine: updatedRoutine })
    } catch (err) {
        console.error("error adding task: ", err)
        return res.status(500)
    }
}

async function editTask(req, res) {
    await dbConnect()

    try {
        const userId = req.session.user?._id
        const { energyLevel, timeOfDay, taskIndex, updatedTask } = req.body

        if (!userId) {
            return res.status(401).json({ redirect: "/login" })
        }

        const updatedRoutine = await db.task.editTask(userId, energyLevel, timeOfDay, taskIndex, updatedTask)

        return res.status(200).json({ message: "task updated successfully", routine: updatedRoutine })
    } catch (err) {
        console.error("error editing task: ", err)
        return res.status(500)
    }
}

async function deleteTask(req, res) {
    await dbConnect()

    try {
        const userId = req.session.user?._id
        const { energyLevel, timeOfDay, taskIndex } = req.body

        if (!userId) {
            return res.status(401).json({ redirect: "/login" })
        }

        const updatedRoutine = await db.task.deleteTask(userId, energyLevel, timeOfDay, taskIndex)

        console.log("updated routine from api: ", updatedRoutine)

        return res.status(201).json({ message: "task deleted successfully", routine: updatedRoutine })
    } catch (err) {
        console.error("error deleting task: ", err)
        return res.status(500)
    }
}