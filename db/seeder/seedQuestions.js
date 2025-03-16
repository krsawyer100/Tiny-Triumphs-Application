import mongoose from "mongoose";
import QuizQuestion from "../models/quizQuestions.js"
import dbConnect from "../controllers/util/connection.js"    

const questions = [
    {
        question: "On low-energy days, which symptoms are most challenging (Select all that apply)",
        answers: [
            {   
                text: "Fatigue",
                tasks: {
                    lowEnergy: {
                        morning: [{task: "Stay in bed for 10 extra minutes before getting up", completed: false}],
                        afternoon: [{task: "Take a 15-30 minute nap", completed: false}],
                        evening: [{task: "Use a heating pad while resting", completed: false}],
                        night: [{task: "Lay down for bed 30 minutes earlier than usual", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Do 5 minutes of gentle stretching", completed: false}],
                        afternoon: [{ task: "Set a timer for short productivity bursts (e.g., 20 minutes of work, 10 minutes of break)", completed: false}],
                        evening: [{ task: "Drink an electrolyte-rich beverage", completed: false}],
                        night: [{ task: "Prepare the next day's essentials before bed", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Go for a short 10 minute walk outside", completed: false}],
                        afternoon: [{ task: "Prepare a high-protein snack to sustain energy", completed: false}],
                        evening: [{ task: "Engage in a hobby that keeps you mentally stimulated", completed: false}],
                        night: [{ task: "Follow a full nighttime routine", completed: false}]
                    },
                } 
            },
            {
                text: "Brain Fog", 
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Rinse your face with cold water", completed: false}],
                        afternoon: [{ task: "Limit screen time for 30 minutes", completed: false}],
                        evening: [{ task: "Listen to instrumental music for mental clarity", completed: false}],
                        night: [{ task: "Avoid caffeine 4 hours before bed", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Use a planner to write out 3 key tasks for the day", completed: false}],
                        afternoon: [{ task: "Take a walk to reset focus", completed: false}],
                        evening: [{ task: "Do a simple puzzle or word game", completed: false}],
                        night: [{ task: "Write down 1 positive thing from your day", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Read for 10 minutes before starting work/studies", completed: false}],
                        afternoon: [{ task: "Drink a glass of water and eat a nutritious snack", completed: false}],
                        evening: [{ task: "Declutter a small area to reduce visual distractions", completed: false}],
                        night: [{ task: "Set goals for the next day before winding down", completed: false}]
                    },
                } 
            },
            {
                text: "Chronic Pain",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Apply a heating pad or ice pack to pained area(s)", completed: false}],
                        afternoon: [{ task: "Do deep breathing exercise for pain management", completed: false}],
                        evening: [{ task: "Take a warm bath or use epson salts", completed: false}],
                        night: [{ task: "Use a body pillow for extra support with sleeping/resting", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Gently stretch in bed before standing up", completed: false}],
                        afternoon: [{ task: "Do 5 minutes of low-impact movement (e.g., chair yoga)", completed: false}],
                        evening: [{ task: "Apply pain relief cream", completed: false}],
                        night: [{ task: "Do a guided relaxation meditation", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Do a short, gentle yoga session", completed: false}],
                        afternoon: [{ task: "Go for a slow walk focusing on posture", completed: false}],
                        evening: [{ task: "Engage in light exercise or stretching", completed: false}],
                        night: [{ task: "Use a foam roller or massage tool for muscle relief", completed: false}]
                    }
                } 
            },
            {
                text: "Dizziness/Lightheadedness",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Sit on the edge of the bed for as long as need before standing up", completed: false}],
                        afternoon: [{ task: "Drink a electrolytes beverage", completed: false}],
                        evening: [{ task: "Rest in a dim, quiet space", completed: false}],
                        night: [{ task: "Elevate legs while lying down", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Eat a small breakfast", completed: false}],
                        afternoon: [{ task: "Take slow, deep breaths", completed: false}],
                        evening: [{ task: "Use a cool washcloth on your forehead", completed: false}],
                        night: [{ task: "Drink a glass of water before bed", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Do gentle seated stretches before standing", completed: false}],
                        afternoon: [{ task: "Have a protein-rich snack", completed: false}],
                        evening: [{ task: "Limit caffeine intake", completed: false}],
                        night: [{ task: "Do a guided deep breathing exercise", completed: false}]
                    }
                } 
            },
            {
                text: "Muscle Weakness",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Use assistive devices as needed for mobility", completed: false}],
                        afternoon: [{ task: "Take short, frequent breaks during activities", completed: false}],
                        evening: [{ task: "Do a few seated leg raises or arm movements", completed: false}],
                        night: [{ task: "Lay down and rest", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Do a few gentle range-of-motion exercise", completed: false}],
                        afternoon: [{ task: "Eat a protein-rich snack", completed: false}],
                        evening: [{ task: "Massage sore muscles", completed: false}],
                        night: [{ task: "Take magnesium supplement (if approved by your doctor)", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Do light resistance band exercises", completed: false}],
                        afternoon: [{ task: "Walk around the house or stretch for 5 minutes", completed: false}],
                        evening: [{ task: "Engage in low-impact strength exercises", completed: false}],
                        night: [{ task: "Hydrate well", completed: false}]
                    }
                } 
            },
            {
                text: "Sensory Overload",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Wear ear plugs or noise-cancelling headphones", completed: false}],
                        afternoon: [{ task: "Dim the lights", completed: false}],
                        evening: [{ task: "Wrap yourself in a weighted or regular blanket", completed: false}],
                        night: [{ task: "Reduce background noise", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Limit exposure to overwhelming stimuli", completed: false}],
                        afternoon: [{ task: "Take a quiet break", completed: false}],
                        evening: [{ task: "Listen to calming music or nature sounds", completed: false}],
                        night: [{ task: "Use blackout curtains or eye mask", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Engage in a controlled sensory activity", completed: false}],
                        afternoon: [{ task: "Go for a short walk in quiet area", completed: false}],
                        evening: [{ task: "Take a break from screens for 1 hour", completed: false}],
                        night: [{ task: "Create relaxing bedtime environment with soft lighting", completed: false}]
                    }
                }  
            },
            {
                text: "Nausea or Digestive Issues",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Eat a small, bland breakfast (crackers or toast)", completed: false}],
                        afternoon: [{ task: "Sip ginger or peppermint tea", completed: false}],
                        evening: [{ task: "Lie down with your head elevated", completed: false}],
                        night: [{ task: "Avoid eating close to bedtime", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Eat a light breakfast", completed: false}],
                        afternoon: [{ task: "Eat a ginger chew or mint", completed: false}],
                        evening: [{ task: "Do deep belly breathing", completed: false}],
                        night: [{ task: "Drink a small glass of warm water before bed", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Do light stretching", completed: false}],
                        afternoon: [{ task: "Eat a balanced meal", completed: false}],
                        evening: [{ task: "Take a short walk after eating", completed: false}],
                        night: [{ task: "Prepare an herbal tea", completed: false}]
                    }
                } 
            },
            {
                text: "Joint Stiffness/Mobility Issues",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Do gentle wrist and ankle rotations in bed", completed: false}],
                        afternoon: [{ task: "Apply heat packs to stiff joints", completed: false}],
                        evening: [{ task: "Use an ergonomic chair or support pillow", completed: false}],
                        night: [{ task: "Stretch lightly before bed to ease stiffness", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Do 5 minutes of light stretching", completed: false}],
                        afternoon: [{ task: "Use compression socks or sleeves if needed", completed: false}],
                        evening: [{ task: "Take a warm shower", completed: false}],
                        night: [{ task: "Practice mindful breathing", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Do 10 minutes of stretching", completed: false}],
                        afternoon: [{ task: "Do a low-impact workout", completed: false}],
                        evening: [{ task: "Massage joints", completed: false}],
                        night: [{ task: "Relax with extra joint support", completed: false}]
                    }
                } 
            },
        ],
        category: "Energy Levels & Symptoms"
    }, 
]

const seedQuestions = async () => {
    await dbConnect()

    try {
        console.log("seeding database...")
        await QuizQuestion.deleteMany()
        await QuizQuestion.insertMany(questions)
        console.log("Database seeded with quiz questions!")
    } catch (error) {
        console.error("Error seeding database: ", error)
    } finally {
        mongoose.connection.close()
    }
};

seedQuestions();

    // {
    //     question: "How do your symptoms change throughout the day? (Select all that apply)",
    //     answers: [
    //         {
    //             text: "Mornings are the hardest, I gain energy later in the day", 
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: ["Start with a slow, gentle wake-up routine (deep breathing, soft stretching)", "Have a warm drink"],
    //                     afternoon: ["Take a short walk", "Listen to calming music while being productive"],
    //                     evening: ["Engage in light movement"],
    //                     night: ["Prepare for the next morning"]
    //                 },
    //                 mediumEnergy: {
    //                     morning: ["Do gentle stretching", "Eat a protein-rich breakfast"],
    //                     evening: ["Engage in a hobby if able"],
    //                     night: ["Follow a guided deep breathing exercise"]
    //                 },
    //                 highEnergy: {
    //                     morning: ["Do light exercise (i.e. walk)"],
    //                     afternoon: ["Work on a project or task"],
    //                     evening: ["Engage in stimulating activity"],
    //                     night: ["Complete a guided meditation"]
    //                 }
    //             } 
    //         },
    //         {
    //             text: "My energy is highest in the morning but fades quickly.", 
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [""],
    //                     afternoon: [""],
    //                     evening: [""],
    //                     night: [""]
    //                 },
    //                 mediumEnergy: {
    //                     morning: [""],
    //                     afternoon: [""],
    //                     evening: [""],
    //                     night: [""]
    //                 },
    //                 highEnergy: {
    //                     morning: [""],
    //                     afternoon: [""],
    //                     evening: [""],
    //                     night: [""]
    //                 }
    //             } 
    //         },
    //         {
    //             text: "I experience energy crashes randomly", 
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [""],
    //                     afternoon: [""],
    //                     evening: [""],
    //                     night: [""]
    //                 },
    //                 mediumEnergy: {
    //                     morning: [""],
    //                     afternoon: [""],
    //                     evening: [""],
    //                     night: [""]
    //                 },
    //                 highEnergy: {
    //                     morning: [""],
    //                     afternoon: [""],
    //                     evening: [""],
    //                     night: [""]
    //                 }
    //             } 
    //         },
    //         {
    //             text: "I experience afternoon slumps", 
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [""],
    //                     afternoon: [""],
    //                     evening: [""],
    //                     night: [""]
    //                 },
    //                 mediumEnergy: {
    //                     morning: [""],
    //                     afternoon: [""],
    //                     evening: [""],
    //                     night: [""]
    //                 },
    //                 highEnergy: {
    //                     morning: [""],
    //                     afternoon: [""],
    //                     evening: [""],
    //                     night: [""]
    //                 }
    //             } 
    //         },
    //         {
    //             text: "My energy/symptoms are unpredictable"
    //         },
    //     ],
    //     category: "Energy Levels & Symptoms"
    // },
    // {
    //     question: "On high-energy days, what additional activities do you like to include?",
    //     answers: [
    //         {
    //             text: "Cooking a Full Meal",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Deep Cleaning or Organizing",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Exercising or going outside",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Running errands or Socializing",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //     ],
    //     category: "Energy Levels & Symptoms"
    // },
    // {
    //     question: "What self-care tasks feel essential regardless of energy levels",
    //     answers: [
    //         {
    //             text: "Brushing teeth",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: ["Use mouthwash if brushing feels too difficult"],
    //                     night: ["Brush teeth while sitting down"]
    //                 },
    //                 mediumEnergy: {
    //                     morning: ["Do a quick 30-second brush"],
    //                     night: ["Brush for full 2 minutes"]
    //                 },
    //                 highEnergy: {
    //                     morning: ["Brush for full 2 minutes"],
    //                     night: ["Brush, floss, and use mouth wash"]
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Taking medication/supplements",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Eating at least one meal",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Drinking water or staying hydrated",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: ["Drink 1/2 a cup of water after getting out of bed"],
    //                     afternoon: ["Sip water using a straw"],
    //                     evening: ["Keep water bottle near by for frequent sipping"],
    //                     night: ["Take a few sips of water before bed"]
    //                 },
    //                 mediumEnergy: {
    //                     morning: ["Drink a full glass of water after getting out of bed"],
    //                     afternoon: ["Set a reminder to drink water every 2 hours"],
    //                     evening: ["Drink a herbal tea or glass of water"],
    //                     night: ["Check hydration and drink water accordingly"]
    //                 },
    //                 highEnergy: {
    //                     morning: ["Start the day with some fruit water"],
    //                     afternoon: ["Drink glass of water every 2-3 hours"],
    //                     evening: ["Track water intake"],
    //                     night: ["Drink an extra glass of water if needed"]
    //                 }
    //             }  
    //         },
    //         {
    //             text: "Showering/Bathing",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Putting on a full outfit",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             }  
    //         },
    //         {
    //             text: "Skincare routine",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Hair care routine",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //     ],
    //     category: "Personal Care Priorities"
    // },
    // {
    //     question: "Which tasks are difficult but important for you?",
    //     answers: [
    //         {
    //             text: "Brushing teeth",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Showering/Bathing",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Cooking a meal",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Staying hydrated",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Cleaning up after eating",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Decluttering",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Skincare routine",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Exercising/Stretching",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //     ],
    //     category: "Personal Care Priorities"
    // },
    // {
    //     question: "What self-care tasks do you consider optional on low-energy days? (Select all that apply)",
    //     answers: [
    //         {
    //             text: "Skincare beyond basics",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Shaving",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Full hair care routine",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Dressing in full outfits",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Makeup",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Exercise/Stretching",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //     ],
    //     category: "Personal Care Priorities"
    // },
    // {
    //     question: "On medium energy days, what additional self-care do you try to include?",
    //     answers: [
    //         {
    //             text: "Showering/Bathing",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Light workout/Stretching",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Preparing a simple homemade meal",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "cleaning up my space",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //     ],
    //     category: "Personal Care Priorities"
    // },
    // {
    //     question: "What sensory sensitivities impact personal care?",
    //     answers: [
    //         {
    //             text: "Temperatures",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Loud sounds",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Certain textures",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "strong smells",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "light sensitivity",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //     ],
    //     category: "Sensory & Accessibility Needs"
    // },
    // {
    //     question: "Do you want social interaction built into your routine?",
    //     answers: [
    //         {
    //             text: "Yes, no matter my energy level",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Sometimes, depending on energy level.",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "No, I prefer solo self-care.",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //     ],
    //     category: "Social & Emotional Well-Being"
    // },
    // {
    //     question: "Do you want social interaction built into your routine?",
    //     answers: [
    //         {
    //             text: "Yes, no matter my energy level",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Sometimes, depending on energy level.",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "No, I prefer solo self-care.",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //     ],
    //     category: "Social & Emotional Well-Being"
    // },
    // {
    //     question: "How often are you required to socialize on the average day?",
    //     answers: [
    //         {
    //             text: "On occasion",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Multiple times a day.",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Frequently",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "All the time",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //     ],
    //     category: "Social & Emotional Well-Being"
    // },
    // {
    //     question: "How does socializing impact your energy?",
    //     answers: [
    //         {
    //             text: "It energizes me, even when I'm tired.",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "It depends on the person and situation.",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "It drains me, especially on low-energy days",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //     ],
    //     category: "Social & Emotional Well-Being"
    // },
    // {
    //     question: "How do you recharge best?",
    //     answers: [
    //         {
    //             text: "Quiet time alone", 
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Light movement.", 
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Creative activity", 
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Watching favorite shows/movies", 
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Talking with a friend or family member", 
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Reading", 
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //     ],
    //     category: "Social & Emotional Well-Being"
    // },
    // {
    //     question: "Do you want to include mental health check-ins in your routine?",
    //     answers: [
    //         {
    //             text: "Yes, daily affirmations",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Yes, mediation or mindfulness",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "No, I prefer to focus on physical self-care",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //     ],
    //     category: "Environment & Daily Structure"
    // },
    // {
    //     question: "Do you need built-in breaks in your routine?",
    //     answers: [
    //         {
    //             text: "Yes, frequent breaks",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "Yes, sometimes",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //         {
    //             text: "No, I prefer to complete everything at once",
    //             tasks: {
    //                 lowEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 mediumEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 },
    //                 highEnergy: {
    //                     morning: [],
    //                     afternoon: [],
    //                     evening: [],
    //                     night: []
    //                 }
    //             } 
    //         },
    //     ],
    //     category: "Environment & Daily Structure"
    // },