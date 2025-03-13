import { Schema, model, models } from "mongoose";

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
                    morning: [{ type: String }],
                    afternoon: [{ type: String }],
                    evening: [{ type: String }],
                    night: [{ type: String }]
                },
                mediumEnergy: {
                    morning: [{ type: String }],
                    afternoon: [{ type: String }],
                    evening: [{ type: String }],
                    night: [{ type: String }]
                },
                highEnergy: {
                    morning: [{ type: String }],
                    afternoon: [{ type: String }],
                    evening: [{ type: String }],
                    night: [{ type: String }]
                }
            },
        }
    ]
});

export default models.QuizQuestion || model("QuizQuestion", QuizQuestionSchema);
