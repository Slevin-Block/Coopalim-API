import { Task } from "../models/TaskModel.js"
import mongoose from "mongoose"
import { validateObject } from "../utils/functions.js"

export const NewTasks = async (req, res) => {
    const newTasks = new Task({...req.body})
    try{
        await newTasks.save()
        return res.status(201).send(newTasks)
    }catch(err){
        res.status(500).send("DB error")
    }
} 

export const ReadTasks = async(req, res) => {
    let query = {}
    
    // Filter bad query
    if (!validateObject(req.query, ['id','month','year'])) return res.status(400).send({msg : "Bad query"})
    if (!!req.query?.month && !req.query?.year) return res.status(400).send({msg : "Bad query"})



    try{
        if (!!req.query?.id) query = {...query, _id : req.query.id }
        if (req.query?.month && req.query?.year){
            query = {...query,
                startTime : {
                    $gte : `${new Date(parseInt(req.query.year), parseInt(req.query.month), 1)}`,
                    $lt  : `${new Date(parseInt(req.query.year), parseInt(req.query.month) + 1, 1)}`
                }
            }
        }
    }catch(err){
         return res.status(400).send({msg : "Invalid query"})
    }
    
    try{
        const Tasks =  await Task.find(query, {createdAt : 0, updatedAt : 0, __v : 0})
        if (Tasks) return res.status(200).send(Tasks)
        return res.status(404).send({msg : "This Tasks doesn't exist"})
    }catch(err){
        console.log(err)
        res.status(500).send("DB error")
    }
}

export const EditTasks = (req, res) => {

    // Filter bad body
    if(!req.body?.id) return res.status(400).send({msg : "Bad query"})
    if (!validateObject(req.body, [ 'id', 'label', 'description', 'participators', 'startTime',
                                    'endTime', 'isUrgent', 'neededAttributions', 'numberOfParticipators',
                                    'numberOfNovice','numberOfAutonomous' ])) return res.status(400).send({msg : "Bad query"})

    const toModify = {...req.body}
    delete toModify.id

    try{
        Task.findByIdAndUpdate(req.body.id, toModify, (err, doc) => {
            if (err || !doc) return res.status(404).send({msg : "This Tasks doesn't exist"})
            else return res.status(200).send({msg : "Update successful"})
        })
    }catch(err){
        console.log(err)
        res.status(500).send("DB error")
    }
}

export const DeleteTasks = (req, res) => {
    if (!req.params.id) return res.status(400).send({msg : "Bad query"})
    try{
        Task.findByIdAndDelete(req.params.id, (err, doc) => {
            if (err || !doc) return res.status(404).send({msg : "This Tasks doesn't exist"})
            else return res.status(200).send({msg : "Delete successful"})
        })
    }catch(err){
        console.log(err)
        res.status(500).send("DB error")
    }
}