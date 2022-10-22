import fastify from 'fastify';
import appRoute from '../routes/app.route.js';

const app = fastify({ logger: true });
app.register(appRoute);

export { app };
