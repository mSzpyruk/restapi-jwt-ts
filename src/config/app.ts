import express from 'express';
import appRouter from '../routes';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.use(appRouter);

export default app;
