import { Schema, model, models } from "mongoose";
import TaskSchema from "./task";

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