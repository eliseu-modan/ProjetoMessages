import { Request, Response } from 'express'
// import UserServices from '../services/UserServices'
import prisma from '../importPrisma';

export default {
  async ShowUsers(req: Request, res: Response) {
    try {
      const users = await prisma.createUser.findMany({
        select: {
          id: true,
          email: true,
        },
      });
      console.log('dados resgatados', users)
      res.json(users)
    } catch (error) {
    }
  },
  async DeleteUsers(req: Request, res: Response) {
    const id = parseInt(req.params.ids)
    try {
      const users = await prisma.createUser.delete({
        where: {
          id: id
        }
      })
      console.log('usuario deletado e todas as mensagens relacionadas')
    } catch (error) {
      console.log(error)
    }
  }
}

