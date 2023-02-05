import AuthController from '../controllers/auth.controller';
import AuthSchema from '../schemas/auth.schema';

const app = (fastify: any, options: any, done: any) => {
    fastify.get(`/sign-in`, {
        schema: AuthSchema.signIn,
        handler: AuthController.signIn,
    });

    fastify.get(`/revoke-token`, {
        schema: AuthSchema.revokeToken,
        handler: AuthController.revokeRefreshToken,
    });

    fastify.get(`/refresh-token`, {
        schema: AuthSchema.refreshToken,
        handler: AuthController.refreshAccessToken,
    });

    done();
};

export default app;
