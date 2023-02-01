import express from 'express';
import { Login, Authorization, Logout} from '../controllers/Connection.js';
import { AuthenticateToken, AuthenticateUser } from '../middlewares/auth.js';


export const authentification = express.Router();

// Route to authentificate a user with login + password
authentification.route('/login')
    .post(AuthenticateUser, Login)

authentification.route('/logout')
    .get((req, res, next) => {req.withRefreshToken = true; next();},
          AuthenticateToken, Logout)  

// Route to claim another access token with a RefreshToken
authentification.route('/authorization')
    .get((req, res, next) => {req.withRefreshToken = true; next();},
         AuthenticateToken, Authorization);