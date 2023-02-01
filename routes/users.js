import express from 'express';
import { ReadUsers, Signup, DeleteUser, EditUser } from '../controllers/User.js';
import { AuthenticateAdmin, AuthenticateToken } from '../middlewares/auth.js';


export const userRouter = express.Router();

// Route to create a new user
userRouter.route('/')
    .get(AuthenticateToken, /* AuthenticateAdmin, */ ReadUsers)
    .post(AuthenticateToken, AuthenticateAdmin, Signup);

userRouter.route('/:id')
    .put(AuthenticateToken, AuthenticateAdmin, EditUser)
    .delete(AuthenticateToken, AuthenticateAdmin, DeleteUser);
