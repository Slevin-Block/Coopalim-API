import express from 'express';
import cors from "cors";
import { authentification } from './connection.js';
import { ruleRouter } from './rules.js';
import { attributionRouter } from './attributions.js';
import { taskRouter } from './tasks.js';
import { userRouter } from './users.js';
import { shiftsRouter } from './shifts.js';

export const router = express.Router();

// Manage CORS Origin problems with preflight request !
router.options('*', cors());

// Mange Login, Logout, Signup, refresh token process
router.use("/", authentification)

router.use("/rules",ruleRouter)
router.use("/attributions", attributionRouter)
router.use("/tasks", taskRouter)
router.use("/users", userRouter)
router.use("/shifts", shiftsRouter)

// Manage 404 Wrong path
router.all('*', (req, res) => res.status(404).send({msg : 'Wrong path'}) );