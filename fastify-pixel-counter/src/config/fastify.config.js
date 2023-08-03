import fastify from 'fastify';
//import swagger from '@fastify/swagger';

import cors from '@fastify/cors';

import appRoute from '../routes/app.route.js';
import colourRoute from '../routes/colour.route.js';
import imageRoute from '../routes/image.route.js';

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
}

const app = fastify({ logger: true, ajv: { plugins: [ajvPlugin] } });
app.register(cors);
//app.register(swagger, swaggerConfig);

app.register(appRoute);
app.register(colourRoute);
app.register(imageRoute);

export { app };
