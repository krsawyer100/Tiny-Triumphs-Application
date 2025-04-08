import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";
import db from "../../../db";
import multer from 'multer';
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

export default withIronSessionApiRoute(uploadPhoto, sessionOptions);

const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 },
    storage: multer.diskStorage({
        destination: './public/uploads/',
        filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
    }),
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/heif', 'image/heif-sequence'];
        if (!allowedTypes.includes(file.mimetype)) {
            console.error('Rejected file type:', file.mimetype);
            return cb(new Error('Only .jpg, .jpeg, .png, .heic, and .heif files are allowed'));
        }
        cb(null, true);
    },
});

function runMulterMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

async function uploadPhoto(req, res) {
    try {
        await runMulterMiddleware(req, res, upload.single('file'));

        const userId = req.session.user._id;
        const filePath = `/uploads/${req.file.filename}`;

        const currentUser = await db.user.findUserById(userId);
        if (!currentUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (currentUser.profilePhoto && currentUser.profilePhoto !== '/images/account-icon-blue.png') {
            const oldImagePath = path.join(process.cwd(), 'public', currentUser.profilePhoto);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error('Error deleting old profile image:', err);
                } else {
                    console.log('Old profile image deleted:', oldImagePath);
                }
            });
        }

        const updatedUser = await db.user.updateProfilePhoto(userId, filePath);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.session.user.profilePhoto = filePath;
        await req.session.save();

        res.status(200).json({ success: true, filePath });
    } catch (err) {
        console.error('Error uploading profile photo:', err);
        res.status(500).json({ error: err.message });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};