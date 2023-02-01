import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { validateObject } from "../utils/functions.js";

// Array containing authorizated informations to send to Front
export const authorizedFields = ['id', 'login', 'firstname', 'lastname', 'rule'];

/**
 * Create new user with informations store in req.body 
 * @param {*} req Request
 * @param {*} res Response
 * @returns Call Login Controller after the creation of the new user
 */
export const Signup = async (req, res) => {

    // Variables creation
    let hashedPassword;
    const salt = await bcrypt.genSalt(10);

    try {
        // Generate hashed password
        hashedPassword = bcrypt.hashSync(req.body.password, salt);
    }catch(err){
        console.log(err);
        res.status(500).send({msg : "Error bcrypt"});
    }
    // Create new user compleded instance
    const newUser = new User({... req.body, password : hashedPassword/* , passwordVis : req.body.password */});
    newUser.id = newUser._id;

    // Save new user in DB
    try{
        await newUser.save();
    }catch(err){
        res.status(500).send({msg : "Error DB"});
        return;
    }
    res.status(201).send({msg : "user create"});
    // Call Login controller to Login automatically the new user
    /* req.user = newUser;
    Login(req, res); */
}

/**
 * Create new user with informations store in req.body 
 * @param {*} req Request
 * @param {*} res Response
 * @returns Call Login Controller after the creation of the new user
 */
export const ReadUsers = async (req, res) => {
    try{
        const users = await User.find().select("-password -passwordVis -refreshTokenFamily -__v -createdAt -updatedAt -_id")
        return res.status(200).send(users);
    }catch(err){
        console.log(err)
        return res.status(500).send({msg : "Error DB"});
    }
}



export const DeleteUser = (req, res) => {
    if (!req.params.id) return res.status(400).send({msg : "Bad query"})
    try{
        User.findByIdAndDelete(req.params.id, (err, doc) => {
            if (err || !doc) return res.status(404).send({msg : "This user doesn't exist"})
            else return res.status(200).send({msg : "Delete successful"})
        })
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



/**
 * Create new user with informations store in req.body 
 * @param {*} req Request
 * @param {*} res Response
 * @returns Call Login Controller after the creation of the new user
 */
export const EditUser = async (req, res) => {

    // Filter bad body
    if(!req.params?.id) return res.status(400).send({msg : "Bad query"})
    if (!validateObject(req.body, ['id', 'login', 'password', 'firstname', 'lastname', 'email', 'phone', 'rule', 'attributions', 'isAutonomous', 'taskPersistentList'])) return res.status(400).send({msg : "Bad query"})

    const toModify = {...req.body}
    delete toModify.id

    // Variables creation
    let hashedPassword;
    const salt = await bcrypt.genSalt(10);

    try {
        // Generate hashed password
        hashedPassword = bcrypt.hashSync(req.body.password, salt);
    }catch(err){
        console.log(err);
        res.status(500).send({msg : "Error bcrypt"});
    }
    /* toModify.passwordVis = toModify.password */
    toModify.password = hashedPassword

    try{
        User.findByIdAndUpdate(req.params.id, toModify, (err, doc) => {
            if (err || !doc) return res.status(404).send({msg : "This user doesn't exist"})
            else return res.status(200).send({msg : "Update successful"})
        })
    }catch(err){
        console.log(err)
        res.status(500).send("DB error")
    }

}