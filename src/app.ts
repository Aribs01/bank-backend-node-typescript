import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index'

dotenv.config();

const app = express();

const port: any = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use('/api/v1', routes)

app.listen(port, () => {
	console.log(`Server is running at ${port}...`);
});
