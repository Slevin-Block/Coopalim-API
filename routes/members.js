import express from 'express';
import { Members } from '../controllers/Members.js';
import { AuthenticateToken } from '../middlewares/auth.js';
import { shifts } from './shifts.js';

export const members = express.Router();
members.use('/:login/tasks', shifts)


members.route('/:login')
    .get(AuthenticateToken, Members)
    
members.route('/')
    .get(AuthenticateToken, Members)
