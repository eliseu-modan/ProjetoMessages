import { Request, Response } from "express";
import CreateUsers from "./CreateUsers";
import prisma from "../importPrisma";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Função para gerar um token JWT
function generateJwtToken(userId: number) {
  try {
    const secretKey = 'tokenJu'; // Troque por uma chave secreta real e segura
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Configure o tempo de expiração desejado
    return token;
  } catch (error) {
    console.error('Erro ao gerar o token:', error);
    throw error;
  }
}

export default {
  async Login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const userCreate = await prisma.createUser.findUnique({
        where: {
          email,
        }
      });

      if (!userCreate) {
        console.log('EMAIL NÃO ENCONTRADO')
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      const passwordMatch = await bcrypt.compare(password, userCreate.password);

      if (!passwordMatch) {
        console.log('senha errada')
        return res.status(401).json({ message: 'Senha incorreta' });
      } else {
        console.log('Senha correta')
      }

      console.log('LOGIN EFETUADO')
      const token = generateJwtToken(userCreate.id);

      // Retorne o token JWT na resposta
      console.log(token)
      return res.json({ token });
    } catch (error) {
      console.error('Erro ao processar a solicitação de login:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}
