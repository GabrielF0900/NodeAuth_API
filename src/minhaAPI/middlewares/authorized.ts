// Backend/src/minhaAPI/middlewares/authorized.ts

import { Response, NextFunction, RequestHandler } from 'express'; // IMPORTE RequestHandler
import { CustomRequest } from '../types/customRequest'; // Importe sua interface CustomRequest

// Função auxiliar que retorna o middleware de autorização
// Ela aceita os papéis requeridos como um array de strings.
export const authorized = (requiredRoles: string[]): RequestHandler => {

  return (req, res, next) => {
    // AFIRMAÇÃO DE TIPO: Dizemos ao TS que 'req' é um CustomRequest AQUI.
    const customReq = req as CustomRequest;

    // 1. Verifique se o usuário está autenticado e se o papel foi preenchido.
    if (!customReq.user || !customReq.user.role) { // Use customReq
      console.warn('AUTHZ-SIMPLES: Acesso negado. Usuário não autenticado ou sem papel.');
       res.status(403).json({ error: 'Acesso negado: Credenciais insuficientes.' });
       return;
    }

    const userRole = customReq.user.role; // Use customReq
    
    // Opcional para depuração (MUITO RECOMENDADO para verificar roles):
    console.log(`[AUTHZ-SIMPLES] Usuário '${customReq.user.email}' com papel '${userRole}'.`); // Use customReq
    console.log(`[AUTHZ-SIMPLES] Papéis necessários para esta rota: ${requiredRoles.join(', ')}.`);

    // 2. Verifique se o papel do usuário está na lista de papéis permitidos.
    const normalizedUserRole = userRole.toUpperCase();
    const normalizedRequiredRoles = requiredRoles.map(role => role.toUpperCase());

    if (!normalizedRequiredRoles.includes(normalizedUserRole)) {
      console.warn(`[AUTHZ-SIMPLES] Acesso negado para '${customReq.user.email}'. Papel '${userRole}' não permitido.`); // Use customReq
         res.status(403).json({ error: 'Acesso negado: Você não tem permissão.' });
         return;
    }

    // 3. Se o papel é permitido, prossegue para o próximo middleware/rota.
    console.log(`[AUTHZ-SIMPLES] Acesso permitido para '${customReq.user.email}'.`); // Use customReq
    next();
  };
};