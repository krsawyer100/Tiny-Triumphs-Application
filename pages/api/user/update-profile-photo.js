import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session"
import db from "../../../db"

export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end()

    const userId = req.session.user._id
    const { filePath } = req.body

    try {
        const updatedUser = await db.user.updateProfilePhoto(userId, filePath)
        req.session.user.profilePhoto = filePath
        await req.session.save()

        return res.status(200).json({ success: true, filePath })
    } catch (err) {
        console.error("Error saving profile photo: ", err)
        return res.status(500).json({error: err.message})
    }
}