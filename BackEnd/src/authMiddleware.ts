import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from 'config';

const secretKey: Secret = config.get('jwtSecret');
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = req.header('Authorization');
  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Token de acesso não fornecido' });
  }
  if (!authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Formato de token inválido' });
  }
  const token = authorizationHeader.substring(7);
  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    next(); // Prossiga para a próxima rota/middleware
  } catch (error) {
    console.error('Token inválido:', error);
    return res.status(401).json({ message: 'Token de acesso inválido ou expirado' });
  }
}
export default authenticateToken;