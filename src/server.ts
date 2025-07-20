import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/error-handler.ts';
import routes from './routes/index.ts';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});
app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.use(errorHandler);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀🚀🚀 Server is running on http://localhost:${PORT}`);
});

export default app;
