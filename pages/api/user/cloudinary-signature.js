import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default withIronSessionApiRoute(handleClientScriptLoad, sessionOptions)

async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end()

    const timestamp = Math.round(new Date().getTime() / 1000)
    const folder = "profile_photos"
    const public_id = `user_${req.session.user._id}`

    const signature = cloudinary.utils.api_sign_request({
        timestamp,
        folder,
        public_id,
    }, process.env.CLOUDINARY_API_SECRET)

    return res.status(200).json({
        timestamp, 
        signature,
        folder,
        public_id,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME
    })
}