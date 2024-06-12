import express, { Express } from 'express';
import dotenv from 'dotenv';
import ApiRouter from './routes';
import { connect } from './database';
import cors from 'cors';
import cron from 'node-cron';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());
app.disable('x-powered-by');

const hourlyEvent = () => {
	console.log('Hourly event executed');
};

cron.schedule('0 * * * *', hourlyEvent);

//Conectar a Database
connect();

app.use('/api/v1', ApiRouter);

export default app;
