import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.npm_package_config_DB_NAME}`;

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export default async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        console.error("Error connecting to MongoDB:", e)
        throw e
    }

    return cached.conn
}