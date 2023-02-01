import express from 'express';
import { ReadRules, NewRule, EditRule, DeleteRule } from '../controllers/Rules.js';
import { AuthenticateAdmin, AuthenticateToken } from '../middlewares/auth.js';


export const ruleRouter = express.Router();

ruleRouter.route("/")
    .get(ReadRules)
    .post(AuthenticateToken, AuthenticateAdmin, NewRule)
    .put(AuthenticateToken, AuthenticateAdmin, EditRule)

ruleRouter.route("/:id")
    .delete(AuthenticateToken, AuthenticateAdmin, DeleteRule)