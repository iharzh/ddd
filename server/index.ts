require('dotenv').config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/infrastructure/routes';
import { connectDb } from './src/infrastructure/db';

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use('/', router);

const PORT = 5000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`)
    })
});

