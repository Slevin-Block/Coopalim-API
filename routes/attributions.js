import express from 'express';
import { DeleteAttribution, EditAttribution, NewAttribution, ReadAttribution } from '../controllers/Attributions.js';
import { AuthenticateAdmin, AuthenticateToken } from '../middlewares/auth.js';


export const attributionRouter = express.Router();

attributionRouter.route("/")
    .get(AuthenticateToken, ReadAttribution)
    .post(AuthenticateToken, AuthenticateAdmin, NewAttribution)
    .put(AuthenticateToken, AuthenticateAdmin, EditAttribution)

attributionRouter.route("/:id")
    .delete(AuthenticateToken, AuthenticateAdmin, DeleteAttribution)