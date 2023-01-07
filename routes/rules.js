import express from 'express';
import { ReadRules, NewRule, EditRule, DeleteRule } from '../controllers/Rules.js';
import { AuthenticateAdmin, AuthenticateToken } from '../middlewares/auth.js';


export const rulesRouter = express.Router();

rulesRouter.route("/")
    .get(AuthenticateToken, ReadRules)
    .post(AuthenticateToken, AuthenticateAdmin, NewRule)
    .put(AuthenticateToken, AuthenticateAdmin, EditRule)

rulesRouter.route("/:id")
    .delete(AuthenticateToken, AuthenticateAdmin, DeleteRule)