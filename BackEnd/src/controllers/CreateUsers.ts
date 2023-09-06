import { Request, Response } from "express";
import prisma from '../importPrisma'
import bcrypt from 'bcryptjs';



export default {

    async NewUser(req: Request, res: Response) {

        const { email, password } = req.body
        try {
            // Verifique se o usuário já existe
            const existingUser = await prisma.createUser.findUnique({
                where: {
                    email,
                }
            })
            if (existingUser) {
                return res.status(400
                ).json({ message: 'Este email já está em uso.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.createUser.create({
                data: {
                    email,
                    password: hashedPassword
                }
                
            });

           
            console.log('Usuario Registrado',email ,password)
            return res.json('usuarios')
            
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.' });

        }
    }


}
