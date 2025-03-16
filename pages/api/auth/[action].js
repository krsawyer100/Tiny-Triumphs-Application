import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";
import db from "../../../db";

export default withIronSessionApiRoute(
    function handler(req, res) {
        if (req.method !== 'POST')
            return res.status(404).end()
        switch(req.query.action) {
            case 'login':
                return login(req,res)
            case 'logout':
                return logout(req, res)
            case 'signup':
                return signup(req, res)
            default:
                return res.status(404).end()
        }
    },
    sessionOptions
)

async function login(req, res) {
    const { username, password } = req.body
    try {
        const {
            password: _,
            ...otherFields
        } = await db.auth.login(username, password)
        req.session.user = otherFields
        await req.session.save()
        res.redirect('/dashboard')
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

async function logout(req, res) {
    await req.session.destroy()
    res.status(200).end()
}

async function signup(req, res) {
    try {
        const {firstName, lastName, username, email, password, temporaryRoutine} = req.body

        console.log("temporary routine: ", temporaryRoutine)

        const {
            password: _,
            ...otherFields
        } = await db.user.create(firstName, lastName, username, email, password)
        req.session.user = otherFields

        await req.session.save()

        console.log("user created: ", req.session.user)
        
        if (temporaryRoutine) {
            const newRoutine = await db.routine.createRoutines(otherFields._id, temporaryRoutine)
            
            if (!newRoutine) throw new Error('error creating new routine: ', error)

            console.log("new routines created: ", newRoutine._id)

            return res.status(200).json({ redirect: "/dashboard" })
        } if (temporaryRoutine === null) {
            return res.status(200).json({ redirect: "/quiz" })
        }

    } catch(err) {
        res.status(400).json({error: err.message})
    }
}