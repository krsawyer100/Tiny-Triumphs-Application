import mongoose from 'mongoose'
import dbConnect from '../controllers/util/connection.js'
import seedQuestions from './seedQuestions.js'
import seedUserRoutines from './seedUserRoutines.js'

const seedAll = async () => {
  console.log("🌱 Seeding database...")

  try {
    await dbConnect()

    await seedQuestions()
    await seedUserRoutines()

    console.log("✅ All data seeded successfully!")
  } catch (error) {
    console.error("❌ Error seeding data:", error)
  } finally {
    mongoose.connection.close()
  }
}

seedAll()