import { Request, Response } from "express";
import prisma from '../importPrisma'
import bcrypt from 'bcryptjs';

export default {
    async NewUser(req: Request, res: Response) {
        const { email, password, admin } = req.body
        console.log(email, password)


        try {
            const existingUser = await prisma.createUser.findUnique({
                where: {
                    email,
                }
            })
            if (existingUser) {
                return res.status(401).json({ message: 'Este email já está em uso.' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await prisma.createUser.create({
                data: {
                    email,
                    password: hashedPassword,
                    admin
                }
            });
            console.log('Usuario Registrado', email, password)
            return res.json('usuarios')
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }
}
