import express from 'express';
import routes from './routes';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use('/api', routes)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀🚀🚀 Server is running on http://localhost:${PORT}`);
});