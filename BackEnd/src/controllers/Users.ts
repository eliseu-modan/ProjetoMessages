import { Request, Response } from 'express'
// import UserServices from '../services/UserServices'
import prisma from '../importPrisma';




export default {

    async ShowUsers(req : Request , res : Response){
       try {
        const users = await prisma.createUser.findMany({
            select: {
              id: true,
              email: true,
            },
          });
        console.log('dados resgatados' , users)
          res.json(users)
       } catch (error) {
        
       }
         



}

}

