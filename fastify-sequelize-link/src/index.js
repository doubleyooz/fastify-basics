import { app } from './config/fastify.config.js';
import { sequelize } from './database/config/database.config.js';

const PORT = process.env.PORT ? process.env.PORT : 5000;
console.log(process.env.PORT);

const start = async () => {
    try {
        await app.listen({ port: PORT });
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

    } catch (error) {
        console.log(error);
        app.log.error(error);
        process.exit(1);
    }
};

start();
