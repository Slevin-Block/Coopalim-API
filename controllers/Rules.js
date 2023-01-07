import { Rule } from "../models/ruleModel.js"
import mongoose from "mongoose"
import { validateObject } from "../utils/functions.js"

export const NewRule = async (req, res) => {
    console.log(req.body)
    const newRule = new Rule({...req.body})
    try{
        await newRule.save()
        return res.status(200).send(newRule)
    }catch(err){
        res.status(500).send("DB error")
    }
} 

export const ReadRules = async(req, res) => {
    let query
    
    // Filter bad query
    if (!validateObject(req.query, ['id'])) return res.status(400).send({msg : "Bad query"})
    
    try{
        query = req.query?.id ? {_id : mongoose.Types.ObjectId(req.query.id)} : {}
    }catch(err){
         return res.status(400).send({msg : "Invalid id"})
    }
    
    try{
        const rules =  await Rule.find(query, {createdAt : 0, updatedAt : 0, __v : 0})
        if (rules) return res.status(200).send(rules)
        return res.status(404).send({msg : "This rule doesn't exist"})
    }catch(err){
        console.log(err)
        res.status(500).send("DB error")
    }
}

export const EditRule = (req, res) => {

    // Filter bad body
    if(!req.body?.id) return res.status(400).send({msg : "Bad query"})
    if (!validateObject(req.body, ['id', 'label', 'description'])) return res.status(400).send({msg : "Bad query"})

    const toModify = {...req.body}
    delete toModify.id

    try{
        Rule.findByIdAndUpdate(req.body.id, toModify, (err, doc) => {
            if (err || !doc) return res.status(404).send({msg : "This rule doesn't exist"})
            else return res.status(200).send({msg : "Update successful"})
        })
    }catch(err){
        console.log(err)
        res.status(500).send("DB error")
    }
}

export const DeleteRule = (req, res) => {
    if (!req.params.id) return res.status(400).send({msg : "Bad query"})
    console.log(req.params.id)
    try{
        Rule.findByIdAndDelete(req.params.id, (err, doc) => {
            if (err || !doc) return res.status(404).send({msg : "This rule doesn't exist"})
            else return res.status(200).send({msg : "Delete successful"})
        })
    }catch(err){
        console.log(err)
        res.status(500).send("DB error")
    }
}