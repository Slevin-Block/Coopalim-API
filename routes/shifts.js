import express from 'express';
import { Participate, Shift } from '../controllers/Shift.js';
import { AuthenticateToken } from '../middlewares/auth.js';

export const shiftsRouter = express.Router({mergeParams: true});

shiftsRouter.route('/')
    .get(AuthenticateToken, Shift)
    .post(AuthenticateToken, Participate)