import UserController from '../controllers/user.controller';
import UserSchema from '../schemas/user.schema';

const app = (fastify: any, options: any, done: any) => {
    fastify.post(`/users`, {
        schema: UserSchema.store,
        handler: UserController.store,
    });
    fastify.get(`/users`, {
        schema: UserSchema.findOne,
        handler: UserController.findOne,
    });
    done();
};

export default app;
