import UserController from '../controllers/user.controller';
import UserSchema from '../schemas/user.schema';

const app = (fastify: any, options: any, done: any) => {
    fastify.post(`/users`, {
        schema: UserSchema.store,
        handler: UserController.store,
    });
    done();
};

export default app;
