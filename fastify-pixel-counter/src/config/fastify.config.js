import fastify from 'fastify';
//import swagger from '@fastify/swagger';

import cors from '@fastify/cors';

import appRoute from '../routes/app.route.js';
import colourRoute from '../routes/colour.route.js';

const app = fastify({ logger: true });
app.register(cors);

//app.register(swagger, swaggerConfig);

app.register(appRoute);
app.register(colourRoute);
//app.register(uploadRoute);

export { app };
