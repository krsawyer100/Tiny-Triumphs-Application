import User from '../models/user'
import dbConnect from './util/connection'
import Routine from '../models/dailyRoutine'


export async function create (firstName, lastName, username, email, password, temporaryRoutine) {
    if (!(firstName && lastName && username && email && password))
        throw new Error ('Must include first name, last name, username, email, and password')

    await dbConnect()

    const user = await User.create({firstName, lastName, username, email, password})

    if (!user)
        throw new Error('Error creating User')

    return user.toJSON()
}

export async function updateUser (userId, firstName, lastName, username, email) {
    await dbConnect()
    const updatedUser = await User.findByIdAndUpdate(userId, {firstName, lastName, username, email }, { new: true })

    console.log('updated user: ', updatedUser)

    return updatedUser
}

export async function deleteUser (userId) {
    await dbConnect()

    const deletedUser = await User.findByIdAndDelete(userId)

    console.log("deleted user: ", deletedUser)

    if (!deletedUser) return null

    return { message: 'User deleted successfully' }
}