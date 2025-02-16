import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";
import db from "../../../db";

export default withIronSessionApiRoute(
    function handler(req, res) {
        switch(req.query.action) {
            case 'update':
                return updateUser(req,res)
            case 'delete':
                return deleteUser(req, res)
            default:
                return res.status(404).end()
        }
    },
    sessionOptions
)

async function updateUser(req, res) {
    const { firstName, lastName, username, email } = req.body
    const userId = req.session.user._id

    console.log('userid from update: ', userId)

    try {
        const updatedUser = await db.user.updateUser(userId, firstName, lastName, username, email)

        if (!updatedUser) {
            console.log('user not dounf in database')
            return res.status(404).json({error: 'user not found'})
        }

        req.session.user = updatedUser

        await req.session.save()

        console.log('user updated successfully: ', updatedUser)
        res.status(200).json(updatedUser)
    } catch(error) {
        console.error('error updating user: ', error)
        res.status(400).json({error: error.message})
    }
}

async function deleteUser(req, res) {
    const userId = req.session.user._id
    console.log('userid to delete: ', userId)
    console.log('session user: ', req.session.user)
    try {
        const deletedUser = await db.user.deleteUser(userId)

        if(!deletedUser) {
            console.log('failed to delete user')
            return res.status(404).json({error: 'user not found'})
        }

        console.log('user deleted: ', deletedUser)
        res.status(200).json({message: 'user deleted'})
    } catch (error) {
        console.error('error deleting user: ', error)
        return res.status(400).json({error:error.message})
    }
}