import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401); // Token não fornecido, acesso não autorizado
  }

  jwt.verify(token, 'tokenJu', (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token inválido ou expirado, acesso proibido
    }
    // Anexar as informações do usuário ao objeto de solicitação
    (req as any).user = user;
    next(); // Permitir que a solicitação prossiga para a rota protegida
  });
}

export default authenticateToken;