import { Schema, model, models } from "mongoose";
import TaskSchema from "./task";

const TemporaryRoutineSchema = new Schema({
    sessionId: { 
        type: String, 
        required: true 
    },
    routineData: {
        lowEnergy: { 
            morning: [TaskSchema], 
            afternoon: [TaskSchema], 
            evening: [TaskSchema], 
            night: [TaskSchema] 
        },
        mediumEnergy: { 
            morning: [TaskSchema], 
            afternoon: [TaskSchema], 
            evening: [TaskSchema], 
            night: [TaskSchema] 
        },
        highEnergy: { 
            morning: [TaskSchema], 
            afternoon: [TaskSchema], 
            evening: [TaskSchema], 
            night: [TaskSchema] 
        }
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 86400 
    }
});

export default models.TemporaryRoutine || model("TemporaryRoutine", TemporaryRoutineSchema);