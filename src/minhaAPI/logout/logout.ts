// Backend/src/minhaAPI/controllers/logout/logout.ts

import { Request, Response, RequestHandler } from 'express';
// Importe CustomRequest se você quiser tipar o 'req' explicitamente para logs
import { CustomRequest } from '../types/customRequest'; 

// Esta função será o controlador de logout
// Tipamos ela como RequestHandler para ser compatível com o Express.
export const logout: RequestHandler = (req, res) => {
  // O Express tipa 'req' como Request genérico, então fazemos a afirmação de tipo para CustomRequest
  // Isso nos permite acessar 'req.user' se o middleware 'authenticated' rodou antes.
  const customReq = req as CustomRequest;

  // Opcional: Logar quem está fazendo logout (se o token foi enviado e autenticado)
  if (customReq.user) {
    console.log(`[LOGOUT] Usuário '${customReq.user.email}' (ID: ${customReq.user.id}) realizou logout.`);
  } else {
    console.log('[LOGOUT] Tentativa de logout por usuário não autenticado.');
  }

  // Com JWTs stateless, o servidor não precisa fazer nada para "destruir" a sessão.
  // O token continuará válido até sua data de expiração (exp).
  // A responsabilidade de descartar o token é do cliente.

  res.status(200).json({ message: 'Logout bem-sucedido.' });
};