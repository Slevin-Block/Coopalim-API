import bcrypt from "bcrypt";

import { User } from "../models/userModel.js";
import { objectFilter } from "../utils/functions.js";
import { generateToken, cleanTokenFamily } from "../utils/JWT.js";

// Array containing authorizated informations to send to Front
const authorizedFields = ['id', 'login', 'firstname', 'lastname'];

/**
 * Connection with user id obtained by Login + Password, or RefreshToken
 * This controller is also call after SignUp (see below)
 * @param {*} req Request
 * @param {*} res Response
 * @returns Give a Response to Front with AccessToken, RefreshToken and user informations
 */
export const Login = async (req, res) => {
    // Variables creation
    let user = req?.isFind ? req.user : {id : req.user.id};
    console.log("LOGIN : ", user.id);
    let objectResponse = {}

    try{

        // Find existing user
        if (!req?.isFind){
            console.log("Search")
            user = await User.findById(user.id);
            if(!user) res.status(404).send({msg : "User doesn't exist"})
        }

        // Tokens creation
        if (!req?.withAccessToken){
            objectResponse.accessToken  = generateToken({id : user.id}, "access");
            objectResponse.refreshToken = generateToken({id : user.id}, "refresh");
            user.refreshTokenFamily.push(objectResponse.refreshToken)
            await user.save()
        }

    }catch(err){
        console.log(err);
        res.status(500).send({msg : 'Token or DB Error'});
        return;
    }

    // Preparation object user before sending
    objectResponse.user = objectFilter(user, authorizedFields);
    
    res
        // Header to fix CORS problem on Front
        .setHeader('Access-Control-Allow-Origin', '*')
        .status(200)
        .send(objectResponse);
}

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
    const newUser = new User({... req.body, password : hashedPassword, passwordVis : req.body.password});
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
 * Claim new tokens after access token validation
 * @param {*} req Request
 * @param {*} res Response
 * @returns Give a Response to Front with user informations, new access token and new refresh token (rotation)
 */
export const Authorization = async (req, res) => {

    // Variables creation
    let user = {id : req.user.id};
    let objectResponse = {}

    try{
        // Find user match with user id
        user = await User.findById(user.id);
        
    // ERROR MANAGEMENT
        // User doesn't existe
        if (!user) return res.status(404).send({msg : 'User inexistent'});

        // If the refreshToken isn't listed, probably a Malicious user theft
        if (!user.refreshTokenFamily.includes(req.oldRefreshToken)){                                
            user.refreshTokenFamily = [] // We invalide all refresh token by emptying the family array
            await user.save();
            return res.status(401).send({msg : 'Bad credentials'});
        }
 
        // Cleaning refreshTokenFamily (expired and old refreshToken) and Save it
        const cleanArray = cleanTokenFamily(user?.refreshTokenFamily, process.env.REFRESH_TOKEN_SECRET, req?.oldRefreshToken);
        objectResponse.accessToken  = generateToken({id : user.id}, "access");
        objectResponse.refreshToken = generateToken({id : user.id}, "refresh");
        user.refreshTokenFamily = [...cleanArray, objectResponse.refreshToken];
        await user.save();

        // Preparation object user before sending
        objectResponse.user = objectFilter(user, authorizedFields);
        
        res
            // Header to fix CORS problem on front
            .setHeader('Access-Control-Allow-Origin', '*')
            .status(200)
            .send(objectResponse);
        
    }catch(err){
        res.status(500).send('DB error');
    }
}

/**
 * Logout user with removing refresh token into DB family store
 * @param {*} req Request
 * @param {*} res Response
 */
export const Logout = async (req,res) => {
    // Variables creation
    let user = {id : req.user.id};
    console.log("LOGOUT : " + user.id);
    const refreshToken = req.oldRefreshToken;
    try{
        // Find user match with user id
        user = await User.findById(user.id);
        if (!user) return res.status(404).send({msg : 'User inexistent'})
    }catch(err){
        res.status(500).send({msg : 'DB error'});
        return;
    }

    // Remove refresh token and save modification
    try{
        user.refreshTokenFamily = user.refreshTokenFamily.filter(token => token !== refreshToken)
        await user.save()
        res.status(200).send({msg : 'token remove'})
    }catch(err){
        res.status(500).send({msg : "Error DB"});
        return;
    }
}