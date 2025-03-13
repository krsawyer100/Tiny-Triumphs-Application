import { Schema, model, models } from "mongoose";
import TaskSchema from "./task";

const RoutineSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    lowEnergy: {
        morning: [TaskSchema],
        afternoon: [TaskSchema],
        evening: [TaskSchema],
        night: [TaskSchema],
    },
    mediumEnergy: {
        morning: [TaskSchema],
        afternoon: [{ 
            task: String, 
            completed: { 
                type: Boolean, 
                default: false 
            } 
        }],
        evening: [TaskSchema],
        night: [TaskSchema],
    },
    highEnergy: {
        morning: [TaskSchema],
        afternoon: [TaskSchema],
        evening: [TaskSchema],
        night: [TaskSchema],
    }
})


export default models.Routine || model("Routine", RoutineSchema);