import {
    FastifyInstance,
    FastifyPluginCallback,
    FastifyPluginOptions,
} from 'fastify';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import UserSchema from '../schemas/user.schema';

const app: FastifyPluginCallback = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: () => void,
) => {
    fastify.post(`/users`, {
        schema: UserSchema.store,
        handler: UserController.store,
    });

    fastify.get(`/users`, {
        schema: UserSchema.find,
        preHandler: AuthMiddleware.auth,
        handler: UserController.find,
    });

    fastify.get(`/users/:_id`, {
        schema: UserSchema.findOne,
        preHandler: AuthMiddleware.auth,
        handler: UserController.findOne,
    });

    fastify.put(`/users`, {
        schema: UserSchema.update,
        preHandler: AuthMiddleware.auth,
        handler: UserController.update,
    });
    done();
};

export default app;
