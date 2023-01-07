import * as dotenv from 'dotenv';
import express from 'express';
import cors from "cors";

import {router} from './routes/routes.js';

import connectDB from "./config/DataBase.js";


// Generate environment variables 
dotenv.config();

// Create server
export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // true to encode accents correctly
app.use("/", router);

// Connection to DB
connectDB();

app.listen(process.env.PORT, () =>
    console.log(`API running on http://${process.env.MYHOSTNAME}:${process.env.PORT}`));