import { Schema, model, models } from "mongoose";

const RoutineSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: "User"
     },
    lowEnergy: {
        morning: [String],
        afternoon: [String],
        evening: [String],
        night: [String],
    },
    mediumEnergy: {
        morning: [String],
        afternoon: [String],
        evening: [String],
        night: [String],
    },
    highEnergy: {
        morning: [String],
        afternoon: [String],
        evening: [String],
        night: [String],
    }
})


export default models.Routine || model("Routine", RoutineSchema);