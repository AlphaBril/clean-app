import express from 'express';
import userRoutes from './routes/user';

const app = express();
app.use(express.static('public'));
const allowCrossDomain = (req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', "*")
  res.header('Access-Control-Allow-Headers', "*");
  next();
};

app.use(allowCrossDomain);

app.use(express.json({ limit: '1mb' }));
app.use('/api/auth', userRoutes);

export default app;