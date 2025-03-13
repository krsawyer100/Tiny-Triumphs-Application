import { Schema, model, models } from "mongoose";

const TemporaryRoutineSchema = new Schema({
    sessionId: { 
        type: String, 
        required: true 
    },
    routineData: {
        lowEnergy: { 
            morning: [{type: String}], 
            afternoon: [{type: String}], 
            evening: [{type: String}], 
            night: [{type: String}] 
        },
        mediumEnergy: { 
            morning: [{type: String}], 
            afternoon: [{type: String}], 
            evening: [{type: String}], 
            night: [{type: String}] 
        },
        highEnergy: { 
            morning: [{type: String}], 
            afternoon: [{type: String}], 
            evening: [{type: String}], 
            night: [{type: String}] 
        }
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 86400 
    }
});

export default models.TemporaryRoutine || model("TemporaryRoutine", TemporaryRoutineSchema);