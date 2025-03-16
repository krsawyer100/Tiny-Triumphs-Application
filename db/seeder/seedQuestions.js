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
    {
        question: "How do your symptoms change throughout the day? (Select all that apply)",
        answers: [
          {
            text: "Mornings are the hardest, I gain energy later in the day",
            tasks: {
              lowEnergy: {
                morning: [{ task: "Do gentle stretches in bed", completed: false }],
                afternoon: [{ task: "Eat a nutritious snack or hydrate", completed: false }],
                evening: [{ task: "Practice a 5-minute breathing exercise", completed: false }],
                night: [{ task: "Lay out clothes for next day and go to bed early", completed: false }]
              },
              mediumEnergy: {
                morning: [{ task: "Prepare a simple breakfast or tea", completed: false }],
                afternoon: [{ task: "Take a short, refreshing walk", completed: false }],
                evening: [{ task: "Engage in a relaxing activity", completed: false }],
                night: [{ task: "Organize essentials for tomorrow", completed: false }]
              },
              highEnergy: {
                morning: [{ task: "Shower and tidy living space", completed: false }],
                afternoon: [{ task: "Enjoy a creative or social activity", completed: false }],
                evening: [{ task: "Plan and prep for the next day", completed: false }],
                night: [{ task: "Perform a calming bedtime routine", completed: false }]
              }
            }
          },
          {
            text: "I experience energy crashes randomly",
            tasks: {
              lowEnergy: {
                morning: [{ task: "Start with simple morning care", completed: false }],
                afternoon: [{ task: "Rest or nap to manage energy crash", completed: false }],
                evening: [{ task: "Prepare an easy-to-make dinner", completed: false }],
                night: [{ task: "Prioritize early sleep", completed: false }]
              },
              mediumEnergy: {
                morning: [{ task: "Eat a protein rich breakfast", completed: false }],
                afternoon: [{ task: "Complete a restful activity", completed: false }],
                evening: [{ task: "Choose a calm activity like reading", completed: false }],
                night: [{ task: "Complete a deep breathing exercise", completed: false }]
              },
              highEnergy: {
                morning: [{ task: "Complete you top priority task", completed: false }],
                afternoon: [{ task: "Do manageable tasks in short bursts with rest in between", completed: false }],
                evening: [{ task: "Complete a fun activity or hobby", completed: false }],
                night: [{ task: "Engage in light relaxation", completed: false }]
              }
            }
          },
          {
            text: "I experience afternoon slumps",
            tasks: {
              lowEnergy: {
                morning: [{ task: "Complete top essential task", completed: false }],
                afternoon: [{ task: "Take scheduled rest breaks", completed: false }],
                evening: [{ task: "Do minimal-effort self-care activities", completed: false }],
                night: [{ task: "Engage in a deep breathing or mediation exercise", completed: false }]
              },
              mediumEnergy: {
                morning: [{ task: "Eat a simple breakfast", completed: false }],
                afternoon: [{ task: "Have a small energy-boosting snack", completed: false }],
                evening: [{ task: "Prepare a simple dinner and unwind", completed: false }],
                night: [{ task: "Reflect on the day through journaling", completed: false }]
              },
              highEnergy: {
                morning: [{ task: "Eat a balanced breakfast", completed: false }],
                afternoon: [{ task: "Take a 15 minute walk", completed: false }],
                evening: [{ task: "Perform relaxing wind-down tasks", completed: false }],
                night: [{ task: "Practice short meditation or stretches", completed: false }]
              }
            }
          }
        ],
        category: "Energy Levels & Symptoms"
    }, 
    {
        question: "On high-energy days, what additional activities do you like to include? (Select all that apply)",
        answers: [
          {   
            text: "Cooking a full meal",
            tasks: {
              lowEnergy: {
                morning: [{task: "Eat a simple breakfast (i.e. cereal, banana, etc.)", completed: false}],
                afternoon: [{task: "Eat a snack", completed: false}],
                evening: [{task: "Heat up a pre-made meal", completed: false}],
                night: [{task: "Clean up kitchen minimally", completed: false}]
              },
              mediumEnergy: {
                morning: [{ task: "Find a easy meal to cook", completed: false}],
                afternoon: [{ task: "Prep ingredients for dinner", completed: false}],
                evening: [{ task: "Cook a simple nutritious meal", completed: false}],
                night: [{ task: "Quick kitchen tidy-up", completed: false}]
              },
              highEnergy: {
                morning: [{ task: "Select a complex recipe", completed: false}],
                afternoon: [{ task: "Shop for fresh ingredients", completed: false}],
                evening: [{ task: "Enjoy cooking a full meal", completed: false}],
                night: [{ task: "Complete thorough kitchen cleanup", completed: false}]
              },
            } 
          },
          {
            text: "Deep cleaning or organizing", 
            tasks: {
              lowEnergy: {
                morning: [{ task: "Identify small area to tidy", completed: false}],
                afternoon: [{ task: "Do brief tidying session", completed: false}],
                evening: [{ task: "Organize essentials only", completed: false}],
                night: [{ task: "Plan next cleaning priority", completed: false}]
              },
              mediumEnergy: {
                morning: [{ task: "Select a manageable area to clean", completed: false}],
                afternoon: [{ task: "Clean or organize briefly", completed: false}],
                evening: [{ task: "Finish tidying tasks", completed: false}],
                night: [{ task: "Prepare cleaning supplies for tomorrow", completed: false}]
              },
              highEnergy: {
                morning: [{ task: "Make a detailed cleaning plan", completed: false}],
                afternoon: [{ task: "Complete deep-cleaning project", completed: false}],
                evening: [{ task: "Organize or declutter thoroughly", completed: false}],
                night: [{ task: "Enjoy your organized space", completed: false}]
              },
            } 
          },
          {
            text: "Exercising or going outside",
            tasks: {
              lowEnergy: {
                morning: [{ task: "Do gentle stretches indoors", completed: false}],
                afternoon: [{ task: "Sit outside briefly", completed: false}],
                evening: [{ task: "Light indoor stretching", completed: false}],
                night: [{ task: "Perform relaxing yoga poses", completed: false}]
              },
              mediumEnergy: {
                morning: [{ task: "Take a short walk", completed: false}],
                afternoon: [{ task: "Enjoy outdoor time or moderate exercise", completed: false}],
                evening: [{ task: "Do restorative stretching", completed: false}],
                night: [{ task: "Relax with a calming activity", completed: false}]
              },
              highEnergy: {
                morning: [{ task: "Go for a brisk walk or workout", completed: false}],
                afternoon: [{ task: "Engage in extended outdoor activity", completed: false}],
                evening: [{ task: "Try a new exercise class or activity", completed: false}],
                night: [{ task: "Stretch thoroughly or meditate", completed: false}]
              }
            } 
          },
          {
            text: "Running errands",
            tasks: {
              lowEnergy: {
                morning: [{ task: "List essential errands only", completed: false}],
                afternoon: [{ task: "Complete the most urgent errand", completed: false}],
                evening: [{ task: "Rest after errands", completed: false}],
                night: [{ task: "Plan tomorrow's errands briefly", completed: false}]
              },
              mediumEnergy: {
                morning: [{ task: "Prioritize errands for efficiency", completed: false}],
                afternoon: [{ task: "Run one or two errands", completed: false}],
                evening: [{ task: "Organize items from errands", completed: false}],
                night: [{ task: "Update errands list for next day", completed: false}]
              },
              highEnergy: {
                morning: [{ task: "Create detailed errands checklist", completed: false}],
                afternoon: [{ task: "Run multiple errands efficiently", completed: false}],
                evening: [{ task: "Organize purchases and home setup", completed: false}],
                night: [{ task: "Plan errands for future days", completed: false}]
              }
            } 
          }
        ],
        category: "Energy Levels & Symptoms"
    },
    {
        question: "What self-care tasks feel essential regardless of energy levels (Select all that apply)",
        answers: [
            {   
                text: "Brushing teeth",
                tasks: {
                    lowEnergy: {
                        morning: [{task: "Use mouthwash if brushing feels too difficult", completed: false}],
                        night: [{task: "Brush teeth while sitting down", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Do a quick 30 second brush", completed: false}],
                        night: [{ task: "Brush for full 2 minutes", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Brush for full 2 minutes", completed: false}],
                        night: [{ task: "Brush, floss, and use mouthwash", completed: false}]
                    },
                } 
            },
            {
                text: "Eating at least one meal", 
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                } 
            },
            {
                text: "Drinking water or staying hydrated",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Drink 1/2 a cup of water after getting out of bed", completed: false}],
                        afternoon: [{ task: "Sip water using a straw", completed: false}],
                        evening: [{ task: "Keep water bottle near by for frequent sipping", completed: false}],
                        night: [{ task: "Take a few sips of water before bed", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Drink a full glass of water after getting out of bed", completed: false}],
                        afternoon: [{ task: "Set a reminder to drink water every 2 hours", completed: false}],
                        evening: [{ task: "Drink a herbal tea or glass of water", completed: false}],
                        night: [{ task: "Check hydration and drink water accordingly", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Start day with some fruit water or electrolytes", completed: false}],
                        afternoon: [{ task: "Drink a glass of water every 2-3 hours", completed: false}],
                        evening: [{ task: "Track water intake", completed: false}],
                        night: [{ task: "Drink an extra glass of water if needed", completed: false}]
                    }
                } 
            },
            {
                text: "Showering/Bathing",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
            {
                text: "Putting on a full outfit",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
            {
                text: "Skincare routine",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
            {
                text: "Hair care routine",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
            {
                text: "Decluttering",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
            {
                text: "Exercising/Stretching",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
        ],
        category: "Personal Care Priorities"
    },
    {
        question: "What sensory sensitivities impact personal care? (Select all that apply)",
        answers: [
            {   
                text: "Temperatures",
                tasks: {
                    lowEnergy: {
                        morning: [{task: "", completed: false}],
                        afternoon: [{task: "", completed: false}],
                        evening: [{task: "", completed: false}],
                        night: [{task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                } 
            },
            {
                text: "Loud sounds", 
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                } 
            },
            {
                text: "Textures",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
            {
                text: "Strong smells",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
            {
                text: "Light sensitivity",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
        ],
        category: "Sensory & Accessibility Needs"
    },
    {
        question: "Do you want social interaction built into your routine?",
        answers: [
            {   
                text: "Yes, no matter my energy level",
                tasks: {
                    lowEnergy: {
                        morning: [{task: "", completed: false}],
                        afternoon: [{task: "", completed: false}],
                        evening: [{task: "", completed: false}],
                        night: [{task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                } 
            },
            {
                text: "Sometimes, depending on energy level", 
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                } 
            },
            {
                text: "No, I prefer solo self-care"
            },
        ],
        category: "Social & Emotional Well-Being"
    },
    {
        question: "How does socializing impact your energy?",
        answers: [
            {   
                text: "It energizes me, even when I'm tired",
                tasks: {
                    lowEnergy: {
                        morning: [{task: "", completed: false}],
                        afternoon: [{task: "", completed: false}],
                        evening: [{task: "", completed: false}],
                        night: [{task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                } 
            },
            {
                text: "It depends on the person and situation", 
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                } 
            },
            {
                text: "It drains me, especially on low-energy days",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
        ],
        category: "Energy Levels & Symptoms"
    },
    {
        question: "How do you recharge best?",
        answers: [
            {   
                text: "Quiet time alone",
                tasks: {
                    lowEnergy: {
                        morning: [{task: "", completed: false}],
                        afternoon: [{task: "", completed: false}],
                        evening: [{task: "", completed: false}],
                        night: [{task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                } 
            },
            {
                text: "Light movement", 
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                } 
            },
            {
                text: "Creative activity",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
            {
                text: "Watching tv",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
            {
                text: "Talking to a family member or friend",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
            {
                text: "Reading",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
        ],
        category: "Social & Emotional Well-Being"
    },
    {
        question: "Do you want to include mental health check-ins in your routine?",
        answers: [
            {   
                text: "Yes, daily affirmations",
                tasks: {
                    lowEnergy: {
                        morning: [{task: "", completed: false}],
                        afternoon: [{task: "", completed: false}],
                        evening: [{task: "", completed: false}],
                        night: [{task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                } 
            },
            {
                text: "Yes, mediation or mindfulness", 
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                } 
            },
            {
                text: "No, I prefer to focus on physical self-care",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "", completed: false}],
                        afternoon: [{ task: "", completed: false}],
                        evening: [{ task: "", completed: false}],
                        night: [{ task: "", completed: false}]
                    }
                } 
            },
        ],
        category: "Social & Emotional Well-Being"
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