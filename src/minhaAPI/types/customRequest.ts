// Backend/src/minhaAPI/types/customRequest.ts

import { Request } from 'express'; // Importa a interface Request original do Express

// Exporta sua interface CustomRequest que estende a Request original.
// Sem 'declare global' e sem 'export {};' (a menos que haja outros exports no arquivo).
export interface CustomRequest extends Request {
  user?: { // Adicione as propriedades que você espera no req.user
    id: string;
    email: string;
    role: string;
  };
  token?: string; // Adicione a propriedade token
}