import mongoose from "mongoose";
import QuizQuestion from "../models/quizQuestions"
import dbConnect from "../controllers/util/connection"

const seedQuestions = async () => {
    await dbConnect()

    const questions = [
        {
            question: "On low-energy days, which symptoms are most challenging (Select all that apply)",
            answers: [
                {   
                    text: "Fatigue",
                    tasks: {
                        lowEnergy: {
                            morning: ["Stay in bed for 10 extra minutes before getting up"],
                            afternoon: ["Take a 15-30 minute nap"],
                            evening: ["Use a heating pad while resting"],
                            night: ["Lay down for bed 30 minutes earlier than usual"]
                        },
                        mediumEnergy: {
                            morning: ["Do 5 minutes of gentle stretching"],
                            afternoon: ["Set a timer for short productivity bursts (e.g., 20 minutes of work, 10 minutes of break)"],
                            evening: ["Drink an electrolyte-rich beverage"],
                            night: ["Prepare the next day's essentials before bed"]
                        },
                        highEnergy: {
                            morning: ["Go for a short 10 minute walk outside"],
                            afternoon: ["Prepare a high-protein snack to sustain energy"],
                            evening: ["Engage in a hobby that keeps you mentally stimulated"],
                            night: ["Follow a full nighttime routine"]
                        },
                    } 
                },
                {
                    text: "Brain Fog", 
                    tasks: {
                        lowEnergy: {
                            morning: ["Rinse your face with cold water"],
                            afternoon: ["Limit screen time for 30 minutes"],
                            evening: ["Listen to instrumental music for mental clarity"],
                            night: ["Avoid caffeine 4 hours before bed"]
                        },
                        mediumEnergy: {
                            morning: ["Use a planner to write out 3 key tasks for the day"],
                            afternoon: ["Take a walk to reset focus"],
                            evening: ["Do a simple puzzle or word game"],
                            night: ["Write down 1 positive thing from your day"]
                        },
                        highEnergy: {
                            morning: ["Read for 10 minutes before starting work/studies"],
                            afternoon: ["Drink a glass of water and eat a nutritious snack"],
                            evening: ["Declutter a small area to reduce visual distractions"],
                            night: ["Set goals for the next day before winding down"]
                        },
                    } 
                },
                {
                    text: "Chronic Pain",
                    tasks: {
                        lowEnergy: {
                            morning: ["Apply a heating pad or ice pack to pained area(s)"],
                            afternoon: ["Do deep breathing exercise for pain management"],
                            evening: ["Take a warm bath or use epson salts"],
                            night: ["Use a body pillow for extra support with sleeping/resting"]
                        },
                        mediumEnergy: {
                            morning: ["Gently stretch in bed before standing up"],
                            afternoon: ["Do 5 minutes of low-impact movement (e.g., chair yoga)"],
                            evening: ["Apply pain relief cream"],
                            night: ["Do a guided relaxation meditation"]
                        },
                        highEnergy: {
                            morning: ["Do a short, gentle yoga session"],
                            afternoon: ["Go for a slow walk focusing on posture"],
                            evening: ["Engage in light exercise or stretching"],
                            night: ["Use a foam roller or massage tool for muscle relief"]
                        }
                    } 
                },
                {
                    text: "Dizziness/Lightheadedness",
                    tasks: {
                        lowEnergy: {
                            morning: ["Sit on the edge of the bed for as long as need before standing up"],
                            afternoon: ["Drink a electrolytes beverage"],
                            evening: ["Rest in a dim, quiet space"],
                            night: ["Elevate legs while lying down"]
                        },
                        mediumEnergy: {
                            morning: ["Eat a small breakfast"],
                            afternoon: ["Take slow, deep breaths"],
                            evening: ["Use a cool washcloth on your forehead"],
                            night: ["Drink a glass of water before bed"]
                        },
                        highEnergy: {
                            morning: ["Do gentle seated stretches before standing"],
                            afternoon: ["Have a protein-rich snack"],
                            evening: ["Limit caffeine intake"],
                            night: ["Do a guided deep breathing exercise"]
                        }
                    } 
                },
                {
                    text: "Muscle Weakness",
                    tasks: {
                        lowEnergy: {
                            morning: ["Use assistive devices as needed for mobility"],
                            afternoon: ["Take short, frequent breaks during activities"],
                            evening: ["Do a few seated leg raises or arm movements"],
                            night: ["Lay down and rest"]
                        },
                        mediumEnergy: {
                            morning: ["Do a few gentle range-of-motion exercise"],
                            afternoon: ["Eat a protein-rich snack"],
                            evening: ["Massage sore muscles"],
                            night: ["Take magnesium supplement (if approved by your doctor)"]
                        },
                        highEnergy: {
                            morning: ["Do light resistance band exercises"],
                            afternoon: ["Walk around the house or stretch for 5 minutes"],
                            evening: ["Engage in low-impact strength exercises"],
                            night: ["Hydrate well"]
                        }
                    } 
                },
                {
                    text: "Sensory Overload",
                    tasks: {
                        lowEnergy: {
                            morning: ["Wear ear plugs or noise-cancelling headphones"],
                            afternoon: ["Dim the lights"],
                            evening: ["Wrap yourself in a weighted or regular blanket"],
                            night: ["Reduce background noise"]
                        },
                        mediumEnergy: {
                            morning: ["Limit exposure to overwhelming stimuli"],
                            afternoon: ["Take a quiet break"],
                            evening: ["Listen to calming music or nature sounds"],
                            night: ["Use blackout curtains or eye mask"]
                        },
                        highEnergy: {
                            morning: ["Engage in a controlled sensory activity"],
                            afternoon: ["Go for a short walk in quiet area"],
                            evening: ["Take a break from screens for 1 hour"],
                            night: ["Create relaxing bedtime environment with soft lighting"]
                        }
                    }  
                },
                {
                    text: "Nausea or Digestive Issues",
                    tasks: {
                        lowEnergy: {
                            morning: ["Eat a small, bland breakfast (crackers or toast)"],
                            afternoon: ["Sip ginger or peppermint tea"],
                            evening: ["Lie down with your head elevated"],
                            night: ["Avoid eating close to bedtime"]
                        },
                        mediumEnergy: {
                            morning: ["Eat a light breakfast"],
                            afternoon: ["Eat a ginger chew or mint"],
                            evening: ["Do deep belly breathing"],
                            night: ["Drink a small glass of warm water before bed"]
                        },
                        highEnergy: {
                            morning: ["Do light stretching"],
                            afternoon: ["Eat a balanced meal"],
                            evening: ["Take a short walk after eating"],
                            night: ["Prepare an herbal tea"]
                        }
                    } 
                },
                {
                    text: "Joint Stiffness/Mobility Issues",
                    tasks: {
                        lowEnergy: {
                            morning: ["Do gentle wrist and ankle rotations in bed"],
                            afternoon: ["Apply heat packs to stiff joints"],
                            evening: ["Use an ergonomic chair or support pillow"],
                            night: ["Stretch lightly before bed to ease stiffness"]
                        },
                        mediumEnergy: {
                            morning: ["Do 5 minutes of light stretching"],
                            afternoon: ["Use compression socks or sleeves if needed"],
                            evening: ["Take a warm shower"],
                            night: ["Practice mindful breathing"]
                        },
                        highEnergy: {
                            morning: ["Do 10 minutes of stretching"],
                            afternoon: ["Do a low-impact workout"],
                            evening: ["Massage joints"],
                            night: ["Relax with extra joint support"]
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
                            morning: ["Start with a slow, gentle wake-up routine (deep breathing, soft stretching)", "Have a warm drink"],
                            afternoon: ["Take a short walk", "Listen to calming music while being productive"],
                            evening: ["Engage in light movement"],
                            night: ["Prepare for the next morning"]
                        },
                        mediumEnergy: {
                            morning: ["Do gentle stretching", "Eat a protein-rich breakfast"],
                            evening: ["Engage in a hobby if able"],
                            night: ["Follow a guided deep breathing exercise"]
                        },
                        highEnergy: {
                            morning: ["Do light exercise (i.e. walk)"],
                            afternoon: ["Work on a project or task"],
                            evening: ["Engage in stimulating activity"],
                            night: ["Complete a guided meditation"]
                        }
                    } 
                },
                {
                    text: "My energy is highest in the morning but fades quickly.", 
                    tasks: {
                        lowEnergy: {
                            morning: [""],
                            afternoon: [""],
                            evening: [""],
                            night: [""]
                        },
                        mediumEnergy: {
                            morning: [""],
                            afternoon: [""],
                            evening: [""],
                            night: [""]
                        },
                        highEnergy: {
                            morning: [""],
                            afternoon: [""],
                            evening: [""],
                            night: [""]
                        }
                    } 
                },
                {
                    text: "I experience energy crashes randomly", 
                    tasks: {
                        lowEnergy: {
                            morning: [""],
                            afternoon: [""],
                            evening: [""],
                            night: [""]
                        },
                        mediumEnergy: {
                            morning: [""],
                            afternoon: [""],
                            evening: [""],
                            night: [""]
                        },
                        highEnergy: {
                            morning: [""],
                            afternoon: [""],
                            evening: [""],
                            night: [""]
                        }
                    } 
                },
                {
                    text: "I experience afternoon slumps", 
                    tasks: {
                        lowEnergy: {
                            morning: [""],
                            afternoon: [""],
                            evening: [""],
                            night: [""]
                        },
                        mediumEnergy: {
                            morning: [""],
                            afternoon: [""],
                            evening: [""],
                            night: [""]
                        },
                        highEnergy: {
                            morning: [""],
                            afternoon: [""],
                            evening: [""],
                            night: [""]
                        }
                    } 
                },
                {
                    text: "My energy/symptoms are unpredictable"
                },
            ],
            category: "Energy Levels & Symptoms"
        },
        {
            question: "On high-energy days, what additional activities do you like to include?",
            answers: [
                {
                    text: "Cooking a Full Meal",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Deep Cleaning or Organizing",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Exercising or going outside",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Running errands or Socializing",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
            ],
            category: "Energy Levels & Symptoms"
        },
        {
            question: "What self-care tasks feel essential regardless of energy levels",
            answers: [
                {
                    text: "Brushing teeth",
                    tasks: {
                        lowEnergy: {
                            morning: ["Use mouthwash if brushing feels too difficult"],
                            night: ["Brush teeth while sitting down"]
                        },
                        mediumEnergy: {
                            morning: ["Do a quick 30-second brush"],
                            night: ["Brush for full 2 minutes"]
                        },
                        highEnergy: {
                            morning: ["Brush for full 2 minutes"],
                            night: ["Brush, floss, and use mouth wash"]
                        }
                    } 
                },
                {
                    text: "Taking medication/supplements",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Eating at least one meal",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Drinking water or staying hydrated",
                    tasks: {
                        lowEnergy: {
                            morning: ["Drink 1/2 a cup of water after getting out of bed"],
                            afternoon: ["Sip water using a straw"],
                            evening: ["Keep water bottle near by for frequent sipping"],
                            night: ["Take a few sips of water before bed"]
                        },
                        mediumEnergy: {
                            morning: ["Drink a full glass of water after getting out of bed"],
                            afternoon: ["Set a reminder to drink water every 2 hours"],
                            evening: ["Drink a herbal tea or glass of water"],
                            night: ["Check hydration and drink water accordingly"]
                        },
                        highEnergy: {
                            morning: ["Start the day with some fruit water"],
                            afternoon: ["Drink glass of water every 2-3 hours"],
                            evening: ["Track water intake"],
                            night: ["Drink an extra glass of water if needed"]
                        }
                    }  
                },
                {
                    text: "Showering/Bathing",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Putting on a full outfit",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    }  
                },
                {
                    text: "Skincare routine",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Hair care routine",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
            ],
            category: "Personal Care Priorities"
        },
        {
            question: "Which tasks are difficult but important for you?",
            answers: [
                {
                    text: "Brushing teeth",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Showering/Bathing",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Cooking a meal",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Staying hydrated",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Cleaning up after eating",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Decluttering",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Skincare routine",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Exercising/Stretching",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
            ],
            category: "Personal Care Priorities"
        },
        {
            question: "What self-care tasks do you consider optional on low-energy days? (Select all that apply)",
            answers: [
                {
                    text: "Skincare beyond basics",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Shaving",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Full hair care routine",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Dressing in full outfits",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Makeup",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Exercise/Stretching",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
            ],
            category: "Personal Care Priorities"
        },
        {
            question: "On medium energy days, what additional self-care do you try to include?",
            answers: [
                {
                    text: "Showering/Bathing",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Light workout/Stretching",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Preparing a simple homemade meal",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "cleaning up my space",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
            ],
            category: "Personal Care Priorities"
        },
        {
            question: "What sensory sensitivities impact personal care?",
            answers: [
                {
                    text: "Temperatures",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Loud sounds",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Certain textures",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "strong smells",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "light sensitivity",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
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
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Sometimes, depending on energy level.",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "No, I prefer solo self-care.",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
            ],
            category: "Social & Emotional Well-Being"
        },
        {
            question: "Do you want social interaction built into your routine?",
            answers: [
                {
                    text: "Yes, no matter my energy level",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Sometimes, depending on energy level.",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "No, I prefer solo self-care.",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
            ],
            category: "Social & Emotional Well-Being"
        },
        {
            question: "How often are you required to socialize on the average day?",
            answers: [
                {
                    text: "On occasion",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Multiple times a day.",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Frequently",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "All the time",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
            ],
            category: "Social & Emotional Well-Being"
        },
        {
            question: "How does socializing impact your energy?",
            answers: [
                {
                    text: "It energizes me, even when I'm tired.",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "It depends on the person and situation.",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "It drains me, especially on low-energy days",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
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
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Light movement.", 
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Creative activity", 
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Watching favorite shows/movies", 
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Talking with a friend or family member", 
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Reading", 
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
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
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Yes, mediation or mindfulness",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "No, I prefer to focus on physical self-care",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
            ],
            category: "Environment & Daily Structure"
        },
        {
            question: "Do you need built-in breaks in your routine?",
            answers: [
                {
                    text: "Yes, frequent breaks",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "Yes, sometimes",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
                {
                    text: "No, I prefer to complete everything at once",
                    tasks: {
                        lowEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        mediumEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        },
                        highEnergy: {
                            morning: [],
                            afternoon: [],
                            evening: [],
                            night: []
                        }
                    } 
                },
            ],
            category: "Environment & Daily Structure"
        },
    ]

    try {
        await QuizQuestion.deleteMany()
        await QuizQuestion.insertMany(questions)
        console.log("Database seeded with quiz questions!")
        mongoose.connection.close()
    } catch (error) {
        console.error("Error seeding database: ", error)
        mongoose.connection.close()
    }
};

seedQuestions();