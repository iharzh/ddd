import express from 'express';
import { connectDb } from './src/infrastructure/db';

const app = express();

const PORT = 5000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`)
    })
});

