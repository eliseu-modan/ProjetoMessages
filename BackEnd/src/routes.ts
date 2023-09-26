import { Router } from "express";

import CreateMessages from "./controllers/CreateMessages";
import CreateUsers from "./controllers/CreateUsers";
import LoginUser from "./controllers/LoginUser";
import Users from "./controllers/Users"

import authenticateToken from "./authMiddleware";
const routes = Router();
routes.post('/users/front',authenticateToken, CreateMessages.CreateMessages)
routes.get('/users/getData',authenticateToken, CreateMessages.ShowMessages)
routes.delete('/users/:id',authenticateToken , CreateMessages.DeleteMessages)
routes.put('/users/Update' ,authenticateToken, CreateMessages.UpdateMessages)
routes.post('/users/create',authenticateToken, CreateUsers.NewUser)
routes.get('/users/Users' ,authenticateToken, Users.ShowUsers )
routes.post('/users/login', LoginUser.Login)
routes.delete('/users/deleteUsers/:ids',authenticateToken, Users.DeleteUsers)


export default routes
