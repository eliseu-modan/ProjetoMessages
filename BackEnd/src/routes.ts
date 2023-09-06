import { Router } from "express";
import express, { Request, Response } from 'express';

import CreateMessages from "./controllers/CreateMessages";
import CreateUsers from "./controllers/CreateUsers";
import LoginUser from "./controllers/LoginUser";
import Users from "./controllers/Users"

import authMiddleware from "./authMiddleware";
const routes = Router();
// routes.get('/users',CreateMessages.getUsers)
// routes.get('/users/create',CreateMessages.CreateUser)


routes.get('/users/getData',CreateMessages.SendFront)
routes.get('/users/Users' ,Users.getUsers )
routes.post('/users/front',CreateMessages.UserFront)
routes.delete('/users/:id',CreateMessages.Userdelete)
routes.post('/users/create',CreateUsers.NewUser)
routes.post('/users/login',LoginUser.Login)
routes.put('/users/Update' , CreateMessages.UpdateMessages)





export default routes
