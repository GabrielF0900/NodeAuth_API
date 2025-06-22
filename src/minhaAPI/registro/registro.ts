// src/minhaAPI/controllers/userController.ts

import { Request, Response } from 'express';
import { prisma } from '../../../prisma/prismaClient/prismaClient';
import bcrypt from 'bcrypt';
import { jwtToken } from '../config/config';
import jwt from 'jsonwebtoken';
// import { Secret, SignOptions } from 'jsonwebtoken'; // <--- Opcional: para tipagem explícita

export const registroUser = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        res.status(400).json({ error: 'Email, senha e nome são obrigatórios.' });
        return; // Adicionado 'return' para garantir que a função encerre
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            res.status(409).json({ error: 'Este email já está cadastrado.' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword, name },
            select: { id: true, email: true, name: true }
        });

        // --- MUDANÇA AQUI: Asserção de tipo diretamente nos argumentos do jwt.sign ---
        const jwtSecret = jwtToken.jwt.secret as jwt.Secret; // Garante que é um tipo Secret do JWT
        const jwtExpiresIn = jwtToken.jwt.exp as jwt.SignOptions['expiresIn']; // Garante o tipo expiresIn

        const tokenCriado = jwt.sign(
            { id: newUser.id }, // Payload
            jwtSecret,           // Secret garantido como jwt.Secret
            { expiresIn: jwtExpiresIn } // ExpiresIn garantido como o tipo esperado
        );
        // --- FIM DA MUDANÇA ---

        res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            user: newUser,
            token: tokenCriado
        });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao tentar registrar o usuário.' });
    }
};