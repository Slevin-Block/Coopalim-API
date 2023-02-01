import express from 'express';
import { DeleteTasks, EditTasks, NewTasks, ReadTasks } from '../controllers/Tasks.js';
import { AuthenticateAdmin, AuthenticateToken } from '../middlewares/auth.js';


export const taskRouter = express.Router();

taskRouter.route("/")
    .get(AuthenticateToken, ReadTasks)
    .post(AuthenticateToken, AuthenticateAdmin, NewTasks)
    .put(AuthenticateToken, AuthenticateAdmin, EditTasks)

taskRouter.route("/:id")
    .delete(AuthenticateToken, AuthenticateAdmin, DeleteTasks)