import mongoose from "mongoose"
import { Attribution } from "../models/attributionModel.js"
import { validateObject } from "../utils/functions.js"

export const NewAttribution = async (req, res) => {

    const newAttribution = new Attribution({...req.body})
    try{
        await newAttribution.save()
        return res.status(201).send(newAttribution)
    }catch(err){
        res.status(500).send("DB error")
    }
}

export const ReadAttribution = async(req, res) => {
    let query
    
    if (!validateObject(req.query, ['id'])) return res.status(400).send({msg : "Bad query"})
    
    try{
        query = req.query?.id ? {_id : mongoose.Types.ObjectId(req.query.id)} : {}
    }catch(err){
        console.log(err)
        return res.status(400).send({msg : "Invalid id"})
    }
    
    try{
        const rules =  await Attribution.find(query, {createdAt : 0, updatedAt : 0, __v : 0})
        if (rules) return res.status(200).send(rules)
        return res.status(404).send({msg : "This attribution doesn't exist"})
    }catch(err){
        console.log(err)
        res.status(500).send("DB error")
    }
}

export const EditAttribution = (req, res) => {

    // Filter bad body
    if(!req.body?.id) return res.status(400).send({msg : "Bad query"})
    if (!validateObject(req.body, ['id', 'label', 'description', 'icon'])) return res.status(400).send({msg : "Bad query"})

    const toModify = {...req.body}
    delete toModify.id

    try{
        Attribution.findByIdAndUpdate(req.body.id, toModify, (err, doc) => {
            if (err || !doc) return res.status(404).send({msg : "This attribution doesn't exist"})
            else return res.status(200).send({msg : "Update successful"})
        })
    }catch(err){
        console.log(err)
        res.status(500).send("DB error")
    }
}

export const DeleteAttribution = (req, res) => {
    if (!req.params.id) return res.status(400).send({msg : "Bad query"})
    try{
        Attribution.findByIdAndDelete(req.params.id, (err, doc) => {
            if (err || !doc) return res.status(404).send({msg : "This attribution doesn't exist"})
            else return res.status(200).send({msg : "Delete successful"})
        })
    }catch(err){
        console.log(err)
        res.status(500).send("DB error")
    }
}