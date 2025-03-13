import QuizQuestion from '../models/quizQuestions';
import dbConnect from './util/connection';

export async function getAllQuestions() {
    await dbConnect();

    try {
        const questions = await QuizQuestion.find({});
        return questions;
    } catch (error) {
        console.error("Error fetching quiz questions:", error);
        throw new Error("Could not retrieve quiz questions");
    }
}