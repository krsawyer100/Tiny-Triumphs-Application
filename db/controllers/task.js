import dbConnect from "./util/connection";
import DailyRoutine from "../models/dailyRoutine"
import GeneratedRoutine from "../models/generatedRoutine"
import mongoose from "mongoose";

export async function toggleTaskCompletion(userId, date, timeOfDay, taskIndex) {
    await dbConnect()

    try {
        console.log("🔍 Debugging toggleTaskCompletion");
        console.log("Raw userId before conversion: ", userId);
        console.log("Received date:", date);
        console.log("Received timeOfDay:", timeOfDay);
        console.log("Received taskIndex:", taskIndex);

        if (!userId || !date || !timeOfDay || taskIndex === undefined) {
            throw new Error("missing required parameters")
        }

        const validUserId = new mongoose.Types.ObjectId(userId)
        const targetDate = new Date(`${date}T00:00:00.000Z`);

        console.log("Searching for routine with:");
        console.log("UserId:", validUserId);
        console.log("TargetDate: (no time component): ", targetDate);

        const routine = await DailyRoutine.findOne({ userId: validUserId, date: targetDate })

        if (!routine) {
            throw new Error("Daily routine not found")
        }

        console.log("✅ Routine found:", routine);


        if (!routine.routine[timeOfDay] || !routine.routine[timeOfDay][taskIndex]) {
            throw new Error(`❌ Task at index ${taskIndex} for ${timeOfDay} not found`);
        }

        routine.routine[timeOfDay][taskIndex].completed = !routine.routine[timeOfDay][taskIndex].completed
        await routine.save()

        console.log("task status toggled successfully")
        return routine
    } catch (err) {
        console.error("Error toggling task completion: ", err)
    }
}

export async function addTask(userId, energyLevel, timeOfDay, task) {
    await dbConnect()

    try {
        if (!userId || !energyLevel || !timeOfDay || !task) {
            throw new Error("missing required information")
        }

        const validUserId = new mongoose.Types.ObjectId(userId)
        let routine = await GeneratedRoutine.findOne({ userId: validUserId })

        if (!routine) {
            throw new Error("generated routines not found")
        }

        routine.routine[energyLevel][timeOfDay].push({ task, completed: false })
        await routine.save()

        return routine
    } catch (err) {
        console.error("error adding task: ", err)
    }
}

export async function editTask(userId, energyLevel, timeOfDay, taskIndex, updatedTask) {
    await dbConnect()

    try {
        if (!userId || !energyLevel || !timeOfDay || taskIndex === undefined || !updatedTask) {
            throw new Error("Missing required information")
        }

        const validUserId = new mongoose.Types.ObjectId(userId)
        let routine = await GeneratedRoutine.findOne({ userId: validUserId })

        if (!routine) {
            throw new Error ("generated routines not found")
        }

        if (!routine.routine[energyLevel][timeOfDay][taskIndex]) {
            throw new Error("task not found")
        }

        routine.routine[energyLevel][timeOfDay][taskIndex].task = updatedTask
        await routine.save()

        return routine
    } catch (err) {
        console.error("error editing task: ", err)
    }
}

export async function deleteTask(userId, energyLevel, timeOfDay, taskIndex) {
    await dbConnect()

    try {
        if (!userId || !energyLevel || !timeOfDay || taskIndex === undefined) {
            throw new Error("Missing required information")
        }

        const validUserId = new mongoose.Types.ObjectId(userId)
        const routine = await GeneratedRoutine.findOne({ userId: validUserId })

        if (!routine) {
            throw new Error ("generated routines not found")
        }

        console.log("Routine structure: ", JSON.stringify(routine.routine, null, 2))
        console.log("Attemping to delete task at: ", energyLevel, timeOfDay, taskIndex)

        if (!routine.routine[energyLevel][timeOfDay][taskIndex]) {
            throw new Error("task not found")
        }

        routine.routine[energyLevel][timeOfDay].splice(taskIndex, 1) 
        await routine.save()

        return routine
    } catch (err) {
        console.error("error deleting task: ", err)
    }
}