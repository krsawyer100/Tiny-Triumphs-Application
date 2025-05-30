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
                text: "Eating three meals", 
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Eat a small, easy-to-digest snack (e.g., yogurt, banana)", completed: false}],
                        afternoon: [{ task: "Prepare a simple meal or eat leftovers", completed: false}],
                        evening: [{ task: "Have a meal replacement shake or protein bar", completed: false}],
                        night: [{ task: "Keep a small snack by the bed if needed", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Make a basic breakfast (e.g., toast with peanut butter)", completed: false}],
                        afternoon: [{ task: "Eat a balanced meal with protein, carbs, and veggies", completed: false}],
                        evening: [{ task: "Cook something simple like pasta or rice", completed: false}],
                        night: [{ task: "Drink herbal tea or warm milk if feeling peckish", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Make a full breakfast with protein, fruit, and grains", completed: false}],
                        afternoon: [{ task: "Cook a fresh, nutritious meal or eat meal prep", completed: false}],
                        evening: [{ task: "Try a new recipe or meal prep for the week", completed: false}],
                        night: [{ task: "Prepare a light bedtime snack if needed", completed: false}]
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
                        morning: [{ task: "Use a wet washcloth or cleansing wipes", completed: false}],
                        night: [{ task: "Take a seated shower or sponge bath", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Take a quick 5-minute shower", completed: false}],
                        night: [{ task: "Apply lotion", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Take a full shower with body wash and shampoo", completed: false}],
                        night: [{ task: "Try a relaxing bath with salts or essential oils", completed: false}]
                    }
                } 
            },
            {
                text: "Putting on a full outfit",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Put on a clean, comfortable outfit", completed: false}],
                        night: [{ task: "Put on clean pajamas", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Wear casual but put-together clothing", completed: false}],
                        night: [{ task: "Choose cozy pajamas and slippers", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Dress fully, including accessories and shoes", completed: false}],
                        night: [{ task: "Put on some clean, comfortable pjs", completed: false}]
                    }
                } 
            },
            {
                text: "Skincare routine",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Use a facial mist or cleansing wipe", completed: false}],
                        night: [{ task: "Apply moisturizer", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Wash face with cleanser and apply moisturizer", completed: false}],
                        night: [{ task: "Rinse face with water and apply night cream or moisturizer", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Complete full skincare routine (cleanse, tone, moisturizer, SPF)", completed: false}],
                        night: [{ task: "Apply targeted skincare (retinol, acne treatment, etc)", completed: false}]
                    }
                } 
            },
            {
                text: "Hair care routine",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Brush hair and put in a ponytail or similar hairstyle", completed: false}],
                    },
                    mediumEnergy: {
                        morning: [{ task: "Brush hair and use dry shampoo if needed; Style as desired if able", completed: false}],
                    },
                    highEnergy: {
                        morning: [{ task: "Wash hair and complete your full hair care routine", completed: false}],
                    }
                } 
            },
            {
                text: "Exercising/Stretching",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Do a few gentle stretches in bed", completed: false}],
                        afternoon: [{ task: "Stand up and walk around for a few minutes", completed: false}],
                        evening: [{ task: "Try deep breathing or light movement", completed: false}],
                        night: [{ task: "Stretch legs before bed to prevent stiffness", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Do a 5-minute mobility routine", completed: false}],
                        afternoon: [{ task: "Take a short walk or do seated exercises", completed: false}],
                        evening: [{ task: "Try yoga or light resistance training", completed: false}],
                        night: [{ task: "Stretch or foam roll to relax muscles", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Complete a full workout (cardio/strength)", completed: false}],
                        afternoon: [{ task: "Go on a walk", completed: false}],
                        evening: [{ task: "Complete a deep breathing exercise", completed: false}],
                        night: [{ task: "Cool down with static stretches", completed: false}]
                    }
                } 
            },
        ],
        category: "Personal Care Priorities"
    },
    {
        question: "Do you take medication daily? (Select all that apply)",
        answers: [
            {   
                text: "Yes, in the morning",
                tasks: {
                    lowEnergy: {
                        morning: [{task: "Take morning meds", completed: false}],
                    },
                    mediumEnergy: {
                        morning: [{task: "Take morning meds", completed: false}],
                    },
                    highEnergy: {
                        morning: [{task: "Take morning meds", completed: false}],
                    },
                } 
            },
            {
                text: "Yes, at night", 
                tasks: {
                    lowEnergy: {
                        night: [{ task: "Take night meds", completed: false}]
                    },
                    mediumEnergy: {
                        night: [{ task: "Take night meds", completed: false}]
                    },
                    highEnergy: {
                        night: [{ task: "Take night meds", completed: false}]
                    },
                } 
            },
            {
                text: "Yes, in the afternoon",
                tasks: {
                    lowEnergy: {
                        afternoon: [{ task: "Take afternoon meds", completed: false}],
                    },
                    mediumEnergy: {
                        afternoon: [{ task: "Take afternoon meds", completed: false}],
                    },
                    highEnergy: {
                        afternoon: [{ task: "Take afternoon meds", completed: false}],
                    }
                } 
            },
            {
                text: "Yes, in the evening",
                tasks: {
                    lowEnergy: {
                        evening: [{ task: "Take evening meds", completed: false}],
                    },
                    mediumEnergy: {
                        evening: [{ task: "Take evening meds", completed: false}],
                    },
                    highEnergy: {
                        evening: [{ task: "Take evening meds", completed: false}],
                    }
                } 
            },
            {
                text: "No",
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
                        morning: [{task: "Use a heating pad or cooling towel to adjust body temp", completed: false}],
                        afternoon: [{task: "Stay in temperature-controlled spaces as much as possible", completed: false}],
                        evening: [{task: "Stay in temperature-controlled spaces as much as possible", completed: false}],
                        night: [{task: "Keep a fan, space heater, or extra blanket nearby", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Adjust clothing layers to match comfort level", completed: false}],
                        afternoon: [{ task: "Drink warm or cold beverages to regulate body temp", completed: false}],
                        evening: [{ task: "Take a quick shower at a comfortable temperature", completed: false}],
                        night: [{ task: "Set the room temperature before sleeping for optimal comfort", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Take a full shower with preferred temperature settings", completed: false}],
                        afternoon: [{ task: "Spend time outdoors while dressed appropriately for the weather", completed: false}],
                        night: [{ task: "Prepare the sleep environment with cooling/warming aids", completed: false}]
                    },
                } 
            },
            {
                text: "Loud sounds", 
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Wear noise-canceling headphones or earplugs", completed: false}],
                        afternoon: [{ task: "Use soft background noise like white noise or calming music", completed: false}],
                        evening: [{ task: "Use soft background noise like white noise or calming music", completed: false}],
                        night: [{ task: "Use earplugs or a sound machine for sleep", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Lower the volume on alarms or notifications", completed: false}],
                        afternoon: [{ task: "Take breaks in quiet spaces if overstimulated", completed: false}],
                        evening: [{ task: "Limit TV, music, or conversations to soft levels", completed: false}],
                        night: [{ task: "Establish a quiet, relaxing nighttime routine", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Play calming or familiar sounds to counteract noise sensitivity", completed: false}],
                        afternoon: [{ task: "Gradually expose yourself to controlled noise levels", completed: false}],
                        evening: [{ task: "Use noise-reducing curtains or furniture to minimize echoes", completed: false}],
                        night: [{ task: "Experiment with sound settings (white noise, brown noise) for optimal sleep", completed: false}]
                    },
                } 
            },
            {
                text: "Textures",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Wear soft, loose-fitting clothing", completed: false}],
                        night: [{ task: "Sleep with comfortable, familiar bedding", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Choose clothing based on fabric comfort", completed: false}],
                        night: [{ task: "Adjust bedding or pajamas for comfort", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Try new fabrics and textures gradually", completed: false}],
                        night: [{ task: "Adjust room environment for comfort (silky vs. weighted blankets)", completed: false}]
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
                        morning: [{task: "Send a short message or emoji to a close friend", completed: false}],
                        afternoon: [{task: "Listen to a podcast or voice note from a friend", completed: false}],
                        evening: [{task: "Watch a favorite show or livestream with a friend virtually", completed: false}],
                        night: [{task: "Scroll through positive social media or group chats before bed", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Check in with a friend via text or voice note", completed: false}],
                        afternoon: [{ task: "Have a short phone or video call with someone supportive", completed: false}],
                        evening: [{ task: "Join an online discussion, forum, or virtual hangout", completed: false}],
                        night: [{ task: "Reflect on a social moment from the day in a journal", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Make plans to meet someone in person or virtually", completed: false}],
                        afternoon: [{ task: "Engage in a social hobby (gaming, club, online community)", completed: false}],
                        evening: [{ task: "Have a meal or coffee chat with someone", completed: false}],
                        night: [{ task: "Plan or schedule future social interactions", completed: false}]
                    },
                } 
            },
            {
                text: "Sometimes, depending on energy level", 
                tasks: {
                    mediumEnergy: {
                        morning: [{ task: "Reply to messages or emails at a comfortable pace", completed: false}],
                        evening: [{ task: "Engage in social activities with the option to leave early", completed: false}],
                    },
                    highEnergy: {
                        morning: [{ task: "Initiate a conversation with a friend or family member", completed: false}],
                        evening: [{ task: "Meet someone in person for a casual social activity", completed: false}],
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
        question: "How do you recharge best?",
        answers: [
            {   
                text: "Quiet time alone",
                tasks: {
                    lowEnergy: {
                        afternoon: [{task: "Use noise-canceling headphones or listen to calming sounds", completed: false}],
                        evening: [{task: "Do a simple breathing exercise", completed: false}],
                        night: [{task: "Wind down with dim lighting and quiet before bed", completed: false}]
                    },
                    mediumEnergy: {
                        afternoon: [{ task: "Take a short walk alone to clear your mind", completed: false}],
                        evening: [{ task: "Spend time in a cozy, low-distraction space", completed: false}],
                        night: [{ task: "Do a guided meditation or relaxation exercise", completed: false}]
                    },
                    highEnergy: {
                        afternoon: [{ task: "Go to a quiet outdoor place like a park", completed: false}],
                        evening: [{ task: "Plan solo time for a hobby or self-care", completed: false}],
                        night: [{ task: "Unplug from social media and screens", completed: false}]
                    },
                } 
            },
            {
                text: "Light movement", 
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Stretch gently while sitting or lying down", completed: false}],
                        afternoon: [{ task: "Do a few slow, intentional movements like shoulder rolls", completed: false}],
                        evening: [{ task: "Take a short, slow-paced walk indoors or outside", completed: false}],
                        night: [{ task: "Do light yoga or breathing exercises before bed", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Walk around your space for a few minutes", completed: false}],
                        afternoon: [{ task: "Try a short, easy movement routine", completed: false}],
                        evening: [{ task: "Do a 5-minute body stretch routine", completed: false}],
                        night: [{ task: "Use a massage tool or foam roller for relaxation", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Take an energizing walk or dance to music", completed: false}],
                        afternoon: [{ task: "Do a light workout or movement-based hobby", completed: false}],
                        evening: [{ task: "Engage in a longer physical activity you enjoy", completed: false}],
                        night: [{ task: "Do a full-body stretch to relax muscles", completed: false}]
                    },
                } 
            },
            {
                text: "Creative activity",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Doodle or color in a coloring book", completed: false}],
                        afternoon: [{ task: "Listen to music or a creative podcast", completed: false}],
                        evening: [{ task: "Watch an art or craft tutorial for inspiration", completed: false}],
                        night: [{ task: "Jot down creative ideas in a notebook", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Write or sketch casually for self-expression", completed: false}],
                        afternoon: [{ task: "Try a small craft or DIY project", completed: false}],
                        evening: [{ task: "Play an instrument or sing along to favorite music", completed: false}],
                        night: [{ task: "Plan or organize a creative project", completed: false}]
                    },
                    highEnergy: {
                        afternoon: [{ task: "Try a new creative skill or hobby", completed: false}],
                        evening: [{ task: "Engage in a full creative session (drawing, painting, crafting)", completed: false}],
                        night: [{ task: "Share your creative work with others", completed: false}]
                    }
                } 
            },
            {
                text: "Watching tv",
                tasks: {
                    lowEnergy: {
                        afternoon: [{ task: "Put on a relaxing video (nature, ASMR, slow TV)", completed: false}],
                        evening: [{ task: "Watch something lighthearted without pressure to focus", completed: false}],
                        night: [{ task: "Lower brightness and volume for a calming experience", completed: false}]
                    },
                    mediumEnergy: {
                        afternoon: [{ task: "Watch an episode of a favorite show", completed: false}],
                        evening: [{ task: "Engage in a movie night with a cozy setup", completed: false}],
                        night: [{ task: "Lower brightness and volume for a calming experience", completed: false}]
                    },
                    highEnergy: {
                        afternoon: [{ task: "Watch an engaging or thought-provoking show", completed: false}],
                        evening: [{ task: "Discuss a show or movie with a friend", completed: false}],
                        night: [{ task: "Wind down with a favorite relaxing show", completed: false}]
                    }
                } 
            },
            {
                text: "Reading",
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Read a short passage or quote", completed: false}],
                        afternoon: [{ task: "Flip through a magazine or audiobook", completed: false}],
                        evening: [{ task: "Browse a favorite book without pressure to focus", completed: false}],
                        night: [{ task: "Read a calming or familiar book before bed", completed: false}]
                    },
                    mediumEnergy: {
                        afternoon: [{ task: "Listen to an audiobook", completed: false}],
                        evening: [{ task: "Read a chapter from a book or article", completed: false}],
                        night: [{ task: "Read some before bed", completed: false}]
                    },
                    highEnergy: {
                        afternoon: [{ task: "Listen to an audiobook", completed: false}],
                        evening: [{ task: "Discuss or share a book recommendation with someone", completed: false}],
                        night: [{ task: "Read to wind down for bed", completed: false}]
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
                        morning: [{task: "Read or listen to a short positive affirmation", completed: false}],
                        afternoon: [{task: "Repeat a simple affirmation in your mind", completed: false}],
                        evening: [{task: "Write down one small win from the day", completed: false}],
                        night: [{task: "End the day by reflecting on one thing you appreciate", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Say an affirmation out loud while looking in the mirror", completed: false}],
                        afternoon: [{ task: "Write down three affirmations in a journal", completed: false}],
                        evening: [{ task: "Share a positive thought or affirmation with a friend", completed: false}],
                        night: [{ task: "Create a list of gratitude-based affirmations for future use", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Create personalized affirmations tailored to current goals", completed: false}],
                        afternoon: [{ task: "Record your affirmations in a voice memo to listen back to", completed: false}],
                        evening: [{ task: "Engage in a positive self-talk exercise", completed: false}],
                        night: [{ task: "Reflect on how affirmations have impacted your mindset", completed: false}]
                    },
                } 
            },
            {
                text: "Yes, mediation or mindfulness", 
                tasks: {
                    lowEnergy: {
                        morning: [{ task: "Do one minute of deep breathing before starting the day", completed: false}],
                        afternoon: [{ task: "Close your eyes and focus on your breath for a few moments", completed: false}],
                        evening: [{ task: "Listen to a short guided relaxation or meditation", completed: false}],
                        night: [{ task: "Use a body scan meditation before sleep", completed: false}]
                    },
                    mediumEnergy: {
                        morning: [{ task: "Spend 5 minutes in mindful silence or gratitude", completed: false}],
                        afternoon: [{ task: "Do a short walking meditation or mindful movement", completed: false}],
                        evening: [{ task: "Use an app or timer for a structured mindfulness session", completed: false}],
                        night: [{ task: "Practice a grounding exercise before bed", completed: false}]
                    },
                    highEnergy: {
                        morning: [{ task: "Engage in a full mindfulness or meditation session (10+ minutes)", completed: false}],
                        afternoon: [{ task: "Try a visualization meditation for relaxation or focus", completed: false}],
                        evening: [{ task: "Reflect on your day using a mindfulness journal", completed: false}],
                        night: [{ task: "Set an intention for the next day using meditation or journaling", completed: false}]
                    },
                } 
            },
            {
                text: "No, I prefer to focus on physical self-care",
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
    }
};

export default seedQuestions