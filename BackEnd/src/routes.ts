import { Router } from "express";
import express, { Request, Response } from 'express';

import CreateMessages from "./controllers/CreateMessages";
import CreateUsers from "./controllers/CreateUsers";
import LoginUser from "./controllers/LoginUser";
import Users from "./controllers/Users"

import authenticateToken from "./authMiddleware";
const routes = Router();
routes.post('/users/front', CreateMessages.CreateMessages)
routes.get('/users/getData',CreateMessages.ShowMessages)
routes.delete('/users/:id',CreateMessages.DeleteMessages)
routes.put('/users/Update' , CreateMessages.UpdateMessages)
routes.post('/users/create',CreateUsers.NewUser)
routes.get('/users/Users' ,authenticateToken, Users.ShowUsers )
routes.post('/users/login', LoginUser.Login)
routes.delete('/users/deleteUsers/:ids',Users.DeleteUsers)


export default routes
