import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";
import db from "../../../db";

export default withIronSessionApiRoute(
    function handler(req, res) {
        switch(req.query.action) {
            case 'create':
                return create(req,res)
            default:
                return res.status(404).end()
        }
    },
    sessionOptions
)

async function create(req, res) {
    // try {
    //     const questions = await db.quiz.getAllQuestions()
    //     if (!questions) throw new Error ('no questions found')

    //     return res.status(200).json(questions)
    // } catch(err) {
    //     res.status(400).json({error: err.message})
    // }
}