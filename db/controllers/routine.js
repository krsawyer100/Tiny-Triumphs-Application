import GeneratedRoutine from '../models/generatedRoutine';
import DailyRoutine from '../models/dailyRoutine';
import dbConnect from './util/connection';
import mongoose from 'mongoose';

export async function createRoutines(userId, temporaryRoutine) {
    await dbConnect();

    try {
        console.log("raw user Id:", userId)

        const validUserId = new mongoose.Types.ObjectId(userId)

        const newRoutines = await GeneratedRoutine.create({
            userId: validUserId,
            routine: temporaryRoutine
        });

        console.log("Generated Routines: ", newRoutines)

        return newRoutines
    } catch (error) {
        console.error("Error creating routine:", error);
        throw new Error("Could not create routine");
    }
}

export async function getRoutines(userId) {
    await dbConnect()

    try {
        console.log("userId: ", userId)
        if (!userId) {
            throw new Error ("no user found")
        }

        const validUserId = new mongoose.Types.ObjectId(userId)

        const generatedRoutines = await GeneratedRoutine.findOne({ userId: validUserId })

        console.log("controller generated routines: ", generatedRoutines)

        if (!generatedRoutines) {
            throw new Error("no generated routines found")
        }

        return generatedRoutines
    } catch (err) {
        console.error("error getting routines", err)
    }
}

export async function createDailyRoutine(userId, energyLevel, date) {
    await dbConnect()

    try {
        const newEnergyLevel = userId.energyLevel
        const newUserId = userId.userId
        const newDate = userId.date
        
        const validUserId = new mongoose.Types.ObjectId(newUserId)

        const targetDate = new Date(`${newDate}T00:00:00.000Z`);

        const existingRoutine = await DailyRoutine.findOne({ userId: validUserId, date: targetDate })
        if (existingRoutine) {
            return existingRoutine
        }

        const generatedRoutine = await GeneratedRoutine.findOne({ userId: validUserId })

        if (!generatedRoutine) {
            throw new Error("no routines found for the user")
        }

        if (!["lowEnergy", "mediumEnergy", "highEnergy"].includes(newEnergyLevel)) {
            throw new Error("invalid energy level selected")
        }

        const selectedRoutine = generatedRoutine.routine[newEnergyLevel]

        const newRoutine = await DailyRoutine.create({
            userId: validUserId,
            date: targetDate,
            energyLevel: newEnergyLevel,
            routine: selectedRoutine
        })
        console.log("Daily Routine: ", newRoutine)
        return newRoutine

    } catch (err) {
        console.error("error creating daily routine: ", err)
    }
}

export async function getDailyRoutine(userId, date) {
    await dbConnect()

    try {
        if (!userId) {
            throw new Error('User is required')
        }

        const validUserId = new mongoose.Types.ObjectId(userId);

        const targetDate = new Date(`${date}T00:00:00.000Z`);
        
        const routine = await DailyRoutine.findOne({ userId: validUserId, date: targetDate })

        return routine || null
    } catch (err) {
        console.error("Error fetching daily routine: ", err)
    }
}

export async function editDailyRoutine(userId, date, timeOfDay, taskIndex, updatedTask) {
    await dbConnect()

    try {
        const validUserId = new mongoose.Types.ObjectId(userId);
        const targetDate = new Date(`${date}T00:00:00.000Z`);

        const routine = await DailyRoutine.findOne({ userId: validUserId, date: targetDate });
        if (!routine) throw new Error("Daily routine not found");

        routine.routine[timeOfDay][taskIndex] = {
            ...routine.routine[timeOfDay][taskIndex]._doc,
            ...updatedTask
        };

        await routine.save();
        return routine;
    } catch (err) {
        console.error("Error editing daily routine task:", err);
        throw err;
    }
}
