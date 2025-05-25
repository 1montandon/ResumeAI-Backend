import express from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/error-handler';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json()) ;
app.use('/api', routes)
app.use(errorHandler)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀🚀🚀 Server is running on http://localhost:${PORT}`);
});