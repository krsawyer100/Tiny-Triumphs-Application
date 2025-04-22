import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";
import db from "../../../db";
import User from "../../../db/models/user.js"
import bcrypt from 'bcrypt'
import dbConnect from "../../../db/controllers/util/connection.js";

export default withIronSessionApiRoute(
    function handler(req, res) {
        switch(req.query.action) {
            case 'update':
                return updateUser(req,res)
            case 'update-password':
                return updatePassword(req, res)
            case 'delete':
                return deleteUser(req, res)
            case 'get-current':
                return getCurrentUserRoute(req, res)
            case 'theme':
                return updateTheme(req, res)
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
        req.session.destroy();
        res.status(200).json({message: 'user deleted'})
    } catch (error) {
        console.error('error deleting user: ', error)
        return res.status(400).json({error:error.message})
    }
}

async function getCurrentUserRoute(req, res) {
    const user = req.session.user;
  
    if (!user) {
        return res.status(401).json({ error: "Not authenticated" });
    }
  
    return res.status(200).json({ user });
}

async function updatePassword(req, res) {
    const userId = req.session.user._id
    const { oldPassword, newPassword, confirmPassword } = req.body

    if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required.' })
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'New passwords do not match.' })
    }

    try {
        const user = await db.user.findUserById(userId)

        if (!user) {
            return res.status(404).json({ error: 'User not found.' })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password)

        if (!isMatch) {
            return res.status(400).json({ error: 'Old password is incorrect.' })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await db.user.updateUserPassword(userId, hashedPassword)

        return res.status(200).json({ message: 'Password updated successfully.' })
    } catch (error) {
        console.error('Error updating password:', error)
        return res.status(500).json({ error: 'An error occurred while updating the password.' })
    }
}

async function updateTheme(req, res) {
    const {theme, userId} = req.body

    await dbConnect()
    try {
        const updatedUser = await db.user.updateTheme(userId, theme)

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        req.session.user.theme = updatedUser.theme;
        await req.session.save();

        return res.status(200).json({ message: "Theme updated", theme: updatedUser.theme });
    } catch (err) {
        console.error('Error updating theme:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}