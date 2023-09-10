import { Request, Response } from "express";
import CreateUsers from "./CreateUsers";
import prisma from "../importPrisma";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import NodeCache from 'node-cache';

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

const loginAttemptsCache = new NodeCache();
const userLockCache = new NodeCache();

function blockUser(userId: number, lockDurationMinutes: number) {
  const unlockTime = new Date() as Date;
  unlockTime.setMinutes(unlockTime.getMinutes() + lockDurationMinutes);
  userLockCache.set(userId.toString(), unlockTime);
  console.log(`Usuário bloqueado até: ${unlockTime}`);
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

      const userId = userCreate.id;
      const blockedUntil = userLockCache.get(userId.toString());
      if (blockedUntil && new Date() < (blockedUntil as Date)) {
        const remainingTime = Math.ceil(((blockedUntil as Date).getTime() - new Date().getTime()) / 1000);
        console.log(`Usuário bloqueado. Tente novamente em ${remainingTime} segundos.`);
        return res.status(401).json({ message: `Usuário bloqueado. Tente novamente em ${remainingTime} segundos.` });
      }
      const passwordMatch = await bcrypt.compare(password, userCreate.password);

      if (!passwordMatch) {
        const loginAttempts = (loginAttemptsCache.get(userId.toString()) as number || 0) + 1;
        loginAttemptsCache.set(userId.toString(), loginAttempts);

        console.log('Senha incorreta');
        console.log(`Tentativas restantes: ${5 - loginAttempts}`);

        if (loginAttempts >= 5) {
          const lockDurationMinutes = 5; // Tempo de bloqueio em minutos
          blockUser(userId, lockDurationMinutes);
          return res.status(401).json({ message: `Senha incorreta. Aguarde ${lockDurationMinutes} minutos para tentar novamente.` });
        }

        return res.status(401).json({ message: 'Senha incorreta' });
      } else {
        // Resetar as tentativas após um login bem-sucedido
        loginAttemptsCache.del(userId.toString());

        console.log('Senha correta');
      }

      console.log('LOGIN EFETUADO')
      const token = generateJwtToken(userId);

      // Retorne o token JWT na resposta
      console.log(token)
      return res.json({ token });
    } catch (error) {
      console.error('Erro ao processar a solicitação de login:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}
