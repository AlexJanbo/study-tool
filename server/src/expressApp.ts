import express, { Express } from 'express';
import cors from 'cors';

const app: Express = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cors());
app.use(express.static(__dirname + '/public'));

// app.use('/api/users', require('./api/routes/user-routes'));

export default app;