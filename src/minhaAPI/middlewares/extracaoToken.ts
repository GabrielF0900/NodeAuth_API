// Backend/src/minhaAPI/middlewares/extracaoToken.ts

import { Response, NextFunction, RequestHandler } from 'express'; // IMPORTE RequestHandler
import { CustomRequest } from '../types/customRequest'; // IMPORTE CustomRequest

// Tipamos a função inteira como RequestHandler para satisfazer o router.get.
// Deixamos os parâmetros da função interna como inferidos pelo TS,
// e usamos a afirmação de tipo 'as CustomRequest' dentro do corpo.
export const extrairToken: RequestHandler = (req, res, next) => {
  // AFIRMAÇÃO DE TIPO: Dizemos ao TS que 'req' é um CustomRequest AQUI.
  const customReq = req as CustomRequest;

  const authHeader = customReq.headers['authorization'];

  if (!authHeader) {
    res.status(401).json({ error: 'Token de autenticação não fornecido.' });
    return;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({ error: 'Formato de token inválido. Use: "Bearer [TOKEN]".' });
    return;
  }

  const bearerToken = parts[1];

  if (!bearerToken) {
    res.status(401).json({ error: 'Token ausente após "Bearer".' });
    return;
  }

  customReq.token = bearerToken; // Use customReq para acessar a propriedade
  next();
};