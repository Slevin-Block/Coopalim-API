import express from 'express';
import { Shift } from '../controllers/Shift.js';
import { AuthenticateToken } from '../middlewares/auth.js';

export const shifts = express.Router({mergeParams: true});

shifts.route('/')
    .get(AuthenticateToken, Shift)