// Backend/src/minhaAPI/routers/routers.ts

import { Response, Router, NextFunction, RequestHandler } from 'express'; // IMPORTE RequestHandler AQUI!
import { prisma } from '../../../prisma/prismaClient/prismaClient'; 

import { extrairToken } from '../middlewares/extracaoToken';
import { authenticated } from '../middlewares/authenticated';
import { authorized } from '../middlewares/authorized'; // IMPORTE authorized
import { login } from '../login/login';
import { registroUser } from '../registro/registro';
import { logout } from '../logout/logout';

import { CustomRequest } from '../types/customRequest'; // IMPORTE CustomRequest

const router = Router();

router.post('/login', login);
router.post('/register', registroUser);

// Rota protegida APENAS para ADMINS
router.get(
  '/rota-protegida-admin-somente',
  extrairToken as RequestHandler,
  authenticated as RequestHandler,
  authorized(['ADMIN']) as RequestHandler,
  // AQUI É A MUDANÇA NO CALLBACK FINAL:
  // A tipagem do 'req' é feita diretamente, e o TypeScript aceita isso.
  // É a forma mais explícita de dizer "eu sei que req é CustomRequest aqui".
  (req, res: Response) => { // Remova ': CustomRequest' daqui para evitar o conflito na assinatura
    const customReq = req as CustomRequest; // <-- ADICIONE ESTA LINHA: AFIRMAÇÃO DE TIPO EXPLÍCITA

    if (customReq.user) { // Use customReq
      res.status(200).json({
        message: `Acesso permitido! Bem-vindo, ${customReq.user.email}! Você é um ${customReq.user.role} e acessou a área de ADMIN.`,
        user: {
          id: customReq.user.id,
          email: customReq.user.email,
          role: customReq.user.role,
        },
        token: customReq.token
      });
    } else {
      res.status(500).json({ error: 'Erro interno: Usuário não autenticado no request ou token inválido.' });
    }
  }
);

// Rota protegida simples (para qualquer usuário autenticado)
router.get(
  '/rota-protegida',
  extrairToken as RequestHandler,
  authenticated as RequestHandler,
  (req, res: Response) => { // Remova ': CustomRequest' daqui
    const customReq = req as CustomRequest; // <-- ADICIONE ESTA LINHA: AFIRMAÇÃO DE TIPO EXPLÍCITA

    if (customReq.user) { // Use customReq
      res.status(200).json({
        message: 'Acesso permitido à rota protegida (apenas autenticação)!',
        user: {
          id: customReq.user.id,
          email: customReq.user.email,
          role: customReq.user.role,
        },
        token: customReq.token
      });
    } else {
      res.status(500).json({ error: 'Erro interno: Usuário não autenticado no request.' });
    }
  }
);

router.post('/logout', logout);

export default router;