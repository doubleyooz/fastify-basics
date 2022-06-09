import fastify from 'fastify';
import itemsRoute from '../routes/item.route.js';

const app = fastify({ logger: true });
app.register(itemsRoute);

export { app };
