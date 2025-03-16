import dbConnect from "./util/connection";
import DailyRoutine from "../models/dailyRoutine"
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