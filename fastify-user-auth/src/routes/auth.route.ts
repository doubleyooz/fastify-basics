import AuthController from '../controllers/auth.controller';
import AuthSchema from '../schemas/auth.schema';

const app = (fastify: any, options: any, done: any) => {
    fastify.post(`/signIn`, {
        schema: AuthSchema.signIn,
        handler: AuthController.signIn,
    });

    done();
};

export default app;
