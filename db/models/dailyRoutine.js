import mongoose from "mongoose"; 
const { Schema, model, models } = mongoose;
import TaskSchema from "./task.js";

const DailyRoutineSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        unique: false
    },
    energyLevel: {
        type: String,
        enum: ["lowEnergy", "mediumEnergy", "highEnergy"],
        required: true
    },
    routine: {
        morning: [TaskSchema],
        afternoon: [TaskSchema],
        evening: [TaskSchema],
        night: [TaskSchema]
    }
})

export default models.DailyRoutine || model("DailyRoutine", DailyRoutineSchema)