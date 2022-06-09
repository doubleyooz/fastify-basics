import mongoose from 'mongoose';

import { app } from './config/fastify.config';

const PORT = process.env.PORT ? process.env.PORT : 5000;

const start = async () => {
    try {
        await app.listen(PORT);
        mongoose.connect(`${process.env.DB_CONNECTION}`);
    } catch (error) {
        console.log(error);
        app.log.error(error);
        process.exit(1);
    }
};

start();
