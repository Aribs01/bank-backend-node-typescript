import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index'

dotenv.config();

const app = express();

const port: any = process.env.PORT || 8080;

app.use(express.json());

app.use(cors());

app.use('/api/v1', routes)
console.log("HERE");

app.listen((port), function(){
	console.log('kkk');
	
});
