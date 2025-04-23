import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";
import db from "../../../db";
import User from "../../../db/models/user"

export default withIronSessionApiRoute(
    function handler(req, res) {
        if (req.method !== 'POST')
            return res.status(404).end()
        switch(req.query.action) {
            case 'login':
                return login(req,res)
            case 'logout':
                return logout(req, res)
            case 'signup':
                return signup(req, res)
            default:
                return res.status(404).end()
        }
    },
    sessionOptions
)

async function login(req, res) {
    const { username, password } = req.body
    try {
        const {
            password: _,
            ...otherFields
        } = await db.auth.login(username, password)
        req.session.user = otherFields
        await req.session.save()
        res.redirect('/dashboard')
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

async function logout(req, res) {
    await req.session.destroy()
    res.status(200).end()
}

async function signup(req, res) {
    try {
      const { firstName, lastName, username, email, password, temporaryRoutine, accessibility } = req.body;
  
      console.log("➡️ Received signup request");
      console.log("➡️ Accessibility:", accessibility);
  
      const userTheme = accessibility?.highContrast ? 'high-contrast' : 'default';
  
      const createdUser = await db.user.create(firstName, lastName, username, email, password, accessibility, userTheme);
  
      req.session.user = {
        _id: createdUser._id,
        username: createdUser.username,
        theme: createdUser.theme,
        accessibility: createdUser.accessibility
      };
  
      await req.session.save();
  
      if (temporaryRoutine) {
        const newRoutine = await db.routine.createRoutines(createdUser._id, temporaryRoutine);
        if (!newRoutine) throw new Error("Routine creation failed");
        return res.status(200).json({ redirect: "/dashboard" });
      }
  
      return res.status(200).json({ redirect: "/quiz" });
  
    } catch (err) {
      console.error("❌ Signup error:", err);
      return res.status(400).json({ error: err.message });
    }
  }