// src/minhaAPI/controllers/login/login.ts

import { Request, Response } from 'express'; // Garanta que NextFunction NÃO está aqui
import { prisma } from '../../../prisma/prismaClient/prismaClient'; // Ajuste o caminho conforme necessário
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtToken } from '../config/config';

// IMPORTANTE: Importe o tipo 'User' gerado pelo Prisma.
// Este tipo incluirá todas as propriedades do seu modelo User no banco de dados,
// incluindo 'role', se estiver definido no seu schema.prisma.
import { User as PrismaUser } from '@prisma/client';

interface JwtUserPayload {
  id: string;
  email: string;
  role: string; // Adicionei o campo 'role' aqui, pois ele estará no payload do JWT
  // ... outras propriedades que deseja no token
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Ao usar 'PrismaUser | null', o TypeScript agora sabe que
    // o objeto 'user' pode ter a propriedade 'role' (se ela existir no seu schema.prisma)
    const user: PrismaUser | null = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(400).json({ error: 'Credenciais inválidas.' }); // <-- AQUI NÃO TEM 'RETURN' NA FRENTE
      return; // <-- Adicione este 'return;' para encerrar a função
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(400).json({ error: 'Credenciais inválidas.' }); // <-- AQUI NÃO TEM 'RETURN' NA FRENTE
      return; // <-- Adicione este 'return;' para encerrar a função
    }

    // Verificando se o usuário tem um papel definido.
    // Agora, 'user.role' não dará erro porque o tipo 'PrismaUser' foi importado.
    if (!user.role) {
      // Se por algum motivo o campo 'role' no banco de dados estiver nulo ou indefinido,
      // você pode atribuir um valor padrão aqui.
      console.warn(`Usuário ${user.email} não tem um 'role' definido no banco de dados. Atribuindo 'USER' como padrão.`);
      user.role = 'admin'; // Garante que há um 'role' para ser usado no payload
    }

    const payload: JwtUserPayload = {
      id: user.id,
      email: user.email,
      role: user.role, // Agora o 'role' é adicionado ao payload do JWT sem erro
    };

    const token = jwt.sign(payload, jwtToken.jwt.secret, {
      expiresIn: '24h',
    });

    res.status(200).json({ // <-- AQUI NÃO TEM 'RETURN' NA FRENTE
      message: 'Login bem-sucedido!',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role, // Também inclua o role no objeto 'user' da resposta, se desejar
      },
    });
    // Não precisa de 'return;' explicitamente aqui se for a última linha da função,
    // mas pode adicionar para clareza em funções async.
    // return; // Opcional, mas boa prática.


  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' }); // <-- AQUI NÃO TEM 'RETURN' NA FRENTE
    return; // <-- Adicione este 'return;' para encerrar a função
  }
};