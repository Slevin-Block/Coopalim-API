import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { User } from "../models/userModel.js";


/**
 * Verify access token authentification
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next function
 */
export const AuthenticateToken = (req, res, next) => {

    // Variables creation
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let user;
    // Stop if accessToken doesn't existe
    if (!token) return res.status(400).send({msg : 'Missing token'});

    // Select good secret
    let secret = process.env.ACCESS_TOKEN_SECRET;
    !!req?.withRefreshToken && (secret = process.env.REFRESH_TOKEN_SECRET);

    try{
        // Verify authentification and expire time
        user = jwt.verify(token, secret);

        // Collect user id and send it to the next 
        req.user = user;
        !!req?.withRefreshToken && (req.oldRefreshToken = token);
        next();
    }catch (err){
        return res.status(401).send({msg : 'Invalid credentials'});
    }
}


/**
 * Verify if user existe and password match
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next function 
 */
export const AuthenticateUser = async (req, res, next) => {

    // Resource audit
    if (!req.body?.login || !req.body?.password) return res.status(400).send({msg : 'Incomplete resources'});

    // Variables creation
    let user;
    const {login, password} = req.body;

    // Find user existed
    try{
        user = await User.findOne({login});
        if(!user) return res.status(404).send({msg : "User doesn't exist"})
    }catch(err){
        return res.status(500).send({msg : 'DB Error'});
    }

    // If user existe, verify password
    if (await bcrypt.compare(password, user.password)){
        req.isFind = true
        req.user = user;
        next();
    } else {
        res.status(401).send({msg : 'Invalid credentials'});
    }
}

export const AuthenticateAdmin = async (req, res, next) => {
    let user
    try{
        user = await User.findById(req.user.id);
        if (!user) return res.status(404).send({msg : "User doesn't exist"})
    }catch(err){
        res.status(500).send({msg : "DB error"})
    }
    
    // Admin id
    if (user?.rule === "63b85947008e71f329ecd4bc"){
        next()
    }
    else res.status(403).send({msg : "Isn't admin"})
}