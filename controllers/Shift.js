import { Task } from "../models/TaskModel.js"
import { User } from "../models/userModel.js"
import { validateObject } from "../utils/functions.js"

export const Shift = async (req, res) => {
    res.status(200).send(`Listes des taches du membre ${req.params.login}`)
}

export const Participate = async (req, res) => {

    // Check that the Body is correct 
    if (!validateObject(req.body, ['taskId','userId'])) return res.status(400).send({msg : "Bad query"})

    // Check that the user exists 
    try {
        const response = await User.findById(req.body.userId)
        if (!response) return res.status(404).send({msg : "This user doesn't exist"})
    }catch(err){
        console.log(err)
        return res.status(500).send("DB error")
    }

    try{
        const task = await Task.findById(req.body.taskId)
        if (!task.participators.includes(req.body.userId)){
            task.participators.push(req.body.userId)
            await task.save()
        }
        if (!task) return res.status(404).send({msg : "Task doesn't exist"})
        else return res.status(200).send({msg : "Participation accepted"});
    }catch(err){
        console.log(err)
        return res.status(500).send("DB error")
    }
}