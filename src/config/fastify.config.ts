import fastify from 'fastify';
import mongoose from 'mongoose';
import fastifyjwt from '@fastify/jwt';
import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';
import cors from '@fastify/cors';

import appRoute from '../routes/app.route';
import userRoute from '../routes/user.route';
import authRoute from '../routes/auth.route';

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
app.register(cors, {
    origin: [`${process.env.CLIENT}`, `${process.env.CLIENT2}`],
});
app.register(fastifyCookie, {
    hook: 'onRequest',
    parseOptions: {},
} as FastifyCookieOptions);
//app.register(swagger, swaggerConfig);

mongoose.connect(`${process.env.DB_CONNECTION}`);
app.register(fastifyjwt, {
    secret: `${process.env.REFRESH_TOKEN_SECRET}`,
    namespace: 'refresh',
    cookie: { cookieName: 'jid', signed: false },
});
app.register(fastifyjwt, {
    secret: `${process.env.ACCESS_TOKEN_SECRET}`,
    namespace: 'access',
});
app.register(appRoute);
app.register(userRoute);
app.register(authRoute);

export { app };
