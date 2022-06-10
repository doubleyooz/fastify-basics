import { app } from './config/fastify.config';

const PORT = process.env.PORT ? process.env.PORT : 5000;
console.log(process.env.PORT);
const start = async () => {
    try {
        await app.listen(PORT);
    } catch (error) {
        console.log(error);
        app.log.error(error);
        process.exit(1);
    }
};

start();
