import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoute from './interfaces/routes/authRouts';
import userRoute from './interfaces/routes/userRouts';
dotenv.config();

const app = express();

app.use(cors({
    credentials: true
}));

app.use(cors());
app.use(express.json());

//Routs
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() })
})
export default app;