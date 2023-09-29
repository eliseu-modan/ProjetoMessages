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
routes.get('/users/Users' ,authenticateToken, Users.ShowUsers )
routes.delete('/users/deleteUsers/:ids',authenticateToken, Users.DeleteUsers)

//rotas de login sem middleware
routes.post('/users/login', LoginUser.Login)
routes.post('/users/create', CreateUsers.NewUser)


export default routes
