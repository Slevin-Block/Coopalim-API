import express from 'express';
import cors from "cors";
import { members } from './members.js';
import { authentification } from './connection.js';
import { rulesRouter } from './rules.js';
import { attributionRouter } from './attributions.js';

export const router = express.Router();

// Manage CORS Origin problems with preflight request !
router.options('*', cors());

// Mange Login, Logout, Signup, refresh token process
router.use("/", authentification)

router.use("/rules",rulesRouter)
router.use("/attributions", attributionRouter)
router.use("/members", members)

// Manage 404 Wrong path
router.all('*', (req, res) => res.status(404).send({msg : 'Wrong path'}) );