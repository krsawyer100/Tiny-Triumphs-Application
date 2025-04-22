import User from '../models/user'
import dbConnect from './util/connection'
import mongoose from 'mongoose'
import GeneratedRoutine from "../models/generatedRoutine"
import DailyRoutine from "../models/dailyRoutine"

export async function create (firstName, lastName, username, email, password) {
    if (!(firstName && lastName && username && email && password))
        throw new Error ('Must include first name, last name, username, email, and password')

    await dbConnect()

    const user = await User.create({firstName, lastName, username, email, password})

    if (!user)
        throw new Error('Error creating User')

    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        profilePhoto: user.profilePhoto,
    }
}

export async function updateUser (userId, firstName, lastName, username, email) {
    await dbConnect()
    const updatedUser = await User.findByIdAndUpdate(userId, {firstName, lastName, username, email }, { new: true })

    console.log('updated user: ', updatedUser)

    return updatedUser
}

export async function deleteUser(userId) {
    await dbConnect()

    const validUserId = new mongoose.Types.ObjectId(userId)

    console.log("user id in controller: ", userId)

    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) return null

    console.log("deleted user in controller: ", deleteUser)

    await GeneratedRoutine.deleteMany({ userId: validUserId })
    await DailyRoutine.deleteMany({ userId: validUserId })
    console.log(`Deleted routines for user: ${userId}`)

    return { message: 'User deleted successfully' }
}

export async function updateProfilePhoto(userId, profilePhoto) {
    await dbConnect();
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePhoto },
        { new: true }
    );

    return updatedUser;
}

export async function updateUserPassword(userId, hashedPassword) {
    await dbConnect()
    const updatedUser = User.findByIdAndUpdate(
        userId,
        {password: hashedPassword},
        {new: true}
    )

    return updatedUser
}

export async function findUserById(userId) {
    await dbConnect()
    return await User.findById(userId)
}

export async function updateTheme(userId, theme) {
    if (!userId || !theme) {
      throw new Error("Missing userId or theme");
    }
  
    const updatedUser = await User.findByIdAndUpdate( userId, { theme }, { new: true });
  
    return updatedUser;
  }