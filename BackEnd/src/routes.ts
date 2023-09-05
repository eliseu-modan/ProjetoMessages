import { Router } from "express";
import express, { Request, Response } from 'express';

import CreateMessages from "./controllers/CreateMessages";
import CreateUsers from "./controllers/CreateUsers";
import LoginUser from "./controllers/LoginUser";
import authMiddleware from "./authMiddleware";
const routes = Router();
// routes.get('/users',CreateMessages.getUsers)
// routes.get('/users/create',CreateMessages.CreateUser)


routes.get('/users/getData',CreateMessages.SendFront)
routes.post('/users/front',CreateMessages.UserFront)
routes.delete('/users/:id',CreateMessages.Userdelete)
routes.post('/users/create',CreateUsers.NewUser)
routes.post('/users/login',LoginUser.Login)
routes.post('/users/Update' , CreateMessages.UpdateMessages)





export default routes
