// Backend/src/minhaAPI/middlewares/authenticated.ts

import { Response, NextFunction, RequestHandler } from 'express'; // IMPORTE RequestHandler
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/customRequest'; // IMPORTE CustomRequest
import { jwtToken } from '../config/config'; // Ajuste o caminho se necessário

// Remova 'const JWT_SECRET', use jwtToken.jwt.secret
interface JwtUserPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Tipamos a função inteira como RequestHandler
export const authenticated: RequestHandler = (req, res, next) => {
  // AFIRMAÇÃO DE TIPO: Dizemos ao TS que 'req' é um CustomRequest AQUI
  const customReq = req as CustomRequest;

  const token = customReq.token; // Use customReq para acessar a propriedade

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido.' });
    return;
  }

  const secretKey = jwtToken.jwt.secret; // Use a chave correta para o ambiente

  if (!secretKey) {
      console.error('Erro de configuração: Chave secreta JWT não definida!');
      res.status(500).json({ error: 'Erro interno do servidor: Chave de autenticação ausente.' });
      return;
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtUserPayload;
    customReq.user = decoded; // Use customReq para acessar a propriedade
    next();
  } catch (error) {
    console.error("Erro na verificação do JWT:", error);
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expirado.' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Token inválido.' });
    } else {
      res.status(403).json({ error: 'Token de autenticação inválido.' });
    }
    return;
  }
};