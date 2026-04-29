import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:4321';

// Middlewares
app.use(express.json());
app.use(cookieParser());
const ALLOWED_ORIGINS = [
  CORS_ORIGIN,
  'null', // file:// pages (auth-test.html aberto localmente)
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requests sem origin (ex: curl, Postman) e origens permitidas
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origem não permitida → ${origin}`));
      }
    },
    credentials: true,
  })
);

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Rota de fallback
app.use((req, res) => {
  res.status(404).json({ ok: false, error: { code: 'NOT_FOUND', message: 'Rota não encontrada na API externa.' } });
});

app.listen(PORT, () => {
  console.log(`[API] Servidor rodando na porta ${PORT}`);
  console.log(`[API] CORS configurado para: ${CORS_ORIGIN}`);
});
