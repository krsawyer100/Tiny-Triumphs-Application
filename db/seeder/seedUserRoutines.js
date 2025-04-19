import dbConnect from "../controllers/util/connection.js"
import User from "../models/user.js"
import GeneratedRoutine from "../models/generatedRoutine.js"
import DailyRoutine from "../models/dailyRoutine.js"

const seedUserRoutines = async () => {
  await dbConnect()

  try {
    console.log("🌱 Seeding test user and routines...")

    await User.deleteOne({ email: "test123@email.com" })

    const newUser = new User({
      firstName: "Test",
      lastName: "User",
      username: "TestUser123",
      email: "test123@email.com",
      password: "test@123",
      profilePhoto: "/images/account-icon-blue.png"
    })

    await newUser.save()

    const sampleTasks = (label) => ([
      { task: `${label} Task 1`, completed: false },
      { task: `${label} Task 2`, completed: false }
    ])

    const generatedRoutine = new GeneratedRoutine({
      userId: newUser._id,
      routine: {
        lowEnergy: {
          morning: sampleTasks("Low Morning"),
          afternoon: sampleTasks("Low Afternoon"),
          evening: sampleTasks("Low Evening"),
          night: sampleTasks("Low Night")
        },
        mediumEnergy: {
          morning: sampleTasks("Med Morning"),
          afternoon: sampleTasks("Med Afternoon"),
          evening: sampleTasks("Med Evening"),
          night: sampleTasks("Med Night")
        },
        highEnergy: {
          morning: sampleTasks("High Morning"),
          afternoon: sampleTasks("High Afternoon"),
          evening: sampleTasks("High Evening"),
          night: sampleTasks("High Night")
        }
      }
    })

    await generatedRoutine.save()

    const april17Routine = new DailyRoutine({
      userId: newUser._id,
      date: new Date("2025-04-17"),
      energyLevel: "lowEnergy",
      routine: {
        morning: sampleTasks("April 17 Morning"),
        afternoon: sampleTasks("April 17 Afternoon"),
        evening: sampleTasks("April 17 Evening"),
        night: sampleTasks("April 17 Night")
      }
    })
    await april17Routine.save()

    const april18Routine = new DailyRoutine({
      userId: newUser._id,
      date: new Date("2025-04-18"),
      energyLevel: "mediumEnergy",
      routine: {
        morning: sampleTasks("April 18 Morning"),
        afternoon: sampleTasks("April 18 Afternoon"),
        evening: sampleTasks("April 18 Evening"),
        night: sampleTasks("April 18 Night")
      }
    })
    await april18Routine.save()

    console.log("✅ Test user and routines seeded!")
  } catch (error) {
    console.error("❌ Error seeding user routines:", error)
  }
}

export default seedUserRoutines