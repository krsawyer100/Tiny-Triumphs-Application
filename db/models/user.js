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
    },
    theme: {
        type: String,
        enum: ['default', 'nature', 'urban', 'high-contrast', 'dark', 'pastel'],
        default: 'default'
    },
    accessibility: {
        highContrast: { type: Boolean, default: false },
        reduceMotion: { type: Boolean, default: false },
        dyslexiaFont: { type: Boolean, default: false }
    }
})

UserSchema.pre('save', async function(next) {
    if (this.isNew)
        this.password = await bcrypt.hash(this.password, 10)
    next()
})

export default models.User || model('User', UserSchema)