import express from 'express';
import { connectDb } from './src/infrastructure/db';
import router from './src/infrastructure/routes';

const app = express();

app.use('/', router);

const PORT = 5000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`)
    })
});

