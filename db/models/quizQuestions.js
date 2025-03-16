import mongoose from "mongoose"; 
const { Schema, model, models } = mongoose;
import TaskSchema from "./task.js";


const QuizQuestionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    category: { type: String, required: true },
    answers: [
        {
            text: { type: String, required: true },
            tasks: {
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
        }
    ]
});

export default models.QuizQuestion || model("QuizQuestion", QuizQuestionSchema);
