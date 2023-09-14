import { Request, Response, NextFunction, request } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';


function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  console.log('middleware do token back end ', token)

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido, acesso não autorizado' });
  }



  // Recomenda-se usar uma variável de ambiente ou arquivo de configuração para armazenar o segredo


  jwt.verify(token, '12345', (err: VerifyErrors | null, userId:any) => {
    console.log(userId)
    if (err) {
      console.log(err)
        return res.status(403).json({error : "token invalido"})
      }
req.user = userId
    
    next(); 
  });
}

export default authenticateToken;
