import fastify from 'fastify';
//import cors from '@fastify/cors';

import appRoute from '../routes/app.route';
import crackerRoute from '../routes/cracker.route';

//import swaggerConfig from './swagger.config';
/*
function ajvPlugin(ajv, options) {
    ajv.addKeyword('isFileType', {
        compile: (schema, parent, it) => {
            // Change the schema type, as this is post validation it doesn't appear to error.
            parent.type = 'file';
            delete parent.isFileType;
            return () => true;
        },
    });

    return ajv;
}*/

//const app = fastify({ logger: true, ajv: { plugins: [ajvPlugin] } });

const app = fastify({ logger: true });
//app.register(cors);

//app.register(swagger, swaggerConfig);

app.register(appRoute);
app.register(crackerRoute);

export { app };
