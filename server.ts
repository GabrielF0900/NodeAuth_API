import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import routers from "./src/minhaAPI/routers/routers";  // Corrigi o caminho relativo
import { prisma } from './prisma/prismaClient/prismaClient';

// Define o caminho correto para o arquivo .env
const envPath = path.resolve(__dirname, '.env');
console.log('Carregando variáveis do arquivo:', envPath);

// Carrega as variáveis de ambiente do .env
dotenv.config({ path: envPath });

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste simples
app.get('/', (req, res) => {
  res.json({ message: 'Servidor rodando!' });
});

// ✅ Importante: registra as rotas da aplicação
app.use(routers);

// Porta definida pela variável de ambiente ou 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✔️ Carregado' : '❌ Não encontrado');
});
