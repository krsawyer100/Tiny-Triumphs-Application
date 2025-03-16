import { Schema, model, models } from "mongoose";
import TaskSchema from "./task";

const GeneratedRoutineSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    routine: {
        lowEnergy: {
            morning: [TaskSchema],
            afternoon: [TaskSchema],
            evening: [TaskSchema],
            night: [TaskSchema],
        },
        mediumEnergy: {
            morning: [TaskSchema],
            afternoon: [TaskSchema],
            evening: [TaskSchema],
            night: [TaskSchema],
        },
        highEnergy: {
            morning: [TaskSchema],
            afternoon: [TaskSchema],
            evening: [TaskSchema],
            night: [TaskSchema],
        }
    }
})

export default models.GeneratedRoutine || model("GeneratedRoutine", GeneratedRoutineSchema)