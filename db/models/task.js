import { Schema } from "mongoose"

const TaskSchema = new Schema({
    task: String, 
    completed: { 
            type: Boolean, 
            default: false 
    } 
})

export default TaskSchema