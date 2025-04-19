import mongoose from "mongoose"; 
const { Schema, model, models } = mongoose;
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true  
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 200
    },
    profilePhoto: {
        type: String,
        default: "/images/account-icon-blue.png"
    }
})

UserSchema.pre('save', async function(next) {
    if (this.isNew)
        this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.post("findOneAndDelete", async function(doc) {
    if (doc) {
        const userId = doc._id
        await GeneratedRoutine.deleteMany({ userId })
        await DailyRoutine.deleteMany({ userId })
        console.log(`Deleted routines for user: ${userId}`)
    }
})

export default models.User || model('User', UserSchema)